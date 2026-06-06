import { motion } from 'motion/react';
import { ChevronRight, PhoneCall, ShoppingBag } from 'lucide-react';

export default function Hero() {
  const images = [
    "/images/hero_background.jpg",
    "/images/chicken_dum_biryani.png",
    "/images/gongura_mutton_biryani.png"
  ];

  return (
    <section className="relative h-screen flex items-center overflow-hidden pt-20">
      {/* Background Image Slider Placeholder */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[0]})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="inline-block px-4 py-1.5 bg-brand-orange/20 backdrop-blur-sm border border-brand-orange/30 text-brand-orange rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Madhapur's Favorite Andhra Restaurant
          </span>
          <h2 className="text-5xl md:text-7xl font-display font-bold text-white leading-[1.1] mb-6">
            Authentic Andhra <span className="text-brand-orange">Flavors</span> <br /> in the Heart of Madhapur
          </h2>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 font-light">
            Experience the rich taste of Guntur-style cuisine, famous for Gongura specialties, spicy curries, biryanis, and traditional meals.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a
              href="https://wa.me/919030023124?text=Hello%20Guntur%20Gongoora,%20I%20would%20like%20to%20place%20an%20order."
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-orange text-white px-8 py-4 rounded-full font-bold hover:bg-brand-red transition-all transform hover:scale-105 shadow-xl shadow-brand-orange/40"
            >
              Order on WhatsApp
              <ChevronRight className="w-4 h-4" />
            </a>
            <a
              href="#menu"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-brand-orange transition-all"
            >
              View Menu
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 opacity-50">
        <div className="w-1.5 h-1.5 rounded-full bg-white transition-all transform scale-150" />
        <div className="w-1 h-1 rounded-full bg-white/50" />
        <div className="w-1 h-1 rounded-full bg-white/50" />
      </div>
    </section>
  );
}
