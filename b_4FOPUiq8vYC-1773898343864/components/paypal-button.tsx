'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { ExternalLink, CreditCard } from 'lucide-react';
import { getAdminSettings } from '@/lib/admin-store';

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PayPalButtonConfig) => {
        render: (container: string | HTMLElement) => Promise<void>;
        close: () => void;
      };
    };
  }
}

interface PayPalButtonConfig {
  createOrder: (data: unknown, actions: { order: { create: (orderData: OrderData) => Promise<string> } }) => Promise<string>;
  onApprove: (data: { orderID: string }, actions: { order: { capture: () => Promise<CaptureData> } }) => Promise<void>;
  onError: (err: Error) => void;
  onCancel: () => void;
  style?: {
    layout?: 'vertical' | 'horizontal';
    color?: 'gold' | 'blue' | 'silver' | 'white' | 'black';
    shape?: 'rect' | 'pill';
    label?: 'paypal' | 'checkout' | 'buynow' | 'pay';
  };
}

interface OrderData {
  purchase_units: Array<{
    amount: {
      value: string;
      currency_code: string;
    };
    description: string;
  }>;
}

interface CaptureData {
  id: string;
  status: string;
  purchase_units: Array<{
    payments: {
      captures: Array<{
        id: string;
        amount: { value: string };
      }>;
    };
  }>;
}

interface PayPalButtonProps {
  amount: number;
  description: string;
  eventId: string;
  ticketTierId: string;
  holderName: string;
  holderEmail: string;
  onSuccess: (transactionId: string, amount: string) => void;
  onError: (error: string) => void;
}

