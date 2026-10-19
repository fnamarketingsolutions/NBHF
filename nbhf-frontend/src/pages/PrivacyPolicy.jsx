import React, { useEffect } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';

const goToQuery = () => {
  window.location.href = '/contact';
};

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#2D3748] flex flex-col font-sans pb-14 md:pb-0">
      <Navbar onOpenQuery={goToQuery} />
      
      {/* Top Banner / Heading with Small Background matching navbar width */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4">
        <div className="bg-[#0F3822] rounded-lg px-6 py-8 text-white shadow-sm">
          <p className="text-xs uppercase tracking-wider text-[#A3C9A8] font-semibold mb-1">
            Legal & Compliance
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">
            Effective Date: October 2026 | NBHF Bioharvest Fuels          </p>
        </div>
      </div>

      {/* Full-width Content aligned with the Navbar container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Intro */}
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed border-b border-[#E2E8DE] pb-6">
          At NBHF (Bioharvest Fuels), we value your privacy and trust. This Privacy Policy explains how we collect, handle, and protect your information when you browse our website, request laboratory testing lot reports, or purchase our bio-harvest and organic cow dung products.
        </p>

        {/* Section 1 */}
        <div className="py-6 border-b border-[#E2E8DE]">
          <h2 className="text-xl font-bold text-[#0F3822] mb-3">
            1. Information We Collect
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            We only collect the required details necessary to fulfill orders, arrange freight dispatch, and provide customer support:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 pl-2">
            <li>
              <strong className="text-gray-900">Contact & Delivery Data:</strong> Full name, phone number, email address, farm/business name, and complete shipping address.
            </li>
            <li>
              <strong className="text-gray-900">Order Information:</strong> Products selected, bulk volume/quantity, invoice records, and delivery notes.
            </li>
            <li>
              <strong className="text-gray-900">Payment Details:</strong> Processed through encrypted third-party payment gateways; we never store your debit/credit card numbers.
            </li>
            <li>
              <strong className="text-gray-900">Device & Usage Data:</strong> IP address, device type, and visit metrics to ensure site speed and security.
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="py-6 border-b border-[#E2E8DE]">
          <h2 className="text-xl font-bold text-[#0F3822] mb-3">
            2. How We Use Your Information
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Your personal information is used strictly for operational and order fulfillment purposes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 pl-2">
            <li>To process, pack, and transport bulk bio-harvest, compost, and fuel briquette orders.</li>
            <li>To share lot test specifications, moisture percentages, and micronutrient sheets upon request.</li>
            <li>To send order confirmation receipts, tax invoices, and shipment tracking updates.</li>
            <li>To provide timely customer assistance and coordinate dispatch delivery slots.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="py-6 border-b border-[#E2E8DE]">
          <h2 className="text-xl font-bold text-[#0F3822] mb-3">
            3. Sharing Your Information
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            We do not sell, rent, or trade your data. Information is only shared with essential logistics and service providers:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 pl-2">
            <li>
              <strong className="text-gray-900">Freight & Logistics Carriers:</strong> Shared solely to transport and offload products at your specified location.
            </li>
            <li>
              <strong className="text-gray-900">Payment Gateways:</strong> Shared securely to verify, authorize, and process payment transactions.
            </li>
            <li>
              <strong className="text-gray-900">Legal Compliance:</strong> Shared only when mandated by applicable tax, transportation, or agricultural regulations.
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="py-6 border-b border-[#E2E8DE]">
          <h2 className="text-xl font-bold text-[#0F3822] mb-3">
            4. Data Security & Storage
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            We follow standard security measures to protect your account and transaction details:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 pl-2">
            <li>All data transmissions across the site are secured through SSL encryption.</li>
            <li>Access to customer records is strictly limited to authorized dispatch and billing personnel.</li>
            <li>Data is retained only as long as necessary to comply with accounting and statutory requirements.</li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="py-6 border-b border-[#E2E8DE]">
          <h2 className="text-xl font-bold text-[#0F3822] mb-3">
            5. Your Rights
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            You maintain full rights over your stored personal data:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 pl-2">
            <li>Request a copy of the personal details stored with us.</li>
            <li>Request corrections to any inaccurate shipping or contact records.</li>
            <li>Request deletion of your profile data (subject to active invoicing rules).</li>
            <li>Opt out of non-transactional marketing communications at any point.</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="pt-6">
          <h2 className="text-xl font-bold text-[#0F3822] mb-3">
            6. Contact Us
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            For any privacy inquiries, dispatch corrections, or report requests, reach out directly:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-2">
            <li><strong className="text-gray-900">Company:</strong> NBHF (Bioharvest Fuels)</li>
            <li><strong className="text-gray-900">Email:</strong> customercare@nasarebioharvest.com</li>
            <li><strong className="text-gray-900">Support:</strong> Lot testing certificates, order queries, and bulk bookings</li>
          </ul>
        </div>

      </div>
      <Footer />
      <MobileContactBar onQueryClick={goToQuery} />
    </div>
  );
};

export default PrivacyPolicy;