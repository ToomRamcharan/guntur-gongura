import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div>
            <h3 className="text-2xl font-display font-bold text-brand-orange mb-2">GUNTUR GONGOORA</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Serving the most authentic Guntur-style flavors in Madhapur. From spicy biryanis to traditional Gongura dishes, we bring the heart of Andhra to your plate.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="p-2 bg-white/5 hover:bg-brand-orange rounded-full transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-brand-orange rounded-full transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 bg-white/5 hover:bg-brand-orange rounded-full transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2 inline-block">Quick Links</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-brand-orange transition-colors">Home</a></li>
            <li><a href="#menu" className="hover:text-brand-orange transition-colors">Digital Menu</a></li>
            <li><a href="#gallery" className="hover:text-brand-orange transition-colors">Photo Gallery</a></li>
            <li><a href="#loyalty" className="hover:text-brand-orange transition-colors">Loyalty Program</a></li>
            <li><a href="#pickup" className="hover:text-brand-orange transition-colors">Pre-Order Pickup</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2 inline-block">Contact Us</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-brand-orange shrink-0" />
              <span>Ayyappa Society, Mega Hills, Madhapur, Hyderabad, Telangana 500081</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-brand-orange shrink-0" />
              <span>09030023124</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-brand-orange shrink-0" />
              <span>hello@gunturgongoora.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2 inline-block">Opening Hours</h4>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="flex justify-between">
              <span>Mon - Fri</span>
              <span className="text-white">11:30 AM - 11:30 PM</span>
            </li>
            <li className="flex justify-between">
              <span>Sat - Sun</span>
              <span className="text-white">11:00 AM - 12:00 AM</span>
            </li>
            <li className="pt-4 text-xs italic text-slate-500">
              * Kitchen closes 30 mins before closing time.
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© {currentYear} Guntur Gongoora. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Sitemap</a>
        </div>
      </div>
    </footer>
  );
}
