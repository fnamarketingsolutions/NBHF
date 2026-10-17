import { useState } from 'react';
import Navbar from '../components/NavBar';
import Hero from '../components/Hero';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';

const Home = () => {
  const [queryIntent, setQueryIntent] = useState('general');

  const handleAction = (intent) => {
    setQueryIntent(intent);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202824] flex flex-col font-sans selection:bg-[#174A32] selection:text-white pb-14 md:pb-0">
      <Navbar onOpenQuery={() => handleAction('general')} />
      <Hero onActionClick={handleAction} />
      <ContactSection queryIntent={queryIntent} />
      <Footer />
      <MobileContactBar onQueryClick={() => handleAction('general')} />
    </div>
  );
};

export default Home;
