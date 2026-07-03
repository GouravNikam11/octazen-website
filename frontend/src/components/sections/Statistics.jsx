import { Calendar, CheckCircle2, Users, Code2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { useCounter } from '../../hooks/useCounter';
import api from '../../services/api';

const TECHNOLOGIES_STAT = {
  _id: 'technologies-mastered',
  label: 'Technologies Mastered',
  value: 25,
  suffix: '+',
  icon: 'code',
};

const DEFAULT_DB_STATS = [
  { _id: '1', label: 'Years of Experience', value: 2, suffix: '+', icon: 'calendar' },
  { _id: '2', label: 'Projects Delivered', value: 10, suffix: '+', icon: 'check-circle' },
  { _id: '3', label: 'Happy Clients', value: 7, suffix: '+', icon: 'users' },
];

const ICON_MAP = { calendar: Calendar, 'check-circle': CheckCircle2, users: Users, code: Code2 };

const mergeStats = dbStats => {
  const fromDb = (dbStats || [])
    .filter(s => s.label !== TECHNOLOGIES_STAT.label)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  return [...(fromDb.length ? fromDb : DEFAULT_DB_STATS), TECHNOLOGIES_STAT];
};

function CounterItem({ stat, isVisible }) {
  const count = useCounter(stat.value, 2500, isVisible);
  const Icon = ICON_MAP[stat.icon] || CheckCircle2;
  return (
    <div className="text-center">
      <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-500/10 flex items-center justify-center">
        <Icon size={24} className="text-blue-400" />
      </div>
      <div className="text-4xl lg:text-5xl font-bold font-display gradient-text">
        {count}{stat.suffix}
      </div>
      <div className="text-gray-500 text-sm mt-2">{stat.label}</div>
    </div>
  );
}

export default function Statistics() {
  const { ref, isVisible } = useScrollAnimation(0.3);
  const [stats, setStats] = useState(() => mergeStats());

  useEffect(() => {
    api.get('/stats').then(r => setStats(mergeStats(r.data.data))).catch(() => {});
  }, []);

  return (
    <section className="section-padding bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-cyan-900/10" />
      </div>
      <div ref={ref} className="container-max relative z-10">
        <div className="text-center mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="section-tag mb-4 inline-flex">By the Numbers</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="section-title">
            Why Businesses <span className="gradient-text">Choose Octazen</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <motion.div key={stat._id} initial={{ opacity: 0, y: 30 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}>
              <CounterItem stat={stat} isVisible={isVisible} />
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us bullets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {[
            '2+ years of delivery and project leadership experience',
            'Agile methodology with client-first approach',
            'Transparent communication with milestone-based reporting',
            'Timely MVP delivery with scope for scalable expansion',
            'Dedicated and passionate technical team',
            'End-to-end development from design to deployment',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 card-glass px-5 py-4 rounded-xl">
              <CheckCircle2 size={16} className="text-cyan-400 shrink-0" />
              <span className="text-gray-400 text-sm">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
