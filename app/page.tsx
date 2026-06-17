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
    const hash = window.location.hash;
    if (hash) {
      // Delay to allow canvas, fonts, and grid layout height to initialize
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const offset = window.innerWidth >= 768 ? 80 : 64;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 700);
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  // Intersection Observer to update URL bar dynamically on manual scroll
  useEffect(() => {
    const sections = ['top', 'menu', 'why', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const hash = id === 'top' ? '/' : `#${id}`;
          if (window.location.hash !== hash && !(hash === '/' && window.location.hash === '')) {
            window.history.pushState(null, '', hash);
          }
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    // overflow-x-hidden is NOT on main — it breaks position:sticky
    <main className="bg-[#1A0F0A] min-h-screen" id="top">
      <Header />
      <HeroCanvasAnimation />
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
