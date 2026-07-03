import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FolderKanban, Users, MessageSquare, BookOpen, TrendingUp, Eye, ArrowUpRight, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

function StatCard({ icon: Icon, label, value, link, color, delay }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <Link to={link} className="card-glass p-6 rounded-2xl flex items-center justify-between hover:border-blue-500/30 transition-all duration-300 group block">
        <div>
          <div className="text-gray-500 text-xs mb-1">{label}</div>
          <div className="text-2xl font-bold font-display text-white">{value ?? '—'}</div>
        </div>
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
          <Icon size={22} className="text-white" />
        </div>
      </Link>
    </motion.div>
  );
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [counts, setCounts] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get('/projects/admin').then(r => ({ projects: r.data.data?.length })).catch(() => ({})),
      api.get('/blog/admin').then(r => ({ blog: r.data.data?.length })).catch(() => ({})),
      api.get('/careers/admin').then(r => ({ careers: r.data.data?.length })).catch(() => ({})),
      api.get('/contact?limit=5').then(r => { setMessages(r.data.data?.slice(0, 5) || []); return { messages: r.data.total }; }).catch(() => ({})),
    ]).then(results => setCounts(Object.assign({}, ...results)));
  }, []);

  const STATS = [
    { icon: FolderKanban, label: 'Total Projects', value: counts.projects, link: '/admin/projects', color: 'bg-blue-600' },
    { icon: BookOpen, label: 'Blog Posts', value: counts.blog, link: '/admin/blog', color: 'bg-indigo-600' },
    { icon: Briefcase, label: 'Job Openings', value: counts.careers, link: '/admin/careers', color: 'bg-cyan-600' },
    { icon: MessageSquare, label: 'Total Messages', value: counts.messages, link: '/admin/messages', color: 'bg-violet-600' },
  ];

  return (
    <div>
      <div className="mb-8">
        <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl font-bold font-display text-white">
          Good morning, {user?.name?.split(' ')[0]} 👋
        </motion.h1>
        <p className="text-gray-500 text-sm mt-1">Here's what's happening with your website today.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {STATS.map((s, i) => <StatCard key={s.label} {...s} delay={i * 0.08} />)}
      </div>

      {/* Quick Actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {[
          { label: 'Add New Project', desc: 'Showcase your latest work', to: '/admin/projects', icon: FolderKanban },
          { label: 'Write Blog Post', desc: 'Share insights with your audience', to: '/admin/blog', icon: BookOpen },
          { label: 'View Messages', desc: `${counts.messages || 0} total inquiries`, to: '/admin/messages', icon: MessageSquare },
        ].map(({ label, desc, to, icon: Icon }) => (
          <Link key={to} to={to} className="card-glass p-5 rounded-2xl hover:border-blue-500/30 transition-all duration-300 group flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
              <Icon size={18} className="text-blue-400" />
            </div>
            <div>
              <div className="text-white text-sm font-semibold mb-0.5 flex items-center gap-1">{label} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></div>
              <div className="text-gray-500 text-xs">{desc}</div>
            </div>
          </Link>
        ))}
      </motion.div>

      {/* Recent Messages */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-semibold">Recent Messages</h2>
          <Link to="/admin/messages" className="text-blue-400 hover:text-blue-300 text-xs">View all →</Link>
        </div>
        <div className="card-glass rounded-2xl overflow-hidden">
          {messages.length === 0 ? (
            <div className="p-8 text-center text-gray-600 text-sm">No messages yet</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  {['Name', 'Subject', 'Service', 'Date', 'Status'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-gray-500 text-xs font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {messages.map(msg => (
                  <tr key={msg._id} className="border-b border-white/3 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5 text-white">{msg.name}</td>
                    <td className="px-5 py-3.5 text-gray-400 max-w-xs truncate">{msg.subject}</td>
                    <td className="px-5 py-3.5 text-gray-500">{msg.service || '—'}</td>
                    <td className="px-5 py-3.5 text-gray-500 text-xs">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${msg.status === 'new' ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-400'}`}>{msg.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>
    </div>
  );
}
