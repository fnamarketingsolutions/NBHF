import React, { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Copy, Check } from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';
import { submitQuery } from '../lib/api';

const PHONE_DISPLAY = '+91 91369 84957';
const PHONE_DIAL = '+919136984957';
const WHATSAPP_NUMBER = '919136984957';
const EMAIL = 'Customercare@nasarebioharvest.com';
const ADDRESS = 'Fefarwada & Wadhona villages, Vidarbha region, Maharashtra';

const products = [
  'Cow dung powder — bulk, 50 kg PP bags',
  'Cow dung granules — bulk, 50 kg PP bags',
  'Cow dung — retail packs',
  'Cotton stalk — 1-ton lots',
  'Tur stalk — 1-ton lots',
  'Soyabean residue — 1-ton lots',
  'Bagasse — on enquiry',
];

const units = ['50 kg bags', 'Tons', '1-ton lots'];

const topics = [
  'Cow dung — bulk',
  'Cow dung — retail',
  'Agricultural waste',
  'Sample / lab report',
  'Bio-fortification',
  'Export',
  'General',
];

const fieldClass =
  'w-full bg-white border border-black/15 px-3 py-2.5 text-sm text-[#202824] focus:outline-none focus:border-[#174A32]';

const labelClass = 'block text-xs font-mono uppercase text-[#202824]/70 mb-1 font-semibold';

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

function ReadyNote({ message }) {
  if (!message) return null;

  return (
    <div className="mt-4 border border-[#174A32]/20 bg-[#F7F6F0] p-4">
      <p className="text-sm text-[#202824]/85 leading-relaxed">
        Message ready. If the app did not open, copy and send it to {PHONE_DISPLAY}.
      </p>
      <div className="mt-3">
        <CopyButton value={message} />
      </div>
    </div>
  );
}

function openWhatsApp(text) {
  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,
    '_blank',
    'noopener,noreferrer'
  );
}

function openEmail(subject, text) {
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}

