import { Menu, LogOut, Bell, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function AdminNavbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  return (
    <header className="h-14 bg-gray-900/80 backdrop-blur border-b border-white/5 flex items-center justify-between px-5 shrink-0">
      <button onClick={onMenuClick} className="lg:hidden text-gray-400 hover:text-white">
        <Menu size={20} />
      </button>
      <div className="hidden lg:block text-gray-600 text-sm">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
      </div>
      <div className="flex items-center gap-3 ml-auto">
        <button className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
          <Bell size={15} />
        </button>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
            <User size={13} className="text-white" />
          </div>
          <span className="text-gray-300 hidden sm:block">{user?.name}</span>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-1.5 text-gray-500 hover:text-red-400 transition-colors text-sm">
          <LogOut size={15} />
        </button>
      </div>
    </header>
  );
}
