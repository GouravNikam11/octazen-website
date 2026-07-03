import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import api from '../../services/api';

const DEFAULT_POSTS = [
  { _id: '1', title: 'Building Scalable React Native Apps in 2024', excerpt: 'Explore best practices for architecting mobile applications that can handle growth while maintaining performance and developer experience.', category: 'Mobile Development', readTime: 6, publishedAt: '2024-01-15', tags: ['React Native', 'Mobile', 'Architecture'], slug: 'scalable-react-native-apps' },
  { _id: '2', title: 'Why ASP.NET Core is Perfect for Enterprise APIs', excerpt: 'A deep dive into building high-performance, secure REST APIs with ASP.NET Core — and why enterprises are choosing it over alternatives.', category: 'Backend', readTime: 8, publishedAt: '2024-01-08', tags: ['ASP.NET', 'API', 'Backend'], slug: 'aspnet-core-enterprise-apis' },
  { _id: '3', title: 'Integrating AI into Your Mobile App: A Practical Guide', excerpt: 'From OpenAI to on-device models, learn how to strategically add AI-powered features that genuinely enhance your users\' experience.', category: 'AI & Innovation', readTime: 7, publishedAt: '2024-01-01', tags: ['AI', 'OpenAI', 'Mobile'], slug: 'ai-integration-mobile-apps' },
];

const COLORS = ['from-blue-600/20 to-cyan-600/10', 'from-indigo-600/20 to-blue-600/10', 'from-cyan-600/20 to-teal-600/10'];

export default function Blog() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [posts, setPosts] = useState(DEFAULT_POSTS);

  useEffect(() => {
    api.get('/blog?limit=3').then(r => { if (r.data.data?.length) setPosts(r.data.data.slice(0, 3)); }).catch(() => {});
  }, []);

  return (
    <section className="section-padding bg-gray-950">
      <div ref={ref} className="container-max">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="section-tag mb-3 inline-flex">Insights</motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="section-title">
              From Our <span className="gradient-text">Blog</span>
            </motion.h2>
          </div>
          <Link to="/blog" className="btn-outline text-sm">All Articles <ArrowRight size={14} /></Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-glass rounded-2xl overflow-hidden hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className={`h-40 bg-gradient-to-br ${COLORS[i % COLORS.length]} flex items-center justify-center p-6 border-b border-white/5`}>
                {post.thumbnail ? (
                  <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs px-3 py-1.5 bg-white/10 rounded-full text-gray-300">{post.category}</span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1 text-gray-600 text-xs">
                    <Clock size={11} /> {post.readTime} min read
                  </div>
                  <div className="flex items-center gap-1 text-gray-600 text-xs">
                    <Calendar size={11} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
                <h3 className="text-white font-semibold font-display mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">{post.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-cyan-400 transition-colors font-medium">
                  Read More <ArrowRight size={13} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
