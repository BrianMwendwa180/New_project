import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: March 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div className="rounded-xl border bg-card p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                At VendorSquare, we take your privacy seriously. This Privacy Policy explains how we 
                collect, use, disclose, and safeguard your information when you visit our website 
                or use our services. Please read this policy carefully to understand our practices 
                regarding your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <div className="text-muted-foreground leading-relaxed space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Personal Information</h3>
                  <p>When you register for an event, we collect:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Payment information (processed through PayPal)</li>
                    <li>Any special requests or notes you provide</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-2">Automatically Collected Information</h3>
                  <p>When you visit our website, we automatically collect:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Device information</li>
                    <li>Pages visited and time spent</li>
                    <li>Referral source</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <div className="text-muted-foreground leading-relaxed">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Process your event registrations and payments</li>
                  <li>Generate and deliver your tickets</li>
                  <li>Send you confirmation emails and event updates</li>
                  <li>Communicate with you about your bookings</li>
                  <li>Improve our website and services</li>
                  <li>Respond to your inquiries and support requests</li>
                  <li>Detect and prevent fraudulent transactions</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Information Sharing</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  We may share your information with event organizers for the events you register for. 
                  This allows them to manage their events effectively and contact you with important 
                  event-related information.
                </p>
                <p>We may also share your information with:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Payment processors (PayPal) to complete transactions</li>
                  <li>Service providers who assist in operating our platform</li>
                  <li>Law enforcement when required by law</li>
                </ul>
                <p className="font-medium text-foreground mt-4">
                  We do not sell your personal information to third parties.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Data Storage</h2>
              <div className="text-muted-foreground leading-relaxed space-y-3">
                <p>
                  Your ticket information is stored locally in your browser using localStorage. 
                  This allows you to access your tickets offline and ensures fast retrieval.
                </p>
                <p>
                  Our website uses industry-standard security measures to protect your information 
                  during transmission. However, no method of transmission over the internet is 
                  100% secure.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our 
                website. You can control cookie preferences through your browser settings. Please 
                note that disabling cookies may limit some functionality of our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Your Rights</h2>
              <div className="text-muted-foreground leading-relaxed">
                <p>Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Request data portability</li>
                  <li>Withdraw consent where processing is based on consent</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us at privacy@vendorsquare.com.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Third-Party Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for 
                the privacy practices of these external sites. We encourage you to review their 
                privacy policies before providing any personal information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Children&apos;s Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not directed to individuals under the age of 13. We do not 
                knowingly collect personal information from children. If you believe we have 
                collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. 
                We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
              <div className="text-muted-foreground leading-relaxed">
                <p>If you have questions about this Privacy Policy, please contact us:</p>
                <ul className="list-none mt-4 space-y-2">
                  <li><strong>Email:</strong> privacy@vendorsquare.com</li>
                  <li><strong>Address:</strong> Richmond, Indiana</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
