import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Github, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { SHOW_CAREERS } from '../../utils/constants';
import { navigateToSection } from '../../utils/navigateToSection';

const FooterLink = ({ to, children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (to.includes('#')) {
    return (
      <a
        href={to}
        onClick={e => navigateToSection(e, navigate, location.pathname, to)}
        className="text-gray-500 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-1 group"
      >
        {children}
        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
      </a>
    );
  }

  return (
    <Link to={to} className="text-gray-500 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center gap-1 group">
      {children}
      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
  );
};

export default function Footer() {
  const year = new Date().getFullYear();
  const location = useLocation();
  const navigate = useNavigate();
  const scrollToContact = e => navigateToSection(e, navigate, location.pathname, '/#contact');

  return (
    <footer className="bg-gray-950 border-t border-white/5">
      {/* CTA Band */}
      <div className="bg-gradient-to-r from-blue-900/30 via-blue-800/20 to-cyan-900/20 border-b border-white/5">
        <div className="container-max px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold font-display text-white mb-2">Ready to build something great?</h3>
              <p className="text-gray-400">Let's turn your vision into a powerful digital product.</p>
            </div>
            <div className="flex items-center gap-4">
              <a href="/#contact" onClick={scrollToContact} className="btn-primary">Start a Project</a>
              <a href="https://wa.me/919890983532" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-max px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <Logo iconOnly size="md" />
              <div>
                <span className="font-display font-bold text-white">Octazen</span>
                <span className="block text-xs text-gray-500">Technologies LLP</span>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-5">
              Innovate. Elevate. Succeed. — Building digital products that drive real business results.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, href: 'https://linkedin.com/company/octazen-technologies' },
                { icon: Twitter, href: 'https://twitter.com/octazentech' },
                { icon: Instagram, href: 'https://instagram.com/octazentech' },
                { icon: Github, href: 'https://github.com/octazen-technologies' },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-gray-800 hover:bg-blue-600/20 border border-gray-700 hover:border-blue-500/50 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all duration-200">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm">Services</h4>
            <ul className="space-y-3">
              {['Mobile App Development', 'Web Development', 'API Integration', 'UI/UX Design', 'Cloud & DevOps', 'AI Integration'].map(s => (
                <li key={s}><FooterLink to="/#services">{s}</FooterLink></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', to: '/#about' },
                { label: 'Portfolio', to: '/#portfolio' },
                { label: 'Blog', to: '/blog' },
                ...(SHOW_CAREERS ? [{ label: 'Careers', to: '/careers' }] : []),
                { label: 'Contact', to: '/#contact' },
              ].map(({ label, to }) => (
                <li key={label}><FooterLink to={to}>{label}</FooterLink></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-sm">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a href="mailto:contact@octazentechnologies.com" className="flex items-start gap-3 text-gray-500 hover:text-blue-400 transition-colors group">
                  <Mail size={15} className="mt-0.5 shrink-0 group-hover:text-blue-400" />
                  <span className="text-sm">contact@octazentechnologies.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+919890983532" className="flex items-center gap-3 text-gray-500 hover:text-blue-400 transition-colors group">
                  <Phone size={15} className="shrink-0 group-hover:text-blue-400" />
                  <span className="text-sm">+91 989 098 3532</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3 text-gray-500">
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  <span className="text-sm">Kolhapur, Maharashtra, India</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-xs">© {year} Octazen Technologies LLP. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
