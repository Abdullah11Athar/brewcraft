import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#1A0F0A] text-[#F5E6D3] min-h-screen py-16 px-4 md:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#4F9C8F] hover:text-[#D4A574] transition-colors mb-12 group">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to BrewCraft Home
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F5E6D3]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Privacy <span className="text-[#4F9C8F]">Policy</span>
        </h1>
        <p className="text-sm text-[#C9B8A0]/60 mb-10">Last Updated: June 2026</p>

        {/* Content */}
        <div className="space-y-8 text-base text-[#C9B8A0] leading-relaxed">
          <section>
            <p>
              Welcome to BrewCraft. We respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, <strong>brewcraft.shop</strong>, or use our services.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              1. Information We Collect
            </h2>
            <p className="mb-4">
              We collect information that you voluntarily provide to us when you express an interest in obtaining information about us or our products, or when you contact us.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Contact Information:</strong> When you contact us via email (hello@brewcraft.com) or click our WhatsApp button to coordinate orders, you voluntarily share your phone number, name, and the text of your message.</li>
              <li><strong>Payment Data:</strong> We do not collect or store your payment card or bank account details on our servers. All credit card payments are processed securely by our third-party payment gateway, Stripe (checkout.stripe.com).</li>
            </ul>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              2. How We Use Your Information
            </h2>
            <p>
              We use personal information collected via our website for the following business purposes:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>To fulfill and manage your orders.</li>
              <li>To respond to your inquiries and offer customer support.</li>
              <li>To improve our website's performance and design.</li>
              <li>To comply with legal obligations and prevent fraud.</li>
            </ul>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              3. Cookies and Analytics
            </h2>
            <p>
              We use minimal technical cookies to maintain site stability and improve responsiveness. We also use privacy-focused analytics tools (such as Vercel Analytics) to track page views and interactions, helping us optimize the speed and loading times of our coffee canvas experiences.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              4. Data Sharing and Disclosure
            </h2>
            <p>
              We do not sell, rent, or lease your private contact numbers or emails to third-party marketing companies. We only share information with third parties when necessary to complete transactions (such as Stripe for payments, or local couriers for shipping coffee orders).
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              5. Contact Us
            </h2>
            <p>
              If you have questions or comments about this policy, you can contact us at:
            </p>
            <div className="mt-3 bg-[#0A0300] border border-[#3D2820]/60 rounded-xl p-6 space-y-2 text-sm text-[#C9B8A0]/90">
              <p>☕ <strong>BrewCraft Coffee</strong></p>
              <p>📍 123 Artisan Street, New York, NY 10001</p>
              <p>✉️ Email: hello@brewcraft.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
