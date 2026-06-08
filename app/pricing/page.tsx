import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      category: 'Web Design Templates',
      description: 'Fully responsive, modern Next.js and Figma storefront templates.',
      items: [
        { name: 'Landing Page Template', price: '$49.00', desc: 'Single-page high-converting layout.' },
        { name: 'Portfolio Template', price: '$79.00', desc: 'Premium grid layout for creatives.' },
        { name: 'Full Storefront Kit (Next.js)', price: '$149.00', desc: 'Complete multi-page e-commerce setup.' }
      ]
    },
    {
      category: 'UI/UX Design Resources',
      description: 'Standardized UI component libraries and asset packs.',
      items: [
        { name: 'Icon & Illustration Pack', price: '$29.00', desc: '100+ custom vector icons and visuals.' },
        { name: 'Figma Component Library', price: '$59.00', desc: 'Design system starter with auto-layout.' },
        { name: 'Full Dashboard UI Kit', price: '$99.00', desc: '30+ screens and visual chart components.' }
      ]
    },
    {
      category: 'Brand Identity Packs',
      description: 'Standardized branding guideline templates and asset sheets.',
      items: [
        { name: 'Social Media Templates', price: '$79.00', desc: '30+ editable posts & story grids.' },
        { name: 'Logo & Guideline Sheet', price: '$129.00', desc: 'Corporate branding guide presentation.' },
        { name: 'Ultimate Branding Bundle', price: '$199.00', desc: 'Combined assets: guidelines, cards, and assets.' }
      ]
    }
  ];

  return (
    <div className="bg-[#1A0F0A] text-[#F5E6D3] min-h-screen py-20 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#4F9C8F] hover:text-[#D4A574] transition-colors mb-12 group">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Return to BrewCraft
        </Link>

        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-[#4F9C8F] text-xs tracking-[0.4em] uppercase mb-3">Our Offerings</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#F5E6D3]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Product <span className="text-[#4F9C8F]">Pricing Plans</span>
          </h1>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#4F9C8F] to-transparent mx-auto mt-5" />
          <p className="text-sm text-[#C9B8A0]/75 mt-4 max-w-lg mx-auto">
            High-fidelity, professional digital design assets and source code templates. Deliverable instantly worldwide.
          </p>
        </div>

        {/* Pricing Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((cat, i) => (
            <div key={i} className="bg-[#1E0F08] border border-[#3D2820] rounded-2xl p-6 relative overflow-hidden flex flex-col shadow-xl">
              {/* Glow Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4F9C8F] to-[#D4A574]" />
              
              <h2 className="text-xl font-bold text-[#F5E6D3] mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                {cat.category}
              </h2>
              <p className="text-xs text-[#C9B8A0]/60 mb-6 leading-relaxed">
                {cat.description}
              </p>

              {/* Items List */}
              <div className="space-y-5 flex-grow">
                {cat.items.map((item, idx) => (
                  <div key={idx} className="border-t border-[#3D2820]/50 pt-4 first:border-0 first:pt-0">
                    <div className="flex justify-between items-baseline gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-[#F5E6D3]">{item.name}</h3>
                      <span className="text-sm font-bold text-[#4F9C8F] shrink-0">{item.price}</span>
                    </div>
                    <p className="text-2xs text-[#C9B8A0]/60 leading-normal">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Licensing / Delivery Note */}
        <div className="bg-[#0A0300] border border-[#3D2820]/60 rounded-2xl p-6 text-center max-w-2xl mx-auto text-xs text-[#C9B8A0]/70 leading-relaxed">
          <p className="font-semibold text-[#D4A574] mb-2 uppercase tracking-wider">Instant Digital Delivery</p>
          <p>
            All purchases are one-time payments and include lifetime updates. Upon purchase, files (Figma source sheets, Next.js code folders, assets) are delivered immediately to your registered billing email address via secure download links.
          </p>
        </div>

      </div>
    </div>
  );
}
