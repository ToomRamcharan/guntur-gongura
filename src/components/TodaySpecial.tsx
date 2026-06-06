import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { TodaySpecial } from '../types.ts';
import { formatCurrency } from '../lib/utils.ts';
import { ShoppingBag, ChevronRight } from 'lucide-react';

export default function TodaySpecialSection() {
  const [special, setSpecial] = useState<TodaySpecial | null>(null);

  useEffect(() => {
    fetch('/api/specials')
      .then(res => res.json())
      .then(data => setSpecial(data))
      .catch(console.error);
  }, []);

  if (!special || !special.isAvailable) return null;

  return (
    <section id="special" className="py-24 px-4 md:px-8 bg-brand-orange/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-orange to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-brand-orange font-bold text-sm tracking-[0.2em] uppercase mb-4 block underline decoration-brand-orange underline-offset-8 decoration-2">Premium Pick</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900">Today's Special</h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-brand-orange/10 flex flex-col lg:flex-row max-w-5xl mx-auto"
        >
          <div className="lg:w-1/2 relative h-80 lg:h-auto overflow-hidden">
            <img
              src={special.imageUrl}
              alt={special.name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-6 left-6 flex flex-col gap-2">
              <span className="bg-brand-red text-white py-1 px-3 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">Limited Time</span>
            </div>
          </div>

          <div className="lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
            <h3 className="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-4">{special.name}</h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {special.description}
            </p>
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col">
                <span className="text-slate-400 text-sm line-through">₹{Math.round(special.price * 1.2)}</span>
                <span className="text-4xl font-bold text-brand-red">{formatCurrency(special.price)}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500 text-sm bg-slate-100 px-3 py-1 rounded-full">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Freshly Prepared
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#pickup"
                className="flex-1 flex items-center justify-center gap-2 bg-brand-orange text-white py-4 rounded-xl font-bold hover:bg-brand-red transition-all shadow-xl shadow-brand-orange/30 group"
              >
                <ShoppingBag className="w-5 h-5" />
                Pick it Up
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <button className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all">
                Add to My Loyalty Points
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
