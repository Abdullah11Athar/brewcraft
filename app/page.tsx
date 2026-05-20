'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroCanvasAnimation from '@/components/HeroCanvasAnimation';
import ProductShowcase from '@/components/ProductShowcase';
import FeatureSection from '@/components/FeatureSection';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsApp';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // overflow-x-hidden is NOT on main — it breaks position:sticky
    <main className="bg-[#1A0F0A] min-h-screen">
      <Header />
      <HeroCanvasAnimation />
      {/* overflow-x-hidden only below the sticky animation so sticky doesn't break */}
      <div className="overflow-x-hidden">
        <div id="menu">
          <ProductShowcase />
        </div>
        <div id="why">
          <FeatureSection />
        </div>
        <div id="contact">
          <FinalCTA />
        </div>
        <Footer />
      </div>
      <WhatsAppButton />
    </main>
  );
}
