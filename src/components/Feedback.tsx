import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Send, MessageSquareText } from 'lucide-react';
import { toast } from 'sonner';

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("Please provide a rating strike for us!");
      return;
    }
    
    setIsSubmitting(true);
    fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, rating, comments, createdAt: new Date().toISOString() })
    })
    .then(() => {
      toast.success("Thank you for your valuable feedback! We truly appreciate it.");
      setName('');
      setPhone('');
      setComments('');
      setRating(0);
    })
    .finally(() => setIsSubmitting(false));
  };

  return (
    <section id="feedback" className="py-24 px-4 md:px-8 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto bg-cream rounded-[40px] p-10 md:p-16 border border-slate-100 shadow-xl relative">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-orange/5 rounded-full blur-[80px]" />
        
        <div className="text-center mb-12">
          <MessageSquareText className="w-12 h-12 text-brand-orange mx-auto mb-6" />
          <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">Share Your Experience</h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Your feedback helps us grow. Tell us what you loved or how we can spice things up even better for your next visit.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex flex-col items-center gap-4 mb-8">
             <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rate us</label>
             <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className="p-1 transition-all transform hover:scale-125"
                  >
                    <Star 
                      className={`w-10 h-10 ${
                        (hoverRating || rating) >= star 
                          ? 'fill-brand-yellow text-brand-yellow' 
                          : 'text-slate-200'
                      }`} 
                    />
                  </button>
                ))}
             </div>
             <span className="text-sm font-bold text-brand-orange">
                {rating === 1 && "Need Improvement"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Delicious!"}
                {rating === 5 && "Exceeded Expectations!"}
             </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all font-medium shadow-sm border border-slate-50"
                required
              />
            </div>
            <div className="space-y-2">
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 bg-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all font-medium shadow-sm border border-slate-50"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <textarea
              placeholder="Your Comments..."
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-6 bg-white rounded-[32px] focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all font-medium shadow-sm border border-slate-50 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-orange text-white py-5 rounded-[20px] font-bold text-xl hover:bg-brand-red transition-all flex items-center justify-center gap-3 shadow-2xl shadow-brand-orange/30 disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Submit Feedback
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
