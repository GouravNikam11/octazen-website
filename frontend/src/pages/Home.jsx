import { Helmet } from 'react-helmet-async';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Services from '../components/sections/Services';
import Technologies from '../components/sections/Technologies';
import Portfolio from '../components/sections/Portfolio';
import Statistics from '../components/sections/Statistics';
import Testimonials from '../components/sections/Testimonials';
import Industries from '../components/sections/Industries';
import Careers from '../components/sections/Careers';
import Blog from '../components/sections/Blog';
import Contact from '../components/sections/Contact';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function Home() {
  const { isMenuVisible } = useSiteSettings();

  return (
    <>
      <Helmet>
        <title>Octazen Technologies LLP — Innovate. Elevate. Succeed.</title>
        <meta name="description" content="Octazen Technologies LLP is a premium software development company specializing in mobile apps, web applications, and AI-powered solutions. Based in Kolhapur, Maharashtra." />
        <meta name="keywords" content="mobile app development, web development, React Native, Flutter, Node.js, software company Kolhapur, IT company India" />
        <meta property="og:title" content="Octazen Technologies LLP" />
        <meta property="og:description" content="We build digital products that drive real results." />
      </Helmet>
      {isMenuVisible('home') && <Hero />}
      {isMenuVisible('about') && <About />}
      {isMenuVisible('services') && <Services />}
      {isMenuVisible('technologies') && <Technologies />}
      {isMenuVisible('portfolio') && <Portfolio />}
      <Statistics />
      <Testimonials />
      <Industries />
      {isMenuVisible('careers') && <Careers />}
      {isMenuVisible('blog') && <Blog />}
      {isMenuVisible('contact') && <Contact />}
    </>
  );
}
