import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { MENU_ITEMS, menuSettingKey } from '../../utils/menuConfig';
import { useSiteSettings } from '../../context/SiteSettingsContext';

const SETTING_GROUPS = [
  {
    title: 'Company Information',
    keys: [
      { key: 'company_name', label: 'Company Name', group: 'general' },
      { key: 'company_tagline', label: 'Tagline', group: 'general' },
      { key: 'company_description', label: 'Description', group: 'general', type: 'textarea' },
    ],
  },
  {
    title: 'Hero Section',
    keys: [
      { key: 'hero_title', label: 'Hero Title', group: 'hero' },
      { key: 'hero_subtitle', label: 'Hero Subtitle', group: 'hero' },
      { key: 'hero_description', label: 'Hero Description', group: 'hero', type: 'textarea' },
    ],
  },
  {
    title: 'Contact Information',
    keys: [
      { key: 'company_email', label: 'Email', group: 'contact' },
      { key: 'company_phone', label: 'Phone', group: 'contact' },
      { key: 'company_address', label: 'Address', group: 'contact' },
      { key: 'whatsapp_number', label: 'WhatsApp Number (digits only)', group: 'contact' },
    ],
  },
  {
    title: 'Social Media',
    keys: [
      { key: 'social_linkedin', label: 'LinkedIn URL', group: 'social' },
      { key: 'social_twitter', label: 'Twitter URL', group: 'social' },
      { key: 'social_instagram', label: 'Instagram URL', group: 'social' },
    ],
  },
  {
    title: 'SEO Settings',
    keys: [
      { key: 'seo_title', label: 'Meta Title', group: 'seo' },
      { key: 'seo_description', label: 'Meta Description', group: 'seo', type: 'textarea' },
      { key: 'seo_keywords', label: 'Keywords (comma-separated)', group: 'seo' },
    ],
  },
];

function Toggle({ checked, onChange, disabled }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200 disabled:opacity-50 ${
        checked ? 'bg-gradient-to-r from-blue-600 to-cyan-500' : 'bg-gray-700'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5 ${
          checked ? 'translate-x-5' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

export default function AdminSettings() {
  const { refreshSettings } = useSiteSettings();
  const [values, setValues] = useState({});
  const [menuToggles, setMenuToggles] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [togglingKey, setTogglingKey] = useState(null);

  useEffect(() => {
    api.get('/settings').then(r => {
      const flat = {};
      const menus = {};
      Object.entries(r.data.data || {}).forEach(([k, v]) => {
        flat[k] = v.value;
        if (k.startsWith('menu_show_')) {
          const id = k.replace('menu_show_', '');
          menus[id] = v.value === true || v.value === 'true';
        }
      });
      MENU_ITEMS.forEach(item => {
        if (menus[item.id] === undefined) menus[item.id] = item.defaultVisible;
      });
      setValues(flat);
      setMenuToggles(menus);
    }).catch(() => toast.error('Failed to load settings')).finally(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    try {
      const payload = {};
      SETTING_GROUPS.forEach(g => g.keys.forEach(({ key, group, label }) => {
        payload[key] = { value: values[key] || '', group, label };
      }));
      await api.post('/settings', payload);
      toast.success('Settings saved successfully!');
      refreshSettings();
    } catch { toast.error('Failed to save settings'); }
    finally { setSaving(false); }
  };

  const toggleMenu = async (id, visible) => {
    const key = menuSettingKey(id);
    const item = MENU_ITEMS.find(m => m.id === id);
    setTogglingKey(key);
    setMenuToggles(prev => ({ ...prev, [id]: visible }));
    try {
      await api.post('/settings', {
        [key]: { value: visible, group: 'menu', label: `Show ${item?.label || id}` },
      });
      toast.success(`${item?.label || id} ${visible ? 'shown' : 'hidden'} on site`);
      refreshSettings();
    } catch {
      setMenuToggles(prev => ({ ...prev, [id]: !visible }));
      toast.error('Failed to update menu visibility');
    } finally {
      setTogglingKey(null);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 rounded-full border-2 border-t-blue-500 animate-spin" /></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold font-display text-white">Settings</h1>
          <p className="text-gray-500 text-sm">Manage your website content and configuration</p>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary text-sm py-2 px-5">
          {saving ? <><Loader2 size={15} className="animate-spin" /> Saving...</> : <><Save size={15} /> Save Changes</>}
        </button>
      </div>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-glass p-6 rounded-2xl">
          <h2 className="text-white font-semibold mb-2">Menu Visibility</h2>
          <p className="text-gray-500 text-sm mb-5 pb-3 border-b border-white/5">
            Control which menu items and homepage sections appear on the public website. Changes apply instantly.
          </p>
          <div className="space-y-3">
            {MENU_ITEMS.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 p-4 rounded-xl bg-gray-900/40 border border-white/5"
              >
                <div>
                  <div className="text-white text-sm font-medium">{item.label}</div>
                  <div className="text-gray-600 text-xs mt-0.5">
                    {item.href} {item.sectionId ? `· section #${item.sectionId}` : ''}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-medium ${menuToggles[item.id] ? 'text-green-400' : 'text-gray-500'}`}>
                    {menuToggles[item.id] ? 'Visible' : 'Hidden'}
                  </span>
                  <Toggle
                    checked={!!menuToggles[item.id]}
                    disabled={togglingKey === menuSettingKey(item.id)}
                    onChange={v => toggleMenu(item.id, v)}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {SETTING_GROUPS.map((group, gi) => (
          <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: (gi + 1) * 0.08 }} className="card-glass p-6 rounded-2xl">
            <h2 className="text-white font-semibold mb-5 pb-3 border-b border-white/5">{group.title}</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {group.keys.map(({ key, label, type }) => (
                <div key={key} className={type === 'textarea' ? 'sm:col-span-2' : ''}>
                  <label className="block text-xs text-gray-500 mb-1.5">{label}</label>
                  {type === 'textarea' ? (
                    <textarea
                      rows={3}
                      value={values[key] || ''}
                      onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                      className="input-field resize-none"
                    />
                  ) : (
                    <input
                      value={values[key] || ''}
                      onChange={e => setValues(v => ({ ...v, [key]: e.target.value }))}
                      className="input-field"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
