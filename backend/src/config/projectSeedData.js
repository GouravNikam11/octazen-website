const slugify = require('slugify');

const PROJECT_SEED = [
  {
    title: 'NIGA Homeopathy',
    shortDescription: 'A comprehensive digital platform for a homeopathy practice with patient management, appointment scheduling, and teleconsultation features.',
    description: 'NIGA Homeopathy is a full-featured healthcare web platform that streamlines patient management and homeopathic practice operations. The system provides seamless appointment booking, patient health records management, and secure teleconsultation capabilities. Built as a modern web application, it enables practitioners to manage their practice efficiently while patients enjoy easy access to their healthcare provider.',
    client: 'NIGA Homeopathy',
    category: 'web',
    technologies: ['React', '.NET', 'SQL Server'],
    features: ['Patient Management', 'Appointment Scheduling', 'Teleconsultation', 'Health Records', 'Prescription Management', 'Role-based Access'],
    platform: ['Web'],
    isFeatured: true,
    isPublished: true,
    order: 1,
  },
  {
    title: 'Fiduciary Management System',
    shortDescription: 'Enterprise-grade mobile application enabling fiduciaries to manage portfolios, track assets, and generate compliance reports in real-time.',
    description: 'A sophisticated enterprise mobile application designed for fiduciary professionals to manage complex financial portfolios. The system provides real-time asset tracking, compliance reporting, and client communication tools. Built with robust security features and intuitive UX, the platform enables fiduciaries to manage their responsibilities efficiently while maintaining regulatory compliance.',
    client: 'Financial Services',
    category: 'mobile',
    technologies: ['React Native', 'ASP.NET Core', 'SQL Server', 'Azure', 'JWT Authentication'],
    features: ['Portfolio Management', 'Asset Tracking', 'Push Notifications', 'Real-time Reporting', 'Compliance Dashboard', 'Client Communication', 'Document Management'],
    platform: ['iOS', 'Android'],
    isFeatured: true,
    isPublished: true,
    order: 2,
  },
  {
    title: 'Construction Oversight System',
    shortDescription: 'Centralized construction project management platform for tracking multi-site builds, workforce, and compliance documentation.',
    description: 'A comprehensive web and mobile platform designed to streamline construction project management across multiple sites. The system enables project managers to track progress, manage workforce, handle compliance documentation, and communicate with stakeholders in real-time. Features include real-time dashboards, document management, and milestone tracking that significantly improve project delivery timelines.',
    client: 'Construction Firm',
    category: 'fullstack',
    technologies: ['React.js', 'Node.js', 'MongoDB', 'Azure', 'Docker'],
    features: ['Multi-site Management', 'Workforce Tracking', 'Compliance Documentation', 'Progress Reports', 'Real-time Dashboard', 'Milestone Tracking', 'Stakeholder Communication'],
    platform: ['Web', 'Mobile'],
    isFeatured: true,
    isPublished: true,
    order: 3,
  },
];

const withSlugs = () =>
  PROJECT_SEED.map(p => ({
    ...p,
    slug: slugify(p.title, { lower: true, strict: true }),
  }));

module.exports = { PROJECT_SEED, withSlugs };
