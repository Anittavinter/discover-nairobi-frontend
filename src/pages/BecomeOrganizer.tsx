import { useState } from "react";
import { useLocation } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { CheckCircle2, Users, Zap, TrendingUp, Shield } from "lucide-react";

export default function BecomeOrganizer() {
  const [, setLocation] = useLocation();
  const { user, login, isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleBecomeOrganizer = async () => {
    if (!isLoggedIn) {
      localStorage.setItem('redirectAfterLogin', '/become-organizer');
      setLocation('/login');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/user/upgrade-to-organizer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to upgrade account');
      }

      await response.json();      
      const updatedUser = {
        ...user!,
        role: 'organizer' as const
      };
      login(updatedUser);
      
      setLocation('/organizer');
    } catch (error) {
      console.error('Error upgrading to organizer:', error);
      
      // Demo fallback: upgrade locally if backend not available
      if (user) {
        const updatedUser = {
          ...user,
          role: 'organizer' as const
        };
        login(updatedUser);
        setLocation('/organizer');
      }
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Users,
      title: "Reach Thousands",
      description: "Get your events in front of 10,000+ active users across Nairobi"
    },
    {
      icon: Zap,
      title: "Easy M-PESA Integration",
      description: "Seamless payment processing and instant payouts to your account"
    },
    {
      icon: TrendingUp,
      title: "Analytics Dashboard",
      description: "Track sales, attendance, engagement, and revenue in real-time"
    },
    {
      icon: Shield,
      title: "Free to Start",
      description: "No upfront costs. Only pay a small fee when you sell tickets"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        <section 
          className="py-20 px-4 md:px-8 relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-white">
              Become an Event Organizer
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              List your events. Sell tickets. Grow your audience.
            </p>
          </div>
        </section>

        <section className="py-16 px-4 md:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why List Your Events With Us?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {features.map((feature, index) => (
                <Card key={index} className="p-6 hover-elevate">
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              ))}
            </div>

            <Card className="max-w-3xl mx-auto p-8 md:p-12 text-center bg-gradient-to-br from-card to-card/50">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Ready to Start?
              </h2>
              <p className="text-muted-foreground mb-8 text-lg">
                Upgrade to an organizer account and start listing your events today. 
                It's free to get started!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-chart-2" />
                  Free to upgrade
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-chart-2" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-chart-2" />
                  Start in minutes
                </div>
              </div>

              <Button 
                size="lg"
                onClick={handleBecomeOrganizer}
                disabled={loading}
                className="text-lg px-8 py-6 w-full sm:w-auto"
                data-testid="button-upgrade-account"
              >
                {loading ? 'Upgrading...' : isLoggedIn ? 'Upgrade to Organizer Account' : 'Sign Up as Organizer'}
              </Button>

              {!isLoggedIn && (
                <p className="text-sm text-muted-foreground mt-4">
                  You'll be redirected to login first
                </p>
              )}
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}