import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRoute } from "wouter";
import { useState } from "react";
import { MapPin, Calendar, Clock, Minus, Plus } from "lucide-react";

const sampleEvents = [
  {
    id: "1",
    title: "Rooftop Jazz Night at Kilimanjaro",
    date: new Date(2025, 9, 20),
    time: "19:30",
    location: "Kilimanjaro Jamia, Westlands",
    neighborhood: "Westlands",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    price: 2500,
  },
  {
    id: "4",
    title: "International DJ Night: Afro House",
    date: new Date(2025, 9, 23),
    time: "22:00",
    location: "Alchemist Bar, Westlands",
    neighborhood: "Westlands",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
    price: 3000,
  },
  {
    id: "7",
    title: "Organic Farmers Market",
    date: new Date(2025, 9, 26),
    time: "09:00",
    location: "Karen Country Club",
    neighborhood: "Karen",
    imageUrl: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800",
    price: 500,
  },
  {
    id: "9",
    title: "Jockey Polo Tournament",
    date: new Date(2025, 9, 28),
    time: "15:00",
    location: "Karen Polo Club",
    neighborhood: "Karen",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    price: 5000,
  },
];

export default function Booking() {
  const [, params] = useRoute("/booking/:eventId");
  const eventId = params?.eventId;
  
  const event = sampleEvents.find(e => e.id === eventId);
  const [quantity, setQuantity] = useState(1);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
            <Button onClick={() => window.location.href = "/events"}>
              Browse Events
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const total = event.price * quantity;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Book Your Tickets</h1>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Event Details */}
            <div>
              <Card className="overflow-hidden">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-bold">{event.title}</h2>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span>{event.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Booking Form */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Select Tickets</h3>
                
                <div className="space-y-4">
                  {/* Ticket Quantity */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">General Admission</p>
                      <p className="text-sm text-muted-foreground">KSh {event.price.toLocaleString()}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        data-testid="button-decrease-quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => setQuantity(Math.min(10, quantity + 1))}
                        data-testid="button-increase-quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span>Total</span>
                      <span>KSh {total.toLocaleString()}</span>
                    </div>

                    <Button 
  className="w-full" 
  size="lg"
  onClick={() => {
    // Simulate M-PESA payment
    alert(`Processing M-PESA payment...\nTotal: KSh ${total.toLocaleString()}\n\nCheck your phone for STK push!`);
    
    // Simulate successful payment after 2 seconds
    setTimeout(() => {
      window.location.href = `/confirmation/${eventId}`;
    }, 2000);
  }}
  data-testid="button-proceed-payment"
>
  Pay with M-PESA - KSh {total.toLocaleString()}
</Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    🔒 Secure payment with M-PESA
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}