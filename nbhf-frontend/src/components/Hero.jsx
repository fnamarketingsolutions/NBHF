import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroBackgroundImage from "../assets/hero-bg.jpg";

const heroCards = [
  {
    label: "Business 01",
    title: "Post-harvest agricultural waste",
    body: "Cotton stalk, tur stalk, soyabean residue, bagasse. Buy or sell in 1-ton lots.",
    cta: "Open page",
    href: "/products/agri-waste",
  },
  {
    label: "Business 02",
    title: "Cow dung powder & manure",
    body: "Pre-processed, agriculture-grade. Bulk in 50 kg PP bags; retail packs for home use.",
    cta: "Open page",
    href: "/products/cow-dung",
  },
  {
    label: "Buyers & Sellers",
    title: "Place an order",
    body: "Product, quantity, location and pincode. Reaches us on WhatsApp or email.",
    cta: "Open form",
    href: "/contact",
  },
  {
    label: "Any Question",
    title: "Write a query",
    body: "Samples, lab report, custom bio-fortification, export.",
    cta: "Open form",
    intent: "general",
  },
];

const Hero = ({ onActionClick }) => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-[100vh] flex items-center bg-[#122E20] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={heroBackgroundImage}
          alt="Agricultural Field"
          className="w-full h-full object-cover opacity-80 filter brightness-75 contrast-110"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 text-white w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          {heroCards.map((card) => {
            const actionClass =
              "mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6FBF6A] hover:text-[#8fd48a] transition-colors";

            const cardClass =
              "bg-[#0E2419]/85 backdrop-blur-md border border-white/12 rounded-xl px-4 py-4 sm:px-5 sm:py-5 flex flex-col min-h-[168px] shadow-lg text-left";

            const inner = (
              <>
                <p className="text-[10px] uppercase tracking-[0.16em] text-white/45 font-medium mb-2.5">
                  {card.label}
                </p>
                <h3 className="text-[15px] sm:text-base font-semibold text-white leading-snug">
                  {card.title}
                </h3>
                <p className="mt-2 text-[12.5px] text-white/65 leading-relaxed font-light">
                  {card.body}
                </p>
                <span className={actionClass}>
                  <span>{card.cta}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </>
            );

            if (card.href) {
              return (
                <a key={card.label} href={card.href} className={`${cardClass} hover:border-white/30 transition-colors`}>
                  {inner}
                </a>
              );
            }

            return (
              <button
                key={card.label}
                type="button"
                onClick={() => onActionClick(card.intent)}
                className={`${cardClass} hover:border-white/30 transition-colors`}
              >
                {inner}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
