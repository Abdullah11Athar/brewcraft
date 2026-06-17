import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { coffeeProducts } from '@/data/products';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

let stripe: Stripe | null = null;
if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey);
}

const seatingPrices: Record<string, number> = {
  'Rooftop Seating': 15.00,
  'Inside Lounge': 10.00,
  'Outside Garden': 12.00
};

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured on this server.' },
        { status: 500 }
      );
    }

    // Protection 1: Payload Size Cap (DoS prevention)
    const rawBody = await request.text();
    if (rawBody.length > 5000) {
      return NextResponse.json({ error: 'Payload too large.' }, { status: 413 });
    }

    let body;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: 'Invalid JSON request.' }, { status: 400 });
    }

    const { id, name, image, booking } = body;

    // Protection 2: Strict Type & Length validation (NoSQL/Query Injection Prevention)
    if (
      typeof id !== 'string' || id.length > 50 ||
      typeof name !== 'string' || name.length > 100 ||
      typeof image !== 'string' || image.length > 250 ||
      !booking || typeof booking !== 'object' ||
      typeof booking.seatingArea !== 'string' || booking.seatingArea.length > 50 ||
      typeof booking.date !== 'string' || booking.date.length > 30 ||
      typeof booking.time !== 'string' || booking.time.length > 30 ||
      typeof booking.guests !== 'string' || booking.guests.length > 30 ||
      typeof booking.tableNumber !== 'string' || booking.tableNumber.length > 30
    ) {
      return NextResponse.json({ error: 'Invalid input fields or parameter types.' }, { status: 400 });
    }

    // Protection 3: Secure Server-Side Price Calculation (Bypasses Price Tampering)
    const product = coffeeProducts.find(p => p.id === id);
    if (!product) {
      return NextResponse.json({ error: 'Coffee product not found in catalog.' }, { status: 400 });
    }

    const coffeeBasePrice = parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0;
    const guestCount = parseInt(booking.guests.split(' ')[0]) || 1;
    if (guestCount < 1 || guestCount > 50 || isNaN(guestCount)) {
      return NextResponse.json({ error: 'Invalid guest capacity.' }, { status: 400 });
    }

    const seatingPrice = seatingPrices[booking.seatingArea];
    if (seatingPrice === undefined) {
      return NextResponse.json({ error: 'Invalid seating area selection.' }, { status: 400 });
    }

    const verifiedPrice = (coffeeBasePrice * guestCount) + seatingPrice;
    const amountInCents = Math.round(verifiedPrice * 100);

    // Get origin domain for redirect URLs
    const origin = request.headers.get('origin') || 'https://brewcraft.shop';

    // Construct image URL if it's relative
    const imageUrl = image.startsWith('http') 
      ? image 
      : `${origin}${image}`;

    // Construct custom Success URL with metadata for the UI to display immediately
    const successUrl = `${origin}/success?session_id={CHECKOUT_SESSION_ID}` +
      `&area=${encodeURIComponent(booking.seatingArea)}` +
      `&date=${encodeURIComponent(booking.date)}` +
      `&time=${encodeURIComponent(booking.time)}` +
      `&table=${encodeURIComponent(booking.tableNumber)}` +
      `&guests=${encodeURIComponent(booking.guests)}` +
      `&coffee=${encodeURIComponent(product.name)}`;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${booking.seatingArea} Reservation + ${product.name}`,
              description: `Booking: ${booking.date} at ${booking.time} (${booking.tableNumber}, ${booking.guests}). Includes one complimentary ${product.name}.`,
              images: [imageUrl],
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        coffee_item: product.name,
        seating_area: booking.seatingArea,
        reservation_date: booking.date,
        reservation_time: booking.time,
        table_number: booking.tableNumber,
        guests: booking.guests,
      },
      mode: 'payment',
      success_url: successUrl,
      cancel_url: `${origin}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error('Stripe Session Error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
