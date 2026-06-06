import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import { cn } from '../lib/utils.ts';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'Today\'s Special', href: '#special' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Loyalty', href: '#loyalty' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-8',
        isScrolled ? 'py-3 bg-white/95 backdrop-blur-md shadow-md' : 'py-6 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/images/logo.svg" alt="Guntur Gongoora Logo" className="w-10 h-10 object-contain bg-white rounded-full p-0.5 border border-brand-orange/20 shadow-sm" />
          <div className="flex flex-col">
            <h1 className={cn(
              "font-display font-bold text-2xl tracking-tight leading-none transition-colors",
              isScrolled ? "text-brand-orange" : "text-brand-orange"
            )}>
              GUNTUR GONGOORA
            </h1>
            <span className={cn(
              "text-[10px] uppercase tracking-[0.2em] font-medium transition-colors",
              isScrolled ? "text-slate-500" : "text-white/80"
            )}>
              Authentic Andhra Flavors
            </span>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-brand-orange",
                isScrolled ? "text-slate-700" : "text-white"
              )}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#pickup"
            className="bg-brand-orange text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-brand-red transition-colors shadow-lg shadow-brand-orange/20"
          >
            Pre-Order Pickup
          </a>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={cn("w-6 h-6", isScrolled ? "text-slate-900" : "text-white")} />
          ) : (
            <Menu className={cn("w-6 h-6", isScrolled ? "text-slate-900" : "text-white")} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-xl p-6 md:hidden flex flex-col space-y-4"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-800 hover:text-brand-orange"
              >
                {link.name}
              </a>
            ))}
            <a
              href="#pickup"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-brand-orange text-white px-6 py-3 rounded-full text-center font-bold"
            >
              Pre-Order Pickup
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
