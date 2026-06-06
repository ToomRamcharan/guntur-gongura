import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types.ts';
import { formatCurrency, cn } from '../lib/utils.ts';
import { Leaf, Flame, Plus, ChevronDown, Download, Printer } from 'lucide-react';
import { toast } from 'sonner';

interface MenuSectionProps {
  onAddToCart?: (item: MenuItem) => void;
}

export default function MenuSection({ onAddToCart }: MenuSectionProps) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const categories = ['All', ...Array.from(new Set(items.map(item => item.category)))];

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: MenuItem) => {
    if (onAddToCart) {
      onAddToCart(item);
    }
    toast.success(`Added ${item.name} to pickup bag!`);
  };

  return (
    <section id="menu" className="py-24 px-4 md:px-8 bg-cream">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="max-w-2xl text-left">
            <span className="text-brand-orange font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Our Menu</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Explore the Spice of Guntur</h2>
            <p className="text-slate-600">
              Hand-picked ingredients, authentic Guntur chillies, and traditional cooking methods bring you a menu that is both nostalgic and innovative.
            </p>
          </div>
          <div className="flex gap-3">
            <button
               onClick={() => window.print()}
               className="flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-xl text-sm font-bold hover:bg-black transition-all shadow-lg"
            >
              <Printer className="w-4 h-4" />
              Print Menu
            </button>
            <a
              href="#qr-menu"
              className="flex items-center gap-2 border border-slate-200 bg-white text-slate-700 px-5 py-3 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all"
            >
              <Download className="w-4 h-4" />
              Download QR
            </a>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex overflow-x-auto pb-4 mb-10 gap-3 no-scrollbar scroll-smooth">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold transition-all border",
                activeCategory === category
                  ? "bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/30"
                  : "bg-white border-slate-200 text-slate-600 hover:border-brand-orange hover:text-brand-orange"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl h-80 animate-pulse border border-slate-100" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 flex flex-col group"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                       {item.isVeg ? (
                         <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg">
                           <Leaf className="w-4 h-4 text-green-600" />
                         </div>
                       ) : (
                         <div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg">
                           <Flame className="w-4 h-4 text-red-600" />
                         </div>
                       )}
                    </div>
                    <div className="absolute bottom-4 left-4">
                       <span className="bg-brand-orange text-white text-[10px] uppercase font-black tracking-widest px-3 py-1 rounded-lg">
                         {item.category}
                       </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-orange transition-colors">{item.name}</h3>
                      <span className="text-lg font-bold text-brand-red">{formatCurrency(item.price)}</span>
                    </div>
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                      {item.description}
                    </p>
                    <button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.isAvailable}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all",
                        item.isAvailable
                          ? "bg-slate-100 text-slate-800 hover:bg-brand-orange hover:text-white"
                          : "bg-slate-50 text-slate-300 cursor-not-allowed"
                      )}
                    >
                      {item.isAvailable ? (
                        <>
                          <Plus className="w-4 h-4" />
                          Add for Pickup
                        </>
                      ) : 'Currently Out of Stock'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        <div className="mt-20 text-center">
           <p className="text-slate-400 text-sm mb-6 italic">Looking for something else? Ask our chefs for custom spice levels!</p>
           <button className="text-brand-orange font-bold flex items-center gap-2 mx-auto hover:gap-4 transition-all">
             View Festive Bulk Order Options
             <ChevronDown className="w-4 h-4" />
           </button>
        </div>
      </div>
    </section>
  );
}
