import { useEffect, useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';
import QueryForm from '../components/QueryForm';
import { COMPANY_CONFIG } from '../constants/CompanyData';

const PHONE_DISPLAY = COMPANY_CONFIG.phoneDisplay;
const PHONE_DIAL = COMPANY_CONFIG.phoneDial;
const EMAIL = COMPANY_CONFIG.emailDisplay;

const linkClass = 'font-semibold text-[#174A32] underline';

const faqs = [
  {
    question: 'What quantities do you supply?',
    answer: (
      <>
        Cow dung powder and granules are packed in 50 kg PP bags and supplied by weight for bulk orders. Post-harvest agri waste (cotton stalk, tur stalk, soyabean residue) is quoted in lots of 1 ton.
      </>
    ),
  },
  {
    question: 'Can I see the properties of the lot before ordering?',
    answer: (
      <>
        Yes. The properties of the current stock are published on the{' '}
        <a href="/products/cow-dung" className={linkClass}>cow dung page</a>
        . Ask for the lab report with your order enquiry.
      </>
    ),
  },
  {
    question: 'Do you supply outside India?',
    answer: (
      <>
        Yes. Cow dung powder and granules are offered within India and outside India. Share the destination and quantity in the{' '}
        <a href="/order" className={linkClass}>order form</a>
        {' '}for a quotation.
      </>
    ),
  },
  {
    question: 'Can the cow dung product be customised for my application?',
    answer: (
      <>
        Customised bio-fortification is available to help break down specific heavy minerals / metals. State the target use (for example ETP or biogas feedstock) in your enquiry.
      </>
    ),
  },
  {
    question: 'What is the difference between bulk and retail?',
    answer: (
      <>
        Bulk is agriculture-grade powder or granules in 50 kg PP bags, sold by weight to industry and commercial growers. Retail is the same processed cow dung in small packs for home gardens. Order either through the{' '}
        <a href="/order" className={linkClass}>order form</a>
        .
      </>
    ),
  },
  {
    question: 'I am a farmer with crop residue or cow dung to sell. What do I do?',
    answer: (
      <>
        Use{' '}
        <a href="/products/agri-waste" className={linkClass}>I want to sell</a>
        {' '}and give your village or town, pincode and approximate quantity, or call / WhatsApp{' '}
        <a href={`tel:${PHONE_DIAL}`} className={linkClass}>{PHONE_DISPLAY}</a>
        . NBHF will contact you.
      </>
    ),
  },
  {
    question: 'How do I place an order?',
    answer: (
      <>
        Fill the{' '}
        <a href="/order" className={linkClass}>order form</a>
        {' '}(it sends your details to us on WhatsApp or email), or contact us directly:{' '}
        <a href={`tel:${PHONE_DIAL}`} className={linkClass}>{PHONE_DISPLAY}</a>
        {' '}(call or{' '}
        <a href="https://wa.me/919136984957" target="_blank" rel="noopener noreferrer" className={linkClass}>WhatsApp</a>
        ) ·{' '}
        <a href={`mailto:${EMAIL}`} className={linkClass}>{EMAIL}</a>
        .
      </>
    ),
  },
  {
    question: 'Where is NBHF located?',
    answer: (
      <>
        Fefarwada and Wadhona villages, Vidarbha region, Maharashtra. See{' '}
        <a href="/contact#visit" className={linkClass}>Visit us</a>
        .
      </>
    ),
  },
];

const Faqs = () => {
  const [request, setRequest] = useState({
    intent: 'general',
    message: '',
    title: 'Write a query',
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

      <section className="bg-[#122E20] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#C89B3C] mb-4">
            Help
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extralight tracking-tight mb-4">
            FAQs
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl text-white/80 font-light leading-relaxed">
            Ordering, quantities and supply
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#174A32] mb-4 max-w-3xl">
          Ordering, quantities and supply
        </h2>
        <p className="max-w-3xl text-base text-[#202824]/85 leading-relaxed mb-8">
          If your question is not here,{' '}
          <button type="button" onClick={() => openForm('general', '', 'Write a query')} className={linkClass}>
            write a query
          </button>
          {' '}or call{' '}
          <a href={`tel:${PHONE_DIAL}`} className={linkClass}>{PHONE_DISPLAY}</a>
          .
        </p>

        <div className="max-w-3xl space-y-3">
          {faqs.map((item) => (
            <article key={item.question} className="bg-white border border-black/10 rounded-2xl p-6 sm:p-7">
              <h3 className="text-lg font-bold text-[#174A32]">{item.question}</h3>
              <p className="mt-2 text-sm sm:text-base text-[#202824]/85 leading-relaxed">{item.answer}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <a href={`tel:${PHONE_DIAL}`} className="inline-flex items-center gap-2 font-semibold text-[#174A32]">
            <Phone className="w-4 h-4" />
            {PHONE_DISPLAY}
          </a>
          <a
            href="https://wa.me/919136984957"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-[#174A32]"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>
        </div>

        <div id="quotation-form" className="mt-12 scroll-mt-28 max-w-3xl">
          <h2 className="text-2xl font-bold text-[#174A32] mb-4">{request.title}</h2>
          <QueryForm
            key={`${request.intent}-${request.message}`}
            source="faqs"
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

export default Faqs;
