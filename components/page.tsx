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
    // Always scroll to top on load
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <main id="top" className="bg-[#1A0F0A] min-h-screen overflow-x-hidden">
      <Header />
      {/* Hero */}
      <div className="pt-0">
        <HeroCanvasAnimation />
      </div>
      {/* Menu section */}
      <div id="menu">
        <ProductShowcase />
      </div>
      {/* Why us */}
      <div id="why">
        <FeatureSection />
      </div>
      {/* CTA */}
      <FinalCTA />
      {/* Footer */}
      <Footer />
      {/* WhatsApp */}
      <WhatsAppButton />
    </main>
  );
}
