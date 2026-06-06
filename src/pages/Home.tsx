import { useState } from 'react';
import Header from '../components/Header.tsx';
import Hero from '../components/Hero.tsx';
import About from '../components/About.tsx';
import TodaySpecialSection from '../components/TodaySpecial.tsx';
import MenuSection from '../components/Menu.tsx';
import GallerySection from '../components/Gallery.tsx';
import ReviewsSection from '../components/Reviews.tsx';
import LoyaltySection from '../components/Loyalty.tsx';
import PickupSystem from '../components/PickupSystem.tsx';
import FeedbackForm from '../components/Feedback.tsx';
import ContactsMap from '../components/ContactsMap.tsx';
import Footer from '../components/Footer.tsx';
import LeadsPopup from '../components/LeadsPopup.tsx';
import { MenuItem } from '../types.ts';

export default function Home() {
  const [cart, setCart] = useState<{id: string, name: string, price: number, quantity: number}[]>([]);

  const handleAddToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existing = prevCart.find(i => i.id === item.id);
      if (existing) {
        return prevCart.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prevCart, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
    });
  };

  return (
    <main className="relative flex flex-col min-h-screen">
      <Header />
      <Hero />
      <About />
      <TodaySpecialSection />
      <MenuSection onAddToCart={handleAddToCart} />
      <PickupSystem cart={cart} setCart={setCart} />
      <GallerySection />
      <LoyaltySection />
      <ReviewsSection />
      <FeedbackForm />
      <ContactsMap />
      <Footer />
      <LeadsPopup />
    </main>
  );
}
