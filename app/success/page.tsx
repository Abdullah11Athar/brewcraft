import Link from 'next/link';

interface SuccessPageProps {
  searchParams: {
    area?: string;
    date?: string;
    time?: string;
    table?: string;
    guests?: string;
    coffee?: string;
    session_id?: string;
  };
}

export default function SuccessPage({ searchParams }: SuccessPageProps) {
  const area = searchParams.area || 'Rooftop Seating';
  const date = searchParams.date || 'Tomorrow';
  const time = searchParams.time || '7:30 PM';
  const table = searchParams.table || 'Table 1';
  const guests = searchParams.guests || '2 Guests';
  const coffee = searchParams.coffee || 'Latte';

  return (
    <div className="bg-[#1A0F0A] text-[#F5E6D3] min-h-screen flex items-center justify-center py-16 px-4 md:px-8 font-sans">
      <div className="max-w-md w-full bg-[#1E0F08] border border-[#3D2820] rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#4F9C8F] via-[#D4A574] to-[#4F9C8F]" />

        {/* Success Icon */}
        <div className="w-16 h-16 bg-[#4F9C8F]/10 border border-[#4F9C8F] text-[#4F9C8F] rounded-full flex items-center justify-center mx-auto mb-5 text-3xl font-bold">
          ✓
        </div>

        {/* Heading */}
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-[#F5E6D3]" style={{ fontFamily: 'Playfair Display, serif' }}>
          Booking <span className="text-[#4F9C8F]">Confirmed!</span>
        </h1>
        
        {/* Description */}
        <p className="text-xs md:text-sm text-[#C9B8A0]/70 mb-6 leading-relaxed">
          Your table and order have been reserved at BrewCraft. A secure transaction record has been processed by Stripe.
        </p>

        {/* Reservation Ticket Stub */}
        <div className="border border-dashed border-[#5A4034]/70 bg-[#0A0300] rounded-xl p-5 mb-8 text-left relative overflow-hidden">
          {/* Ticket Side Cuts */}
          <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1E0F08] border-r border-[#5A4034]/50" />
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1E0F08] border-l border-[#5A4034]/50" />

          <h3 className="text-center text-[#D4A574] font-semibold text-xs tracking-widest uppercase mb-4 pb-2 border-b border-[#3D2820]/60">
            Reservation Ticket
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between">
              <span className="text-[#C9B8A0]/60">Item Ordered:</span>
              <strong className="text-[#F5E6D3]">{coffee}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C9B8A0]/60">Seating Area:</span>
              <strong className="text-[#F5E6D3]">{area}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C9B8A0]/60">Date:</span>
              <strong className="text-[#F5E6D3]">{date}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C9B8A0]/60">Time Slot:</span>
              <strong className="text-[#F5E6D3]">{time}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C9B8A0]/60">Assigned Table:</span>
              <strong className="text-[#4F9C8F] font-bold">{table}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-[#C9B8A0]/60">Guests:</span>
              <strong className="text-[#F5E6D3]">{guests}</strong>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link 
            href="/" 
            className="block w-full py-3 bg-gradient-to-r from-[#4F9C8F] to-[#2d6b62] text-white text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-[#4F9C8F]/20 transition-all duration-300"
          >
            Back to Home
          </Link>
          <p className="text-2xs text-[#5A4034]">
            Confirmation receipt and table details have been sent to your Stripe payment email.
          </p>
        </div>
      </div>
    </div>
  );
}
