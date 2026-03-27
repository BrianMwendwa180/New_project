import { NextRequest, NextResponse } from 'next/server';
import checkoutNodeJssdk from '@paypal/checkout-server-sdk';
// Note: Use .env PAYPAL_CLIENT_SECRET and PAYPAL_CLIENT_ID for sandbox/prod
// For production, add LIVE_CLIENT_ID/LIVE_SECRET

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderID, details } = body;

    if (!orderID || !details) {
      return NextResponse.json({ valid: false, error: 'Missing orderID or details' }, { status: 400 });
    }

    // Validate orderID format (PayPal order IDs are typically alphanumeric)
    if (typeof orderID !== 'string' || orderID.length < 10 || !/^[A-Za-z0-9]+$/.test(orderID)) {
      return NextResponse.json({ valid: false, error: 'Invalid order ID format' }, { status: 400 });
    }

    // Validate details structure
    if (typeof details !== 'object' || !details.purchase_units) {
      return NextResponse.json({ valid: false, error: 'Invalid payment details' }, { status: 400 });
    }

    // Validate required environment variables
    const clientId = process.env.PAYPAL_CLIENT_ID || process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
    
    if (!clientId || !clientSecret) {
      console.error('Missing PayPal env vars: Add PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET to .env.local');
      return NextResponse.json({ 
        valid: false, 
        error: 'PayPal server configuration missing. Contact administrator.' 
      }, { status: 503 });
    }

    // PayPal environment - determine from client ID
    // Sandbox client IDs start with 'sb-', live client IDs start with 'A'
    const isSandbox = clientId.startsWith('sb-');
    const environment = isSandbox
      ? new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret)
      : new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);

    const client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

    // Capture order again on server for verification
    const requestCapture = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderID);
    requestCapture.requestBody({});

    const captureResponse = await client.execute(requestCapture);
    const captureStatus = captureResponse.result.status;

    if (captureStatus === 'COMPLETED') {
      // Validate that we have the required data
      const purchaseUnit = captureResponse.result.purchase_units?.[0];
      const capture = purchaseUnit?.payments?.captures?.[0];

      if (!capture || !capture.id || !capture.amount?.value) {
        console.error('Invalid capture response structure:', captureResponse.result);
        return NextResponse.json({ valid: false, error: 'Invalid payment data received' }, { status: 500 });
      }

      const captureId = capture.id;
      const amount = capture.amount.value;
      const currency = capture.amount.currency_code || 'USD';

      const receiverEmail = process.env.PAYPAL_PAYOUT_EMAIL || 'ngarimwangi@gmail.com';

      // Optional fallback: if payment capture isn't automatically routed to target email,
      // execute a payout transfer to that email. Requires PayPal Payouts feature enabled.
      try {
        const payoutRequest = new checkoutNodeJssdk.payouts.PayoutsPostRequest();
        payoutRequest.requestBody({
          sender_batch_header: {
            sender_batch_id: `batch_${captureId}_${Date.now()}`,
            email_subject: 'Your ticket sale payout',
            email_message: 'You have received payout from your ticket sale.',
          },
          items: [
            {
              recipient_type: 'EMAIL',
              amount: {
                value: amount,
                currency: currency,
              },
              receiver: receiverEmail,
              note: 'Ticket sale payout',
              sender_item_id: captureId,
            },
          ],
        });

        const payoutResponse = await client.execute(payoutRequest);
        console.log('Payout issued', payoutResponse.result);
      } catch (payoutError) {
        console.warn('PayPal payout operation failed (this may be expected if payee routing already handled at capture):', payoutError);
      }
      
      return NextResponse.json({ 
        valid: true, 
        transactionId: captureId, 
        amount,
        status: 'COMPLETED'
      });
    } else {
      console.warn('Payment capture not completed. Status:', captureStatus);
      return NextResponse.json({ 
        valid: false, 
        error: `Payment not completed. Status: ${captureStatus}`, 
        status: captureStatus 
      }, { status: 400 });
    }
  } catch (error) {
    console.error('PayPal verify error:', error);

    // Provide more specific error messages
    let errorMessage = 'Verification failed';
    if (error instanceof Error) {
      if (error.message.includes('INVALID_REQUEST')) {
        errorMessage = 'Invalid payment request. Please try again.';
      } else if (error.message.includes('ORDER_NOT_APPROVED')) {
        errorMessage = 'Payment was not approved. Please try again.';
      } else if (error.message.includes('DUPLICATE_INVOICE_ID')) {
        errorMessage = 'This payment has already been processed.';
      } else {
        errorMessage = 'Payment verification failed. Please contact support.';
      }
    }

    return NextResponse.json({ valid: false, error: errorMessage }, { status: 500 });
  }
}

