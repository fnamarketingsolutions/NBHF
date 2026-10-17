import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { submitQuery } from '../lib/api';

const QueryForm = ({
  initialInterest = 'general',
  initialMessage = '',
  source = 'general',
  title = '',
  showInterest = true,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    interest: 'General Query',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const interest =
      initialInterest === 'buy' ? 'Buy' :
      initialInterest === 'sell' ? 'Sell' :
      initialInterest === 'report' ? 'Product Information' :
      'General Query';

    setFormData(prev => ({
      ...prev,
      interest,
      ...(initialMessage ? { message: initialMessage } : {}),
    }));
  }, [initialInterest, initialMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setError('Please provide your name and phone number.');
      return;
    }
    const intent =
      formData.interest === 'Buy' ? 'buy' :
      formData.interest === 'Sell' ? 'sell' :
      formData.interest === 'Product Information' ? 'report' :
      'general';

    setError('');
    setSending(true);
    try {
      await submitQuery({
        name: formData.name,
        company: formData.company,
        phone: formData.phone,
        email: formData.email,
        message: formData.message,
        source,
        intent,
        title,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Could not send your query.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-[#F7F6F0] border border-black/10 p-6 sm:p-8 rounded-none">
      {submitted ? (
        <div className="py-12 text-center">
          <CheckCircle2 className="w-12 h-12 text-[#4F7D3A] mx-auto mb-4" />
          <h4 className="text-xl font-bold text-[#174A32] mb-2">Query Received</h4>
          <p className="text-sm text-[#202824]/80 max-w-sm mx-auto">
            Thank you. NBHF commercial operations will contact you directly at <span className="font-mono">{formData.phone}</span>.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-6 text-xs font-bold uppercase tracking-wider text-[#174A32] underline hover:text-[#4F7D3A]"
          >
            Submit Another Query
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs font-mono uppercase text-[#202824]/80 mb-1 font-semibold">
                Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-white border border-black/15 px-3 py-2.5 text-sm text-[#202824] rounded-none focus:outline-none focus:border-[#174A32]"
              />
            </div>
            <div>
              <label htmlFor="company" className="block text-xs font-mono uppercase text-[#202824]/80 mb-1 font-semibold">
                Company
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                className="w-full bg-white border border-black/15 px-3 py-2.5 text-sm text-[#202824] rounded-none focus:outline-none focus:border-[#174A32]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-xs font-mono uppercase text-[#202824]/80 mb-1 font-semibold">
                Phone *
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-white border border-black/15 px-3 py-2.5 text-sm font-mono text-[#202824] rounded-none focus:outline-none focus:border-[#174A32]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-mono uppercase text-[#202824]/80 mb-1 font-semibold">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white border border-black/15 px-3 py-2.5 text-sm text-[#202824] rounded-none focus:outline-none focus:border-[#174A32]"
              />
            </div>
          </div>

          {showInterest && (
            <div>
              <label htmlFor="interest" className="block text-xs font-mono uppercase text-[#202824]/80 mb-1 font-semibold">
                I am interested in:
              </label>
              <select
                id="interest"
                name="interest"
                value={formData.interest}
                onChange={handleChange}
                className="w-full bg-white border border-black/15 px-3 py-2.5 text-sm text-[#202824] rounded-none focus:outline-none focus:border-[#174A32]"
              >
                <option value="Buy">Buy (Agricultural residues / Cow dung products)</option>
                <option value="Sell">Sell (Residues or feedstock supply)</option>
                <option value="Product Information">Product Information & Testing</option>
                <option value="General Query">General Query</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="message" className="block text-xs font-mono uppercase text-[#202824]/80 mb-1 font-semibold">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="State quantity, location, or product requirements..."
              className="w-full bg-white border border-black/15 p-3 text-sm text-[#202824] rounded-none focus:outline-none focus:border-[#174A32]"
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="w-full bg-[#174A32] hover:bg-[#4F7D3A] disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-4 transition-colors flex items-center justify-center space-x-2 rounded-none shadow-sm"
          >
            <span>{sending ? 'SENDING' : 'SEND QUERY'}</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      )}
    </div>
  );
};

export default QueryForm;