import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, X, Loader2, ToggleLeft, ToggleRight } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

function Modal({ title, item, fields, onClose, onSave, endpoint }) {
  const buildEmpty = () => {
    const obj = {};
    fields.forEach(f => { obj[f.name] = f.default ?? ''; });
    return obj;
  };
  const [form, setForm] = useState(item || buildEmpty());
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form };
    fields.filter(f => f.type === 'array').forEach(f => {
      if (typeof payload[f.name] === 'string') {
        payload[f.name] = payload[f.name].split(',').map(s => s.trim()).filter(Boolean);
      }
    });
    try {
      if (item?._id) await api.put(`${endpoint}/${item._id}`, payload);
      else await api.post(endpoint, payload);
      toast.success(item?._id ? 'Updated!' : 'Created!');
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving');
    } finally { setLoading(false); }
  };

  const fmtVal = (name, type) => {
    const v = form[name];
    if (type === 'array') return Array.isArray(v) ? v.join(', ') : (v || '');
    return v === null || v === undefined ? '' : v;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gray-900 border border-white/10 rounded-2xl my-4">
        <div className="flex items-center justify-between p-6 border-b border-white/5 sticky top-0 bg-gray-900">
          <h2 className="text-white font-bold">{item?._id ? `Edit ${title}` : `Add ${title}`}</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400 hover:text-white" /></button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          {fields.map(f => (
            <div key={f.name}>
              <label className="block text-xs text-gray-500 mb-1">{f.label}{f.required && ' *'}</label>
              {f.type === 'textarea' ? (
                <textarea name={f.name} value={fmtVal(f.name, f.type)} onChange={onChange} rows={3} className="input-field resize-none" required={f.required} />
              ) : f.type === 'select' ? (
                <select name={f.name} value={form[f.name]} onChange={onChange} className="input-field">
                  {f.options?.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
                </select>
              ) : f.type === 'checkbox' ? (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name={f.name} checked={form[f.name]} onChange={onChange} className="rounded" />
                  <span className="text-gray-400 text-sm">{f.checkLabel || f.label}</span>
                </label>
              ) : f.type === 'number' ? (
                <input type="number" name={f.name} value={fmtVal(f.name)} onChange={onChange} className="input-field" required={f.required} min={f.min} max={f.max} />
              ) : (
                <input name={f.name} value={fmtVal(f.name, f.type)} onChange={onChange} placeholder={f.placeholder} className="input-field" required={f.required} />
              )}
            </div>
          ))}
          <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
            <button type="button" onClick={onClose} className="btn-outline text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary text-sm">
              {loading ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function GenericCRUD({ title, endpoint, fields, columns }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const r = await api.get(`${endpoint}/admin`);
      setItems(r.data.data || []);
    } catch { toast.error(`Failed to load ${title}`); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, [endpoint]);

  const del = async id => {
    if (!confirm(`Delete this ${title}?`)) return;
    try { await api.delete(`${endpoint}/${id}`); toast.success('Deleted'); fetch(); } catch { toast.error('Delete failed'); }
  };

  const toggle = async (item, field) => {
    try { await api.put(`${endpoint}/${item._id}`, { [field]: !item[field] }); fetch(); } catch { toast.error('Update failed'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold font-display text-white">{title}</h1>
          <p className="text-gray-500 text-sm">{items.length} total</p>
        </div>
        <button onClick={() => setModal({})} className="btn-primary text-sm py-2 px-4"><Plus size={16} /> Add {title}</button>
      </div>

      {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 rounded-full border-2 border-t-blue-500 animate-spin" /></div> : (
        <div className="card-glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {columns.map(c => <th key={c.key} className="text-left px-5 py-3 text-gray-500 text-xs font-medium">{c.label}</th>)}
                <th className="text-left px-5 py-3 text-gray-500 text-xs font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item._id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  {columns.map(c => (
                    <td key={c.key} className={`px-5 py-3.5 ${c.className || 'text-gray-300'}`}>
                      {c.render ? c.render(item[c.key], item, { toggle }) : (
                        c.badge ? <span className={`text-xs px-2 py-0.5 rounded-full ${c.badge(item[c.key])}`}>{String(item[c.key])}</span>
                        : String(item[c.key] ?? '—').slice(0, 80)
                      )}
                    </td>
                  ))}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setModal(item)} className="p-1.5 rounded-lg hover:bg-blue-500/10 text-gray-500 hover:text-blue-400"><Edit2 size={14} /></button>
                      <button onClick={() => del(item._id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {items.length === 0 && <div className="text-center py-12 text-gray-600">No {title.toLowerCase()} yet.</div>}
        </div>
      )}

      {modal !== null && (
        <Modal
          title={title}
          item={modal?._id ? modal : null}
          fields={fields}
          endpoint={endpoint}
          onClose={() => setModal(null)}
          onSave={() => { setModal(null); fetch(); }}
        />
      )}
    </div>
  );
}
