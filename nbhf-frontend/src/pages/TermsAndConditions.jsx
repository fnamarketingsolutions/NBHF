import React, { useEffect } from 'react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';

const goToQuery = () => {
  window.location.href = '/contact';
};

const TermsAndConditions = () => {
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
            Legal & Operations
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-gray-300 mt-2">
            Last Updated: October 2026 | NBHF Bioharvest Fuels          </p>
        </div>
      </div>

      {/* Full-width Content aligned with the Navbar container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        
        {/* Intro */}
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed border-b border-[#E2E8DE] pb-6">
          These Terms and Conditions govern your use of the NBHF (Bioharvest Fuels) website and the purchase of our bio-harvest products, organic cow dung compost, biomass fuel briquettes, and related agricultural supplies. By accessing our platform or placing an order, you agree to abide by these terms.
        </p>

        {/* Section 1 */}
        <div className="py-6 border-b border-[#E2E8DE]">
          <h2 className="text-xl font-bold text-[#0F3822] mb-3">
            1. Product Specifications & Natural Variations
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Because our offerings are sourced from natural organic bio-harvest materials:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 pl-2">
            <li>
              <strong className="text-gray-900">Assay & Lab Indices:</strong> Published nutrient metrics (such as Nitrogen, Phosphorus, Potassium, Organic Carbon, and micronutrients) reflect average lot harvest assays and laboratory testing benchmarks.
            </li>
            <li>
              <strong className="text-gray-900">Natural Batch Tolerance:</strong> Moisture content, texture, and natural color may have slight variations across harvest lots due to weather and natural composting cycles.
            </li>
            <li>
              <strong className="text-gray-900">Intended Usage:</strong> Products must be stored in dry, well-ventilated areas and utilized solely according to standard agricultural, composting, or biomass fuel best practices.
            </li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="py-6 border-b border-[#E2E8DE]">
          <h2 className="text-xl font-bold text-[#0F3822] mb-3">
            2. Orders, Pricing & Payment
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            All commercial transactions are processed under the following rules:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 pl-2">
            <li>
              <strong className="text-gray-900">Order Acceptance:</strong> Receipt of an order confirmation does not signify our final acceptance; we reserve the right to verify bulk freight feasibility and stock availability prior to dispatch.
            </li>
            <li>
              <strong className="text-gray-900">Pricing & Taxes:</strong> All stated prices are subject to applicable taxes, freight charges, and statutory duties calculated during checkout or bulk quoting.
            </li>
            <li>
              <strong className="text-gray-900">Payment Clearance:</strong> Orders will only be processed and queued for dispatch once full payment has been confirmed through our secure payment gateway.
            </li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="py-6 border-b border-[#E2E8DE]">
          <h2 className="text-xl font-bold text-[#0F3822] mb-3">
            3. Shipping, Freight & Bulk Delivery
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            We partner with third-party carriers to deliver packaged and bulk goods:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 pl-2">
            <li>
              <strong className="text-gray-900">Unloading Access:</strong> Customers ordering truckload or bulk farm deliveries are responsible for providing clear, safe road access and unloading space.
            </li>
            <li>
              <strong className="text-gray-900">Estimated Timelines:</strong> Dispatch and transit dates are estimates. We are not liable for transit delays caused by regional road restrictions, adverse weather, or carrier disruptions.
            </li>
            <li>
              <strong className="text-gray-900">Inspection on Arrival:</strong> Inspect your bags, pallets, or bulk shipment upon receipt before signing the transport manifest.
            </li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="py-6 border-b border-[#E2E8DE]">
          <h2 className="text-xl font-bold text-[#0F3822] mb-3">
            4. Returns, Replacements & Cancellations
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Due to the perishable and bulk nature of agricultural bio-harvest products:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 pl-2">
            <li>
              <strong className="text-gray-900">Cancellation Window:</strong> Orders may only be canceled prior to truck dispatch or warehouse pallet loading.
            </li>
            <li>
              <strong className="text-gray-900">Damaged Goods:</strong> Any transit-damaged packaging or incorrect product deliveries must be reported within 48 hours of receipt with photo evidence.
            </li>
            <li>
              <strong className="text-gray-900">Non-Returnable Items:</strong> Open bags, exposed bulk compost piles, and used fuel briquettes cannot be returned for safety and bio-security reasons.
            </li>
          </ul>
        </div>

        {/* Section 5 */}
        <div className="py-6 border-b border-[#E2E8DE]">
          <h2 className="text-xl font-bold text-[#0F3822] mb-3">
            5. Limitation of Liability
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            To the maximum extent permitted by applicable laws:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 pl-2">
            <li>NBHF is not liable for crop yield shortfalls, soil imbalances, or combustion output resulting from improper storage, over-application, or external environmental factors.</li>
            <li>Our total liability for any claim shall not exceed the purchase price paid for the specific lot or order in question.</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="pt-6">
          <h2 className="text-xl font-bold text-[#0F3822] mb-3">
            6. Contact & Disputes
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            For questions regarding these terms, contract farming orders, or dispatch disputes:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-2">
            <li><strong className="text-gray-900">Company:</strong> NBHF (Bioharvest Fuels)</li>
            <li><strong className="text-gray-900">Support Email:</strong> customercare@nasarebioharvest.com</li>
            <li><strong className="text-gray-900">Support Hours:</strong> Monday – Saturday (Standard Business Hours)</li>
          </ul>
        </div>

      </div>
      <Footer />
      <MobileContactBar onQueryClick={goToQuery} />
    </div>
  );
};

export default TermsAndConditions;