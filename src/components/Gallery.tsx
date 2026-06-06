import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../types.ts';
import { Maximize2, Camera } from 'lucide-react';
import { cn } from '../lib/utils.ts';

export default function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    setItems([
      { id: '1', category: 'food', imageUrl: '/images/gongura_mutton_biryani.png', caption: 'Signature Gongura Mutton Biryani' },
      { id: '2', category: 'interior', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', caption: 'Our Elegant Dining Area' },
      { id: '3', category: 'food', imageUrl: '/images/chicken_dum_biryani.png', caption: 'Spicy Guntur Chicken Dum Biryani' },
      { id: '4', category: 'food', imageUrl: '/images/andhra_meals_thali.png', caption: 'Authentic Andhra Bhojanam (Veg Thali)' },
      { id: '5', category: 'interior', imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800', caption: 'Cozy Family Seating' },
      { id: '6', category: 'food', imageUrl: '/images/paneer_tikka.png', caption: 'Smoky Paneer Tikka' },
      { id: '7', category: 'exterior', imageUrl: '/images/restaurant_storefront.jpg', caption: 'Guntur Gongura Branch Entrance' },
      { id: '8', category: 'food', imageUrl: '/images/tandoori_chicken.jpg', caption: 'Clay Oven Tandoori Chicken' },
      { id: '9', category: 'food', imageUrl: '/images/spicy_prawns.jpg', caption: 'Fiery Andhra Masala Prawns' },
      { id: '10', category: 'food', imageUrl: '/images/golden_prawn.jpg', caption: 'Crispy Golden Fried Prawns' },
      { id: '11', category: 'food', imageUrl: '/images/prawn_biryani.jpg', caption: 'Aromatic Prawn Dum Biryani' },
      { id: '12', category: 'food', imageUrl: '/images/chicken_65.jpg', caption: 'Spicy Hyderabadi Chicken 65' },
    ]);
  }, []);

  const categories = ['All', 'Food', 'Interior', 'Exterior'];

  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="gallery" className="py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Camera className="w-10 h-10 text-brand-orange mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Moments & Flavors</h2>
          <p className="text-slate-600 max-w-2xl mx-auto mb-10">
            A glimpse into our kitchen, our food, and the hearty smiles of our customers enjoying their Andhra feast.
          </p>

          {/* Categories Bar */}
          <div className="flex justify-center overflow-x-auto pb-4 gap-3 no-scrollbar scroll-smooth">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-bold transition-all border",
                  activeCategory === category
                    ? "bg-brand-orange border-brand-orange text-white shadow-lg shadow-brand-orange/30"
                    : "bg-white border-slate-200 text-slate-600 hover:border-brand-orange hover:text-brand-orange"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div 
          layout
          className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                className="relative group cursor-pointer break-inside-avoid rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                <img
                  src={item.imageUrl}
                  alt={item.caption}
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex justify-between items-center text-white">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-brand-yellow mb-1 block">{item.category}</span>
                      <h4 className="text-lg font-bold">{item.caption}</h4>
                    </div>
                    <Maximize2 className="w-6 h-6" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox placeholder */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative max-w-5xl w-full max-h-[90vh]"
            >
              <img
                src={selectedImage}
                alt="Lightbox View"
                className="w-full h-full object-contain rounded-lg"
                referrerPolicy="no-referrer"
              />
              <button
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full text-white backdrop-blur-md"
                onClick={() => setSelectedImage(null)}
              >
                <Maximize2 className="w-6 h-6 rotate-45" />
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}

