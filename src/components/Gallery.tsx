import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GalleryItem } from '../types.ts';
import { Maximize2, ZoomIn, Camera } from 'lucide-react';

export default function GallerySection() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    // Mock gallery data
    setItems([
      { id: '1', category: 'food', imageUrl: '/images/gongura_mutton_biryani.png', caption: 'Signature Gongura Mutton Biryani' },
      { id: '2', category: 'interior', imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800', caption: 'Our Elegant Dining Area' },
      { id: '3', category: 'food', imageUrl: '/images/chicken_dum_biryani.png', caption: 'Spicy Guntur Chicken Dum Biryani' },
      { id: '4', category: 'food', imageUrl: '/images/andhra_meals_thali.png', caption: 'Authentic Andhra Bhojanam (Veg Thali)' },
      { id: '5', category: 'interior', imageUrl: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800', caption: 'Cozy Family Seating' },
      { id: '6', category: 'food', imageUrl: '/images/paneer_tikka.png', caption: 'Smoky Paneer Tikka' },
      { id: '7', category: 'exterior', imageUrl: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800', caption: 'Madhapur Branch Entrance' },
      { id: '8', category: 'food', imageUrl: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800', caption: 'Special Apricot Delight' },
    ]);
  }, []);

  return (
    <section id="gallery" className="py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Camera className="w-10 h-10 text-brand-orange mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6">Moments & Flavors</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A glimpse into our kitchen, our food, and the hearty smiles of our customers enjoying their Andhra feast.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {items.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
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
        </div>

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
