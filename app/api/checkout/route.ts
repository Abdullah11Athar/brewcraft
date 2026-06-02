import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

let stripe: Stripe | null = null;
if (stripeSecretKey) {
  stripe = new Stripe(stripeSecretKey);
}

export async function POST(request: Request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: 'Stripe is not configured on this server.' },
        { status: 500 }
      );
    }

    const { id, name, description, price, image, booking } = await request.json();

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking details are missing.' },
        { status: 400 }
      );
    }

    // Parse price string (e.g. "$19.00" to 1900 cents)
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (isNaN(numericPrice) || numericPrice <= 0) {
      return NextResponse.json(
        { error: 'Invalid product price format.' },
        { status: 400 }
      );
    }

    const amountInCents = Math.round(numericPrice * 100);

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
      `&coffee=${encodeURIComponent(name)}`;

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${booking.seatingArea} Reservation + ${name}`,
              description: `Booking: ${booking.date} at ${booking.time} (${booking.tableNumber}, ${booking.guests}). Includes one complimentary ${name}.`,
              images: [imageUrl],
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        coffee_item: name,
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
