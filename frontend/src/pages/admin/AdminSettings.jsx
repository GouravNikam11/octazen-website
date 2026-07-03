import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Loader2 } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';

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

export default function AdminSettings() {
  const [values, setValues] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.get('/settings').then(r => {
      const flat = {};
      Object.entries(r.data.data || {}).forEach(([k, v]) => { flat[k] = v.value; });
      setValues(flat);
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
    } catch { toast.error('Failed to save settings'); }
    finally { setSaving(false); }
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
        {SETTING_GROUPS.map((group, gi) => (
          <motion.div key={group.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: gi * 0.08 }} className="card-glass p-6 rounded-2xl">
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
