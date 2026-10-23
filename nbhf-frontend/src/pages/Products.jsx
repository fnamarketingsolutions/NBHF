import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/NavBar';
import Footer from '../components/Footer';
import MobileContactBar from '../components/MobileContactBar';

const products = [
  {
    eyebrow: 'Business 01',
    title: 'Post-harvest agricultural waste',
    body: 'Cotton stalk, tur stalk, soyabean residue, bagasse. Buy or sell in 1-ton lots.',
    cta: 'Open page',
    href: '/products/agri-waste',
  },
  
  {
    eyebrow: 'Business 02',
    title: 'Cow dung powder & manure',
    body: 'Pre-processed, agriculture-grade. Bulk in 50 kg PP bags; retail packs for home use.',
    cta: 'Open page',
    href: '/products/cow-dung',
  },
];

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F6F0] text-[#202824] flex flex-col font-sans selection:bg-[#174A32] selection:text-white pb-14 md:pb-0">
      <Navbar onOpenQuery={() => { window.location.href = '/#contact'; }} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
         
        <h1 className="text-4xl sm:text-5xl font-extralight tracking-tight text-[#174A32] mb-3">Products</h1>
        <p className="max-w-2xl text-base sm:text-lg text-[#202824]/75 mb-10">
          Two product lines. Each has its own page with specifications and buy / sell options.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {products.map((product) => (
            <article
              key={product.href}
              className="bg-[#0E2419] text-white border border-white/10 rounded-xl p-6 sm:p-8 flex flex-col min-h-[280px]"
            >
              <p className="text-[10px] uppercase tracking-[0.16em] text-white/45 font-medium mb-3">
                {product.eyebrow}
              </p>
              <h2 className="text-2xl font-semibold leading-snug mb-3">{product.title}</h2>
              <p className="text-sm text-white/70 leading-relaxed">{product.body}</p>
              <div className="mt-auto pt-6">
                <a
                  href={product.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[#6FBF6A] hover:text-[#8fd48a]"
                >
                  {product.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Footer />
      <MobileContactBar onQueryClick={() => { window.location.href = '/#contact'; }} />
    </div>
  );
};

export default Products;
