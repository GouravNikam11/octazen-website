import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import api from '../../services/api';

const DEFAULT_JOBS = [
  { _id: '1', title: 'Senior React Developer', department: 'Engineering', type: 'full-time', location: 'Kolhapur, Maharashtra, India', experience: '3-5 years' },
  { _id: '2', title: 'React Native Developer', department: 'Mobile', type: 'full-time', location: 'Kolhapur, Maharashtra, India', experience: '2-4 years' },
];

const TYPE_COLORS = { 'full-time': 'text-green-400 bg-green-400/10', 'part-time': 'text-yellow-400 bg-yellow-400/10', 'contract': 'text-blue-400 bg-blue-400/10', 'internship': 'text-purple-400 bg-purple-400/10', 'remote': 'text-cyan-400 bg-cyan-400/10' };

export default function Careers() {
  const { ref, isVisible } = useScrollAnimation(0.1);
  const [jobs, setJobs] = useState(DEFAULT_JOBS);

  useEffect(() => {
    api.get('/careers').then(r => { if (r.data.data?.length) setJobs(r.data.data.filter(j => j.isActive).slice(0, 4)); }).catch(() => {});
  }, []);

  return (
    <section className="section-padding bg-gray-900/20">
      <div ref={ref} className="container-max">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={isVisible ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.1 }}>
            <div className="section-tag mb-4 inline-flex">Careers</div>
            <h2 className="section-title mb-4">Join Our <span className="gradient-text">Growing Team</span></h2>
            <p className="section-subtitle mb-6">
              We're always looking for talented individuals who are passionate about building great software and solving real-world problems.
            </p>
            <div className="space-y-4 mb-8">
              {['Collaborative and supportive culture', 'Challenging and meaningful projects', 'Continuous learning & growth', 'Flexible work arrangements'].map(perk => (
                <div key={perk} className="flex items-center gap-3 text-gray-400 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  {perk}
                </div>
              ))}
            </div>
            <Link to="/careers" className="btn-primary">See All Openings <ArrowRight size={16} /></Link>
          </motion.div>

          <div className="space-y-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, x: 20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="card-glass p-6 rounded-2xl hover:border-blue-500/30 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-white font-semibold group-hover:text-blue-400 transition-colors">{job.title}</h3>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <span className="flex items-center gap-1 text-gray-500 text-xs"><Briefcase size={11} /> {job.department}</span>
                      <span className="flex items-center gap-1 text-gray-500 text-xs"><MapPin size={11} /> {job.location?.split(',')[0]}</span>
                      <span className="flex items-center gap-1 text-gray-500 text-xs"><Clock size={11} /> {job.experience}</span>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize shrink-0 ${TYPE_COLORS[job.type] || 'text-gray-400 bg-gray-400/10'}`}>
                    {job.type?.replace('-', ' ')}
                  </span>
                </div>
                <Link to={`/careers#${job._id}`} className="mt-4 flex items-center gap-1.5 text-sm text-blue-400 hover:text-cyan-400 transition-colors font-medium">
                  Apply Now <ArrowRight size={13} />
                </Link>
              </motion.div>
            ))}

            {jobs.length === 0 && (
              <div className="card-glass p-8 rounded-2xl text-center">
                <Users size={32} className="text-gray-600 mx-auto mb-3" />
                <p className="text-gray-500 text-sm">No open positions right now, but we're always interested in great talent.</p>
                <Link to="/contact" className="mt-4 inline-flex btn-secondary text-sm">Send Us Your CV</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
