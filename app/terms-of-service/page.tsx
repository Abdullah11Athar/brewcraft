import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="bg-[#1A0F0A] text-[#F5E6D3] min-h-screen py-16 px-4 md:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#4F9C8F] hover:text-[#D4A574] transition-colors mb-12 group">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to BrewCraft Home
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F5E6D3]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Terms of <span className="text-[#4F9C8F]">Service</span>
        </h1>
        <p className="text-sm text-[#C9B8A0]/60 mb-10">Last Updated: June 2026</p>

        {/* Content */}
        <div className="space-y-8 text-base text-[#C9B8A0] leading-relaxed">
          <section>
            <p>
              Welcome to BrewCraft. By accessing our website (<strong>brewcraft.shop</strong>) or placing an order with us, you agree to comply with and be bound by the following Terms of Service. Please read them carefully.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              1. Website Use
            </h2>
            <p>
              This website provides product catalogs, interactive elements, and order coordination options. You agree to use the site only for lawful purposes. You must not attempt to disrupt the website’s operations, inject malicious scripts, or perform scraping of product information.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              2. Products and Pricing
            </h2>
            <p>
              We sell premium coffee beans, specialty tea blends, and brewing equipment. All product details, ingredients, and pricing listed on our storefront are subject to change at any time without notice. We reserve the right to limit the sales of our products to any person or region.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              3. Payments and Billing
            </h2>
            <p>
              By placing an order via our portal or invoice links, you agree to provide current, complete, and accurate purchase details. 
            </p>
            <p className="mt-2">
              All transactions are processed securely through <strong>Stripe</strong>. By entering payment details on Stripe Checkout, you authorize our third-party payment gateway to charge the designated amount. Any payment failure or unauthorized use will result in the immediate cancellation of your order.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              4. Shipping and Delivery
            </h2>
            <p>
              Coffee products are freshly roasted and packaged to order. Shipping times and delivery costs are calculated at the checkout page. We strive to meet estimated delivery times, but cannot be held liable for courier delays or customs checks in international shipments.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              5. Intellectual Property
            </h2>
            <p>
              All original logos, branding elements, canvas animations, and design assets showcased on BrewCraft are intellectual property owned by BrewCraft and protected under international copyright regulations.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              6. Contact
            </h2>
            <p>
              If you have any questions regarding these Terms, you can write to us at <span className="text-[#4F9C8F]">hello@brewcraft.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
