require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const connectDB = require('./db');
const { withSlugs } = require('./projectSeedData');
const User = require('../models/User');
const Service = require('../models/Service');
const Technology = require('../models/Technology');
const Testimonial = require('../models/Testimonial');
const Project = require('../models/Project');
const Industry = require('../models/Industry');
const Stat = require('../models/Stat');
const Settings = require('../models/Settings');
const { getDefaultMenuSettings } = require('../config/menuSettingsData');
const Career = require('../models/Career');

const seedData = async () => {
  await connectDB();

  // Clear existing data
  await Promise.all([
    User.deleteMany({}), Service.deleteMany({}), Technology.deleteMany({}),
    Testimonial.deleteMany({}), Project.deleteMany({}), Industry.deleteMany({}),
    Stat.deleteMany({}), Settings.deleteMany({}), Career.deleteMany({}),
  ]);
  console.log('🗑  Cleared existing data');

  // Admin User
  await User.create({
    name: 'Octazen Admin',
    email: process.env.ADMIN_EMAIL || 'admin@octazentechnologies.com',
    password: process.env.ADMIN_PASSWORD || 'Admin@Octazen2024!',
    role: 'admin',
  });
  console.log('👤 Admin user created');

  // Services
  await Service.insertMany([
    { title: 'Mobile App Development', shortDescription: 'Native & cross-platform mobile apps for iOS and Android that deliver exceptional user experiences.', icon: 'smartphone', features: ['React Native', 'Flutter', 'iOS (Swift)', 'Android (Kotlin)', 'Push Notifications', 'Offline Support'], order: 1 },
    { title: 'Web Application Development', shortDescription: 'Scalable, modern web applications built with cutting-edge frameworks and best practices.', icon: 'globe', features: ['React.js', 'Angular', 'Node.js', 'ASP.NET Core', 'Progressive Web Apps', 'SPA & SSR'], order: 2 },
    { title: 'API Development & Integration', shortDescription: 'Robust RESTful APIs and seamless third-party integrations to power your digital ecosystem.', icon: 'code', features: ['RESTful APIs', 'GraphQL', 'JWT Authentication', 'WebSocket', 'Third-party Integrations', 'API Documentation'], order: 3 },
    { title: 'UI/UX Design', shortDescription: 'Beautiful, intuitive interfaces designed with user-centric principles and modern design systems.', icon: 'palette', features: ['Figma Design', 'Prototyping', 'Design Systems', 'User Research', 'Wireframing', 'Responsive Design'], order: 4 },
    { title: 'Cloud & DevOps', shortDescription: 'Scalable cloud infrastructure and CI/CD pipelines for reliable, high-performance deployments.', icon: 'cloud', features: ['Azure', 'AWS', 'Docker', 'CI/CD Pipelines', 'App Deployment', 'Performance Monitoring'], order: 5 },
    { title: 'AI Integration', shortDescription: 'Intelligent AI-powered features integrated into your applications to drive automation and insights.', icon: 'cpu', features: ['OpenAI Integration', 'Copilot', 'AI Chatbots', 'Data Analysis', 'ML Models', 'Automation'], order: 6 },
  ]);
  console.log('🛠  Services seeded');

  // Technologies
  const techData = [
    { name: 'React.js', category: 'frontend', icon: 'react', proficiency: 95, order: 1 },
    { name: 'Angular', category: 'frontend', icon: 'angular', proficiency: 85, order: 2 },
    { name: 'HTML/CSS', category: 'frontend', icon: 'html', proficiency: 98, order: 3 },
    { name: 'TypeScript', category: 'frontend', icon: 'typescript', proficiency: 90, order: 4 },
    { name: 'Bootstrap', category: 'frontend', icon: 'bootstrap', proficiency: 92, order: 5 },
    { name: 'React Native', category: 'mobile', icon: 'react', proficiency: 90, order: 1 },
    { name: 'Flutter', category: 'mobile', icon: 'flutter', proficiency: 85, order: 2 },
    { name: 'Android (Kotlin)', category: 'mobile', icon: 'android', proficiency: 80, order: 3 },
    { name: '.NET MAUI', category: 'mobile', icon: 'dotnet', proficiency: 75, order: 4 },
    { name: 'Node.js', category: 'backend', icon: 'nodejs', proficiency: 92, order: 1 },
    { name: 'ASP.NET Core', category: 'backend', icon: 'dotnet', proficiency: 85, order: 2 },
    { name: 'Python', category: 'backend', icon: 'python', proficiency: 80, order: 3 },
    { name: 'C#', category: 'backend', icon: 'csharp', proficiency: 82, order: 4 },
    { name: 'MongoDB', category: 'database', icon: 'mongodb', proficiency: 88, order: 1 },
    { name: 'PostgreSQL', category: 'database', icon: 'postgresql', proficiency: 85, order: 2 },
    { name: 'SQL Server', category: 'database', icon: 'sqlserver', proficiency: 85, order: 3 },
    { name: 'Firebase', category: 'database', icon: 'firebase', proficiency: 88, order: 4 },
    { name: 'MySQL', category: 'database', icon: 'mysql', proficiency: 86, order: 5 },
    { name: 'Azure', category: 'cloud', icon: 'azure', proficiency: 85, order: 1 },
    { name: 'AWS', category: 'cloud', icon: 'aws', proficiency: 80, order: 2 },
    { name: 'Docker', category: 'devops', icon: 'docker', proficiency: 82, order: 1 },
    { name: 'GitHub', category: 'devops', icon: 'github', proficiency: 95, order: 2 },
    { name: 'Azure DevOps', category: 'devops', icon: 'azuredevops', proficiency: 80, order: 3 },
    { name: 'Figma', category: 'tools', icon: 'figma', proficiency: 88, order: 1 },
    { name: 'OpenAI / Copilot', category: 'ai', icon: 'openai', proficiency: 82, order: 1 },
  ];
  await Technology.insertMany(techData);
  console.log('💡 Technologies seeded');

  await Project.insertMany(withSlugs());
  console.log('📁 Projects seeded');

  // Testimonials
  await Testimonial.insertMany([
    { name: 'Rajesh Mehta', designation: 'CEO', company: 'TechStart Ventures', content: 'Octazen Technologies delivered our mobile app on time and beyond our expectations. Their team\'s technical expertise and dedication to quality is truly impressive. The app has transformed how we serve our customers.', rating: 5, order: 1 },
    { name: 'Priya Sharma', designation: 'Product Manager', company: 'HealthBridge Solutions', content: 'Working with Octazen was a game-changer for us. They understood our complex healthcare requirements and built a robust, HIPAA-compliant solution that our users love. Professional, responsive, and highly skilled.', rating: 5, order: 2 },
    { name: 'Amit Patel', designation: 'Founder', company: 'FinFlow Technologies', content: 'The team at Octazen demonstrated exceptional problem-solving skills when handling our fintech project. Their expertise in security and scalable architecture gave us full confidence in the product they delivered.', rating: 5, order: 3 },
    { name: 'Sarah Johnson', designation: 'CTO', company: 'BuildSmart Inc.', content: 'Octazen\'s construction management system has completely digitized our operations. From project tracking to compliance management, everything works seamlessly. Their agile approach kept us informed at every step.', rating: 5, order: 4 },
  ]);
  console.log('💬 Testimonials seeded');

  // Industries
  await Industry.insertMany([
    { name: 'Healthcare', icon: 'heart-pulse', description: 'HIPAA-compliant applications for clinics, hospitals, and healthcare providers.', order: 1 },
    { name: 'Finance & Fintech', icon: 'banknote', description: 'Secure fintech solutions, banking apps, and financial management systems.', order: 2 },
    { name: 'Real Estate', icon: 'building', description: 'Property management platforms, listing portals, and construction tools.', order: 3 },
    { name: 'E-Commerce', icon: 'shopping-cart', description: 'End-to-end e-commerce platforms with inventory, payments, and logistics.', order: 4 },
    { name: 'Education', icon: 'graduation-cap', description: 'EdTech platforms, LMS systems, and interactive learning applications.', order: 5 },
    { name: 'Logistics', icon: 'truck', description: 'Fleet management, delivery tracking, and supply chain optimization systems.', order: 6 },
    { name: 'Manufacturing', icon: 'factory', description: 'ERP integrations, workflow automation, and production monitoring tools.', order: 7 },
    { name: 'Retail', icon: 'store', description: 'POS systems, loyalty platforms, and omnichannel retail solutions.', order: 8 },
  ]);
  console.log('🏭 Industries seeded');

  // Stats (Technologies Mastered is static in the frontend — not stored in DB)
  await Stat.insertMany([
    { label: 'Years of Experience', value: 2, suffix: '+', icon: 'calendar', order: 1 },
    { label: 'Projects Delivered', value: 10, suffix: '+', icon: 'check-circle', order: 2 },
    { label: 'Happy Clients', value: 7, suffix: '+', icon: 'users', order: 3 },
  ]);
  console.log('📊 Stats seeded');

  // Careers
  await Career.insertMany([
    {
      title: 'Senior React Developer',
      department: 'Engineering',
      type: 'full-time',
      experience: '3-5 years',
      description: 'We are looking for a passionate Senior React Developer to join our growing team and work on exciting client projects.',
      responsibilities: ['Build responsive web applications using React.js', 'Collaborate with UI/UX designers to implement designs', 'Write clean, maintainable, and testable code', 'Participate in code reviews and mentor junior developers'],
      requirements: ['3+ years of React.js experience', 'Strong knowledge of JavaScript/TypeScript', 'Experience with REST APIs and state management', 'Familiarity with Git workflows'],
      location: 'Kolhapur, Maharashtra, India',
      isActive: true,
    },
    {
      title: 'React Native Developer',
      department: 'Mobile',
      type: 'full-time',
      experience: '2-4 years',
      description: 'Join our mobile team to build world-class cross-platform applications used by thousands of users.',
      responsibilities: ['Develop cross-platform mobile apps with React Native', 'Implement push notifications and device integrations', 'Optimize app performance', 'Work closely with backend developers'],
      requirements: ['2+ years of React Native experience', 'Experience with iOS and Android deployment', 'Knowledge of REST APIs', 'Strong debugging skills'],
      location: 'Kolhapur, Maharashtra, India',
      isActive: true,
    },
  ]);
  console.log('💼 Careers seeded');

  // Settings
  const defaultSettings = [
    { key: 'company_name', value: 'Octazen Technologies LLP', group: 'general', label: 'Company Name' },
    { key: 'company_tagline', value: 'Innovate. Elevate. Succeed.', group: 'general', label: 'Tagline' },
    { key: 'company_description', value: 'A forward-thinking IT company specializing in custom mobile and web application development, delivering innovative, user-centered, and scalable digital products.', group: 'general', label: 'Description' },
    { key: 'company_email', value: 'contact@octazentechnologies.com', group: 'contact', label: 'Email' },
    { key: 'company_phone', value: '+91 989 098 3532', group: 'contact', label: 'Phone' },
    { key: 'company_website', value: 'www.octazentechnologies.com', group: 'contact', label: 'Website' },
    { key: 'company_address', value: 'Kolhapur, Maharashtra, India', group: 'contact', label: 'Address' },
    { key: 'whatsapp_number', value: '919890983532', group: 'contact', label: 'WhatsApp Number' },
    { key: 'hero_title', value: 'We Build Digital Products That', group: 'hero', label: 'Hero Title' },
    { key: 'hero_subtitle', value: 'Drive Real Results', group: 'hero', label: 'Hero Subtitle' },
    { key: 'hero_description', value: 'Octazen Technologies LLP crafts scalable mobile & web applications, AI-powered solutions, and enterprise software that empowers businesses to thrive in the digital age.', group: 'hero', label: 'Hero Description' },
    { key: 'social_linkedin', value: 'https://linkedin.com/company/octazen-technologies', group: 'social', label: 'LinkedIn' },
    { key: 'social_twitter', value: 'https://twitter.com/octazentech', group: 'social', label: 'Twitter' },
    { key: 'social_instagram', value: 'https://instagram.com/octazentech', group: 'social', label: 'Instagram' },
    { key: 'seo_title', value: 'Octazen Technologies LLP — Mobile & Web App Development | Kolhapur', group: 'seo', label: 'SEO Title' },
    { key: 'seo_description', value: 'Octazen Technologies LLP is a leading software development company in Kolhapur specializing in mobile apps, web development, and AI solutions.', group: 'seo', label: 'SEO Description' },
    { key: 'seo_keywords', value: 'mobile app development, web development, React Native, Flutter, Node.js, software company Kolhapur', group: 'seo', label: 'SEO Keywords' },
    ...getDefaultMenuSettings(),
  ];
  await Settings.insertMany(defaultSettings);
  console.log('⚙️  Settings seeded');

  console.log('\n🎉 Database seeded successfully!');
  console.log(`📧 Admin Email: ${process.env.ADMIN_EMAIL || 'admin@octazentechnologies.com'}`);
  console.log(`🔑 Admin Password: ${process.env.ADMIN_PASSWORD || 'Admin@Octazen2024!'}`);
  process.exit(0);
};

seedData().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
