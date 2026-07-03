import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, X, Loader2 } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const EMPTY = { title: '', shortDescription: '', description: '', client: '', category: 'mobile', technologies: '', features: '', platform: '', liveUrl: '', isFeatured: false, isPublished: true };

function Modal({ project, onClose, onSave }) {
  const [form, setForm] = useState(project || EMPTY);
  const [loading, setLoading] = useState(false);

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...form,
      description: form.description || form.shortDescription || '',
      isPublished: form.isPublished !== false,
      technologies: typeof form.technologies === 'string' ? form.technologies.split(',').map(s => s.trim()).filter(Boolean) : form.technologies,
      features: typeof form.features === 'string' ? form.features.split(',').map(s => s.trim()).filter(Boolean) : form.features,
      platform: typeof form.platform === 'string' ? form.platform.split(',').map(s => s.trim()).filter(Boolean) : form.platform,
    };
    try {
      if (project?._id) { await api.put(`/projects/${project._id}`, payload); toast.success('Project updated'); }
      else { await api.post('/projects', payload); toast.success('Project created'); }
      onSave();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving project');
    } finally { setLoading(false); }
  };

  const fmtArr = v => Array.isArray(v) ? v.join(', ') : (v || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border border-white/10 rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-white font-bold font-display">{project?._id ? 'Edit Project' : 'Add New Project'}</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400 hover:text-white" /></button>
        </div>
        <form onSubmit={onSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Title *</label>
              <input name="title" value={form.title} onChange={onChange} className="input-field" required />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Client</label>
              <input name="client" value={form.client} onChange={onChange} className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Category *</label>
            <select name="category" value={form.category} onChange={onChange} className="input-field">
              {['mobile', 'web', 'fullstack', 'api', 'enterprise', 'ai'].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Short Description *</label>
            <textarea name="shortDescription" value={form.shortDescription} onChange={onChange} rows={2} className="input-field resize-none" required />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Full Description</label>
            <textarea name="description" value={form.description} onChange={onChange} rows={4} className="input-field resize-none" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Technologies (comma-separated)</label>
              <input name="technologies" value={fmtArr(form.technologies)} onChange={onChange} className="input-field" placeholder="React, Node.js, MongoDB" />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Platform (comma-separated)</label>
              <input name="platform" value={fmtArr(form.platform)} onChange={onChange} className="input-field" placeholder="iOS, Android, Web" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Features (comma-separated)</label>
            <input name="features" value={fmtArr(form.features)} onChange={onChange} className="input-field" placeholder="Auth, Push Notifications, Dashboard" />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Thumbnail URL</label>
            <input name="thumbnail" value={form.thumbnail || ''} onChange={onChange} className="input-field" placeholder="https://..." />
          </div>
          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isFeatured" checked={form.isFeatured} onChange={onChange} className="rounded" />
              <span className="text-gray-400 text-sm">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" name="isPublished" checked={form.isPublished !== false} onChange={onChange} className="rounded" />
              <span className="text-gray-400 text-sm">Published</span>
            </label>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
            <button type="button" onClick={onClose} className="btn-outline text-sm">Cancel</button>
            <button type="submit" disabled={loading} className="btn-primary text-sm">
              {loading ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : 'Save Project'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try { const r = await api.get('/projects/admin'); setProjects(r.data.data || []); }
    catch { toast.error('Failed to load projects'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const del = async (id) => {
    if (!confirm('Delete this project?')) return;
    try { await api.delete(`/projects/${id}`); toast.success('Deleted'); fetch(); } catch { toast.error('Delete failed'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Projects</h1>
          <p className="text-gray-500 text-sm">{projects.length} total</p>
        </div>
        <button onClick={() => setModal({})} className="btn-primary text-sm py-2 px-4"><Plus size={16} /> Add Project</button>
      </div>

      {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 rounded-full border-2 border-t-blue-500 animate-spin" /></div> : (
        <div className="card-glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {['Title', 'Category', 'Client', 'Status', 'Featured', 'Actions'].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-gray-500 text-xs font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p._id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                  <td className="px-5 py-3.5 text-white font-medium">{p.title}</td>
                  <td className="px-5 py-3.5"><span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full capitalize">{p.category}</span></td>
                  <td className="px-5 py-3.5 text-gray-400">{p.client || '—'}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.isPublished ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400'}`}>
                      {p.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">{p.isFeatured ? <Star size={14} className="text-yellow-400 fill-yellow-400" /> : <span className="text-gray-700">—</span>}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setModal(p)} className="p-1.5 rounded-lg hover:bg-blue-500/10 text-gray-500 hover:text-blue-400 transition-colors"><Edit2 size={14} /></button>
                      <button onClick={() => del(p._id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projects.length === 0 && <div className="text-center py-12 text-gray-600">No projects yet. Add your first one!</div>}
        </div>
      )}

      {modal !== null && <Modal project={modal?._id ? modal : null} onClose={() => setModal(null)} onSave={() => { setModal(null); fetch(); }} />}
    </div>
  );
}
