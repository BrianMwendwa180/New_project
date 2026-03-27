import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: March 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="rounded-xl border bg-card p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using VendorSquare, you accept and agree to be bound by the 
                terms and provisions of this agreement. If you do not agree to these terms, 
                please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                VendorSquare provides an online platform that connects event organizers with 
                vendors seeking booth space at various events including craft fairs, vendor 
                expos, farmers markets, and similar gatherings. Our services include event 
                listings, online registration, payment processing, and ticket management.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">3. User Accounts</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  When you register for an event through VendorSquare, you agree to provide 
                  accurate, current, and complete information. You are responsible for maintaining 
                  the confidentiality of your ticket codes and account information.
                </p>
                <p>
                  You are responsible for all activities that occur under your account. Please 
                  notify us immediately of any unauthorized use of your account.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">4. Payment Terms</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  All payments are processed through PayPal. By making a purchase, you agree to 
                  PayPals terms of service in addition to these terms.
                </p>
                <p>
                  Ticket prices are set by event organizers and are subject to change without notice. 
                  Once a ticket is purchased, the price is locked in for that transaction.
                </p>
                <p>
                  Refunds are handled on a case-by-case basis and are subject to the individual 
                  event organizers refund policy. VendorSquare does not guarantee refunds.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">5. Vendor Responsibilities</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>Vendors who register for events through VendorSquare agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Arrive at the event on time and prepared to set up their booth</li>
                  <li>Comply with all event rules and regulations</li>
                  <li>Maintain appropriate insurance as required by the event organizer</li>
                  <li>Conduct themselves professionally and respectfully</li>
                  <li>Not sell prohibited or illegal items</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">6. Event Organizer Responsibilities</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>Event organizers using VendorSquare agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate event information and details</li>
                  <li>Honor all registered vendor reservations</li>
                  <li>Communicate any changes or cancellations promptly</li>
                  <li>Provide the amenities and space as described in the listing</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">7. Cancellations and Refunds</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  In the event of an event cancellation by the organizer, registered vendors are 
                  entitled to a full refund. Processing times may vary.
                </p>
                <p>
                  Vendor-initiated cancellations are subject to the specific event refund policy. 
                  Most events offer full refunds up to 14 days before the event date.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                VendorSquare is not liable for any indirect, incidental, special, consequential, 
                or punitive damages resulting from your use of our services. We are not responsible 
                for the actions of event organizers or vendors, nor for any issues that may arise 
                at events listed on our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">9. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content on VendorSquare, including text, graphics, logos, and software, is the 
                property of VendorSquare or its content suppliers and is protected by intellectual 
                property laws. You may not reproduce, distribute, or create derivative works without 
                our express written permission.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">10. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective 
                immediately upon posting to the website. Your continued use of VendorSquare after 
                any changes indicates your acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">11. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at 
                support@vendorsquare.com or through our contact page.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
