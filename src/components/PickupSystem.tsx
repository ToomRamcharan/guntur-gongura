import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Clock, CheckCircle2, ChevronRight, UtensilsCrossed, Trash2 } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils.ts';
import { toast } from 'sonner';

interface PickupSystemProps {
  cart?: {id: string, name: string, price: number, quantity: number}[];
  setCart?: React.Dispatch<React.SetStateAction<{id: string, name: string, price: number, quantity: number}[]>>;
}

export default function PickupSystem({ cart: externalCart, setCart: externalSetCart }: PickupSystemProps = {}) {
  const [localCart, setLocalCart] = useState<{id: string, name: string, price: number, quantity: number}[]>([]);
  
  const cart = externalCart !== undefined ? externalCart : localCart;
  const setCart = externalSetCart !== undefined ? externalSetCart : setLocalCart;

  const [pickupTime, setPickupTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Your bag is empty! Add some delicious dishes first.");
      return;
    }
    
    setIsSubmitting(true);
    
    const payload = {
      customerName,
      customerPhone,
      items: cart,
      total,
      pickupTime,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
      toast.success("Order Placed Successfully!");
      setIsDone(true);
      // Construct WhatsApp message
      const itemsList = cart.map(i => `${i.name} x ${i.quantity}`).join(', ');
      const waMsg = `Hello Guntur Gongoora,\nI would like to place a pickup order.\n\nName: ${customerName}\nPhone: ${customerPhone}\nItems: ${itemsList}\nTotal: ₹${total}\nPickup Time: ${pickupTime}\n\nOrder ID: ${data.orderId}`;
      const waUrl = `https://wa.me/919876543210?text=${encodeURIComponent(waMsg)}`;
      
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 2000);
    })
    .finally(() => setIsSubmitting(false));
  };

  const removeItem = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  if (isDone) {
    return (
      <section id="pickup" className="py-24 px-4 md:px-8 bg-white text-center">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="max-w-xl mx-auto space-y-8"
        >
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-display font-bold text-slate-900">Thank You!</h2>
          <p className="text-slate-600 text-lg">
             Your pickup order has been recorded. We've redirected you to WhatsApp to confirm your order with the kitchen.
          </p>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-left">
             <h4 className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-4">Order Summary</h4>
             <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between font-medium">
                     <span>{item.name} x {item.quantity}</span>
                     <span>{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="pt-4 border-t border-slate-200 flex justify-between font-black text-xl">
                   <span>Total</span>
                   <span className="text-brand-orange">{formatCurrency(total)}</span>
                </div>
             </div>
          </div>
          <button
            onClick={() => {setIsDone(false); setCart([]);}}
            className="text-brand-orange font-bold hover:underline"
          >
            Place Another Order
          </button>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="pickup" className="py-24 px-4 md:px-8 bg-cream relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-brand-orange font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Quick Pickup</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-8">Skip the Queue</h2>
          <p className="text-slate-600 mb-10 leading-relaxed max-w-md">
            Order your favorite Andhra dishes online and pick them up at our Madhapur outlet. Fast, spicy, and always fresh.
          </p>
          
          <div className="space-y-6">
            <div className="flex gap-6 items-start">
               <div className="w-14 h-14 shrink-0 bg-white rounded-2xl shadow-md flex items-center justify-center text-brand-orange">
                  <ShoppingCart className="w-7 h-7" />
               </div>
               <div>
                  <h4 className="font-bold text-xl mb-1 text-slate-900">1. Select Dishes</h4>
                  <p className="text-slate-500 text-sm">Choose from our full range of starters, biryanis, and meals.</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="w-14 h-14 shrink-0 bg-white rounded-2xl shadow-md flex items-center justify-center text-brand-orange">
                  <Clock className="w-7 h-7" />
               </div>
               <div>
                  <h4 className="font-bold text-xl mb-1 text-slate-900">2. Set Pickup Time</h4>
                  <p className="text-slate-500 text-sm">Tell us when you'll arrive and we'll have it ready piping hot.</p>
               </div>
            </div>
            <div className="flex gap-6 items-start">
               <div className="w-14 h-14 shrink-0 bg-white rounded-2xl shadow-md flex items-center justify-center text-brand-orange">
                  <UtensilsCrossed className="w-7 h-7" />
               </div>
               <div>
                  <h4 className="font-bold text-xl mb-1 text-slate-900">3. Pay & Enjoy</h4>
                  <p className="text-slate-500 text-sm">Pick up and pay at the counter. No waiting, no hassle.</p>
               </div>
            </div>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 30 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="bg-white rounded-[40px] p-8 md:p-12 shadow-2xl border border-slate-100 flex flex-col h-full"
        >
          <form onSubmit={handlePlaceOrder} className="space-y-8 flex-grow">
            <div className="space-y-6">
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Name</label>
                   <input
                     type="text"
                     value={customerName}
                     onChange={(e) => setCustomerName(e.target.value)}
                     placeholder="Your Name"
                     className="w-full p-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all font-medium border border-transparent"
                     required
                   />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Phone</label>
                   <input
                     type="tel"
                     value={customerPhone}
                     onChange={(e) => setCustomerPhone(e.target.value)}
                     placeholder="Phone Number"
                     className="w-full p-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all font-medium border border-transparent"
                     required
                   />
                 </div>
               </div>
               
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Preferred Pickup Time</label>
                 <select
                   value={pickupTime}
                   onChange={(e) => setPickupTime(e.target.value)}
                   className="w-full p-4 bg-slate-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-orange transition-all font-medium border border-transparent"
                   required
                 >
                   <option value="">Select a time</option>
                   <option value="ASAP">ASAP (15-20 mins)</option>
                   <option value="30 mins">In 30 mins</option>
                   <option value="1 hour">In 1 hour</option>
                   <option value="Lunch (1:30 PM)">Lunch (1:30 PM)</option>
                   <option value="Dinner (8:30 PM)">Dinner (8:30 PM)</option>
                 </select>
               </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-1">
                 <h4 className="font-bold text-slate-900">Your Selection</h4>
                 <span className="text-xs font-bold text-brand-orange bg-brand-orange/10 px-2 py-1 rounded-md">{cart.length} Items</span>
              </div>
              
              <div className="max-h-60 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
                {cart.length === 0 ? (
                  <div className="text-center py-10 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                     <p className="text-slate-400 text-sm">Your bag is empty.<br /><a href="#menu" className="text-brand-orange font-bold hover:underline">Browse Menu</a></p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl group transition-all hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center font-bold text-brand-orange text-sm">
                             {item.quantity}x
                          </div>
                          <div>
                             <h5 className="font-bold text-sm text-slate-800">{item.name}</h5>
                             <p className="text-[10px] text-slate-400 font-bold">{formatCurrency(item.price)} each</p>
                          </div>
                       </div>
                       <button
                         type="button"
                         onClick={() => removeItem(item.id)}
                         className="p-2 text-slate-300 hover:text-brand-red transition-colors"
                       >
                         <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-6">
              <div className="flex justify-between items-center text-2xl">
                 <span className="font-bold text-slate-900">Total Amount</span>
                 <span className="font-black text-brand-red">{formatCurrency(total)}</span>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-brand-orange text-white py-5 rounded-[20px] font-bold text-xl hover:bg-brand-red transition-all flex items-center justify-center gap-3 shadow-2xl shadow-brand-orange/30 disabled:opacity-50 disabled:grayscale"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Confirm Order
                    <ChevronRight className="w-6 h-6" />
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-slate-400 font-medium uppercase tracking-[0.2em]">
                You will pay at the restaurant during pickup
              </p>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
