import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HeartPulse, Banknote, Building2, ShoppingCart, GraduationCap, Truck, Factory, Store } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import api from '../../services/api';

const ICON_MAP = {
  'heart-pulse': HeartPulse, banknote: Banknote, building: Building2,
  'shopping-cart': ShoppingCart, 'graduation-cap': GraduationCap,
  truck: Truck, factory: Factory, store: Store,
};
const DEFAULT_INDUSTRIES = [
  { _id: '1', name: 'Healthcare', icon: 'heart-pulse', description: 'HIPAA-compliant apps for clinics and providers.' },
  { _id: '2', name: 'Finance & Fintech', icon: 'banknote', description: 'Secure fintech and banking solutions.' },
  { _id: '3', name: 'Real Estate', icon: 'building', description: 'Property platforms and construction tools.' },
  { _id: '4', name: 'E-Commerce', icon: 'shopping-cart', description: 'End-to-end e-commerce and retail systems.' },
  { _id: '5', name: 'Education', icon: 'graduation-cap', description: 'EdTech and LMS platforms.' },
  { _id: '6', name: 'Logistics', icon: 'truck', description: 'Fleet management and tracking systems.' },
  { _id: '7', name: 'Manufacturing', icon: 'factory', description: 'ERP and production monitoring tools.' },
  { _id: '8', name: 'Retail', icon: 'store', description: 'POS and omnichannel retail solutions.' },
];

export default function Industries() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [industries, setIndustries] = useState(DEFAULT_INDUSTRIES);

  useEffect(() => {
    api.get('/industries').then(r => { if (r.data.data?.length) setIndustries(r.data.data); }).catch(() => {});
  }, []);

  return (
    <section className="section-padding bg-gray-950">
      <div ref={ref} className="container-max">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="section-tag mb-4 inline-flex">Industries</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="section-title mb-4">
            Industries We <span className="gradient-text">Serve</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="section-subtitle">
            Deep domain expertise across diverse verticals means we understand your business context, not just the technology.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {industries.map((ind, i) => {
            const Icon = ICON_MAP[ind.icon] || Building2;
            return (
              <motion.div
                key={ind._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="card-glass p-6 rounded-2xl text-center hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 group cursor-default"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/10 flex items-center justify-center group-hover:from-blue-500/30 transition-all duration-300">
                  <Icon size={22} className="text-blue-400" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{ind.name}</h3>
                <p className="text-gray-600 text-xs leading-relaxed">{ind.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
