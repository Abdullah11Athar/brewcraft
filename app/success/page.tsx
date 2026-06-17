import Link from 'next/link';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
let stripe: Stripe | null = null;
if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey);
}

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

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const sessionId = searchParams.session_id;

  // If Stripe is configured, we MUST verify the session_id to prevent fake/unpaid reservation confirmations
  let customerName = 'Guest';
  let customerEmail = '';
  let paymentVerified = false;
  let errorMsg = '';

  let area = searchParams.area || 'Rooftop Seating';
  let date = searchParams.date || 'Tomorrow';
  let time = searchParams.time || '7:30 PM';
  let table = searchParams.table || 'Table 1';
  let guests = searchParams.guests || '2 Guests';
  let coffee = searchParams.coffee || 'Latte';

  if (stripe) {
    if (!sessionId) {
      errorMsg = 'No active transaction session was detected.';
    } else {
      try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        if (session && session.payment_status === 'paid') {
          paymentVerified = true;
          customerName = session.customer_details?.name || 'Valued Guest';
          customerEmail = session.customer_details?.email || '';
          
          // Securely retrieve the exact metadata saved during session initialization
          if (session.metadata) {
            coffee = session.metadata.coffee_item || coffee;
            area = session.metadata.seating_area || area;
            date = session.metadata.reservation_date || date;
            time = session.metadata.reservation_time || time;
            table = session.metadata.table_number || table;
            guests = session.metadata.guests || guests;
          }
        } else {
          errorMsg = 'This payment session has not been successfully completed.';
        }
      } catch (err: any) {
        console.error('Stripe session retrieval failed:', err);
        errorMsg = 'Could not securely verify the transaction with Stripe.';
      }
    }
  } else {
    // If Stripe keys are not set locally, permit bypass for developer sandbox testing
    paymentVerified = true;
    customerName = 'Sandbox Tester';
  }

  if (!paymentVerified) {
    return (
      <div className="bg-[#1A0F0A] text-[#F5E6D3] min-h-screen flex items-center justify-center py-16 px-4 md:px-8 font-sans"
        style={{ backgroundImage: 'radial-gradient(circle at center, #261710 0%, #050201 100%)' }}>
        <div className="max-w-md w-full bg-[#1E0F08] border border-rose-950 rounded-2xl p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-rose-600" />
          <div className="w-16 h-16 bg-rose-950/20 border border-rose-500 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl font-bold">
            ✕
          </div>
          <h1 className="text-2xl font-bold mb-2 text-[#F5E6D3]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Verification <span className="text-rose-500">Failed</span>
          </h1>
          <p className="text-xs md:text-sm text-[#C9B8A0]/70 mb-8 leading-relaxed">
            {errorMsg || 'We were unable to find or verify a completed Stripe payment record for this session.'}
          </p>
          <Link 
            href="/" 
            className="block w-full py-3 bg-[#241712] border border-[#3D2820] text-[#F5E6D3] text-sm font-semibold rounded-full hover:bg-[#2E1F1A] transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1A0F0A] text-[#F5E6D3] min-h-screen flex items-center justify-center py-16 px-4 md:px-8 font-sans"
      style={{ backgroundImage: 'radial-gradient(circle at center, #261710 0%, #050201 100%)' }}>
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
          Thank you, <strong className="text-white">{customerName}</strong>! Your table and order have been reserved at BrewCraft. A secure transaction record has been processed by Stripe.
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
            {customerEmail && (
              <div className="flex justify-between pb-1 border-b border-[#2B1B15]/50">
                <span className="text-[#C9B8A0]/60">Email:</span>
                <strong className="text-[#F5E6D3]">{customerEmail}</strong>
              </div>
            )}
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
