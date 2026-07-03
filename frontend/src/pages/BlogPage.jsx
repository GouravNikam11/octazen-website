import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Clock, Calendar, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const DEFAULT_POSTS = [
  { _id: '1', title: 'Building Scalable React Native Apps in 2024', excerpt: 'Explore best practices for architecting mobile applications that can handle growth.', category: 'Mobile Development', readTime: 6, publishedAt: '2024-01-15', slug: 'scalable-react-native-apps' },
  { _id: '2', title: 'Why ASP.NET Core is Perfect for Enterprise APIs', excerpt: 'A deep dive into building high-performance, secure REST APIs with ASP.NET Core.', category: 'Backend', readTime: 8, publishedAt: '2024-01-08', slug: 'aspnet-core-enterprise-apis' },
  { _id: '3', title: 'Integrating AI into Your Mobile App: A Practical Guide', excerpt: 'Learn how to strategically add AI-powered features that enhance your users\' experience.', category: 'AI & Innovation', readTime: 7, publishedAt: '2024-01-01', slug: 'ai-integration-mobile-apps' },
];

export default function BlogPage() {
  const [posts, setPosts] = useState(DEFAULT_POSTS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const q = category ? `/blog?category=${category}` : '/blog?limit=20';
    api.get(q).then(r => { if (r.data.data?.length) setPosts(r.data.data); }).catch(() => {});
  }, [category]);

  const displayed = search ? posts.filter(p => p.title.toLowerCase().includes(search.toLowerCase())) : posts;
  const categories = [...new Set(posts.map(p => p.category))];

  return (
    <>
      <Helmet>
        <title>Blog & Insights — Octazen Technologies LLP</title>
        <meta name="description" content="Technical insights, tutorials, and industry perspectives from the Octazen team." />
      </Helmet>
      <div className="min-h-screen pt-28 pb-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="section-tag mb-4 inline-flex">Our Insights</div>
            <h1 className="section-title mb-4">Blog & <span className="gradient-text">Technical Articles</span></h1>
            <p className="section-subtitle">Perspectives, tutorials, and industry insights from our engineering team.</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..." className="input-field pl-9 w-full" />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setCategory('')} className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${!category ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>All</button>
              {categories.map(c => <button key={c} onClick={() => setCategory(c)} className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${category === c ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>{c}</button>)}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayed.map((post, i) => (
              <motion.article key={post._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="card-glass rounded-2xl overflow-hidden hover:border-blue-500/30 hover:-translate-y-1 transition-all duration-300 group">
                <div className="h-44 bg-gradient-to-br from-blue-900/30 to-cyan-900/20 flex items-center justify-center border-b border-white/5">
                  <span className="text-xs px-3 py-1.5 bg-white/10 rounded-full text-gray-300">{post.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-gray-600 text-xs">
                    <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} min</span>
                    <span className="flex items-center gap-1"><Calendar size={11} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <h2 className="text-white font-semibold font-display mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">{post.title}</h2>
                  <p className="text-gray-500 text-xs leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="flex items-center gap-1.5 text-sm text-blue-400 hover:text-cyan-400 transition-colors font-medium">Read More <ArrowRight size={13} /></Link>
                </div>
              </motion.article>
            ))}
          </div>
          {displayed.length === 0 && <div className="text-center py-16 text-gray-600">No articles found.</div>}
        </div>
      </div>
    </>
  );
}
