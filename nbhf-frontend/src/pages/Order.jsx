import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';
import { submitQuery } from '../lib/api';
import { COMPANY_CONFIG } from '../constants/CompanyData';

const PHONE_DISPLAY = COMPANY_CONFIG.phoneDisplay;
const WHATSAPP_NUMBER = COMPANY_CONFIG.phoneDial.replace(/\D/g, '');
const EMAIL = COMPANY_CONFIG.emailMailto;

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

const Order = () => {
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

  useEffect(() => {
    window.scrollTo(0, 0);
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

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202824] flex flex-col font-sans selection:bg-[#174A32] selection:text-white pb-14 md:pb-0">
      <Navbar onOpenQuery={() => { window.location.href = '/contact'; }} />

      <section className="bg-[#122E20] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <p className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#C89B3C] mb-4">
            Buyers & Sellers
          </p>
          <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight mb-4">Place an order</h1>
          <p className="max-w-2xl text-base sm:text-lg text-white/80 font-light leading-relaxed">
            Product, quantity, location and pincode. Reaches us on WhatsApp or email.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full">
        <form
          className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8"
          onSubmit={(event) => event.preventDefault()}
        >
          <h2 className="text-2xl font-bold text-[#174A32] mb-2">Place an order</h2>
          <p className="text-sm text-[#202824]/70 mb-6">
            Choose buy or sell, then send the same details on WhatsApp or email.
          </p>

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
            <button type="button" onClick={() => sendOrder('whatsapp')} className="inline-flex items-center justify-center gap-2 bg-[#174A32] text-white text-xs font-semibold uppercase tracking-[0.14em] px-5 py-3.5">
              <MessageCircle className="w-4 h-4" />
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

      <Footer />
      <MobileContactBar onQueryClick={() => { window.location.href = '/contact'; }} />
    </div>
  );
};

export default Order;
