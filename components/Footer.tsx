'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const scrollTo = (href: string) => {
  if (href === '#top') { 
    window.scrollTo({ top: 0, behavior: 'smooth' }); 
    window.history.pushState(null, '', '/');
    return; 
  }
  const el = document.querySelector(href);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', href);
  }
};

export default function Footer() {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'refund' | null>(null);

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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5A4034] text-center sm:text-left">
          <div>
            <p>© 2026 BrewCraft. All rights reserved.</p>
            <p className="text-[10px] text-[#5A4034]/70 mt-1 max-w-sm leading-normal">
              BrewCraft is a premium artisan cafe experience delivering premium, sustainably sourced coffee beans and handcrafted tea blends.
            </p>
          </div>
          <p className="shrink-0">Crafted with ☕ & 🍵</p>
          <div className="flex gap-4 md:gap-6 shrink-0 flex-wrap justify-center">
            <button onClick={() => setActiveModal('privacy')} className="hover:text-[#C9B8A0] transition-colors focus:outline-none">Privacy Policy</button>
            <button onClick={() => setActiveModal('terms')} className="hover:text-[#C9B8A0] transition-colors focus:outline-none">Terms of Service</button>
            <button onClick={() => setActiveModal('refund')} className="hover:text-[#C9B8A0] transition-colors focus:outline-none">Refund Policy</button>
          </div>
        </div>
      </div>

      {/* Modal system */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            {/* Backdrop click closer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 cursor-pointer"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-[#130A06] border border-[#5A4034]/70 rounded-2xl p-6 sm:p-8 text-[#C9B8A0] shadow-2xl z-10 custom-scrollbar"
            >
              {/* Decorative Accent Glow */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4F9C8F] via-[#D4A574] to-[#4F9C8F]" />

              {/* Close Button */}
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-[#C9B8A0] hover:text-white hover:bg-white/10 rounded-full w-8 h-8 flex items-center justify-center transition-colors text-lg"
              >
                ✕
              </button>

              {activeModal === 'privacy' && (
                <div>
                  <h3 className="text-[#F5E6D3] text-2xl font-bold mb-6 tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Privacy <span className="text-[#4F9C8F]">Policy</span>
                  </h3>
                  <div className="space-y-4 text-sm leading-relaxed text-left text-[#C9B8A0]/90">
                    <p>
                      Welcome to BrewCraft. We are committed to protecting your personal information and your right to privacy.
                    </p>
                    <div>
                      <h4 className="text-[#D4A574] font-semibold mb-1 uppercase tracking-wider text-xs">1. Information We Collect</h4>
                      <p>
                        We do not run direct registration forms on this landing page. However, when you click our WhatsApp button to coordinate orders or get in touch, you voluntarily share your phone number and chat content.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[#D4A574] font-semibold mb-1 uppercase tracking-wider text-xs">2. Cookies and Analytics</h4>
                      <p>
                        We utilize minor functional cookies and Vercel Analytics to understand user behaviors, helping us improve site speed, layout responsiveness, and overall coffee exploration experiences.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[#D4A574] font-semibold mb-1 uppercase tracking-wider text-xs">3. Sharing Your Information</h4>
                      <p>
                        BrewCraft will never sell, rent, or lease your private data or contact number to third-party companies. All user communications are kept strictly confidential.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[#D4A574] font-semibold mb-1 uppercase tracking-wider text-xs">4. Contact Us</h4>
                      <p>
                        If you have any questions about this Privacy Policy, you can reach out to us at <span className="text-[#4F9C8F]">hello@brewcraft.com</span> or via our official WhatsApp channel.
                      </p>
                    </div>
                    <p className="text-xs text-[#5A4034] pt-4">Last Updated: May 2026</p>
                  </div>
                </div>
              )}

              {activeModal === 'terms' && (
                <div>
                  <h3 className="text-[#F5E6D3] text-2xl font-bold mb-6 tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Terms & <span className="text-[#4F9C8F]">Conditions</span>
                  </h3>
                  <div className="space-y-4 text-sm leading-relaxed text-left text-[#C9B8A0]/90">
                    <p>
                      By accessing and exploring the BrewCraft website, you acknowledge that you have read and agreed to comply with the following Terms & Conditions.
                    </p>
                    <div>
                      <h4 className="text-[#D4A574] font-semibold mb-1 uppercase tracking-wider text-xs">1. Website Use</h4>
                      <p>
                        This website provides interactive menus, visual coffee animations, and order redirections. You agree not to engage in malicious operations, scraping, or heavy spamming that disrupts the site's hosting performance.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[#D4A574] font-semibold mb-1 uppercase tracking-wider text-xs">2. Intellectual Property</h4>
                      <p>
                        All original coffee blend names, design tokens, logos, graphics, and canvas fluid animations showcased on BrewCraft are owned by us and protected under international copyright regulations.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[#D4A574] font-semibold mb-1 uppercase tracking-wider text-xs">3. Product & Orders</h4>
                      <p>
                        Our menu catalog displays item details and ingredients. Pricing and product availability can change at any time without prior notice. Final order placement and payments are settled securely during the WhatsApp checkout phase.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[#D4A574] font-semibold mb-1 uppercase tracking-wider text-xs">4. Limitation of Liability</h4>
                      <p>
                        BrewCraft strives to provide accurate product information, but does not warrant that descriptions, images, or pricing are entirely error-free. We shall not be liable for any indirect disruptions resulting from using this website.
                      </p>
                    </div>
                    <p className="text-xs text-[#5A4034] pt-4">Last Updated: May 2026</p>
                  </div>
                </div>
              )}

              {activeModal === 'refund' && (
                <div>
                  <h3 className="text-[#F5E6D3] text-2xl font-bold mb-6 tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Refund <span className="text-[#4F9C8F]">Policy</span>
                  </h3>
                  <div className="space-y-4 text-sm leading-relaxed text-left text-[#C9B8A0]/90">
                    <p>
                      At BrewCraft, we take absolute pride in our artisan coffee beans and custom tea blends. We want you to love your brew! If you are not entirely satisfied with your purchase, we are here to help.
                    </p>
                    <div>
                      <h4 className="text-[#D4A574] font-semibold mb-1 uppercase tracking-wider text-xs">1. Fresh Coffee and Food Items</h4>
                      <p>
                        Because coffee beans and tea leaves are perishable food products, we cannot accept returns on opened or consumed items.
                        However, if there is a mistake in your order (e.g., wrong roast type, wrong grind level, or incorrect item delivered) or if your package was damaged in transit, please contact us within 7 days of receiving your package. We will immediately ship out a replacement package or process a full refund.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[#D4A574] font-semibold mb-1 uppercase tracking-wider text-xs">2. Merchandise and Equipment</h4>
                      <p>
                        For non-perishable goods (like mugs, drippers, scales, or coffee grinders), you may return items within 14 days of delivery. Items must be completely unused, in their original packaging, and in the same condition that you received them.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[#D4A574] font-semibold mb-1 uppercase tracking-wider text-xs">3. Refund Processing</h4>
                      <p>
                        If approved, your refund will be processed immediately. A credit will automatically be applied to your original credit card or method of payment via Stripe. Payout processing timelines depend on your bank, but typically take 5 to 10 business days.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-[#D4A574] font-semibold mb-1 uppercase tracking-wider text-xs">4. Contact for Returns and Refunds</h4>
                      <p>
                        To initiate a return or report a damaged coffee order, please contact our support desk at <span className="text-[#4F9C8F]">hello@brewcraft.com</span> or coordinates via our home screen WhatsApp contact button.
                      </p>
                    </div>
                    <p className="text-xs text-[#5A4034] pt-4">Last Updated: June 2026</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
}
