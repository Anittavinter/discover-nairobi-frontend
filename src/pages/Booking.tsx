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
    id: "2",
    title: "Sunrise Yoga & Meditation",
    date: new Date(2025, 9, 21),
    time: "07:00",
    location: "Karura Forest, Muthaiga",
    neighborhood: "Muthaiga",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    price: 1000,
  },
  {
    id: "3",
    title: "Tech Innovators Meetup",
    date: new Date(2025, 9, 22),
    time: "14:00",
    location: "iHub, Ngong Road",
    neighborhood: "Kilimani",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    price: 0,
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
    id: "5",
    title: "Contemporary Art Exhibition",
    date: new Date(2025, 9, 24),
    time: "11:00",
    location: "Circle Art Gallery, Karen",
    neighborhood: "Karen",
    imageUrl: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800",
    price: 800,
  },
  {
    id: "6",
    title: "Street Food Festival",
    date: new Date(2025, 9, 25),
    time: "16:00",
    location: "Two Rivers Mall, Ruaka",
    neighborhood: "Ruaka",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    price: 1500,
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
    id: "8",
    title: "Morning Run & Coffee",
    date: new Date(2025, 9, 27),
    time: "06:30",
    location: "Karura Forest Main Gate",
    neighborhood: "Muthaiga",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800",
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
                      {event.price === 0 ? (
                        <p className="text-sm text-green-600 dark:text-green-400 font-semibold">FREE</p>
                      ) : (
                        <p className="text-sm text-muted-foreground">KSh {event.price.toLocaleString()}</p>
                      )}
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
                      {event.price === 0 ? (
                        <span className="text-green-600 dark:text-green-400">FREE</span>
                      ) : (
                        <span>KSh {total.toLocaleString()}</span>
                      )}
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => {
                        if (event.price === 0) {
                          // Free event - skip payment
                          alert("Booking confirmed! Redirecting to confirmation...");
                          setTimeout(() => {
                            window.location.href = `/confirmation/${eventId}`;
                          }, 1000);
                        } else {
                          // Paid event - simulate M-PESA payment
                          alert(`Processing M-PESA payment...\nTotal: KSh ${total.toLocaleString()}\n\nCheck your phone for STK push!`);
                          setTimeout(() => {
                            window.location.href = `/confirmation/${eventId}`;
                          }, 2000);
                        }
                      }}
                      data-testid="button-proceed-payment"
                    >
                      {event.price === 0 ? "Confirm Free Booking" : `Pay with M-PESA - KSh ${total.toLocaleString()}`}
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    🔒 {event.price === 0 ? "Free event - No payment required" : "Secure payment with M-PESA"}
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