export function PayPalButton({
  amount,
  description,
  eventId,
  ticketTierId,
  holderName,
  holderEmail,
  onSuccess,
  onError,
}: PayPalButtonProps) {
  const searchParams = useSearchParams();
  const paypalRef = useRef<HTMLDivElement>(null);
  const buttonInstanceRef = useRef<{ close: () => void } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [settings, setSettings] = useState(getAdminSettings());
  const [sdkLoaded, setSdkLoaded] = useState(false);

  useEffect(() => {
    // Initial load
    setSettings(getAdminSettings());
    
    // Listen for storage changes (when admin updates settings)
    const handleStorageChange = () => {
      setSettings(getAdminSettings());
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also poll for changes since storage event doesn't fire in same tab
    const interval = setInterval(() => {
      setSettings(getAdminSettings());
    }, 1000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Load PayPal SDK for SDK mode
  useEffect(() => {
    if (settings.paypalMode !== 'sdk') {
      setIsLoading(false);
      return;
    }

    const clientId = settings.paypalClientId || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId) {
      onError('PayPal Client ID not configured. Please set NEXT_PUBLIC_PAYPAL_CLIENT_ID in .env or configure in Admin settings.');
      setIsLoading(false);
      return;
    }

    // Validate PayPal Client ID format
    const isValidClientId = (id: string): boolean => {
      return id.length > 20 && (id.startsWith('sb-') || id.startsWith('A'));
    };

    if (!isValidClientId(clientId)) {
      console.error('Invalid PayPal Client ID:', clientId);
      onError('Invalid PayPal Client ID configured. Please update in Admin > Settings (must start with sb- or A and be 20+ chars).');
      setIsLoading(false);
      return;
    }

    const existingScript = document.getElementById('paypal-sdk');
    if (existingScript) {
      if (window.paypal) {
        setSdkLoaded(true);
        setIsLoading(false);
      }
      return;
    }

    const script = document.createElement('script');
    script.id = 'paypal-sdk';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
    script.async = true;
    
    script.onload = () => {
      console.log('PayPal SDK loaded successfully');
      setSdkLoaded(true);
      setIsLoading(false);
    };
    
    script.onerror = (err) => {
      console.error('PayPal SDK load failed:', err);
      onError('Failed to load PayPal SDK. Check Client ID and network.');
      setIsLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      if (buttonInstanceRef.current) {
        buttonInstanceRef.current.close();
      }
    };
  }, [settings.paypalMode, onError]);

  // Render PayPal buttons when SDK is loaded
  useEffect(() => {
    if (settings.paypalMode !== 'sdk' || !sdkLoaded || !window.paypal || !paypalRef.current) {
      return;
    }

    // Clear any existing buttons
    if (buttonInstanceRef.current) {
      buttonInstanceRef.current.close();
    }
    paypalRef.current.innerHTML = '';

    const buttons = window.paypal.Buttons({
      createOrder: async (_data, actions) => {
        const payeeEmail = settings.paypalEmail || process.env.NEXT_PUBLIC_PAYPAL_RECEIVER_EMAIL || 'ngarimwangi@gmail.com';

        return actions.order.create({
          purchase_units: [{
            amount: {
              value: amount.toFixed(2),
              currency_code: 'USD',
            },
            description: description,
            payee: {
              email_address: payeeEmail,
            },
          }],
        });
      },
      onApprove: async (data, actions) => {
        setIsVerifying(true);
        try {
          const details = await actions.order.capture();
          
          // Server-side verification
          const verifyResponse = await fetch('/api/verify-paypal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderID: data.orderID, details }),
          });
          
          const verifyData = await verifyResponse.json();
          
          if (verifyData.valid) {
            onSuccess(verifyData.transactionId, verifyData.amount);
          } else {
            onError(verifyData.error || 'Payment verification failed');
          }
        } catch (err) {
          onError('Payment processing failed');
        } finally {
          setIsVerifying(false);
        }
      },
      onError: (err) => {
        onError(err.message || 'PayPal error occurred');
      },
      onCancel: () => {
        // User cancelled - do nothing
      },
      style: {
        layout: 'vertical',
        color: 'gold',
        shape: 'rect',
        label: 'paypal',
      },
    });

    buttons.render(paypalRef.current);
    buttonInstanceRef.current = buttons;
  }, [sdkLoaded, amount, description, onSuccess, onError, settings.paypalMode]);

  // NCP Link mode
  const handleNCPPayment = () => {
    if (!settings.ncpLink) {
      onError('PayPal payment link not configured. Please contact support.');
      return;
    }

    // Store registration data for when they return
    const returnData = {
      eventId,
      ticketTierId,
      holderName,
      holderEmail,
      amount,
      description,
      timestamp: Date.now(),
    };
    localStorage.setItem('vendorsquare_pending_payment', JSON.stringify(returnData));

    // Build return URL
    const currentUrl = window.location.origin;
    const returnUrl = `${currentUrl}/events/${eventId}/complete`;
    
    // Append return URL to NCP link if not already present
    let paymentUrl = settings.ncpLink;
    if (!paymentUrl.includes('return=') && !paymentUrl.includes('return_url=')) {
      const separator = paymentUrl.includes('?') ? '&' : '?';
      paymentUrl = `${paymentUrl}${separator}return=${encodeURIComponent(returnUrl)}`;
    }

    // Redirect to PayPal (works better on mobile than window.open)
    window.location.href = paymentUrl;
  };

  // Handle NCP return (PayPal redirect back)
  useEffect(() => {
    if (settings.paypalMode !== 'ncp') return;

    const status = searchParams.get('st');
    const txId = searchParams.get('tx');
    
    if (status === 'Completed' && txId) {
      const pendingData = localStorage.getItem('vendorsquare_pending_payment');
      if (pendingData) {
        try {
          const returnData = JSON.parse(pendingData);
          // Verify via API
          setIsVerifying(true);
          fetch('/api/verify-paypal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              orderID: txId, 
              details: { purchase_units: [{ payments: { captures: [{ id: txId }] } }] } 
            }),
          }).then(res => res.json())
            .then(data => {
              if (data.valid) {
                onSuccess(data.transactionId, data.amount);
              } else {
                onError(data.error || 'Payment verification failed');
              }
              localStorage.removeItem('vendorsquare_pending_payment');
            })
            .catch(err => onError('Verification failed'))
            .finally(() => setIsVerifying(false));
        } catch (e) {
          onError('Invalid pending payment data');
        }
      }
    }
  }, [searchParams, settings.paypalMode, onSuccess, onError]);

  // If no payment method is configured
  if (!settings.paypalClientId && !settings.ncpLink && !process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID) {
    return (
      <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-center">
        <p className="text-sm text-destructive">
          Payment processing is not configured. Please contact the organizer.
        </p>
      </div>
    );
  }

  // SDK Mode
  if (settings.paypalMode === 'sdk' && (settings.paypalClientId || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID)) {
    return (
      <div className="space-y-4">
        {(isLoading || isVerifying) && (
          <div className="flex items-center justify-center py-4">
            <Spinner className="mr-2 h-4 w-4" />
            <span className="text-sm text-muted-foreground">
              {isLoading ? 'Loading PayPal...' : 'Verifying payment...'}
            </span>
          </div>
        )}
        <div ref={paypalRef} className={isLoading ? 'hidden' : ''} />
      </div>
    );
  }

  // NCP Mode
  return (
    <Button
      onClick={handleNCPPayment}
      className="w-full gradient-primary border-0 text-primary-foreground"
      size="lg"
    >
      <CreditCard className="mr-2 h-4 w-4" />
      Pay with PayPal
      <ExternalLink className="ml-2 h-4 w-4" />
    </Button>
  );
}
