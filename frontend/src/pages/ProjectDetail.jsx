import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, CheckCircle2, Layers, Calendar } from 'lucide-react';
import api from '../services/api';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/projects/${slug}`).then(r => setProject(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-t-blue-500 animate-spin" /></div>;
  if (!project) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h2 className="text-white text-xl mb-4">Project not found</h2><Link to="/#portfolio" className="btn-primary">Back to Portfolio</Link></div></div>;

  return (
    <>
      <Helmet><title>{project.title} — Octazen Technologies LLP</title></Helmet>
      <div className="min-h-screen pt-24 pb-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <Link to="/#portfolio" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Header */}
            <div className="mb-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="section-tag capitalize">{project.category}</span>
                {project.client && <span className="text-gray-500 text-sm">Client: {project.client}</span>}
              </div>
              <h1 className="text-4xl font-bold font-display text-white mb-4">{project.title}</h1>
              <p className="text-gray-400 text-lg max-w-3xl">{project.shortDescription}</p>
            </div>

            {/* Thumbnail */}
            {project.thumbnail && (
              <img src={project.thumbnail} alt={project.title} className="w-full h-80 object-cover rounded-2xl mb-10 border border-white/5" />
            )}

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="card-glass p-8 rounded-2xl">
                  <h2 className="text-white font-bold text-xl mb-4">Project Overview</h2>
                  <p className="text-gray-400 leading-relaxed">{project.description}</p>
                </div>

                {project.features?.length > 0 && (
                  <div className="card-glass p-8 rounded-2xl">
                    <h2 className="text-white font-bold text-xl mb-5">Key Features</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {project.features.map(f => (
                        <div key={f} className="flex items-center gap-3 text-gray-400 text-sm">
                          <CheckCircle2 size={16} className="text-cyan-400 shrink-0" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-5">
                <div className="card-glass p-6 rounded-2xl">
                  <h3 className="text-white font-semibold mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies?.map(t => (
                      <span key={t} className="text-xs px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full">{t}</span>
                    ))}
                  </div>
                </div>

                {project.platform?.length > 0 && (
                  <div className="card-glass p-6 rounded-2xl">
                    <h3 className="text-white font-semibold mb-4">Platform</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.platform.map(p => (
                        <span key={p} className="text-xs px-3 py-1 bg-gray-800 text-gray-400 rounded-full">{p}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="card-glass p-6 rounded-2xl">
                  <h3 className="text-white font-semibold mb-4">Start a Similar Project</h3>
                  <p className="text-gray-500 text-sm mb-4">Interested in building something like this? Let's talk.</p>
                  <Link to="/contact" className="btn-primary w-full justify-center text-sm">Get In Touch</Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
