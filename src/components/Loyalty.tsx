import { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Wallet, Calendar, CheckCircle2, ChevronRight, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function LoyaltySection() {
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;
    setIsLoading(true);
    // Simulate check
    setTimeout(() => {
      toast.info("Loyalty Account Found! You have 4 meals completed. 6 more to go for a FREE meal!");
      setIsLoading(false);
    }, 1500);
  };

  return (
    <section id="loyalty" className="py-24 px-4 md:px-8 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-orange/10 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <span className="text-brand-orange font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Loyalty Rewards</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                Eat More, <br /><span className="text-brand-orange">Eat Free.</span>
              </h2>
              <p className="text-slate-400 text-lg mt-6 leading-relaxed max-w-lg">
                Join our Guntur Gongoora family and get rewarded for every visit. It's simple: every 10th meal is on us!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-brand-orange/20 rounded-xl flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6 text-brand-orange" />
                </div>
                <h4 className="font-bold text-lg mb-2">Free 10th Meal</h4>
                <p className="text-slate-400 text-sm">Dine in or Pre-order for pickup 9 times and get the 10th meal completely FREE.</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                <div className="w-12 h-12 bg-brand-yellow/20 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-brand-yellow" />
                </div>
                <h4 className="font-bold text-lg mb-2">Birthday Surprise</h4>
                <p className="text-slate-400 text-sm">Register your birthday and receive an exclusive 25% discount coupon.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Instant Registration
              <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              Track on Phone
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white text-slate-900 rounded-[40px] p-8 md:p-12 shadow-2xl relative"
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-brand-orange rounded-full flex items-center justify-center text-white font-bold rotate-12 shadow-lg border-4 border-white">
              <div className="text-center">
                <div className="text-xs">JOIN</div>
                <div className="text-xl leading-none">FREE</div>
              </div>
            </div>

            <div className="text-center mb-10">
              <Wallet className="w-12 h-12 text-brand-orange mx-auto mb-4" />
              <h3 className="text-2xl font-bold">Check My Reward Status</h3>
              <p className="text-slate-500 text-sm mt-2">Enter your phone number to see your available rewards.</p>
            </div>

            <form onSubmit={handleCheckReward} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="flex">
                   <div className="bg-slate-100 px-4 flex items-center rounded-l-xl text-slate-500 font-bold border-r border-slate-200">+91</div>
                   <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter 10 digit number"
                    className="w-full p-4 bg-slate-100 rounded-r-xl focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all font-medium"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold text-lg hover:bg-brand-red transition-all flex items-center justify-center gap-2 shadow-xl shadow-brand-orange/20 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Track Visits
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-center">
              <button className="flex items-center gap-2 text-brand-orange font-bold hover:gap-3 transition-all">
                <UserPlus className="w-5 h-5" />
                Register New Loyalty Account
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
