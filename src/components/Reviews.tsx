import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Review } from '../types.ts';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch('/api/reviews')
      .then(res => res.json())
      .then(data => setReviews(data))
      .catch(console.error);
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section id="reviews" className="py-24 px-4 md:px-8 bg-brand-orange/5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-4">What Our Guests Say</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-brand-orange">
                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-xl font-bold font-display">4.8 / 5</span>
              <span className="text-slate-400 text-sm">Based on 1.2k Google Reviews</span>
            </div>
          </div>
          <div className="flex gap-4">
            <button
               onClick={() => setActiveIndex(prev => (prev === 0 ? reviews.length - 1 : prev - 1))}
               className="p-4 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-brand-orange hover:text-white transition-all shadow-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
               onClick={() => setActiveIndex(prev => (prev === reviews.length - 1 ? 0 : prev + 1))}
               className="p-4 rounded-full bg-white border border-slate-200 text-slate-800 hover:bg-brand-orange hover:text-white transition-all shadow-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="relative">
          <Quote className="absolute -top-10 -left-10 w-32 h-32 text-brand-orange/10 -z-10" />
          
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="flex w-full"
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full shrink-0 flex flex-col md:flex-row gap-12 bg-white p-10 md:p-16 rounded-[40px] shadow-xl border border-slate-100">
                  <div className="md:w-1/3 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 rounded-full bg-brand-orange/20 flex items-center justify-center text-3xl font-bold text-brand-orange mb-6">
                      {review.name.charAt(0)}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900">{review.name}</h4>
                    <p className="text-slate-400 text-sm">{review.date}</p>
                    <div className="flex items-center text-brand-yellow mt-4">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                  <div className="md:w-2/3 flex flex-col justify-center">
                    <p className="text-2xl md:text-3xl font-display font-light text-slate-700 italic leading-relaxed">
                      "{review.comment}"
                    </p>
                    <div className="mt-8 flex items-center gap-2 text-slate-400">
                      <div className="w-8 h-1 bg-brand-orange" />
                      Verified Google Reviewer
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
