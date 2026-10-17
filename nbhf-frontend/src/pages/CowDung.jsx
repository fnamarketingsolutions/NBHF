import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';
import QueryForm from '../components/QueryForm';
import { fetchStock } from '../lib/api';
import powderImage from '../assets/powder-image.png';
import granulesImage from '../assets/granuals.png';

const productPoints = [
  'Dried, uniformly crushed and sieved into fine powder.',
  'Also available as spherical granules.',
  'Packed in 50 kg PP bags.',
  'Customised bio-fortification on request, to help break down specific heavy minerals / metals.',
  'Supplied within India and outside India.',
];

const supplyTags = ['Powder', 'Granules', '50 kg PP bag', 'Within India', 'Outside India'];

const fallbackStock = {
  lot: '',
  tested: '',
  primary: [
    { name: 'Organic carbon matter', value: '', unit: '%' },
    { name: 'Moisture', value: '', unit: '%' },
    { name: 'Nitrogen (N)', value: '', unit: '%' },
    { name: 'Phosphorus (P) / Phosphate (P2O5)', value: '', unit: '%' },
    { name: 'Potassium (K)', value: '', unit: '%' },
    { name: 'C:N ratio', value: '', unit: '' },
    { name: 'NPK ratio', value: '', unit: '' },
    { name: 'pH', value: '', unit: '' },
  ],
  micro: [
    { name: 'Calcium (Ca), Magnesium (Mg), Sulphur (S)', value: '', unit: '' },
    { name: 'Copper (Cu)', value: '', unit: 'ppm' },
    { name: 'Zinc (Zn)', value: '', unit: 'ppm' },
    { name: 'Sodium (Na)', value: '', unit: 'ppm' },
    { name: 'Water-soluble Boron (B)', value: '', unit: 'ppm' },
    { name: 'Water-soluble Molybdenum (Mo)', value: '', unit: 'ppm' },
    { name: 'Water-soluble Iron (Fe)', value: '', unit: 'ppm' },
    { name: 'Water-soluble Manganese (Mn)', value: '', unit: 'ppm' },
  ],
};

const showValue = (row) => `${row.value || '—'}${row.unit || ''}`;

const industries = [
  'Biogas plants',
  'Food processing industry',
  'Effluent treatment plants (ETP)',
  'Plant nurseries',
  'Commercial farms',
];

