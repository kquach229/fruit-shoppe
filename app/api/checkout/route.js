import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req) {
  // if (req.method !== 'POST') return res.sendStatus(405);

  const body = await req.json();
  if (body.lineItems.length === 0) {
    return new Response('error', {
      status: 405,
    });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET ?? '', {
      apiVersion: '2020-08-27',
    });

    const session = await stripe.checkout.sessions.create({
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
      line_items: body.lineItems,
      mode: 'payment',
    });

    return NextResponse.json({ session });
  } catch (error) {
    console.error('error: ', error);
    return new Response('error', {
      status: 405,
    });
  }
}
