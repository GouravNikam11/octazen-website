import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import api from '../../services/api';
import toast from 'react-hot-toast';

const SERVICES = ['Mobile App Development', 'Web Development', 'API Integration', 'UI/UX Design', 'Cloud & DevOps', 'AI Integration', 'Other'];

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', subject: '', service: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error('Please fill required fields');
    setLoading(true);
    try {
      await api.post('/contact', form);
      setSent(true);
      toast.success('Message sent! We\'ll be in touch shortly.');
    } catch {
      toast.error('Failed to send. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-gray-900/20">
      <div ref={ref} className="container-max">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="section-tag mb-4 inline-flex">Get In Touch</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="section-title mb-4">
            Let's Build <span className="gradient-text">Something Together</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="section-subtitle">
            Have a project in mind? We'd love to hear about it. Send us a message and we'll get back to you within 24 hours.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-6">
            {[
              { icon: Mail, label: 'Email Us', value: 'contact@octazentechnologies.com', href: 'mailto:contact@octazentechnologies.com' },
              { icon: Phone, label: 'Call Us', value: '+91 989 098 3532', href: 'tel:+919890983532' },
              { icon: MapPin, label: 'Location', value: 'Kolhapur, Maharashtra, India', href: null },
            ].map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="card-glass p-5 rounded-2xl flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Icon size={18} className="text-blue-400" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs mb-0.5">{label}</div>
                  {href ? (
                    <a href={href} className="text-white text-sm font-medium hover:text-blue-400 transition-colors">{value}</a>
                  ) : (
                    <span className="text-white text-sm font-medium">{value}</span>
                  )}
                </div>
              </div>
            ))}

            <div className="card-glass p-5 rounded-2xl">
              <div className="text-gray-500 text-xs mb-3">Response Time</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-white text-sm">Usually within 24 hours</span>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.3 }} className="lg:col-span-3">
            {sent ? (
              <div className="card-glass p-12 rounded-2xl text-center">
                <CheckCircle2 size={48} className="text-cyan-400 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold font-display mb-2">Message Received!</h3>
                <p className="text-gray-400 mb-6">Thanks for reaching out. Our team will get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)} className="btn-secondary">Send Another</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="card-glass p-8 rounded-2xl space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Full Name *</label>
                    <input name="name" value={form.name} onChange={onChange} placeholder="John Doe" className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Email Address *</label>
                    <input name="email" type="email" value={form.email} onChange={onChange} placeholder="you@company.com" className="input-field" required />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Phone</label>
                    <input name="phone" value={form.phone} onChange={onChange} placeholder="+91 ..." className="input-field" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Company</label>
                    <input name="company" value={form.company} onChange={onChange} placeholder="Your Company" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Service Interested In</label>
                  <div className="select-wrap">
                    <select name="service" value={form.service} onChange={onChange} className="select-field">
                      <option value="">Select a service...</option>
                      {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <ChevronDown size={16} strokeWidth={2.25} className="select-wrap-icon" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Subject *</label>
                  <input name="subject" value={form.subject} onChange={onChange} placeholder="Project Discussion" className="input-field" required />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Message *</label>
                  <textarea name="message" value={form.message} onChange={onChange} rows={4} placeholder="Tell us about your project..." className="input-field resize-none" required />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center text-base py-3.5">
                  {loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Message</>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
