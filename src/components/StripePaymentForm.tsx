'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''
);

interface PaymentFormInnerProps {
  onSuccess: (paymentIntentId: string) => void;
  onError: (message: string) => void;
  amount: number;
}

function PaymentFormInner({ onSuccess, onError, amount }: PaymentFormInnerProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/?payment=success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        onError(error.message || 'Payment failed');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onSuccess(paymentIntent.id);
      }
    } catch (err) {
      onError('An unexpected error occurred');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          padding: 16,
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-input)',
          border: '1px solid var(--border)',
          marginBottom: 16,
        }}
      >
        <PaymentElement
          options={{
            layout: 'tabs',
          }}
        />
      </div>

      <button
        type="submit"
        className="btn-primary"
        disabled={!stripe || processing}
        style={{
          width: '100%',
          padding: '14px',
          fontSize: '1rem',
          opacity: processing ? 0.7 : 1,
          cursor: processing ? 'not-allowed' : 'pointer',
        }}
      >
        {processing ? (
          <span className="animate-pulse">Processing...</span>
        ) : (
          `Pay $${(amount / 100).toFixed(2)}`
        )}
      </button>
    </form>
  );
}

interface StripePaymentFormProps {
  clientSecret: string;
  amount: number;
  onSuccess: (paymentIntentId: string) => void;
  onError: (message: string) => void;
}

export default function StripePaymentForm({
  clientSecret,
  amount,
  onSuccess,
  onError,
}: StripePaymentFormProps) {
  const isMock = clientSecret === 'pi_mock_secret' || !process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (isMock) {
    return (
      <div className="animate-fade-in" style={{ textAlign: 'center', padding: '10px 0' }}>
        <div
          style={{
            padding: 16,
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-input)',
            border: '1px solid var(--border)',
            marginBottom: 16,
            textAlign: 'left',
          }}
        >
          <div style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', marginBottom: 12, fontWeight: 600 }}>
            ⚠️ Stripe credentials not set. Running in Demo Sandbox Mode.
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4 }}>
                Simulated Test Card
              </label>
              <input
                className="input"
                disabled
                value="4242 •••• •••• 4242 (Demo Card)"
                style={{ opacity: 0.6 }}
              />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4 }}>
                  Expiry
                </label>
                <input className="input" disabled value="12/29" style={{ opacity: 0.6 }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: 4 }}>
                  CVC
                </label>
                <input className="input" disabled value="123" style={{ opacity: 0.6 }} />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => onSuccess('pi_mock_' + Math.random().toString(36).substr(2, 9))}
          className="btn-primary"
          style={{
            width: '100%',
            padding: '14px',
            fontSize: '1rem',
          }}
        >
          Simulate Payment of ${(amount / 100).toFixed(2)}
        </button>
      </div>
    );
  }

  return (
    <Elements
      stripe={stripePromise}
      options={{
        clientSecret,
        appearance: {
          theme: 'night',
          variables: {
            fontFamily: 'Inter, system-ui, sans-serif',
            colorPrimary: '#3b82f6',
            colorBackground: '#161616',
            colorText: '#ffffff',
            colorTextSecondary: '#a0a0a0',
            borderRadius: '10px',
          },
        },
      }}
    >
      <PaymentFormInner amount={amount} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}
