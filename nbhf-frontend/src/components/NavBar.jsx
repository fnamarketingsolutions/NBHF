import { useState } from 'react';
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MessageCircle, 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import logo from "../assets/logo_transparent.png";
import { COMPANY_CONFIG } from '../constants/CompanyData';

const Navbar = ({ onOpenQuery }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Industries served", href: "/industries" },
    { label: "About NBHF", href: "/about" },
    { label: "FAQs", href: "/faqs" },
    { label: "Contact", href: "/contact" },
  ];

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 shadow-sm">
      {/* ========================================================================= */}
      {/* 1. UPPER TIER BAR (bg-[#174A32])                                          */}
      {/* ========================================================================= */}
      <div className="hidden xl:block bg-[#174A32] text-white border-b border-black/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
          <div className="flex justify-between items-center text-xs">
            
            {/* Upper Left: Company Name & Subtitle */}
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white flex items-center gap-1.5">
                Nasare BioHarvest Fuels Pvt Ltd 
              </span>
              <span className="text-[11px] font-medium text-[#A3D9A5] tracking-wide mt-0.5">
                Environmentally sustainable • Farmer friendly
              </span>
            </div>

            {/* Upper Right: Stacked Contacts */}
            <div className="flex flex-col space-y-1 items-end font-sans text-[11px]">
              <a
                href={`tel:${COMPANY_CONFIG.phoneDial}`}
                className="flex items-center space-x-1.5 text-white/90 hover:text-[#C89B3C] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>{COMPANY_CONFIG.phoneDisplay}</span>
              </a>

              <a
                href="https://wa.me/919136984957"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-white/90 hover:text-[#4ADE80] transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#4ADE80]" />
                <span>WhatsApp: {COMPANY_CONFIG.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${COMPANY_CONFIG.emailMailto}`}
                className="flex items-center space-x-1.5 text-white/90 hover:text-[#C89B3C] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#C89B3C]" />
                <span>{COMPANY_CONFIG.emailDisplay}</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. LOWER TIER BAR (bg-white)                                              */}
      {/* ========================================================================= */}
      <div className="bg-white/95 backdrop-blur-md border-b border-black/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 min-w-0">
              <div className="w-11 h-11 shrink-0 rounded-lg flex items-center justify-center">
                <img src={logo} alt="" className="w-full h-full object-contain" />
              </div>
              <span className="font-bold text-sm sm:text-base leading-tight text-[#174A32] xl:hidden">
                {COMPANY_CONFIG.name}
              </span>
              <span className="hidden xl:block font-black text-2xl tracking-tighter text-[#174A32] leading-none">
                {COMPANY_CONFIG.shortName}
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden xl:flex items-center space-x-8 text-sm font-semibold text-[#202824]">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`hover:text-[#174A32] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-[#C89B3C] after:transition-all ${
                    (link.href === "/products" ? pathname.startsWith("/products") : pathname === link.href) ? "text-[#174A32] after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile View Controls */}
            <div className="xl:hidden flex items-center space-x-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="p-2 text-[#202824] hover:text-[#174A32] hover:bg-[#F7F6F0] rounded-md transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE MENU DRAWER (Slide Down)                                       */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="xl:hidden bg-white border-b border-black/10 overflow-hidden shadow-lg"
          >
            <div className="px-5 pt-3 pb-6 space-y-4">
              
              {/* Company Info Box */}
              <div className="p-3 bg-[#174A32] text-white rounded-md">
                <p className="text-xs font-bold">Nasare BioHarvest Fuels Pvt Ltd</p>
                <p className="text-[11px] text-[#A3D9A5] mt-0.5">
                  Environmentally sustainable • Farmer friendly
                </p>
              </div>

              {/* Menu Links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleMobileNavClick}
                    className="block px-3 py-2 text-sm font-semibold text-[#202824] hover:bg-[#F7F6F0] hover:text-[#174A32] rounded-md transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Contact Links */}
              <div className="pt-3 border-t border-black/10 space-y-2 text-xs font-sans">
                <a
                  href={`tel:${COMPANY_CONFIG.phoneDial}`}
                  className="flex items-center space-x-2 text-[#202824] hover:text-[#174A32]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#174A32]" />
                  <span>{COMPANY_CONFIG.phoneDisplay}</span>
                </a>
                <a
                  href="https://wa.me/919136984957"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-[#202824] hover:text-[#25D366]"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp: {COMPANY_CONFIG.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${COMPANY_CONFIG.emailMailto}`}
                  className="flex items-center space-x-2 text-[#202824] hover:text-[#C89B3C]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C89B3C]" />
                  <span>{COMPANY_CONFIG.emailDisplay}</span>
                </a>
              </div>

              {/* Mobile CTA */}
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenQuery) onOpenQuery('general');
                }}
                className="w-full py-3 bg-[#174A32] text-white text-xs font-bold uppercase tracking-wider text-center rounded-sm hover:bg-[#1f5f40] transition-colors"
              >
                Write a Query
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;