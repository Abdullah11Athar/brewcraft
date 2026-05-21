'use client';

import { motion } from 'framer-motion';

const scrollTo = (href: string) => {
  if (href === '#top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-[#050201] border-t border-[#2D1810]/60 pt-16 pb-8 px-4 md:px-8 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] rounded-full blur-[100px] opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #D4A574 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <button onClick={() => scrollTo('#top')} className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 flex items-center justify-center">
                <img src="/logo.png" alt="BrewCraft Logo" className="w-full h-full object-contain drop-shadow-md" />
              </div>
              <span className="text-[#F5E6D3] font-bold text-xl"
                style={{ fontFamily: 'Playfair Display, serif' }}>
                Brew<span className="text-[#4F9C8F]">Craft</span>
              </span>
            </button>
            <p className="text-sm text-[#C9B8A0]/70 leading-relaxed max-w-xs">
              Premium coffee & tea experiences crafted with passion. Every sip tells a story of excellence.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              {['FB', 'IG', 'TW'].map(s => (
                <button key={s}
                  className="w-9 h-9 rounded-full border border-[#5A4034]/50 text-[#C9B8A0] hover:border-[#4F9C8F] hover:text-[#4F9C8F] text-xs transition-all duration-300 flex items-center justify-center">
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-[#F5E6D3] font-semibold mb-5 text-sm tracking-widest uppercase"
              style={{ fontFamily: 'Playfair Display, serif' }}>Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Home', href: '#top' },
                { label: 'Our Menu', href: '#menu' },
                { label: 'Why BrewCraft', href: '#why' },
                { label: 'Contact Us', href: '#contact' },
              ].map(l => (
                <button key={l.href} onClick={() => scrollTo(l.href)}
                  className="text-left text-sm text-[#C9B8A0]/70 hover:text-[#4F9C8F] transition-colors duration-200 flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#4F9C8F]/50" />
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#F5E6D3] font-semibold mb-5 text-sm tracking-widest uppercase"
              style={{ fontFamily: 'Playfair Display, serif' }}>Contact</h4>
            <div className="flex flex-col gap-3 text-sm text-[#C9B8A0]/70">
              <p>📍 123 Artisan Street, New York, NY 10001</p>
              <p>📞 +1 (212) 555-0189</p>
              <p>✉️ hello@brewcraft.com</p>
              <p>🕐 Mon–Sun: 7AM – 10PM</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#3D2820] to-transparent mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#5A4034]">
          <p>© 2024 BrewCraft. All rights reserved.</p>
          <p>Crafted with ☕ & 🍵</p>
          <div className="flex gap-4">
            <button className="hover:text-[#C9B8A0] transition-colors">Privacy</button>
            <button className="hover:text-[#C9B8A0] transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
