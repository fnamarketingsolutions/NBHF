import React, { useEffect } from 'react';
import { MapPin, Leaf, HeartHandshake, Flame, Factory, Droplets, Sprout, Tractor, Scissors } from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';
import cottonCropImage from '../assets/cotton.jpg';
import turCropImage from '../assets/tur.jpg';
import soybeanCropImage from '../assets/soyabean.jpg';
import orangesCropImage from '../assets/orange.jpg';
import aboutImage from '../assets/about-image.webp';

const crops = [
  { name: 'Cotton', image: cottonCropImage },
  { name: 'Tur', image: turCropImage },
  { name: 'Soyabean', image: soybeanCropImage },
  { name: 'Oranges', image: orangesCropImage },
];

const residueActivities = ['Cutting', 'Shredding', 'Aggregating'];

const residueTypes = ['Stalks', 'Straw', 'Stubble', 'Husks', 'Seed coats', 'Hulls'];

const dungUses = [
  { title: 'Biogas plants', icon: Flame },
  { title: 'Waste-water treatment in food processing industries', icon: Factory },
  { title: 'Effluent Treatment Plants (ETPs)', icon: Droplets },
  { title: 'Plant nurseries', icon: Sprout },
  { title: 'Commercial farms', icon: Tractor },
];

const goToQuery = () => {
  window.location.href = '/contact';
};

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202824] flex flex-col font-sans selection:bg-[#174A32] selection:text-white pb-14 md:pb-0">
      <Navbar onOpenQuery={goToQuery} />

      <section className="relative bg-[#122E20] text-white overflow-hidden">
        <img
          src={aboutImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E2419] via-[#122E20]/90 to-[#122E20]/70" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#C89B3C] mb-4">
            About Company
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight text-white mb-5">
            About Nasare BioHarvest Fuels Pvt Ltd
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Through its product portfolio NBHF aims to fulfil its core philosophy of creating a business that is environmentally sustainable and farmer friendly.
          </p>
           
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          <article className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8">
            <div className="w-10 h-10 rounded-xl bg-[#E8F1E4] text-[#2D5A27] flex items-center justify-center mb-4">
              <Leaf className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-[#174A32] mb-2">Environmentally sustainable</h2>
            <p className="text-sm sm:text-base text-[#202824]/80 leading-relaxed">
              Should directly reduce carbon footprint at NBHF level.
            </p>
          </article>
          <article className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8">
            <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] text-[#9E6E1A] flex items-center justify-center mb-4">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-[#174A32] mb-2">Farmer friendly</h2>
            <p className="text-sm sm:text-base text-[#202824]/80 leading-relaxed">
              Should augment farmer income or reduce farmer costs.
            </p>
          </article>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-7 space-y-6">
            
            <p className="text-base text-[#202824]/85 leading-relaxed">
              NBHF is based out of Wadhona and Fefarwada villages, near Arvi-Wardha, Maharashtra. Cotton, tur, soyabean and oranges are predominant crops grown in this region. While this region is rich in agriculture produce, it faces structural vulnerabilities. This is a semi-arid, mostly rain-fed region (90% plus of net cultivable land) with low irrigation levels, shallow vertisol soils, high debt and climate vulnerability.
            </p>
            <p className="text-base text-[#202824]/85 leading-relaxed">
              Given unpredictable rains and low farmer incomes, a significant portion of post-harvest agriculture waste is burnt at site to facilitate quick land preparation for subsequent cropping cycles. Residue burning leads to the depletion of soil nutrients, degradation of soil health, and the emission of greenhouse gases.
            </p>
            <p className="text-base text-[#202824]/85 leading-relaxed max-w-3xl mb-8">
            NBHF assists farmers in some or all of the post-harvest crop residue activities — cutting, shredding and aggregating of stalks, straw, stubble, husks, seed coats, hulls and similar material. These residues are used as feedstock for biogas power plants and for manufacturing of briquettes and pellets. Briquettes and pellets are direct substitutes of coal in multiple industries, such as fuel for boilers in thermal power plants, fuel for the food processing industry, HORECA and others.
          </p>
          <p className="text-base text-[#202824]/85 leading-relaxed max-w-3xl mb-8">
          For the core agriculture activities, farmers in this region employ bulls or oxen for tilling their farms and rear cows and buffalos for milk and derivative products. Feeding on farm crop residues in open fields and large forest areas nearby, the cattle produce dung that is high in concentration of microflora, and high in microbial and bacterial diversity.
        </p>
        <p className="text-base text-[#202824]/85 leading-relaxed max-w-3xl mb-8">
          This microbial and bacterial diversity makes cow dung a highly important input for:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-2">
          <li>
            Biogas power plants
          </li>
          <li>
            Waste-water treatment in food processing industries
          </li>
          <li>
            Effluent Treatment Plants (ETPs)
          </li>
          <li>
            Plant nurseries
          </li>

          <li>
            Commercial farms
          </li>
        </ul>
        <p className="text-base text-[#202824]/85 leading-relaxed max-w-3xl mb-8">
            By purchasing post-harvest agriculture waste and cow dung products, NBHF strives to help reduce the carbon footprint in the region and also help farmer incomes.
          </p>
          </div>
          

          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            {crops.map((crop) => (
              <div key={crop.name} className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-black/10">
                <img src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-semibold">{crop.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <MobileContactBar onQueryClick={goToQuery} />
    </div>
  );
};

export default About;
