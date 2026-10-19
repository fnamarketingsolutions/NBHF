import React, { useEffect, useState } from 'react';
import { ArrowRight, Flame, Factory, Droplets, Sprout, Tractor } from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';
import QueryForm from '../components/QueryForm';
import powderImage from '../assets/powder-image.png';

const industries = [
  {
    name: 'Biogas plants',
    detail: 'Processed cow dung powder as feedstock, supplied by weight ',
    icon: Flame,
  },
  {
    name: 'Food processing industry',
    detail: 'Powder and granules for process and waste-handling requirements.',
    icon: Factory,
  },
  {
    name: 'Effluent treatment plants (ETP)',
    detail: 'Customised bio-fortification to help break down specific heavy minerals / metals.',
    icon: Droplets,
  },
  {
    name: 'Plant nurseries',
    detail: 'Fine, sieved powder and granules for potting and bed media.',
    icon: Sprout,
  },
  {
    name: 'Commercial farms',
    detail: "Organic manure in bulk, with the current lot's properties published.",
    icon: Tractor,
  },
];

const Industries = () => {
  const [request, setRequest] = useState({
    intent: 'buy',
    message: '',
    title: 'I want to buy',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openForm = (intent, message, title) => {
    setRequest({ intent, message, title });
    document.getElementById('quotation-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202824] flex flex-col font-sans selection:bg-[#174A32] selection:text-white pb-14 md:pb-0">
      <Navbar onOpenQuery={() => openForm('general', '', 'Write a query')} />

      <section className="relative bg-[#122E20] text-white overflow-hidden">
        <img src={powderImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E2419] via-[#122E20]/92 to-[#122E20]/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight mb-4">
            Industries served
          </h1> 
          <button
              type="button"
              onClick={() => openForm('report', 'Bio-fortification for this application: ', 'Ask about bio-fortification')}
              className="border border-[#fffff] text-[#fffff] hover:bg-[#174A32] hover:text-white font-semibold text-xs tracking-[0.16em] uppercase px-6 py-3.5"
            >
              Ask for Biofortification
            </button>
        </div>
      </section>
     
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
         

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {industries.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.name} className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8">
                <div className="w-10 h-10 rounded-xl bg-[#E8F1E4] text-[#174A32] flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-[#174A32] mb-2">{item.name}</h3> 
              </article>
            );
          })}
        </div>
      </section> 

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        <div id="quotation-form" className="scroll-mt-28 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#174A32] mb-4"> Ask for Biofortification</h2>
          <QueryForm
            key={`${request.intent}-${request.message}`}
            source="industries"
            showInterest={false}
            title={request.title}
            initialInterest={request.intent}
            initialMessage={request.message}
          />
        </div>
      </section>

      <Footer />
      <MobileContactBar onQueryClick={() => openForm('general', '', 'Write a query')} />
    </div>
  );
};

export default Industries;
