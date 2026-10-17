import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';

const products = [
  {
    eyebrow: 'Cow dung · bulk / wholesale',
    title: 'Cow dung powder & granules',
    body: 'Pre-processed, agriculture-grade. Dried, uniformly crushed and sieved into fine powder, or formed into spherical granules. Packed in 50 kg PP bags. Customised bio-fortification on request. Supplied within India and outside India.',
    points: [
      'Properties of the current lot published on the product page',
      'For biogas plants, food processing, ETPs, nurseries, commercial farms',
    ],
    view: 'View cow dung',
    action: 'Buy cow dung',
    href: '/products/cow-dung',
  },
  {
    eyebrow: 'Post-harvest agricultural waste',
    title: 'Crop residue in 1-ton lots',
    body: 'Cotton stalk (पऱ्हाटी), tur stalk (तुऱ्हाटी) with threshing residue, soyabean residue (कुटार) and bagasse, collected after harvest in Vidarbha.',
    points: [
      'Quoted in lots of 1 ton',
      'NBHF buys from farmers and aggregators; sells to industrial users',
    ],
    view: 'View crop residue',
    action: 'Sell crop residue',
    href: '/products/agri-waste',
  },
];

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202824] flex flex-col font-sans selection:bg-[#174A32] selection:text-white pb-14 md:pb-0">
      <Navbar onOpenQuery={() => { window.location.href = '/contact#query'; }} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
         
        <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-[#174A32] mb-3">Products</h1>
        <p className="max-w-2xl text-base sm:text-lg text-[#202824]/75 mb-10">
          Two product lines. Each has its own page with specifications and buy / sell options.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {products.map((product) => (
            <article
              key={product.href}
              className="bg-[#0E2419] text-white border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col min-h-[280px]"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/45 font-medium mb-3">
                {product.eyebrow}
              </p>
              <h2 className="text-2xl font-semibold leading-snug mb-3">{product.title}</h2>
              <p className="text-sm text-white/70 leading-relaxed">{product.body}</p>
              <ul className="mt-4 space-y-2">
                {product.points.map((point) => (
                  <li key={point} className="text-sm text-white/80 flex gap-2">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#6FBF6A] shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={product.href}
                  className="inline-flex items-center justify-center gap-2 border border-white/30 hover:border-white text-white text-xs font-semibold uppercase tracking-[0.12em] px-4 py-3.5 rounded-lg"
                >
                  {product.view}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={`${product.href}#quotation-form`}
                  className="inline-flex items-center justify-center gap-2 bg-[#C89B3C] hover:bg-[#b58a32] text-[#122E20] text-xs font-semibold uppercase tracking-[0.12em] px-4 py-3.5 rounded-lg"
                >
                  {product.action}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
      <MobileContactBar onQueryClick={() => { window.location.href = '/contact#query'; }} />
    </div>
  );
};

export default Products;