const Contact = () => {
  const [order, setOrder] = useState({
    intent: 'Buy',
    product: products[0],
    quantity: '',
    unit: '50 kg bags',
    location: '',
    pincode: '',
    delivery: 'Within India',
    name: '',
    phone: '',
    company: '',
    notes: '',
  });
  const [orderError, setOrderError] = useState('');
  const [orderMessage, setOrderMessage] = useState('');

  const [query, setQuery] = useState({
    name: '',
    phone: '',
    topic: topics[0],
    message: '',
  });
  const [queryError, setQueryError] = useState('');
  const [queryMessage, setQueryMessage] = useState('');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    const target = ['query', 'order', 'visit'].includes(hash) ? hash : '';
    if (target) {
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  const buildOrderMessage = () =>
    [
      'NBHF order',
      `I want to: ${order.intent}`,
      `Product: ${order.product}`,
      `Quantity: ${order.quantity} ${order.unit}`,
      `Location: ${order.location}`,
      `Pincode: ${order.pincode}`,
      `Delivery: ${order.delivery}`,
      `Name: ${order.name}`,
      `Phone: +91 ${order.phone.trim()}`,
      order.company.trim() ? `Company / farm: ${order.company.trim()}` : '',
      order.notes.trim() ? `Notes: ${order.notes.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n');

  const buildQueryMessage = () =>
    [
      'NBHF query',
      `Name: ${query.name}`,
      `Phone: +91 ${query.phone.trim()}`,
      `Topic: ${query.topic}`,
      `Query: ${query.message.trim()}`,
    ].join('\n');

  const sendOrder = async (channel) => {
    if (!order.quantity.trim() || !order.location.trim() || !order.pincode.trim() || !order.name.trim() || !order.phone.trim()) {
      setOrderError('Please add quantity, location, pincode, your name and phone.');
      return;
    }
    setOrderError('');
    const text = buildOrderMessage();
    try {
      await submitQuery({
        name: order.name.trim(),
        company: order.company.trim(),
        phone: `+91 ${order.phone.trim()}`,
        message: order.notes.trim(),
        source: 'contact',
        intent: order.intent === 'Sell' ? 'sell' : 'buy',
        title: 'Place an order',
        details: {
          product: order.product,
          quantity: `${order.quantity.trim()} ${order.unit}`,
          location: order.location.trim(),
          pincode: order.pincode.trim(),
          delivery: order.delivery,
        },
      });
    } catch (err) {
      setOrderError(err.message || 'Could not save your order.');
      return;
    }
    setOrderMessage(text);
    if (channel === 'whatsapp') openWhatsApp(text);
    else openEmail(`NBHF order — ${order.intent}`, text);
  };

  const sendQuery = async (channel) => {
    if (!query.name.trim() || !query.phone.trim() || !query.message.trim()) {
      setQueryError('Please add your name, phone and query.');
      return;
    }
    setQueryError('');
    const text = buildQueryMessage();
    try {
      await submitQuery({
        name: query.name.trim(),
        phone: `+91 ${query.phone.trim()}`,
        message: query.message.trim(),
        source: 'contact',
        intent: 'general',
        title: 'Write a query',
        details: { topic: query.topic },
      });
    } catch (err) {
      setQueryError(err.message || 'Could not save your query.');
      return;
    }
    setQueryMessage(text);
    if (channel === 'whatsapp') openWhatsApp(text);
    else openEmail(`NBHF query — ${query.topic}`, text);
  };

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202824] flex flex-col font-sans selection:bg-[#174A32] selection:text-white pb-14 md:pb-0">
      <Navbar onOpenQuery={() => document.getElementById('query')?.scrollIntoView({ behavior: 'smooth' })} />

      <section className="bg-[#122E20] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#C89B3C] mb-4">Contact</p>
          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight mb-4">Reach NBHF</h1>
          <p className="max-w-2xl text-base sm:text-lg text-white/80 font-light leading-relaxed">
            One number for calls and WhatsApp, one email. Or send your requirement through the form; it opens as a ready message to us.
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

      <section id="order" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 w-full scroll-mt-28">
        <form
          className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <h2 className="text-2xl font-bold text-[#174A32] mb-6">Place an order</h2>

          <fieldset className="mb-5">
            <legend className={labelClass}>I want to</legend>
            <div className="flex gap-2">
              {['Buy', 'Sell'].map((choice) => (
                <button
                  key={choice}
                  type="button"
                  onClick={() => setOrder((prev) => ({ ...prev, intent: choice }))}
                  className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border ${
                    order.intent === choice
                      ? 'bg-[#174A32] text-white border-[#174A32]'
                      : 'bg-white text-[#174A32] border-black/15'
                  }`}
                >
                  {choice}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="product" className={labelClass}>Product</label>
              <select
                id="product"
                value={order.product}
                onChange={(event) => setOrder((prev) => ({ ...prev, product: event.target.value }))}
                className={fieldClass}
              >
                {products.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="quantity" className={labelClass}>Quantity</label>
              <input
                id="quantity"
                value={order.quantity}
                onChange={(event) => setOrder((prev) => ({ ...prev, quantity: event.target.value }))}
                placeholder="e.g. 20"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="unit" className={labelClass}>Unit</label>
              <select
                id="unit"
                value={order.unit}
                onChange={(event) => setOrder((prev) => ({ ...prev, unit: event.target.value }))}
                className={fieldClass}
              >
                {units.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="location" className={labelClass}>Location (village / town, district)</label>
              <input
                id="location"
                value={order.location}
                onChange={(event) => setOrder((prev) => ({ ...prev, location: event.target.value }))}
                placeholder="e.g. Hinganghat, Wardha"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="pincode" className={labelClass}>Pincode</label>
              <input
                id="pincode"
                value={order.pincode}
                onChange={(event) => setOrder((prev) => ({ ...prev, pincode: event.target.value }))}
                placeholder="442301"
                inputMode="numeric"
                className={fieldClass}
              />
            </div>
            <fieldset className="sm:col-span-2">
              <legend className={labelClass}>Delivery</legend>
              <div className="flex flex-wrap gap-4 text-sm">
                {['Within India', 'Outside India'].map((choice) => (
                  <label key={choice} className="inline-flex items-center gap-2">
                    <input
                      type="radio"
                      name="delivery"
                      checked={order.delivery === choice}
                      onChange={() => setOrder((prev) => ({ ...prev, delivery: choice }))}
                    />
                    {choice}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="order-name" className={labelClass}>Your name</label>
              <input
                id="order-name"
                value={order.name}
                onChange={(event) => setOrder((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Name"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="order-phone" className={labelClass}>Phone (for call back)</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-black/15 bg-[#F7F6F0] text-sm font-mono">+91</span>
                <input
                  id="order-phone"
                  value={order.phone}
                  onChange={(event) => setOrder((prev) => ({ ...prev, phone: event.target.value }))}
                  inputMode="tel"
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="company" className={labelClass}>Company / farm (optional)</label>
              <input
                id="company"
                value={order.company}
                onChange={(event) => setOrder((prev) => ({ ...prev, company: event.target.value }))}
                placeholder="Company or farm name"
                className={fieldClass}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="notes" className={labelClass}>Notes (optional)</label>
              <textarea
                id="notes"
                rows={3}
                value={order.notes}
                onChange={(event) => setOrder((prev) => ({ ...prev, notes: event.target.value }))}
                placeholder="Timeline, sample, bio-fortification, lab report"
                className={fieldClass}
              />
            </div>
          </div>

          {orderError && <p className="mt-4 text-sm text-red-700">{orderError}</p>}

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={() => sendOrder('whatsapp')} className="bg-[#174A32] text-white text-xs font-semibold uppercase tracking-[0.14em] px-5 py-3.5">
              Send on WhatsApp
            </button>
            <button type="button" onClick={() => sendOrder('email')} className="border border-[#174A32] text-[#174A32] text-xs font-semibold uppercase tracking-[0.14em] px-5 py-3.5">
              Send by email
            </button>
          </div>
          <p className="mt-3 text-xs text-[#202824]/65">
            Saved for the NBHF admin panel, then WhatsApp or email opens with the same details.
          </p>
          <ReadyNote message={orderMessage} />
        </form>
      </section>

      <section id="query" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full scroll-mt-28">
        <form
          className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <h2 className="text-2xl font-bold text-[#174A32] mb-6">Write a query</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="query-name" className={labelClass}>Your name</label>
              <input
                id="query-name"
                value={query.name}
                onChange={(event) => setQuery((prev) => ({ ...prev, name: event.target.value }))}
                placeholder="Name"
                className={fieldClass}
              />
            </div>
            <div>
              <label htmlFor="query-phone" className={labelClass}>Phone (for call back)</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 border border-r-0 border-black/15 bg-[#F7F6F0] text-sm font-mono">+91</span>
                <input
                  id="query-phone"
                  value={query.phone}
                  onChange={(event) => setQuery((prev) => ({ ...prev, phone: event.target.value }))}
                  inputMode="tel"
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="topic" className={labelClass}>Topic</label>
              <select
                id="topic"
                value={query.topic}
                onChange={(event) => setQuery((prev) => ({ ...prev, topic: event.target.value }))}
                className={fieldClass}
              >
                {topics.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="query-text" className={labelClass}>Your query</label>
              <textarea
                id="query-text"
                rows={4}
                value={query.message}
                onChange={(event) => setQuery((prev) => ({ ...prev, message: event.target.value }))}
                placeholder="Write your question"
                className={fieldClass}
              />
            </div>
          </div>

          {queryError && <p className="mt-4 text-sm text-red-700">{queryError}</p>}

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <button type="button" onClick={() => sendQuery('whatsapp')} className="bg-[#174A32] text-white text-xs font-semibold uppercase tracking-[0.14em] px-5 py-3.5">
              Send on WhatsApp
            </button>
            <button type="button" onClick={() => sendQuery('email')} className="border border-[#174A32] text-[#174A32] text-xs font-semibold uppercase tracking-[0.14em] px-5 py-3.5">
              Send by email
            </button>
          </div>
          <p className="mt-3 text-xs text-[#202824]/65">
            Saved for the NBHF admin panel, then WhatsApp or email opens with the same details.
          </p>
          <ReadyNote message={queryMessage} />
        </form>
      </section>

      <Footer />
      <MobileContactBar onQueryClick={() => document.getElementById('query')?.scrollIntoView({ behavior: 'smooth' })} />
    </div>
  );
};

export default Contact;
