import QueryForm from './QueryForm';
import { Phone, Mail, MapPin } from 'lucide-react';
import { COMPANY_CONFIG } from '../constants/CompanyData';

const ContactSection = ({ queryIntent }) => {
  return (
    <section id="contact" className="py-20 lg:py-28 bg-white border-t border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Contact Details Column */}
          <div className="lg:col-span-5">
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#174A32] mb-4">
              Get in Touch
            </h2>
            <p className="text-base text-[#202824]/80 mb-8 leading-relaxed">
              For buying, selling, product requirements or general queries, contact NBHF directly.
            </p>

            <div className="space-y-6 pt-4 border-t border-black/10">
              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-black/50 block mb-1">
                  Phone
                </span>
                <a
                  href={`tel:${COMPANY_CONFIG.phoneDial}`}
                  className="text-lg font-mono font-bold text-[#174A32] hover:text-[#4F7D3A] transition-colors flex items-center space-x-2"
                >
                  <Phone className="w-4 h-4 text-[#C89B3C]" />
                  <span>{COMPANY_CONFIG.phoneDisplay}</span>
                </a>
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-black/50 block mb-1">
                  Email
                </span>
                <a
                  href={`mailto:${COMPANY_CONFIG.emailMailto}`}
                  className="text-base font-semibold text-[#174A32] hover:text-[#4F7D3A] transition-colors flex items-center space-x-2"
                >
                  <Mail className="w-4 h-4 text-[#C89B3C]" />
                  <span>{COMPANY_CONFIG.emailDisplay}</span>
                </a>
              </div>

              <div>
                <span className="text-xs uppercase font-mono tracking-wider text-black/50 block mb-1">
                  Location
                </span>
                <div className="text-sm text-[#202824] flex items-start space-x-2 font-medium">
                  <MapPin className="w-4 h-4 text-[#C89B3C] shrink-0 mt-0.5" />
                  <span>{COMPANY_CONFIG.locationDisplay}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Clean Form Column */}
          <div className="lg:col-span-7">
            <QueryForm key={queryIntent} source="general" initialInterest={queryIntent} title="General query" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;