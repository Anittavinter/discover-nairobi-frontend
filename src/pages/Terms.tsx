import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 px-4 md:px-8 border-b">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: October 2025
            </p>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing and using Discover Nairobi, you accept and agree to be bound by the terms and 
                  provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Permission is granted to temporarily access the materials (information or software) on Discover Nairobi 
                  for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of 
                  title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to decompile or reverse engineer any software contained on Discover Nairobi</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">3. Event Listings</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Discover Nairobi acts as a platform connecting event organizers with attendees. We are not responsible 
                  for the accuracy of event information, quality of events, or any disputes between organizers and attendees. 
                  All event information is provided by the organizers.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">4. Ticket Purchases</h2>
                <p className="text-muted-foreground leading-relaxed">
                  All ticket purchases are subject to availability and confirmation. Prices are subject to change without 
                  notice. Refund policies vary by event and are set by individual event organizers. Please review the 
                  specific event's refund policy before purchasing.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">5. User Accounts</h2>
                <p className="text-muted-foreground leading-relaxed">
                  You are responsible for maintaining the confidentiality of your account and password. You agree to accept 
                  responsibility for all activities that occur under your account. Discover Nairobi reserves the right to 
                  refuse service, terminate accounts, or remove content at our sole discretion.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">6. Prohibited Activities</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  You may not use our platform to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Violate any laws or regulations</li>
                  <li>Post false, inaccurate, or misleading information</li>
                  <li>Impersonate any person or entity</li>
                  <li>Harass, abuse, or harm another person</li>
                  <li>Distribute spam or unsolicited messages</li>
                  <li>Interfere with or disrupt the service</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Discover Nairobi shall not be held liable for any damages arising from the use or inability to use our 
                  service, including but not limited to damages for loss of profits, data, or other intangible losses.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">8. Changes to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting 
                  to the website. Your continued use of the service after changes constitutes acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">9. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These terms shall be governed by and construed in accordance with the laws of Kenya, without regard to 
                  its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about these Terms, please contact us at{" "}
                  <a href="mailto:hello@discovernairobi.co.ke" className="text-primary hover:underline">
                    hello@discovernairobi.co.ke
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}