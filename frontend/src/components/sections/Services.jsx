import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Globe, Code2, Palette, Cloud, Cpu, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import api from '../../services/api';

const ICON_MAP = {
  smartphone: Smartphone, globe: Globe, code: Code2,
  palette: Palette, cloud: Cloud, cpu: Cpu,
};

const DEFAULT_SERVICES = [
  { _id: '1', title: 'Mobile App Development', shortDescription: 'Native & cross-platform mobile apps for iOS and Android that deliver exceptional user experiences.', icon: 'smartphone', features: ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin)', 'Push Notifications', 'Offline Support'] },
  { _id: '2', title: 'Web Application Development', shortDescription: 'Scalable, modern web applications built with cutting-edge frameworks and best practices.', icon: 'globe', features: ['React.js', 'Angular', 'Node.js', 'ASP.NET Core', 'Progressive Web Apps', 'SPA & SSR'] },
  { _id: '3', title: 'API Development & Integration', shortDescription: 'Robust RESTful APIs and seamless third-party integrations to power your digital ecosystem.', icon: 'code', features: ['RESTful APIs', 'GraphQL', 'JWT Auth', 'WebSocket', 'Third-party Integrations', 'API Documentation'] },
  { _id: '4', title: 'UI/UX Design', shortDescription: 'Beautiful, intuitive interfaces designed with user-centric principles and modern design systems.', icon: 'palette', features: ['Figma', 'Prototyping', 'Design Systems', 'User Research', 'Wireframing', 'Responsive Design'] },
  { _id: '5', title: 'Cloud & DevOps', shortDescription: 'Scalable cloud infrastructure and CI/CD pipelines for reliable, high-performance deployments.', icon: 'cloud', features: ['Azure', 'AWS', 'Docker', 'CI/CD', 'App Deployment', 'Monitoring'] },
  { _id: '6', title: 'AI Integration', shortDescription: 'Intelligent AI-powered features integrated into your applications to drive automation and insights.', icon: 'cpu', features: ['OpenAI', 'Copilot', 'AI Chatbots', 'Data Analysis', 'ML Models', 'Automation'] },
];

export default function Services() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [services, setServices] = useState(DEFAULT_SERVICES);
  const [active, setActive] = useState(null);

  useEffect(() => {
    api.get('/services').then(r => { if (r.data.data?.length) setServices(r.data.data); }).catch(() => {});
  }, []);

  return (
    <section id="services" className="section-padding bg-gray-900/30 relative">
      <div ref={ref} className="container-max">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="section-tag mb-4 inline-flex">What We Do</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="section-title mb-4">
            Our <span className="gradient-text">Software & Service</span> Offerings
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="section-subtitle">
            We provide access to cutting-edge platforms and professional services to drive sustainable digital growth for your business.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => {
            const Icon = ICON_MAP[svc.icon] || Code2;
            const isOpen = active === svc._id;
            return (
              <motion.div
                key={svc._id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                className={`card-glass p-6 rounded-2xl cursor-pointer transition-all duration-300 group
                  ${isOpen ? 'border-blue-500/40 shadow-glow-blue' : 'hover:border-blue-500/20'}`}
                onClick={() => setActive(isOpen ? null : svc._id)}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300
                  ${isOpen ? 'bg-gradient-to-br from-blue-600 to-cyan-500' : 'bg-blue-500/10 group-hover:bg-blue-500/20'}`}>
                  <Icon size={22} className={isOpen ? 'text-white' : 'text-blue-400'} />
                </div>

                <h3 className="text-white font-semibold font-display mb-2">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{svc.shortDescription}</p>

                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="border-t border-white/5 pt-4 space-y-1.5"
                  >
                    {svc.features?.map(f => (
                      <div key={f} className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle2 size={13} className="text-cyan-400 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </motion.div>
                )}

                <div className={`flex items-center gap-1 text-xs font-medium mt-3 transition-colors ${isOpen ? 'text-cyan-400' : 'text-gray-600 group-hover:text-blue-400'}`}>
                  {isOpen ? 'Show less' : 'Learn more'} <ArrowRight size={12} className={`transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
