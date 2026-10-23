import { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';
import QueryForm from '../components/QueryForm';
import cottonStalkImage from '../assets/cotton-stalk.webp';
import turStalkImage from '../assets/tur-stalk.jpg';
import soyabeanStalkImage from '../assets/soyabean-stalk.jpg';
import heroBackgroundImage from '../assets/hero-bg.jpg';
import bagasseImage from '../assets/baggase.png';

const residues = [
  {
    script: 'पऱ्हाटी',
    name: 'Cotton stalk',
    local: 'Paraati / Paraatya',
    detail: 'Whole stalks after cotton picking.',
    image: cottonStalkImage,
  },
  {
    script: 'तुऱ्हाटी',
    name: 'Tur stalk',
    local: 'Turaati / Turaatya',
    detail: 'Stalks plus threshing residue: empty pods, broken husks, plant debris.',
    image: turStalkImage,
  },
  {
    script: 'कुटार',
    name: 'Soyabean residue',
    local: 'Kutaar',
    detail: 'Post-threshing soyabean straw and husk.',
    image: soyabeanStalkImage,
  },
  {
    script: 'बगास',
    name: 'Sugarcane bagasse',
    local: 'Fibrous residue',
    detail: 'Available on enquiry.',
    image: bagasseImage,
  },
];

const AgriWaste = () => {
  const [intent, setIntent] = useState('buy');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openForm = (nextIntent) => {
    setIntent(nextIntent);
    document.getElementById('quotation-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202824] flex flex-col font-sans selection:bg-[#174A32] selection:text-white pb-14 md:pb-0">
      <Navbar onOpenQuery={() => openForm('general')} />

      <section className="relative bg-[#122E20] text-white overflow-hidden">
        <img
          src={heroBackgroundImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E2419] via-[#122E20]/92 to-[#122E20]/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
           
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight mb-4">
            Post-harvest agricultural waste
          </h1> 
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {residues.map((item) => (
            <article key={item.name} className="bg-white border border-black/10 rounded-2xl overflow-hidden flex flex-col">
              <img src={item.image} alt={item.name} className="h-40 w-full object-cover" />
              <div className="p-5 flex flex-col flex-1">
                <p className="text-2xl font-semibold text-[#174A32] leading-tight">{item.script}</p>
                <h2 className="mt-2 text-lg font-bold text-[#202824]">{item.name}</h2>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#4F7D3A]">{item.local}</p>
                <p className="mt-3 text-sm text-[#202824]/80 leading-relaxed">{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white border-y border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
           
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#174A32] mb-4 max-w-3xl">
            write a query
          </h2>
         
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => openForm('buy')}
              className="bg-[#174A32] hover:bg-[#1f5f40] text-white font-semibold text-xs tracking-[0.16em] uppercase px-6 py-3.5"
            >
              I want to buy
            </button>
            <button
              type="button"
              onClick={() => openForm('sell')}
              className="border border-[#174A32] text-[#174A32] hover:bg-[#174A32] hover:text-white font-semibold text-xs tracking-[0.16em] uppercase px-6 py-3.5"
            >
              I want to sell
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        <div id="quotation-form" className="scroll-mt-28 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#174A32] mb-4">
            {intent === 'sell' ? 'I want to sell' : intent === 'general' ? 'Write a query' : 'I want to buy'}
          </h2>
          <QueryForm
            key={intent}
            source="agri-waste"
            showInterest={false}
            title={intent === 'sell' ? 'I want to sell' : intent === 'general' ? 'Write a query' : 'I want to buy'}
            initialInterest={intent === 'general' ? 'general' : intent}
          />
        </div>
      </section>

      <Footer />
      <MobileContactBar onQueryClick={() => openForm('general')} />
    </div>
  );
};

export default AgriWaste;
