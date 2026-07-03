import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { TECH_CATEGORIES, TECH_ICONS } from '../../utils/constants';
import api from '../../services/api';

const DEFAULT_TECHS = [
  { _id: '1', name: 'React.js', category: 'frontend', icon: 'react', proficiency: 95 },
  { _id: '2', name: 'React Native', category: 'mobile', icon: 'react', proficiency: 90 },
  { _id: '3', name: 'Flutter', category: 'mobile', icon: 'flutter', proficiency: 85 },
  { _id: '4', name: 'Angular', category: 'frontend', icon: 'angular', proficiency: 85 },
  { _id: '5', name: 'TypeScript', category: 'frontend', icon: 'typescript', proficiency: 90 },
  { _id: '6', name: 'Node.js', category: 'backend', icon: 'nodejs', proficiency: 92 },
  { _id: '7', name: 'ASP.NET Core', category: 'backend', icon: 'dotnet', proficiency: 85 },
  { _id: '8', name: 'Python', category: 'backend', icon: 'python', proficiency: 80 },
  { _id: '9', name: 'C#', category: 'backend', icon: 'csharp', proficiency: 82 },
  { _id: '10', name: 'MongoDB', category: 'database', icon: 'mongodb', proficiency: 88 },
  { _id: '11', name: 'PostgreSQL', category: 'database', icon: 'postgresql', proficiency: 85 },
  { _id: '12', name: 'SQL Server', category: 'database', icon: 'sqlserver', proficiency: 85 },
  { _id: '13', name: 'Firebase', category: 'database', icon: 'firebase', proficiency: 88 },
  { _id: '14', name: 'Azure', category: 'cloud', icon: 'azure', proficiency: 85 },
  { _id: '15', name: 'AWS', category: 'cloud', icon: 'aws', proficiency: 80 },
  { _id: '16', name: 'Docker', category: 'devops', icon: 'docker', proficiency: 82 },
  { _id: '17', name: 'Figma', category: 'tools', icon: 'figma', proficiency: 88 },
  { _id: '18', name: 'OpenAI / Copilot', category: 'ai', icon: 'openai', proficiency: 82 },
];

function TechCard({ tech, index, isVisible }) {
  const imgSrc = TECH_ICONS[tech.icon];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="card-glass p-4 rounded-xl hover:border-blue-500/30 transition-all duration-300 group flex items-center gap-3"
    >
      <div className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center shrink-0 overflow-hidden">
        {imgSrc ? (
          <img src={imgSrc} alt={tech.name} className="w-6 h-6 object-contain" onError={e => e.target.style.display='none'} />
        ) : (
          <span className="text-xs font-bold text-blue-400">{tech.name.slice(0, 2)}</span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white text-xs font-medium truncate">{tech.name}</div>
        <div className="mt-1.5 h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={isVisible ? { width: `${tech.proficiency}%` } : {}}
            transition={{ duration: 1, delay: index * 0.04 + 0.3 }}
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
          />
        </div>
      </div>
      <span className="text-xs text-gray-600 shrink-0">{tech.proficiency}%</span>
    </motion.div>
  );
}

export default function Technologies() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const [techs, setTechs] = useState(DEFAULT_TECHS);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    api.get('/technologies').then(r => { if (r.data.data?.length) setTechs(r.data.data); }).catch(() => {});
  }, []);

  const displayed = activeTab === 'all' ? techs : techs.filter(t => t.category === activeTab);
  const allCategories = [{ value: 'all', label: 'All' }, ...TECH_CATEGORIES];

  return (
    <section id="technologies" className="section-padding bg-gray-950">
      <div ref={ref} className="container-max">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="section-tag mb-4 inline-flex">Tech Stack</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="section-title mb-4">
            Our <span className="gradient-text">Technical Expertise</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }} className="section-subtitle">
            25+ technologies across frontend, backend, mobile, cloud, and AI — we choose the right tool for every challenge.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {allCategories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveTab(cat.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                ${activeTab === cat.value
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-glow-cyan'
                  : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {displayed.map((tech, i) => (
            <TechCard key={tech._id} tech={tech} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
