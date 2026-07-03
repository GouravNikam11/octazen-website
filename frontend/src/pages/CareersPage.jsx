import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const DEFAULT_JOBS = [
  { _id: '1', title: 'Senior React Developer', department: 'Engineering', type: 'full-time', location: 'Kolhapur, Maharashtra, India', experience: '3-5 years', description: 'We are looking for a passionate Senior React Developer to join our growing team.', requirements: ['3+ years React.js experience', 'TypeScript proficiency', 'REST API experience'] },
  { _id: '2', title: 'React Native Developer', department: 'Mobile', type: 'full-time', location: 'Kolhapur, Maharashtra, India', experience: '2-4 years', description: 'Join our mobile team to build world-class cross-platform applications.', requirements: ['2+ years React Native experience', 'iOS & Android deployment', 'REST API knowledge'] },
];

function JobCard({ job }) {
  const [open, setOpen] = useState(false);
  const TYPE_COLORS = { 'full-time': 'text-green-400 bg-green-400/10', 'part-time': 'text-yellow-400 bg-yellow-400/10', 'contract': 'text-blue-400 bg-blue-400/10', internship: 'text-purple-400 bg-purple-400/10', remote: 'text-cyan-400 bg-cyan-400/10' };

  return (
    <div className="card-glass rounded-2xl overflow-hidden">
      <button className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-white/2 transition-colors" onClick={() => setOpen(!open)}>
        <div>
          <h3 className="text-white font-semibold mb-2">{job.title}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1"><Briefcase size={13} /> {job.department}</span>
            <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
            <span className="flex items-center gap-1"><Clock size={13} /> {job.experience}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_COLORS[job.type] || ''}`}>{job.type?.replace('-', ' ')}</span>
          </div>
        </div>
        <ChevronDown size={18} className={`text-gray-500 shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="border-t border-white/5 px-6 pb-6 pt-5 overflow-hidden">
          <p className="text-gray-400 text-sm mb-5">{job.description}</p>
          {job.requirements?.length > 0 && (
            <div className="mb-5">
              <h4 className="text-white text-sm font-semibold mb-3">Requirements</h4>
              <ul className="space-y-1.5">
                {job.requirements.map(r => <li key={r} className="flex items-center gap-2 text-gray-400 text-sm"><div className="w-1 h-1 rounded-full bg-blue-400" /> {r}</li>)}
              </ul>
            </div>
          )}
          <Link to="/contact" className="btn-primary text-sm">Apply for This Role <ArrowRight size={14} /></Link>
        </motion.div>
      )}
    </div>
  );
}

export default function CareersPage() {
  const [jobs, setJobs] = useState(DEFAULT_JOBS);

  useEffect(() => {
    api.get('/careers').then(r => { if (r.data.data?.length) setJobs(r.data.data.filter(j => j.isActive)); }).catch(() => {});
  }, []);

  return (
    <>
      <Helmet>
        <title>Careers — Octazen Technologies LLP</title>
        <meta name="description" content="Join Octazen Technologies LLP. We're hiring passionate developers and designers." />
      </Helmet>
      <div className="min-h-screen pt-28 pb-20">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="section-tag mb-4 inline-flex">We're Hiring</div>
            <h1 className="section-title mb-4">Build Your Career at <span className="gradient-text">Octazen</span></h1>
            <p className="section-subtitle">Join a team of passionate engineers and designers who love solving hard problems.</p>
          </div>

          {jobs.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-4">
              {jobs.map(job => <JobCard key={job._id} job={job} />)}
            </div>
          ) : (
            <div className="text-center py-16 card-glass max-w-lg mx-auto rounded-2xl p-12">
              <Briefcase size={40} className="text-gray-600 mx-auto mb-4" />
              <h3 className="text-white font-semibold mb-2">No open positions right now</h3>
              <p className="text-gray-500 text-sm mb-6">We're always interested in connecting with talented people.</p>
              <Link to="/contact" className="btn-primary">Send Us Your CV</Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
