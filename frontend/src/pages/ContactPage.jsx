import { Helmet } from 'react-helmet-async';
import Contact from '../components/sections/Contact';

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact Us — Octazen Technologies LLP</title>
        <meta name="description" content="Get in touch with Octazen Technologies LLP. Start your digital transformation journey today." />
      </Helmet>
      <div className="pt-20">
        <Contact />
      </div>
    </>
  );
}
