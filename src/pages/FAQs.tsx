import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
  accentColor?: string;
}

function FAQItem({ question, answer, accentColor = "hsl(var(--primary))" }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card 
      className="p-6 hover-elevate cursor-pointer border-l-4" 
      onClick={() => setIsOpen(!isOpen)}
      style={{ borderLeftColor: accentColor }}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{question}</h3>
          {isOpen && (
            <p className="text-muted-foreground leading-relaxed mt-3">
              {answer}
            </p>
          )}
        </div>
        <ChevronDown 
          className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          style={{ color: accentColor }}
        />
      </div>
    </Card>
  );
}

export default function FAQs() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - With gradient */}
        <section 
          className="py-16 px-4 md:px-8 border-b relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--chart-2)) 50%, hsl(var(--primary)) 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90">
              Everything you need to know about Discover Nairobi
            </p>
          </div>
        </section>

        {/* FAQs with Tabs */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
                <TabsTrigger value="general" data-testid="tab-general">General</TabsTrigger>
                <TabsTrigger value="eventgoers" data-testid="tab-eventgoers">Event-Goers</TabsTrigger>
                <TabsTrigger value="organizers" data-testid="tab-organizers">Organizers</TabsTrigger>
                <TabsTrigger value="tickets" data-testid="tab-tickets">Tickets</TabsTrigger>
                <TabsTrigger value="tech" data-testid="tab-tech">Tech Support</TabsTrigger>
              </TabsList>

              {/* GENERAL */}
              <TabsContent value="general" className="space-y-4">
                <FAQItem
                  question="What is Discover Nairobi?"
                  answer="Discover Nairobi is a platform that centralizes every event happening in Nairobi. From concerts to wellness sessions, tech conferences to food festivals - if it's happening in Nairobi, you'll find it here."
                  accentColor="hsl(var(--primary))"
                />
                <FAQItem
                  question="Is Discover Nairobi free to use?"
                  answer="Yes! Browsing events and creating an account is 100% free. You only pay when you purchase tickets to events."
                  accentColor="hsl(var(--secondary))"
                />
                <FAQItem
                  question="How do you make money?"
                  answer="We charge a small service fee on ticket sales, and offer premium features for event organizers."
                  accentColor="hsl(var(--accent))"
                />
                <FAQItem
                  question="Which areas of Nairobi do you cover?"
                  answer="All of them! From CBD to Karen, Westlands to Eastlands. If it's in Nairobi, we cover it."
                  accentColor="hsl(var(--chart-2))"
                />
              </TabsContent>

              {/* EVENT-GOERS */}
              <TabsContent value="eventgoers" className="space-y-4">
                <FAQItem
                  question="How do I find events?"
                  answer="Use our search bar, browse by category, check the calendar, or use filters to narrow down by date, location, price, and type."
                  accentColor="hsl(var(--primary))"
                />
                <FAQItem
                  question="Can I book tickets directly?"
                  answer="Yes! Most events allow instant booking with M-PESA payment. Some free events require RSVP."
                  accentColor="hsl(var(--secondary))"
                />
                <FAQItem
                  question="What if an event is cancelled?"
                  answer="If an organizer cancels, you'll receive a full refund within 5-7 business days. We'll also notify you immediately via email/SMS."
                  accentColor="hsl(var(--accent))"
                />
                <FAQItem
                  question="Can I get refunds?"
                  answer="Refund policies vary by event. Check the event's specific refund policy before booking. Generally, refunds are available up to 48 hours before the event."
                  accentColor="hsl(var(--chart-2))"
                />
                <FAQItem
                  question="How do I get my tickets?"
                  answer="After payment, you'll receive a confirmation email and SMS with your e-ticket and QR code. Show this at the event entrance."
                  accentColor="hsl(var(--primary))"
                />
                <FAQItem
                  question="Can I transfer my ticket to someone else?"
                  answer="This depends on the event organizer's policy. Check the event details or contact support."
                  accentColor="hsl(var(--secondary))"
                />
                <FAQItem
                  question="Do you send event reminders?"
                  answer="Yes! You'll receive reminders 1 week before, 1 day before, and on the day of your event."
                  accentColor="hsl(var(--accent))"
                />
              </TabsContent>

              {/* ORGANIZERS */}
              <TabsContent value="organizers" className="space-y-4">
                <FAQItem
                  question="How do I list my event?"
                  answer="Click 'Browse Events' in the top navigation, fill in your event details, and submit for review. Approval typically takes 24 hours."
                  accentColor="hsl(var(--primary))"
                />
                <FAQItem
                  question="Is there a fee to list events?"
                  answer="Free events can be listed at no cost. For paid events, we charge a small service fee (usually 5-10%) on each ticket sold."
                  accentColor="hsl(var(--secondary))"
                />
                <FAQItem
                  question="How do I receive payments?"
                  answer="Payments are processed through M-PESA and transferred to your account within 3-5 business days after the event."
                  accentColor="hsl(var(--accent))"
                />
                <FAQItem
                  question="Can I manage my event after posting?"
                  answer="Yes! You get access to an organizer dashboard where you can edit details, manage tickets, view analytics, and communicate with attendees."
                  accentColor="hsl(var(--chart-2))"
                />
                <FAQItem
                  question="What if I need to cancel my event?"
                  answer="You can cancel through your dashboard. All attendees will be automatically refunded and notified."
                  accentColor="hsl(var(--primary))"
                />
                <FAQItem
                  question="Do you provide marketing support?"
                  answer="Yes! Events are featured on our homepage, in category pages, and promoted on our social media. Premium organizer accounts get additional promotion."
                  accentColor="hsl(var(--secondary))"
                />
              </TabsContent>

              {/* TICKETS & PAYMENTS */}
              <TabsContent value="tickets" className="space-y-4">
                <FAQItem
                  question="What payment methods do you accept?"
                  answer="Currently, we accept M-PESA. Credit/debit card payments coming soon."
                  accentColor="hsl(var(--primary))"
                />
                <FAQItem
                  question="Is my payment secure?"
                  answer="Absolutely. All payments are processed through secure, encrypted M-PESA integration."
                  accentColor="hsl(var(--secondary))"
                />
                <FAQItem
                  question="Do you charge booking fees?"
                  answer="We charge a small service fee (typically KES 50-100) depending on the ticket price. This is always shown clearly before checkout."
                  accentColor="hsl(var(--accent))"
                />
                <FAQItem
                  question="Can I pay at the door?"
                  answer="This depends on the event. Some organizers allow cash at the door, but we recommend booking online to guarantee entry."
                  accentColor="hsl(var(--chart-2))"
                />
                <FAQItem
                  question="What if payment fails?"
                  answer="If your M-PESA payment fails, try again or contact support. No money is deducted on failed transactions."
                  accentColor="hsl(var(--primary))"
                />
              </TabsContent>

              {/* TECHNICAL SUPPORT */}
              <TabsContent value="tech" className="space-y-4">
                <FAQItem
                  question="I didn't receive my ticket email. What do I do?"
                  answer="Check your spam folder first. Still can't find it? Contact support with your phone number or booking reference."
                  accentColor="hsl(var(--primary))"
                />
                <FAQItem
                  question="The website isn't loading properly. Help!"
                  answer="Try clearing your browser cache or using a different browser. Still having issues? Email support@discovernairobi.co.ke"
                  accentColor="hsl(var(--secondary))"
                />
                <FAQItem
                  question="I can't find my event on the platform."
                  answer="Use the search bar or contact us - we'll help you find it or assist the organizer in listing it."
                  accentColor="hsl(var(--accent))"
                />
                <FAQItem
                  question="How do I delete my account?"
                  answer="Email hello@discovernairobi.co.ke with 'Delete Account' in the subject line. We'll process it within 48 hours."
                  accentColor="hsl(var(--chart-2))"
                />
              </TabsContent>
            </Tabs>

            {/* Still Have Questions - With gradient */}
            <div 
              className="mt-16 text-center p-8 rounded-lg"
              style={{
                backgroundImage: 'linear-gradient(135deg, hsl(var(--primary) / 0.1) 0%, hsl(var(--secondary) / 0.1) 100%)',
              }}
            >
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                We're here to help! Get in touch with our team.
              </p>
              <a href="/contact">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover-elevate active-elevate-2">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}