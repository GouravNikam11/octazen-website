import { motion } from 'framer-motion';
import { CheckCircle2, Target, Users, Zap, Shield, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const values = [
  { icon: Target, title: 'Client-Centric Design', desc: 'Every solution is crafted around your business goals and your users\' needs.' },
  { icon: Zap, title: 'Agile & Adaptive Delivery', desc: 'Iterative development with continuous feedback ensures on-time, on-budget delivery.' },
  { icon: Shield, title: 'Scalable Architecture', desc: 'Built to grow with your business — from MVP to enterprise scale.' },
  { icon: TrendingUp, title: 'Quality-First Approach', desc: 'Rigorous testing and code review standards ensure reliable, production-grade software.' },
];

const objectives = [
  'Communicate effectively with clients at every stage',
  'Demonstrate empathy and patience throughout the process',
  'Resolve challenges proactively before they become blockers',
  'Apply the latest technical knowledge efficiently',
  'Commit to continuous improvement in every delivery',
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section id="about" className="section-padding bg-gray-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent to-blue-500/30" />
      </div>

      <div ref={ref} className="container-max">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-tag mb-4 inline-flex"
          >
            About Octazen
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title mb-4"
          >
            Forward-Thinking <span className="gradient-text">IT Solutions</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="section-subtitle"
          >
            Octazen Technologies LLP is a forward-thinking IT company specializing in custom mobile
            and web application development. Founded by seasoned industry professionals, we deliver
            innovative, user-centered, and scalable digital products that empower businesses.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="card-glass p-8 rounded-2xl mb-6">
              <h3 className="text-xl font-bold font-display text-white mb-4">Our Story</h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Octazen Technologies is a leading company in software design and development, known
                for delivering innovative, user-focused, and scalable digital solutions. With a strong
                focus on creativity, precision, and performance, we combine design excellence with
                robust development to turn ideas into impactful digital products.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Our team leverages the latest technologies and agile methodologies to transform your
                ideas into reliable solutions. We foster a culture of collaboration and continuous
                improvement, ensuring transparency and reliability at every project phase.
              </p>
            </div>

            {/* Objectives */}
            <div className="space-y-3">
              <h4 className="text-white font-semibold mb-4">Our Commitments</h4>
              {objectives.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={17} className="text-cyan-400 mt-0.5 shrink-0" />
                  <span className="text-gray-400 text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Values */}
          <div className="grid sm:grid-cols-2 gap-5">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="card-glass p-6 rounded-2xl hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
                  <value.icon size={20} className="text-blue-400" />
                </div>
                <h4 className="text-white font-semibold mb-2 text-sm">{value.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
