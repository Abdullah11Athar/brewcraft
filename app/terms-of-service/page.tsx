import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="bg-[#1A0F0A] text-[#F5E6D3] min-h-screen py-16 px-4 md:px-8 font-sans"
      style={{ backgroundImage: 'radial-gradient(circle at center, #261710 0%, #050201 100%)' }}>
      <div className="max-w-3xl mx-auto bg-[#130A06]/80 border border-[#3D2820] rounded-2xl p-8 sm:p-12 shadow-2xl backdrop-blur-md relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4F9C8F] via-[#D4A574] to-[#4F9C8F] rounded-t-2xl" />

        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#4F9C8F] hover:text-[#D4A574] transition-colors mb-12 group">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to BrewCraft Home
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F5E6D3]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Terms & <span className="text-[#4F9C8F]">Conditions</span>
        </h1>
        <p className="text-sm text-[#C9B8A0]/60 mb-10">Last Updated: May 2026</p>

        {/* Content */}
        <div className="space-y-8 text-base text-[#C9B8A0] leading-relaxed">
          <section>
            <p>
              By accessing and exploring the BrewCraft website, you acknowledge that you have read and agreed to comply with the following Terms & Conditions.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
              1. Website Use
            </h2>
            <p>
              This website provides interactive menus, visual coffee animations, and order redirections. You agree not to engage in malicious operations, scraping, or heavy spamming that disrupts the site's hosting performance.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
              2. Intellectual Property
            </h2>
            <p>
              All original coffee blend names, design tokens, logos, graphics, and canvas fluid animations showcased on BrewCraft are owned by us and protected under international copyright regulations.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
              3. Product & Orders
            </h2>
            <p>
              Our menu catalog displays item details and ingredients. Pricing and product availability can change at any time without prior notice. Final order placement and payments are settled securely during the WhatsApp checkout phase.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
              4. Limitation of Liability
            </h2>
            <p>
              BrewCraft strives to provide accurate product information, but does not warrant that descriptions, images, or pricing are entirely error-free. We shall not be liable for any indirect disruptions resulting from using this website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
