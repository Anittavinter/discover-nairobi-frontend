import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRoute } from "wouter";
import { useState } from "react";
import { MapPin, Calendar, Clock, Minus, Plus } from "lucide-react";
import { MpesaPaymentModal } from "@/components/MpesaPaymentModal";
import { saveBooking, generateConfirmationCode } from "@/lib/bookings";

const sampleEvents = [
  {
    id: 1,
    title: "Amapiano Night at Westlands",
    date: new Date(2025, 9, 25),
    time: "8:00 PM",
    location: "The Alchemist",
    neighborhood: "Westlands",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    price: 1500,
  },
  {
    id: 2,
    title: "Morning Yoga at Karura Forest",
    date: new Date(2025, 9, 23),
    time: "6:30 AM",
    location: "Karura Forest",
    neighborhood: "Kiambu Road",
    imageUrl: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    price: 0,
  },
  {
    id: 3,
    title: "Tech Startup Pitch Night",
    date: new Date(2025, 9, 24),
    time: "6:00 PM",
    location: "iHub Nairobi",
    neighborhood: "CBD",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    price: 500,
  },
  {
    id: 4,
    title: "Nyama Choma Festival",
    date: new Date(2025, 9, 26),
    time: "12:00 PM",
    location: "Karen Gardens",
    neighborhood: "Karen",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    price: 2000,
  },
  {
    id: 5,
    title: "Contemporary Art Exhibition",
    date: new Date(2025, 9, 27),
    time: "10:00 AM",
    location: "Nairobi Gallery",
    neighborhood: "Lavington",
    imageUrl: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    price: 800,
  },
  {
    id: 6,
    title: "Open Mic Comedy Night",
    date: new Date(2025, 9, 25),
    time: "7:30 PM",
    location: "Churchill's Pub",
    neighborhood: "Westlands",
    imageUrl: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800",
    price: 500,
  },
  {
    id: 7,
    title: "Afrobeat Dance Workshop",
    date: new Date(2025, 9, 28),
    time: "3:00 PM",
    location: "Dance Studio 254",
    neighborhood: "Kilimani",
    imageUrl: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800",
    price: 1000,
  },
  {
    id: 8,
    title: "Rooftop Sundowner Party",
    date: new Date(2025, 9, 26),
    time: "5:00 PM",
    location: "Sky Lounge",
    neighborhood: "Parklands",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    price: 1200,
  },
];

export default function Booking() {
  const [, params] = useRoute("/booking/:eventId");
  const eventId = params?.eventId;
  
  const event = sampleEvents.find(e => e.id === Number(eventId));
  const [quantity, setQuantity] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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
  const isFreeEvent = event.price === 0;

  const handlePaymentSuccess = () => {
    const bookingId = `BK${Date.now()}`;
    const confirmationCode = generateConfirmationCode();
    
    saveBooking({
      id: bookingId,
      eventId: event.id.toString(),
      eventTitle: event.title,
      eventDate: event.date,
      eventTime: event.time,
      location: event.location,
      neighborhood: event.neighborhood,
      imageUrl: event.imageUrl,
      ticketQuantity: quantity,
      totalAmount: total,
      confirmationCode,
      paymentMethod: isFreeEvent ? "Free Event" : "M-PESA",
      bookingDate: new Date(),
      status: "confirmed",
    });

    window.location.href = `/confirmation/${bookingId}`;
  };

  const handleProceed = () => {
    if (isFreeEvent) {
      handlePaymentSuccess();
    } else {
      setShowPaymentModal(true);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Book Your Tickets</h1>

          <div className="grid md:grid-cols-2 gap-8">
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

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Select Tickets</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-semibold">General Admission</p>
                      {isFreeEvent ? (
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

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span>Total</span>
                      {isFreeEvent ? (
                        <span className="text-green-600 dark:text-green-400">FREE</span>
                      ) : (
                        <span>KSh {total.toLocaleString()}</span>
                      )}
                    </div>

                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={handleProceed}
                      data-testid="button-proceed-payment"
                    >
                      {isFreeEvent ? "Confirm Free Booking ✓" : `Pay with M-PESA - KSh ${total.toLocaleString()}`}
                    </Button>
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    🔒 {isFreeEvent ? "Free event - No payment required" : "Secure payment with M-PESA"}
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <MpesaPaymentModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={total}
        eventTitle={event.title}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
}