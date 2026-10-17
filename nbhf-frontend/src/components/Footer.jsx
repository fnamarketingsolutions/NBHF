
import React from 'react';
import { Headphones, Mail, ArrowUpRight } from 'lucide-react';
import { COMPANY_CONFIG } from '../constants/CompanyData';
import logo from '../assets/logo_transparent.png';

const COMPANY_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About NBHF', href: '/about' },
  { label: 'Products', href: '/products' },
  { label: 'Industries served', href: '/industries' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
];

const POLICY_LINKS = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms & Conditions', href: '/terms-and-conditions' },
];

const FooterLinkList = ({ title, links }) => (
  <nav aria-label={title}>
    <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/60">
      {title}
    </h2>

    <ul className="space-y-3">
      {links.map(({ label, href }) => (
        <li key={label}>
          <a
            href={href}
            className="text-sm text-white/75 transition-colors hover:text-[#A3D9A5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A3D9A5]"
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  </nav>
);

const ContactItem = ({ icon: Icon, label, href, value }) => (
  <div className="flex min-w-0 items-center gap-3">
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/5 text-[#A3D9A5] ring-1 ring-white/10">
      <Icon size={21} strokeWidth={1.7} aria-hidden="true" />
    </span>

    <div className="min-w-0">
      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
        {label}
      </p>

      <a
        href={href}
        className="break-words text-sm font-medium text-white transition-colors hover:text-[#A3D9A5] sm:text-base"
      >
        {value}
      </a>
    </div>
  </div>
);

const Footer = () => {
  const companyName = COMPANY_CONFIG.name || 'NBHF';

  return (
    <footer className="overflow-hidden border-t border-white/10 bg-[#0b2619] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">

        {/* Brand and Contact */}
        <div className="flex flex-col gap-8 border-b border-white/15 pb-9 md:flex-row md:items-center md:justify-between">
          <a
            href="/"
            aria-label="NBHF home"
            className="group flex w-fit items-center gap-3"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full    text-[#A3D9A5] transition-colors ">
                <img src={logo} alt="NBHF Logo" className="h-12  w-12" />
            </span>

            <span className="flex flex-col">
              <span className="flex items-center text-3xl font-bold leading-none tracking-tight">
                NBHF 
              </span>
 
            </span>
          </a>

          <div className="grid gap-6 sm:grid-cols-2 sm:gap-8">
            <ContactItem
              icon={Headphones}
              label="Call us"
              href={`tel:${COMPANY_CONFIG.phoneDial}`}
              value={COMPANY_CONFIG.phoneDisplay}
            />

            <ContactItem
              icon={Mail}
              label="Email us"
              href={`mailto:${COMPANY_CONFIG.emailMailto}`}
              value={COMPANY_CONFIG.emailDisplay}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-10 lg:gap-12 lg:py-12">
          <FooterLinkList title="Company" links={COMPANY_LINKS} />
          <FooterLinkList title="Policies" links={POLICY_LINKS} />
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>

          <p className="inline-flex items-center gap-1.5 sm:text-right">
            Fefarwada &amp; Wadhona
            <ArrowUpRight size={12} aria-hidden="true" />
            Vidarbha, Maharashtra
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
