import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AlertCircle, CheckCircle, Clock, Mail, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function Refund() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="py-12 px-4 md:px-8 border-b"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--accent) / 0.1) 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Refund & Cancellation Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: October 30, 2025
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-8 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              This policy outlines the conditions under which refunds are issued for ticket purchases on Discover Nairobi.
            </p>
          </div>
        </section>

        {/* Policy Sections */}
        <section className="py-8 px-4 md:px-8 space-y-8">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* 1. Event Cancellation by Organizer */}
            <Card className="p-6 border-l-4 border-green-500">
              <div className="flex gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">1. Event Cancellation by Organizer</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>If an event is cancelled by the organizer, you are entitled to a <strong className="text-foreground">full refund</strong>, including any service fees.</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">Refund Processing Time:</strong> 5-7 business days from the date of cancellation notification.</li>
                  <li><strong className="text-foreground">Notification:</strong> You will be notified immediately via email and SMS if an event is cancelled.</li>
                </ul>
              </div>
            </Card>

            {/* 2. Event Rescheduling */}
            <Card className="p-6 border-l-4 border-blue-500">
              <div className="flex gap-3 mb-4">
                <Clock className="w-6 h-6 text-blue-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">2. Event Rescheduling</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>If an event is rescheduled to a different date or time:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your ticket remains valid for the new date/time</li>
                  <li>If you cannot attend the rescheduled event, you may request a refund (subject to organizer approval)</li>
                  <li>Refund requests must be made within <strong className="text-foreground">48 hours</strong> of the rescheduling notification</li>
                </ul>
              </div>
            </Card>

            {/* 3. User-Initiated Cancellations */}
            <Card className="p-6 border-l-4 border-orange-500">
              <div className="flex gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">3. User-Initiated Cancellations</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>Refunds for user-initiated cancellations depend on the event organizer's cancellation policy, which is displayed on each event page before booking.</p>
                <div className="bg-muted/50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-foreground mb-2">Common Policies:</p>
                  <ul className="space-y-2">
                    <li><strong className="text-green-600">Full Refund:</strong> Cancellation 7+ days before the event</li>
                    <li><strong className="text-orange-600">50% Refund:</strong> Cancellation 3-6 days before the event</li>
                    <li><strong className="text-red-600">No Refund:</strong> Cancellation less than 48 hours before the event</li>
                  </ul>
                </div>
                <p className="text-sm italic">Note: Service fees are non-refundable for user-initiated cancellations unless the event is cancelled by the organizer.</p>
              </div>
            </Card>

            {/* 4. No-Show Policy */}
            <Card className="p-6 border-l-4 border-red-500">
              <div className="flex gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">4. No-Show Policy</h2>
              </div>
              <p className="text-muted-foreground">
                If you do not attend an event without cancelling your booking, <strong className="text-foreground">no refund will be issued</strong>, regardless of the reason.
              </p>
            </Card>

            {/* 5. Free Events */}
            <Card className="p-6 border-l-4 border-purple-500">
              <div className="flex gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-purple-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">5. Free Events</h2>
              </div>
              <p className="text-muted-foreground">
                For free events requiring RSVP, cancellations do not affect you financially. However, please cancel if you cannot attend to allow others to secure a spot.
              </p>
            </Card>

            {/* 6. How to Request a Refund */}
            <Card className="p-6 border-l-4 border-primary">
              <div className="flex gap-3 mb-4">
                <Mail className="w-6 h-6 text-primary flex-shrink-0" />
                <h2 className="text-2xl font-bold">6. How to Request a Refund</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>To request a refund:</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>Log in to your Discover Nairobi account</li>
                  <li>Go to "My Tickets" and select the event</li>
                  <li>Click "Request Refund" (if eligible)</li>
                  <li>Or contact us at <a href="mailto:hello@discovernairobi.co.ke" className="text-primary hover:underline">hello@discovernairobi.co.ke</a> with your booking reference</li>
                </ol>
                <p><strong className="text-foreground">Response Time:</strong> We will review your request within 24-48 hours and notify you of the outcome.</p>
              </div>
            </Card>

            {/* 7. Refund Processing Time */}
            <Card className="p-6 border-l-4 border-secondary">
              <div className="flex gap-3 mb-4">
                <Clock className="w-6 h-6 text-secondary flex-shrink-0" />
                <h2 className="text-2xl font-bold">7. Refund Processing Time</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>Once approved, refunds are processed as follows:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong className="text-foreground">M-PESA:</strong> 3-5 business days</li>
                  <li><strong className="text-foreground">Credit/Debit Card:</strong> 5-10 business days (depending on your bank)</li>
                </ul>
              </div>
            </Card>

            {/* 8. Non-Refundable Situations */}
            <Card className="p-6 border-l-4 border-red-500">
              <div className="flex gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">8. Non-Refundable Situations</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>Refunds will not be issued in the following cases:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Failure to provide valid ID or meet event entry requirements</li>
                  <li>Violation of event rules resulting in removal</li>
                  <li>Personal emergencies or change of plans (unless within cancellation window)</li>
                  <li>Dissatisfaction with event quality (contact the organizer directly)</li>
                </ul>
              </div>
            </Card>

            {/* 9. Disputed Charges */}
            <Card className="p-6 border-l-4 border-orange-500">
              <div className="flex gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-orange-500 flex-shrink-0" />
                <h2 className="text-2xl font-bold">9. Disputed Charges</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>If you believe you were charged incorrectly, contact us immediately at <a href="mailto:hello@discovernairobi.co.ke" className="text-primary hover:underline">hello@discovernairobi.co.ke</a> with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your booking reference</li>
                  <li>Transaction details</li>
                  <li>Description of the issue</li>
                </ul>
                <p>We will investigate and respond within <strong className="text-foreground">48 hours</strong>.</p>
              </div>
            </Card>

            {/* 10. Contact Us */}
            <Card className="p-6 border-l-4 border-accent">
              <div className="flex gap-3 mb-4">
                <Phone className="w-6 h-6 text-accent flex-shrink-0" />
                <h2 className="text-2xl font-bold">10. Contact Us</h2>
              </div>
              <div className="space-y-3 text-muted-foreground">
                <p>For refund inquiries, contact:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <a href="mailto:hello@discovernairobi.co.ke" className="text-primary hover:underline">hello@discovernairobi.co.ke</a>
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span>+254 XXX XXX XXX (Support hours: Mon-Fri, 9am-6pm EAT)</span>
                  </li>
                  <li>
                    <strong className="text-foreground">Address:</strong> Nairobi, Kenya
                  </li>
                </ul>
              </div>
            </Card>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}