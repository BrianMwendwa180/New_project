'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Phone, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { PayPalButton } from '@/components/paypal-button';
import { Event, TicketTier } from '@/lib/events-data';
import { formatPrice, generateTicketCode, generateQRCode, saveTicket } from '@/lib/ticket-utils';
import { getEffectivePrice } from '@/lib/admin-store';

interface RegistrationFormProps {
  event: Event;
}

export function RegistrationForm({ event }: RegistrationFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<'select' | 'details' | 'payment' | 'complete'>('select');
  const [selectedTier, setSelectedTier] = useState<TicketTier | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [paymentError, setPaymentError] = useState('');
  const [ticketCode, setTicketCode] = useState('');

  const effectivePrice = selectedTier 
    ? getEffectivePrice(event.id, selectedTier.id, selectedTier.price)
    : 0;

  const validateDetails = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTierSelect = (tier: TicketTier) => {
    setSelectedTier(tier);
    setStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      setStep('payment');
    }
  };

  const handlePaymentSuccess = async (transactionId: string, amount: string) => {
    if (!selectedTier) return;

    // Generate ticket
    const code = generateTicketCode();
    const qrCode = await generateQRCode(code, window.location.origin);

    const ticket = {
      code,
      eventId: event.id,
      eventName: event.name,
      ticketType: selectedTier.name,
      ticketPrice: parseFloat(amount),
      holderName: formData.name,
      holderEmail: formData.email,
      purchaseDate: new Date().toISOString(),
      transactionId,
      status: 'valid' as const,
      qrCodeUrl: qrCode,
    };

    saveTicket(ticket);
    setTicketCode(code);
    setStep('complete');
  };

  const handlePaymentError = (error: string) => {
    setPaymentError(error);
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="gradient-primary text-primary-foreground">
        <CardTitle>Register for {event.name}</CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Secure your spot at this event
        </CardDescription>
      </CardHeader>

      <CardContent className="p-6">
        {/* Progress Steps */}
        <div className="mb-8 flex items-center justify-between">
          {['Select', 'Details', 'Payment', 'Complete'].map((label, index) => {
            const stepIndex = ['select', 'details', 'payment', 'complete'].indexOf(step);
            const isActive = index === stepIndex;
            const isComplete = index < stepIndex;

            return (
              <div key={label} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      isComplete
                        ? 'bg-primary text-primary-foreground'
                        : isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {isComplete ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className="mt-1 text-xs text-muted-foreground">{label}</span>
                </div>
                {index < 3 && (
                  <div
                    className={`mx-2 h-0.5 flex-1 ${
                      index < stepIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Select Ticket */}
          {step === 'select' && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-lg font-semibold">Select Your Ticket</h3>
              <RadioGroup>
                {event.tickets.map((tier) => {
                  const remaining = tier.maxQuantity - tier.soldCount;
                  const price = getEffectivePrice(event.id, tier.id, tier.price);
                  const isSoldOut = remaining <= 0;

                  return (
                    <div
                      key={tier.id}
                      className={`relative rounded-lg border p-4 transition-all ${
                        isSoldOut
                          ? 'cursor-not-allowed opacity-60'
                          : 'cursor-pointer hover:border-primary hover:bg-muted/50'
                      } ${selectedTier?.id === tier.id ? 'border-primary bg-primary/5' : ''}`}
                      onClick={() => !isSoldOut && handleTierSelect(tier)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <RadioGroupItem
                            value={tier.id}
                            id={tier.id}
                            disabled={isSoldOut}
                            checked={selectedTier?.id === tier.id}
                          />
                          <div>
                            <Label
                              htmlFor={tier.id}
                              className="text-base font-medium cursor-pointer"
                            >
                              {tier.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">{tier.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-primary">{formatPrice(price)}</p>
                          {remaining <= 5 && !isSoldOut && (
                            <Badge variant="destructive" className="mt-1 animate-blink text-xs">
                              Only {remaining} left
                            </Badge>
                          )}
                          {isSoldOut && (
                            <Badge variant="secondary" className="mt-1">
                              Sold Out
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>
            </motion.div>
          )}

          {/* Step 2: Details */}
          {step === 'details' && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <h3 className="text-lg font-semibold">Your Information</h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Smith"
                        className="pl-10"
                      />
                    </div>
                    {errors.name && (
                      <p className="text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="pl-10"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-destructive">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        className="pl-10"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requests">Special Requests (Optional)</Label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="requests"
                        value={formData.specialRequests}
                        onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                        placeholder="Any special requirements or questions..."
                        className="min-h-[100px] pl-10"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('select')}
                  >
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 gradient-primary border-0 text-primary-foreground">
                    Continue to Payment
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {step === 'payment' && selectedTier && (
            <motion.div
              key="payment"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold">Complete Your Payment</h3>

              {/* Order Summary */}
              <div className="rounded-lg bg-muted/50 p-4 space-y-3">
                <h4 className="font-medium">Order Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>{selectedTier.name}</span>
                  <span>{formatPrice(effectivePrice)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{formatPrice(effectivePrice)}</span>
                </div>
              </div>

              {/* Buyer Info Summary */}
              <div className="rounded-lg border p-4 space-y-2 text-sm">
                <p><span className="text-muted-foreground">Name:</span> {formData.name}</p>
                <p><span className="text-muted-foreground">Email:</span> {formData.email}</p>
                <p><span className="text-muted-foreground">Phone:</span> {formData.phone}</p>
              </div>

              {paymentError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{paymentError}</AlertDescription>
                </Alert>
              )}

              <PayPalButton
                amount={effectivePrice}
                description={`${selectedTier.name} - ${event.name}`}
                eventId={event.id}
                ticketTierId={selectedTier.id}
                holderName={formData.name}
                holderEmail={formData.email}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setStep('details')}
              >
                Back to Details
              </Button>
            </motion.div>
          )}

          {/* Step 4: Complete */}
          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6 text-center py-8"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                <Check className="h-8 w-8" />
              </div>

              <div>
                <h3 className="text-xl font-semibold text-foreground">Payment Successful!</h3>
                <p className="mt-2 text-muted-foreground">
                  Your ticket has been generated and saved.
                </p>
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm text-muted-foreground">Your Ticket Code</p>
                <p className="text-2xl font-mono font-bold text-primary">{ticketCode}</p>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => router.push(`/ticket/${ticketCode}`)}
                  className="w-full gradient-primary border-0 text-primary-foreground"
                >
                  View My Ticket
                </Button>
                <Button
                  variant="outline"
                  onClick={() => router.push('/')}
                >
                  Back to Events
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
