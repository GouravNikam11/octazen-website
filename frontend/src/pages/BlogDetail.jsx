import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Eye, Tag } from 'lucide-react';
import api from '../services/api';

export default function BlogDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/blog/${slug}`).then(r => setPost(r.data.data)).catch(() => {}).finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 rounded-full border-2 border-t-blue-500 animate-spin" /></div>;
  if (!post) return <div className="min-h-screen flex items-center justify-center"><div className="text-center"><h2 className="text-white text-xl mb-4">Post not found</h2><Link to="/blog" className="btn-primary">Back to Blog</Link></div></div>;

  return (
    <>
      <Helmet>
        <title>{post.seo?.metaTitle || post.title} — Octazen Blog</title>
        <meta name="description" content={post.seo?.metaDescription || post.excerpt} />
      </Helmet>
      <div className="min-h-screen pt-24 pb-20">
        <div className="container-max px-4 sm:px-6 lg:px-8 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm"><ArrowLeft size={16} /> Back to Blog</Link>
          <motion.article initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="section-tag mb-4 inline-flex">{post.category}</span>
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-white mb-4 leading-tight">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-5 text-gray-500 text-sm mb-8">
              <span className="flex items-center gap-1.5"><Clock size={14} /> {post.readTime} min read</span>
              {post.publishedAt && <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>}
              <span className="flex items-center gap-1.5"><Eye size={14} /> {post.views} views</span>
              {post.author && <span>By {post.author.name}</span>}
            </div>
            {post.thumbnail && <img src={post.thumbnail} alt={post.title} className="w-full h-64 object-cover rounded-2xl mb-8 border border-white/5" />}
            <p className="text-gray-400 text-lg leading-relaxed mb-8 border-l-2 border-blue-500 pl-4">{post.excerpt}</p>
            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: post.content || '<p>Full article content coming soon.</p>' }} />
            {post.tags?.length > 0 && (
              <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                <Tag size={14} className="text-gray-500 mt-0.5" />
                {post.tags.map(tag => <span key={tag} className="text-xs px-3 py-1 bg-gray-800 text-gray-400 rounded-full">{tag}</span>)}
              </div>
            )}
          </motion.article>
        </div>
      </div>
    </>
  );
}
