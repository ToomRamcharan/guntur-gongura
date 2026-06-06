import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Phone, PhoneCall, Gift, Sparkles, X } from 'lucide-react';
import { toast } from 'sonner';

export default function LeadsPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Show popup after 20 seconds
    const timer = setTimeout(() => {
      const shown = sessionStorage.getItem('lead_popup_shown');
      if (!shown) {
        setIsVisible(true);
      }
    }, 20000);

    // Also check for exit intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 0) {
        const shown = sessionStorage.getItem('lead_popup_shown');
        if (!shown) {
          setIsVisible(true);
        }
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, createdAt: new Date().toISOString() })
    })
    .then(() => {
      toast.success("Welcome to the family! We've sent your welcome offer to WhatsApp.");
      sessionStorage.setItem('lead_popup_shown', 'true');
      setIsVisible(false);
    })
    .finally(() => setIsSubmitting(false));
  };

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('lead_popup_shown', 'true');
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>

            <div className="bg-brand-orange p-10 text-white text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
               <Sparkles className="w-12 h-12 mx-auto mb-4 animate-pulse" />
               <h3 className="text-3xl font-display font-bold mb-2 text-white">Join the Family!</h3>
               <p className="text-white/80 font-medium">Get Exclusive Festival Offers & <br />10% Off Your First Pickup Order</p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-6">
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Your Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all font-medium"
                    required
                  />
                </div>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-brand-orange transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/20 disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : 'Claim My Offer'}
              </button>
              
              <div className="flex items-center justify-center gap-6 text-[10px] text-slate-400 font-bold uppercase tracking-widest pt-2">
                 <div className="flex items-center gap-1"><Gift className="w-3 h-3" /> Birthday Rewards</div>
                 <div className="flex items-center gap-1"><PhoneCall className="w-3 h-3" /> WhatsApp Alerts</div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
