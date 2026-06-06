import { motion } from 'motion/react';
import { Utensils, Award, ChefHat } from 'lucide-react';

export default function About() {
  const stats = [
    { icon: Utensils, label: 'Authentic Recipes', value: '100+' },
    { icon: ChefHat, label: 'Master Chefs', value: '15' },
    { icon: Award, label: 'Quality Award', value: '2025' },
  ];

  return (
    <section id="about" className="py-24 px-4 md:px-8 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/images/restaurant_storefront.jpg"
              alt="Our Story"
              className="w-full h-auto object-cover rounded-2xl border-4 border-white shadow-lg"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -z-10" />
          <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-yellow/10 rounded-full blur-3xl -z-10" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <span className="text-brand-orange font-bold text-sm tracking-[0.2em] uppercase mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-slate-900 leading-tight">
              Honoring the Spicy Traditions of <span className="text-brand-orange">Guntur</span>
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Guntur Gongoora was born out of a passion for bringing the truly authentic, fiery, and soul-satisfying flavors of Andhra Pradesh to the bustling streets of Hyderabad.
              </p>
              <p>
                Our recipes are passed down through generations, utilizing the world-famous Guntur chilies and the tangiest Gongura leaves. Each dish is a tribute to the agrarian roots of Guntur, prepared with hand-ground spices and the freshest local ingredients.
              </p>
              <p>
                Whether it's our signature slow-cooked biryanis or our elaborate traditional meals, we promise an explosion of flavors that will keep you coming back for more.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-cream p-4 rounded-xl text-center border border-brand-orange/10">
                <stat.icon className="w-6 h-6 text-brand-orange mx-auto mb-2" />
                <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
