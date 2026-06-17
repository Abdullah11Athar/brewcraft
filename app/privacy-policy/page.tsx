import Link from 'next/link';

export default function PrivacyPolicy() {
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
          Privacy <span className="text-[#4F9C8F]">Policy</span>
        </h1>
        <p className="text-sm text-[#C9B8A0]/60 mb-10">Last Updated: May 2026</p>

        {/* Content */}
        <div className="space-y-8 text-base text-[#C9B8A0] leading-relaxed">
          <section>
            <p>
              Welcome to BrewCraft. We are committed to protecting your personal information and your right to privacy.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
              1. Information We Collect
            </h2>
            <p>
              We do not run direct registration forms on this landing page. However, when you click our WhatsApp button to coordinate orders or get in touch, you voluntarily share your phone number and chat content.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
              2. Cookies and Analytics
            </h2>
            <p>
              We utilize minor functional cookies and Vercel Analytics to understand user behaviors, helping us improve site speed, layout responsiveness, and overall coffee exploration experiences.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
              3. Sharing Your Information
            </h2>
            <p>
              BrewCraft will never sell, rent, or lease your private data or contact number to third-party companies. All user communications are kept strictly confidential.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
              4. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, you can reach out to us at <span className="text-[#4F9C8F]">hello@brewcraft.com</span> or via our official WhatsApp channel.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
