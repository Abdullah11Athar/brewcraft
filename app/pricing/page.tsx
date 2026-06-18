import Link from 'next/link';

export default function PricingPage() {
  const coffeePrices = [
    { name: 'Cappuccino', price: '$3.50', description: 'Espresso, Steamed Milk, Foam', rating: '4.9 ★' },
    { name: 'Latte', price: '$4.00', description: 'Espresso, Steamed Milk, Light Foam', rating: '5.0 ★' },
    { name: 'Mocha', price: '$4.50', description: 'Espresso, Chocolate, Steamed Milk', rating: '4.7 ★' },
  ];

  const seatingPrices = [
    { name: 'Inside Lounge', price: '$10.00', description: 'Cozy, ambient interior seating near the baristas', rating: 'Premium' },
    { name: 'Outside Garden', price: '$12.00', description: 'Scenic outdoor garden area with lush greenery', rating: 'Popular' },
    { name: 'Rooftop Seating', price: '$15.00', description: 'Breathtaking open-air rooftop views under the sky', rating: 'Luxury' },
  ];

  return (
    <div className="bg-[#1A0F0A] text-[#F5E6D3] min-h-screen py-16 px-4 md:px-8 font-sans"
      style={{ backgroundImage: 'radial-gradient(circle at center, #261710 0%, #050201 100%)' }}>
      <div className="max-w-5xl mx-auto bg-[#130A06]/80 border border-[#3D2820] rounded-2xl p-8 sm:p-12 shadow-2xl backdrop-blur-md relative">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#4F9C8F] via-[#D4A574] to-[#4F9C8F] rounded-t-2xl" />

        {/* Back Button */}
        <Link href="/" className="inline-flex items-center gap-2 text-[#4F9C8F] hover:text-[#D4A574] transition-colors mb-12 group">
          <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to BrewCraft Home
        </Link>

        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#F5E6D3]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Transparent <span className="text-[#4F9C8F]">Pricing</span>
          </h1>
          <p className="text-sm md:text-base text-[#C9B8A0]/70 max-w-xl mx-auto leading-relaxed">
            Explore our curated menu selections and reservation rates. Secure booking, guaranteed seating, and fresh craft drinks.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Coffee Pricing Card */}
          <div className="bg-[#1E0F08] border border-[#3D2820] rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#3D2820]/60">
              <h2 className="text-2xl font-bold text-[#D4A574]" style={{ fontFamily: 'Playfair Display, serif' }}>
                ☕ Craft Coffees
              </h2>
              <span className="text-2xs bg-[#4F9C8F]/10 text-[#4F9C8F] border border-[#4F9C8F]/30 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                Per Cup
              </span>
            </div>

            <div className="space-y-6">
              {coffeePrices.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4 pb-4 border-b border-[#2B1B15]/50 last:border-0 last:pb-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#F5E6D3] text-lg">{item.name}</h3>
                      <span className="text-xs text-[#D4A574]">{item.rating}</span>
                    </div>
                    <p className="text-xs text-[#C9B8A0]/60 mt-1">{item.description}</p>
                  </div>
                  <span className="text-xl font-bold text-[#4F9C8F] shrink-0" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Seating Space Pricing Card */}
          <div className="bg-[#1E0F08] border border-[#3D2820] rounded-2xl p-6 md:p-8 shadow-xl">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#3D2820]/60">
              <h2 className="text-2xl font-bold text-[#D4A574]" style={{ fontFamily: 'Playfair Display, serif' }}>
                🛋️ Seating Spaces
              </h2>
              <span className="text-2xs bg-[#D4A574]/10 text-[#D4A574] border border-[#D4A574]/30 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
                Booking Fee
              </span>
            </div>

            <div className="space-y-6">
              {seatingPrices.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4 pb-4 border-b border-[#2B1B15]/50 last:border-0 last:pb-0">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-[#F5E6D3] text-lg">{item.name}</h3>
                      <span className="text-2xs bg-[#5A4034] text-[#C9B8A0] px-2 py-0.5 rounded-full font-medium">{item.rating}</span>
                    </div>
                    <p className="text-xs text-[#C9B8A0]/60 mt-1">{item.description}</p>
                  </div>
                  <span className="text-xl font-bold text-[#4F9C8F] shrink-0" style={{ fontFamily: 'Playfair Display, serif' }}>
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Facilities & Amenities Section */}
        <div className="mt-16 pt-12 border-t border-[#3D2820]/60">
          <h2 className="text-center text-3xl font-bold text-[#D4A574] mb-10" style={{ fontFamily: 'Playfair Display, serif' }}>
            ✨ Premium Facilities & Amenities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="bg-[#1E0F08]/40 border border-[#3D2820]/40 rounded-xl p-5 hover:border-[#4F9C8F]/50 transition-colors">
              <div className="text-3xl mb-3">📶</div>
              <h4 className="font-bold text-[#F5E6D3] text-sm mb-1">Free High-Speed Wi-Fi</h4>
              <p className="text-[11px] text-[#C9B8A0]/60">Seamless fiber network for co-working & browsing.</p>
            </div>
            <div className="bg-[#1E0F08]/40 border border-[#3D2820]/40 rounded-xl p-5 hover:border-[#4F9C8F]/50 transition-colors">
              <div className="text-3xl mb-3">🔌</div>
              <h4 className="font-bold text-[#F5E6D3] text-sm mb-1">Power Outlets</h4>
              <p className="text-[11px] text-[#C9B8A0]/60">Dedicated power plugs under every single table.</p>
            </div>
            <div className="bg-[#1E0F08]/40 border border-[#3D2820]/40 rounded-xl p-5 hover:border-[#4F9C8F]/50 transition-colors">
              <div className="text-3xl mb-3">🚗</div>
              <h4 className="font-bold text-[#F5E6D3] text-sm mb-1">Valet Parking</h4>
              <p className="text-[11px] text-[#C9B8A0]/60">Hassle-free parking space for booking guests.</p>
            </div>
            <div className="bg-[#1E0F08]/40 border border-[#3D2820]/40 rounded-xl p-5 hover:border-[#4F9C8F]/50 transition-colors">
              <div className="text-3xl mb-3">❄️</div>
              <h4 className="font-bold text-[#F5E6D3] text-sm mb-1">Climate Control</h4>
              <p className="text-[11px] text-[#C9B8A0]/60">Fully air-conditioned lounge with cozy lighting.</p>
            </div>
          </div>
        </div>

        {/* Pricing Footnote & Call to Action */}
        <div className="mt-16 text-center border-t border-[#3D2820]/40 pt-8">
          <p className="text-xs text-[#C9B8A0]/50 mb-6 max-w-md mx-auto">
            Note: Seating space booking fee secures your reserved slot, table config, and service. Drinks ordered online add to the session checkout totals.
          </p>
          <Link href="/#menu" className="inline-block py-3 px-8 bg-gradient-to-r from-[#4F9C8F] to-[#2d6b62] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#4F9C8F]/20 transition-all duration-300 active:scale-[0.98]">
            Book Your Space & Order Now
          </Link>
        </div>

      </div>
    </div>
  );
}