const CowDung = () => {
  const [stock, setStock] = useState(fallbackStock);
  const [request, setRequest] = useState({
    intent: 'buy',
    message: '',
    title: 'I want to buy',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchStock().then(setStock).catch(() => {});
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
          <p className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#C89B3C] mb-4">
            Business 02
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight mb-4">
            Cow dung · Bulk / wholesale
          </h1>
          <p className="text-lg sm:text-xl text-[#C89B3C] font-light mb-4">
            Pre-processed, agriculture-grade cow dung
          </p>
          <p className="max-w-2xl text-base sm:text-lg text-white/80 font-light leading-relaxed mb-8">
            Supplied by weight to industry and commercial growers. Properties of the current lot are listed below and updated with every lot.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => openForm('buy', '', 'I want to buy')}
              className="bg-[#C89B3C] hover:bg-[#b58a32] text-[#122E20] font-semibold text-xs tracking-[0.16em] uppercase px-6 py-3.5 inline-flex items-center justify-center gap-2"
            >
              I want to buy
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => openForm('sell', 'Selling raw cow dung. Location, pincode and approximate monthly quantity: ', 'I want to sell cow dung')}
              className="border border-white/40 hover:border-white text-white font-medium text-xs tracking-[0.16em] uppercase px-6 py-3.5 inline-flex items-center justify-center gap-2"
            >
              I want to sell cow dung
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#4F7D3A] mb-3">Product</p>
            <ul className="space-y-3 text-base text-[#202824]/85 leading-relaxed">
              {productPoints.map((point) => (
                <li key={point} className="flex gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#174A32] shrink-0" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {supplyTags.map((tag) => (
                <span key={tag} className="px-3 py-1.5 rounded-full bg-white border border-black/10 text-xs font-semibold text-[#174A32]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <figure className="rounded-2xl overflow-hidden border border-black/10 bg-white">
              <img src={powderImage} alt="Cow dung powder" className="h-40 w-full object-cover" />
              <figcaption className="px-3 py-2 text-sm font-semibold text-[#174A32]">Powder</figcaption>
            </figure>
            <figure className="rounded-2xl overflow-hidden border border-black/10 bg-white">
              <img src={granulesImage} alt="Cow dung granules" className="h-40 w-full object-cover" />
              <figcaption className="px-3 py-2 text-sm font-semibold text-[#174A32]">Granules</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="bg-white border-y border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#4F7D3A] mb-3">Ordering</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <p className="text-base text-[#202824]/85 leading-relaxed">
              <strong className="text-[#174A32]">Buyers:</strong> choose powder or granules, quantity in 50 kg bags or tons, delivery location and pincode, within India or outside India.
            </p>
            <p className="text-base text-[#202824]/85 leading-relaxed">
              <strong className="text-[#174A32]">Sellers (raw cow dung):</strong> share your location, pincode and approximate monthly quantity.
            </p>
          </div>
          <p className="text-sm text-[#202824]/75 mb-6">
            Ask for the lab report of the current lot with your enquiry.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <button
              type="button"
              onClick={() => openForm('buy', 'Order: powder. Quantity in 50 kg bags or tons. Delivery location, pincode, and within India or outside India: ', 'Order powder')}
              className="bg-[#174A32] hover:bg-[#1f5f40] text-white font-semibold text-xs tracking-[0.14em] uppercase px-6 py-3.5"
            >
              Order powder
            </button>
            <button
              type="button"
              onClick={() => openForm('buy', 'Order: granules. Quantity in 50 kg bags or tons. Delivery location, pincode, and within India or outside India: ', 'Order granules')}
              className="border border-[#174A32] text-[#174A32] hover:bg-[#174A32] hover:text-white font-semibold text-xs tracking-[0.14em] uppercase px-6 py-3.5"
            >
              Order granules
            </button>
            <button
              type="button"
              onClick={() => openForm('report', 'Please share a sample / the lab report of the current lot.', 'Ask for sample / report')}
              className="border border-black/15 text-[#202824] hover:border-[#174A32] font-semibold text-xs tracking-[0.14em] uppercase px-6 py-3.5"
            >
              Ask for sample / report
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#4F7D3A] mb-2">
              Properties of current stock
            </p>
            <h2 className="text-3xl font-bold text-[#174A32]">Lot values</h2>
          </div>
          <div className="flex gap-6 text-sm">
            <p><span className="text-[#202824]/60">Lot:</span> <span className="font-mono font-semibold">{stock.lot || '—'}</span></p>
            <p><span className="text-[#202824]/60">Tested:</span> <span className="font-mono font-semibold">{stock.tested || '—'}</span></p>
          </div>
        </div>

        <div className="bg-white border border-black/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#174A32] text-white text-left">
                <th className="px-4 py-3 font-semibold">Parameter</th>
                <th className="px-4 py-3 font-semibold w-36">Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={2} className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#4F7D3A] bg-[#F7F6F0]">
                  Primary
                </td>
              </tr>
              {stock.primary.map((row, index) => (
                <tr key={`${row.name}-${index}`} className="border-t border-black/5">
                  <td className="px-4 py-3 text-[#202824]">{row.name}</td>
                  <td className="px-4 py-3 font-mono text-[#174A32]">{showValue(row)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} className="px-4 py-2 text-xs font-mono uppercase tracking-wider text-[#4F7D3A] bg-[#F7F6F0] border-t border-black/5">
                  Secondary & micronutrients
                </td>
              </tr>
              {stock.micro.map((row, index) => (
                <tr key={`${row.name}-${index}`} className="border-t border-black/5">
                  <td className="px-4 py-3 text-[#202824]">{row.name}</td>
                  <td className="px-4 py-3 font-mono text-[#174A32]">{showValue(row)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-[#202824]/70 max-w-3xl">
          Values are from the current lot and change lot to lot. Ask for the lab report with your order enquiry.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-12">
          <article className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#4F7D3A] mb-2">
              Industries supplied
            </p>
            <h2 className="text-2xl font-bold text-[#174A32] mb-4">
              Who buys bulk cow dung powder and granules
            </h2>
            <ul className="space-y-2 mb-5">
              {industries.map((name) => (
                <li key={name} className="text-sm text-[#202824]/85">{name}</li>
              ))}
            </ul>
            <a href="/industries" className="inline-flex items-center gap-2 text-sm font-semibold text-[#174A32] hover:text-[#4F7D3A]">
              Industries served
              <ArrowRight className="w-4 h-4" />
            </a>
          </article>

          <article id="retail" className="scroll-mt-28 bg-[#174A32] text-white rounded-2xl p-6 sm:p-8 flex flex-col">
            <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#C89B3C] mb-2">Retail</p>
            <h2 className="text-2xl font-bold mb-3">Organic fertiliser / manure for home gardens</h2>
            <p className="text-sm sm:text-base text-white/85 leading-relaxed mb-6">
              Same processed cow dung, in small packs.
            </p>
            <button
              type="button"
              onClick={() => openForm('buy', 'Retail pack for a home garden. Quantity and delivery pincode: ', 'Buy now')}
              className="mt-auto self-start bg-[#C89B3C] hover:bg-[#b58a32] text-[#122E20] font-semibold text-xs tracking-[0.14em] uppercase px-6 py-3.5"
            >
              Buy now
            </button>
          </article>
        </div>

        <div id="quotation-form" className="mt-12 scroll-mt-28 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#174A32] mb-4">{request.title}</h2>
          <QueryForm
            key={`${request.intent}-${request.message}`}
            source="cow-dung"
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

export default CowDung;
