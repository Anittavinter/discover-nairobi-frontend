import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Users, Heart, Globe, Sparkles } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section - With gradient background */}
        <section 
          className="py-16 px-4 md:px-8 border-b relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              About Discover Nairobi
            </h1>
            <p className="text-xl text-white/90">
              Born from frustration. Built with love. For the community.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Our Story</h2>
            
            <div className="space-y-8">
              <div className="border-l-4 border-primary pl-6 py-2">
                <h3 className="text-xl font-semibold mb-3 text-primary">The Problem</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We've all been there. Scrolling through Instagram, checking WhatsApp groups, 
                  asking friends "what's happening this weekend?" Finding events in Nairobi was chaos.
                </p>
              </div>

              <div className="border-l-4 border-secondary pl-6 py-2">
                <h3 className="text-xl font-semibold mb-3 text-secondary">The Solution</h3>
                <p className="text-muted-foreground leading-relaxed">
                  So we built Discover Nairobi. Every event. One platform. Zero FOMO.
                </p>
              </div>

              <div className="border-l-4 border-accent pl-6 py-2">
                <h3 className="text-xl font-semibold mb-3 text-accent">The Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To make Nairobi's incredible creative scene accessible to everyone. From sunrise 
                  yoga to midnight concerts, we're your compass to the city's energy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values - With vibrant backgrounds */}
        <section className="py-16 px-4 md:px-8 bg-muted/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex gap-4 p-6 rounded-lg hover-elevate bg-card border-l-4 border-primary">
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'hsl(var(--primary) / 0.1)' }}
                  >
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Community First</h3>
                  <p className="text-muted-foreground">
                    Built by Nairobians, for Nairobians
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-lg hover-elevate bg-card border-l-4 border-secondary">
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'hsl(var(--secondary) / 0.1)' }}
                  >
                    <Globe className="w-6 h-6 text-secondary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Transparent & Open</h3>
                  <p className="text-muted-foreground">
                    Building in public. Your feedback shapes us.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-lg hover-elevate bg-card border-l-4 border-accent">
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'hsl(var(--accent) / 0.1)' }}
                  >
                    <Heart className="w-6 h-6 text-accent" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">All-Inclusive</h3>
                  <p className="text-muted-foreground">
                    Every vibe. Every budget. Everyone welcome.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 rounded-lg hover-elevate bg-card border-l-4 border-chart-2">
                <div className="flex-shrink-0">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: 'hsl(var(--chart-2) / 0.1)' }}
                  >
                    <Sparkles className="w-6 h-6 text-chart-2" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Local Love</h3>
                  <p className="text-muted-foreground">
                    Celebrating Nairobi's creatives, organizers, and venues
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* By the Numbers - VIBRANT! */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">By the Numbers</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center p-6 rounded-lg hover-elevate bg-card border-t-4 border-primary">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
                <div className="text-muted-foreground">Events Listed</div>
              </div>
              
              <div className="text-center p-6 rounded-lg hover-elevate bg-card border-t-4 border-secondary">
                <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">50+</div>
                <div className="text-muted-foreground">Partner Venues</div>
              </div>
              
              <div className="text-center p-6 rounded-lg hover-elevate bg-card border-t-4 border-accent">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">10,000+</div>
                <div className="text-muted-foreground">Tickets Booked</div>
              </div>
              
              <div className="text-center p-6 rounded-lg hover-elevate bg-card border-t-4 border-chart-2">
                <div className="text-4xl md:text-5xl font-bold text-chart-2 mb-2">2,000+</div>
                <div className="text-muted-foreground">Community Members</div>
              </div>
            </div>
          </div>
        </section>

        {/* Vision - With gradient accent */}
        <section 
          className="py-16 px-4 md:px-8 relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(var(--accent) / 0.1) 0%, hsl(var(--primary) / 0.1) 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              To become East Africa's go-to platform for discovering experiences.
            </p>
            <p className="text-muted-foreground">
              Starting in Nairobi, expanding across Kenya, then the entire region.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}