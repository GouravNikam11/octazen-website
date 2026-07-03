import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import api from '../../services/api';

const DEFAULT_TESTIMONIALS = [
  { _id: '1', name: 'Rajesh Mehta', designation: 'CEO', company: 'TechStart Ventures', content: "Octazen Technologies delivered our mobile app on time and beyond our expectations. Their team's technical expertise and dedication to quality is truly impressive. The app has transformed how we serve our customers.", rating: 5 },
  { _id: '2', name: 'Priya Sharma', designation: 'Product Manager', company: 'HealthBridge Solutions', content: "Working with Octazen was a game-changer for us. They understood our complex healthcare requirements and built a robust solution that our users love. Professional, responsive, and highly skilled.", rating: 5 },
  { _id: '3', name: 'Amit Patel', designation: 'Founder', company: 'FinFlow Technologies', content: "The team at Octazen demonstrated exceptional problem-solving skills when handling our fintech project. Their expertise in security and scalable architecture gave us full confidence in the product they delivered.", rating: 5 },
  { _id: '4', name: 'Sarah Johnson', designation: 'CTO', company: 'BuildSmart Inc.', content: "Octazen's construction management system has completely digitized our operations. From project tracking to compliance management, everything works seamlessly. Their agile approach kept us informed at every step.", rating: 5 },
];

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
      ))}
    </div>
  );
}

function Avatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['from-blue-600 to-cyan-500', 'from-indigo-600 to-blue-400', 'from-cyan-600 to-teal-400', 'from-purple-600 to-blue-400'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  return (
    <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    api.get('/testimonials').then(r => { if (r.data.data?.length) setTestimonials(r.data.data); }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, [testimonials.length, isVisible]);

  const prev = () => setCurrent(c => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(c => (c + 1) % testimonials.length);

  return (
    <section className="section-padding bg-gray-900/30">
      <div ref={ref} className="container-max">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} className="section-tag mb-4 inline-flex">Client Voices</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={isVisible ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }} className="section-title mb-4">
            What Our <span className="gradient-text">Clients Say</span>
          </motion.h2>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="card-glass p-8 lg:p-12 rounded-3xl relative"
            >
              <Quote size={40} className="absolute top-6 right-8 text-blue-500/10" />
              <Stars count={testimonials[current].rating} />
              <p className="text-gray-300 text-lg leading-relaxed mt-6 mb-8 italic">
                "{testimonials[current].content}"
              </p>
              <div className="flex items-center gap-4">
                <Avatar name={testimonials[current].name} />
                <div>
                  <div className="text-white font-semibold">{testimonials[current].name}</div>
                  <div className="text-gray-500 text-sm">{testimonials[current].designation}{testimonials[current].company && `, ${testimonials[current].company}`}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${i === current ? 'w-8 h-2 bg-blue-500' : 'w-2 h-2 bg-gray-700 hover:bg-gray-600'}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prev} className="w-10 h-10 rounded-full card-glass flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/40 transition-all duration-200">
                <ChevronLeft size={18} />
              </button>
              <button onClick={next} className="w-10 h-10 rounded-full card-glass flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/40 transition-all duration-200">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
