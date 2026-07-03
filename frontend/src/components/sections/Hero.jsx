import { motion } from 'framer-motion';
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { navigateToSection } from '../../utils/navigateToSection';

const floatVariants = {
  initial: { y: 0 },
  animate: { y: [-10, 10, -10], transition: { repeat: Infinity, duration: 6, ease: 'easeInOut' } },
};

export default function Hero() {
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToContact = e => navigateToSection(e, navigate, location.pathname, '/#contact');

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-950">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
          className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[100px]"
        />
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(26,79,160,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(26,79,160,0.05) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="container-max section-padding relative z-10 pt-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 section-tag mb-6"
            >
              <Sparkles size={14} />
              <span>Innovate. Elevate. Succeed.</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display leading-[1.1] text-white mb-4"
            >
              We Build Digital
              <br />
              <span className="gradient-text text-shadow-glow">Products That</span>
              <br />
              Drive Real Results
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Octazen Technologies LLP crafts scalable mobile &amp; web applications,
              AI-powered solutions, and enterprise software that empowers businesses
              to thrive in the digital age.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="/#contact" onClick={scrollToContact} className="btn-primary text-base px-7 py-3.5">
                Start Your Project <ArrowRight size={18} />
              </a>
              <a href="#portfolio" onClick={e => { e.preventDefault(); document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="btn-secondary text-base px-7 py-3.5">
                <Play size={16} className="fill-current" /> View Our Work
              </a>
            </motion.div>

            {/* Stats Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-12 flex items-center gap-8"
            >
              {[
                { value: '2+', label: 'Years Experience' },
                { value: '10+', label: 'Projects Delivered' },
                { value: '7+', label: 'Happy Clients' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold font-display gradient-text">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            <motion.div
              variants={floatVariants}
              initial="initial"
              animate="animate"
              className="relative z-10"
            >
              <motion.div
                animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.95, 1.08, 0.95] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute inset-0 -m-8 rounded-full bg-cyan-400/15 blur-3xl pointer-events-none"
              />
              <motion.img
                src="/octazen-hero-logo.png"
                alt="Octazen Technologies"
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="relative w-72 h-72 sm:w-80 sm:h-80 object-contain hero-logo-glow mix-blend-screen select-none"
                draggable={false}
              />
            </motion.div>

            {/* Orbit rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
              className="absolute w-96 h-96 rounded-full border border-blue-500/10 pointer-events-none"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
              className="absolute w-[480px] h-[480px] rounded-full border border-cyan-500/5 pointer-events-none"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="text-xs text-gray-600">Scroll to explore</div>
        <div className="w-5 h-8 rounded-full border border-gray-700 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1 h-2 rounded-full bg-blue-400"
          />
        </div>
      </motion.div>
    </section>
  );
}
