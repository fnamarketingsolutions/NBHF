import { useEffect, useState } from 'react';
import { Phone, MapPin, MessageCircle, Copy, Check } from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';
import { COMPANY_CONFIG } from '../constants/CompanyData';

const PHONE_DISPLAY = COMPANY_CONFIG.phoneDisplay;
const PHONE_DIAL = COMPANY_CONFIG.phoneDial;
const WHATSAPP_NUMBER = COMPANY_CONFIG.phoneDial.replace(/\D/g, '');
const EMAIL = COMPANY_CONFIG.emailDisplay;
const ADDRESS = 'Fefarwada & Wadhona villages, Vidarbha region, Maharashtra';

const openQuery = () => {
  window.location.href = '/#contact';
};

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#174A32] border border-black/10 px-2.5 py-1 hover:bg-[#F7F6F0]"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

const Contact = () => {
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'order') {
      window.location.replace('/order');
      return;
    }
    if (hash === 'query') {
      window.location.replace('/#contact');
      return;
    }
    if (hash === 'visit') {
      document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202824] flex flex-col font-sans selection:bg-[#174A32] selection:text-white pb-14 md:pb-0">
      <Navbar onOpenQuery={openQuery} />

      <section className="bg-[#122E20] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#C89B3C] mb-4">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight mb-4">Reach Nasare BioHarvest Fuels Pvt Ltd</h1>
          <p className="max-w-2xl text-base sm:text-lg text-white/80 font-light leading-relaxed">
            One number for calls and WhatsApp, one email.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <article className="bg-white border border-black/10 rounded-2xl p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-[#4F7D3A] font-bold mb-2">Phone · WhatsApp</p>
            <div className="flex items-center justify-between gap-3">
              <a href={`tel:${PHONE_DIAL}`} className="text-lg font-semibold text-[#174A32]">{PHONE_DISPLAY}</a>
              <CopyButton value={PHONE_DISPLAY} />
            </div>
          </article>
          <article className="bg-white border border-black/10 rounded-2xl p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-[#4F7D3A] font-bold mb-2">Email</p>
            <div className="flex items-center justify-between gap-3">
              <a href={`mailto:${EMAIL}`} className="text-lg font-semibold text-[#174A32] break-all">{EMAIL}</a>
              <CopyButton value={EMAIL} />
            </div>
          </article>
          <article id="visit" className="scroll-mt-28 bg-white border border-black/10 rounded-2xl p-6">
            <p className="text-xs font-mono uppercase tracking-wider text-[#4F7D3A] font-bold mb-2">Visit us</p>
            <p className="text-base font-medium text-[#174A32] leading-snug flex gap-2">
              <MapPin className="w-4 h-4 mt-1 shrink-0 text-[#C89B3C]" />
              <span>{ADDRESS}</span>
            </p>
          </article>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#174A32] text-white text-xs font-semibold uppercase tracking-[0.14em] px-6 py-3.5"
          >
            <MessageCircle className="w-4 h-4" />
            Chat on WhatsApp
          </a>
          <a
            href={`tel:${PHONE_DIAL}`}
            className="inline-flex items-center justify-center gap-2 border border-[#174A32] text-[#174A32] text-xs font-semibold uppercase tracking-[0.14em] px-6 py-3.5"
          >
            <Phone className="w-4 h-4" />
            Call now
          </a>
        </div>
        <p className="mt-3 text-sm text-[#202824]/70">Visiting? Call ahead so someone is at the site.</p>
      </section>

      <Footer />
      <MobileContactBar onQueryClick={openQuery} />
    </div>
  );
};

export default Contact;
