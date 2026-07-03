import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, FolderKanban, Wrench, Cpu, MessageSquare, Users, BookOpen, Briefcase, Settings, Building2, BarChart3, Mail, X } from 'lucide-react';
import Logo from '../common/Logo';

const NAV = [
  { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  { label: 'Projects', to: '/admin/projects', icon: FolderKanban },
  { label: 'Services', to: '/admin/services', icon: Wrench },
  { label: 'Technologies', to: '/admin/technologies', icon: Cpu },
  { label: 'Testimonials', to: '/admin/testimonials', icon: MessageSquare },
  { label: 'Team', to: '/admin/team', icon: Users },
  { label: 'Blog Posts', to: '/admin/blog', icon: BookOpen },
  { label: 'Careers', to: '/admin/careers', icon: Briefcase },
  { label: 'Industries', to: '/admin/industries', icon: Building2 },
  { label: 'Statistics', to: '/admin/stats', icon: BarChart3 },
  { label: 'Messages', to: '/admin/messages', icon: Mail },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
];

function SidebarContent({ onClose }) {
  return (
    <div className="h-full flex flex-col bg-gray-900 border-r border-white/5">
      {/* Logo */}
      <div className="p-5 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo iconOnly size="xs" />
          <div>
            <div className="text-white text-sm font-bold font-display">Octazen</div>
            <div className="text-gray-600 text-xs">Admin Panel</div>
          </div>
        </div>
        {onClose && <button onClick={onClose} className="lg:hidden text-gray-500 hover:text-white"><X size={18} /></button>}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {NAV.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20'
                  : 'text-gray-500 hover:text-gray-200 hover:bg-white/5'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <NavLink to="/" target="_blank" className="flex items-center gap-2 text-xs text-gray-600 hover:text-gray-400 transition-colors">
          View Website →
        </NavLink>
      </div>
    </div>
  );
}

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden lg:block w-60 shrink-0">
        <SidebarContent />
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="lg:hidden fixed inset-0 z-40 bg-black/60" />
            <motion.div initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }} transition={{ type: 'spring', damping: 20 }} className="lg:hidden fixed left-0 top-0 bottom-0 z-50 w-60">
              <SidebarContent onClose={onClose} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
