import React from 'react';
import { Phone, Mail, MessageSquare } from 'lucide-react';
import { COMPANY_CONFIG } from '../constants/CompanyData';

const MobileContactBar = ({ onQueryClick }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#174A32] text-white border-t border-white/20 md:hidden flex divide-x divide-white/15">
      <a
        href={`tel:${COMPANY_CONFIG.phoneDial}`}
        className="flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 active:bg-[#4F7D3A]"
      >
        <Phone className="w-3.5 h-3.5 text-[#C89B3C]" />
        <span>CALL</span>
      </a>

      <a
        href={`mailto:${COMPANY_CONFIG.emailMailto}`}
        className="flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 active:bg-[#4F7D3A]"
      >
        <Mail className="w-3.5 h-3.5 text-[#C89B3C]" />
        <span>EMAIL</span>
      </a>

      <button
        onClick={onQueryClick}
        className="flex-1 py-3 text-center text-xs font-bold uppercase tracking-wider bg-[#C89B3C] text-[#202824] flex items-center justify-center space-x-1.5 active:bg-[#b88c32]"
      >
        <MessageSquare className="w-3.5 h-3.5 text-[#202824]" />
        <span>QUERY</span>
      </button>
    </div>
  );
};

export default MobileContactBar;