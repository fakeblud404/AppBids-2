import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount } = body;

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: 'Minimum bid is $1.00 (100 cents)' },
        { status: 400 }
      );
    }

    let clientSecret = 'pi_mock_secret';
    let paymentIntentId = 'pi_mock_' + Math.random().toString(36).substr(2, 9);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount),
        currency: 'usd',
        metadata: {
          type: 'ad_bid',
        },
      });
      clientSecret = paymentIntent.client_secret || 'pi_mock_secret';
      paymentIntentId = paymentIntent.id;
    } catch (stripeError) {
      console.warn('Stripe not configured or failed, proceeding in mock sandbox checkout mode:', stripeError);
    }

    return NextResponse.json({
      clientSecret,
      paymentIntentId,
    });
  } catch (error) {
    console.error('Stripe PaymentIntent error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
