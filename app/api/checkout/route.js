import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
  const body = await req.json();

  if (!body.lineItems || body.lineItems.length === 0) {
    return NextResponse.json(
      { error: 'No line items provided' },
      { status: 400 }
    );
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
      apiVersion: '2020-08-27',
    });

    const session = await stripe.checkout.sessions.create({
      success_url: 'https://fruit-shoppe-store.vercel.app/success',
      cancel_url: 'https://fruit-shoppe-store.vercel.app/cancel',
      line_items: body.lineItems,
      mode: 'payment',
    });

    return NextResponse.json({ session });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
