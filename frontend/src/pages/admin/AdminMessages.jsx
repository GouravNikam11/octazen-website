import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Eye, X, Phone, Building2 } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

const STATUS_COLORS = { new: 'bg-green-500/10 text-green-400', read: 'bg-blue-500/10 text-blue-400', replied: 'bg-purple-500/10 text-purple-400', closed: 'bg-gray-700 text-gray-500' };

function MessageModal({ msg, onClose, onUpdate }) {
  const [status, setStatus] = useState(msg.status);

  const update = async () => {
    try { await api.put(`/contact/${msg._id}`, { status }); onUpdate(); toast.success('Status updated'); onClose(); }
    catch { toast.error('Update failed'); }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg bg-gray-900 border border-white/10 rounded-2xl">
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <h2 className="text-white font-bold">Message from {msg.name}</h2>
          <button onClick={onClose}><X size={18} className="text-gray-400 hover:text-white" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div><span className="text-gray-500">Email:</span> <a href={`mailto:${msg.email}`} className="text-blue-400">{msg.email}</a></div>
            {msg.phone && <div><span className="text-gray-500">Phone:</span> <span className="text-white">{msg.phone}</span></div>}
            {msg.company && <div><span className="text-gray-500">Company:</span> <span className="text-white">{msg.company}</span></div>}
            {msg.service && <div><span className="text-gray-500">Service:</span> <span className="text-white">{msg.service}</span></div>}
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Subject</div>
            <div className="text-white font-semibold">{msg.subject}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Message</div>
            <div className="text-gray-300 text-sm leading-relaxed bg-gray-800/50 p-4 rounded-xl">{msg.message}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Update Status</div>
            <div className="flex gap-2">
              {['new', 'read', 'replied', 'closed'].map(s => (
                <button key={s} onClick={() => setStatus(s)}
                  className={`text-xs px-3 py-1.5 rounded-full capitalize transition-all ${status === s ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-2 border-t border-white/5">
            <button onClick={onClose} className="btn-outline text-sm">Close</button>
            <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`} className="btn-secondary text-sm">Reply via Email</a>
            <button onClick={update} className="btn-primary text-sm">Update Status</button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('all');

  const fetch = async () => {
    setLoading(true);
    try { const r = await api.get('/contact'); setMessages(r.data.data || []); }
    catch { toast.error('Failed to load messages'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const del = async id => {
    if (!confirm('Delete this message?')) return;
    try { await api.delete(`/contact/${id}`); toast.success('Deleted'); fetch(); } catch { toast.error('Delete failed'); }
  };

  const displayed = filter === 'all' ? messages : messages.filter(m => m.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Messages</h1>
          <p className="text-gray-500 text-sm">{messages.filter(m => m.status === 'new').length} new messages</p>
        </div>
        <div className="flex gap-2">
          {['all', 'new', 'read', 'replied', 'closed'].map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`text-xs px-3 py-1.5 rounded-full capitalize transition-all ${filter === s ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? <div className="flex justify-center py-20"><div className="w-8 h-8 rounded-full border-2 border-t-blue-500 animate-spin" /></div> : (
        <div className="card-glass rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {['Name', 'Email', 'Subject', 'Service', 'Date', 'Status', ''].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-gray-500 text-xs font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayed.map(msg => (
                <tr key={msg._id} className={`border-b border-white/3 hover:bg-white/2 transition-colors ${msg.status === 'new' ? 'bg-green-500/3' : ''}`}>
                  <td className="px-5 py-3.5 text-white font-medium">{msg.name}</td>
                  <td className="px-5 py-3.5 text-blue-400">{msg.email}</td>
                  <td className="px-5 py-3.5 text-gray-300 max-w-xs truncate">{msg.subject}</td>
                  <td className="px-5 py-3.5 text-gray-500">{msg.service || '—'}</td>
                  <td className="px-5 py-3.5 text-gray-600 text-xs">{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td className="px-5 py-3.5"><span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_COLORS[msg.status]}`}>{msg.status}</span></td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button onClick={() => setSelected(msg)} className="p-1.5 rounded-lg hover:bg-blue-500/10 text-gray-500 hover:text-blue-400 transition-colors"><Eye size={14} /></button>
                      <button onClick={() => del(msg._id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {displayed.length === 0 && <div className="text-center py-12 text-gray-600">No messages to show</div>}
        </div>
      )}

      {selected && <MessageModal msg={selected} onClose={() => setSelected(null)} onUpdate={() => { fetch(); setSelected(null); }} />}
    </div>
  );
}
