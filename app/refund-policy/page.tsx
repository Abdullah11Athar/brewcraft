import Link from 'next/link';

export default function RefundPolicy() {
  return (
    <div className="bg-[#1A0F0A] text-[#F5E6D3] min-h-screen py-16 px-4 md:px-8 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#4F9C8F] hover:text-[#D4A574] transition-colors mb-12 group">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to BrewCraft Home
        </Link>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#F5E6D3]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Refund <span className="text-[#4F9C8F]">Policy</span>
        </h1>
        <p className="text-sm text-[#C9B8A0]/60 mb-10">Last Updated: June 2026</p>

        {/* Content */}
        <div className="space-y-8 text-base text-[#C9B8A0] leading-relaxed">
          <section>
            <p>
              At BrewCraft, we take absolute pride in our artisan coffee beans and custom tea blends. We want you to love your brew! If you are not entirely satisfied with your purchase, we are here to help.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              1. Fresh Coffee and Food Items
            </h2>
            <p>
              Because coffee beans and tea leaves are perishable food products, we **cannot accept returns on opened or consumed items**. 
            </p>
            <p className="mt-2">
              However, if there is a mistake in your order (e.g., wrong roast type, wrong grind level, or incorrect item delivered) or if your package was damaged in transit, please contact us within **7 days** of receiving your package. We will immediately ship out a replacement package or process a full refund.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              2. Merchandise and Equipment
            </h2>
            <p>
              For non-perishable goods (like mugs, drippers, scales, or coffee grinders), you may return items within **14 days** of delivery. 
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>Items must be completely unused, in their original packaging, and in the same condition that you received them.</li>
              <li>You will be responsible for paying the shipping costs for returning non-defective items. Shipping costs are non-refundable.</li>
            </ul>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              3. Refund Processing
            </h2>
            <p>
              Once your return is received and inspected, we will send you an email or message to notify you of the approval or rejection of your refund.
            </p>
            <p className="mt-2">
              If approved, your refund will be processed immediately. A credit will automatically be applied to your original credit card or method of payment via Stripe. Payout processing timelines depend on your bank, but typically take **5 to 10 business days** to show up in your account.
            </p>
          </section>

          <section className="border-t border-[#3D2820]/40 pt-6">
            <h2 className="text-[#D4A574] text-xl font-semibold mb-3 uppercase tracking-wider" style={{ fontFamily: 'Playfair Display, serif' }}>
              4. Contact for Returns and Refunds
            </h2>
            <p>
              To initiate a return or report a damaged coffee order, please contact our support desk:
            </p>
            <div className="mt-3 bg-[#0A0300] border border-[#3D2820]/60 rounded-xl p-6 space-y-2 text-sm text-[#C9B8A0]/90">
              <p>✉️ Email: <strong>hello@brewcraft.com</strong></p>
              <p>📞 WhatsApp Support: coordinates via our home screen WhatsApp contact button.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
