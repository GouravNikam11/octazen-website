import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { ArrowRight, Smartphone, Globe, Layers, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { PROJECT_CATEGORIES } from '../../utils/constants';
import api from '../../services/api';

const CATEGORY_ICONS = { mobile: Smartphone, web: Globe, fullstack: Layers, api: Layers, enterprise: Layers, ai: Layers };
const CATEGORY_COLORS = {
  mobile: 'from-blue-600 to-blue-400',
  web: 'from-cyan-600 to-cyan-400',
  fullstack: 'from-indigo-600 to-blue-400',
  api: 'from-purple-600 to-blue-400',
  enterprise: 'from-slate-600 to-blue-400',
  ai: 'from-teal-600 to-cyan-400',
};

function ProjectCard({ project, isVisible }) {
  const Icon = CATEGORY_ICONS[project.category] || Layers;
  const gradient = CATEGORY_COLORS[project.category] || 'from-blue-600 to-cyan-400';
  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 24 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        layout: { type: 'spring', stiffness: 380, damping: 32, mass: 0.8 },
        opacity: { duration: 0.25 },
        y: { duration: 0.35 },
        scale: { duration: 0.2 },
      }}
      className="card-glass rounded-2xl overflow-hidden hover:border-blue-500/30 transition-colors duration-300 group"
    >
      {/* Thumbnail */}
      <div className={`h-48 bg-gradient-to-br ${gradient} relative overflow-hidden flex items-center justify-center`}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center">
              <Icon size={28} className="text-white" />
            </div>
            <div className="flex gap-1">
              {project.platform?.map(p => (
                <span key={p} className="text-xs px-2 py-0.5 bg-white/10 rounded-full text-white/80">{p}</span>
              ))}
            </div>
          </div>
        )}
        {project.isFeatured && (
          <div className="absolute top-3 right-3 text-xs px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 rounded-full">Featured</div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-full capitalize">{project.category}</span>
          {project.client && <span className="text-xs text-gray-600">{project.client}</span>}
        </div>
        <h3 className="text-white font-semibold font-display mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{project.shortDescription}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies?.slice(0, 4).map(t => (
            <span key={t} className="text-xs px-2 py-0.5 bg-gray-800 text-gray-400 rounded-md">{t}</span>
          ))}
          {project.technologies?.length > 4 && <span className="text-xs text-gray-600">+{project.technologies.length - 4}</span>}
        </div>
        <Link to={`/projects/${project.slug}`} className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-cyan-400 transition-colors font-medium">
          View Case Study <ArrowRight size={14} />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/projects?limit=100')
      .then(r => setProjects(r.data?.data || []))
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="section-padding bg-gray-900/20">
      <div ref={ref} className="container-max">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="section-tag mb-4 inline-flex">Our Work</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="section-title mb-4">
            Projects That <span className="gradient-text">Make an Impact</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={isVisible ? { opacity: 1 } : {}} transition={{ delay: 0.2 }} className="section-subtitle">
            From healthcare to fintech, we've delivered transformative digital solutions across industries.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-2 mb-10">
          {PROJECT_CATEGORIES.map(cat => (
            <button key={cat.value} onClick={() => setFilter(cat.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                ${filter === cat.value ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-glow-cyan' : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'}`}>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={28} className="animate-spin text-blue-400" />
          </div>
        ) : (
        <LayoutGroup>
          <motion.div
            layout
            transition={{ layout: { type: 'spring', stiffness: 380, damping: 32, mass: 0.8 } }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map(project => (
                <ProjectCard key={project._id} project={project} isVisible={isVisible} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20 text-gray-600">No projects in this category yet.</div>
        )}
      </div>
    </section>
  );
}
