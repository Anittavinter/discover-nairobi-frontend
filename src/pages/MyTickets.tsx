import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Download, Share2, QrCode } from "lucide-react";
import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getBookings, type Booking } from "@/lib/bookings";

export default function MyTickets() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);

  useEffect(() => {
    const allBookings = getBookings();
    setBookings(allBookings.filter(b => b.status === "confirmed"));
  }, []);

  const now = new Date();
  const upcomingTickets = bookings.filter(b => b.eventDate >= now);
  const pastTickets = bookings.filter(b => b.eventDate < now);

  const handleDownload = (booking: Booking) => {
    const ticketContent = `
╔════════════════════════════════════════════════╗
║          DISCOVER NAIROBI - E-TICKET          ║
╚════════════════════════════════════════════════╝

EVENT: ${booking.eventTitle}

📅 DATE:     ${booking.eventDate.toLocaleDateString()}
⏰ TIME:     ${booking.eventTime}
📍 VENUE:    ${booking.location}

════════════════════════════════════════════════

BOOKING DETAILS
────────────────────────────────────────────────
Confirmation Code:  ${booking.confirmationCode}
Tickets:           ${booking.ticketQuantity}x General Admission
Total Paid:        KSh ${booking.totalAmount.toLocaleString()}

════════════════════════════════════════════════

⚠️  IMPORTANT INSTRUCTIONS:
• Present this confirmation code at the entrance
• Arrive 30 minutes before the event start time
• Valid ID required for entry

🎉 Thank you for booking with Discover Nairobi!

════════════════════════════════════════════════
    `.trim();

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DiscoverNairobi-Ticket-${booking.confirmationCode}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = (booking: Booking) => {
    if (navigator.share) {
      navigator.share({
        title: `Ticket: ${booking.eventTitle}`,
        text: `I'm going to ${booking.eventTitle}! 🎉`,
        url: `${window.location.origin}/confirmation/${booking.id}`,
      });
    } else {
      alert("Share functionality not supported on this device");
    }
  };

  const handleShowQR = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowQRModal(true);
  };

  const TicketCard = ({ ticket, isPast = false }: { ticket: Booking; isPast?: boolean }) => (
    <Card className={`overflow-hidden ${isPast ? 'opacity-75' : ''}`}>
      <div className="md:flex">
        <div className="md:w-48 h-48 md:h-auto">
          <img 
            src={ticket.imageUrl} 
            alt={ticket.eventTitle}
            className={`w-full h-full object-cover ${isPast ? 'grayscale' : ''}`}
          />
        </div>

        <div className="flex-1 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <Badge className="mb-2" variant={isPast ? "secondary" : "default"}>
                {isPast ? "attended" : "confirmed"}
              </Badge>
              <h3 className="text-xl font-bold mb-2">{ticket.eventTitle}</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{ticket.eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{ticket.eventTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{ticket.location}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="text-sm">
              <span className="text-muted-foreground">Confirmation: </span>
              <span className="font-mono font-semibold">{ticket.confirmationCode}</span>
              <span className="ml-3 text-muted-foreground">Tickets: </span>
              <span className="font-semibold">{ticket.ticketQuantity}</span>
            </div>
            <div className="flex gap-2">
              {!isPast && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleShowQR(ticket)}
                  data-testid={`button-qr-${ticket.id}`}
                >
                  <QrCode className="w-4 h-4 mr-2" />
                  QR Code
                </Button>
              )}
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleDownload(ticket)}
                data-testid={`button-download-${ticket.id}`}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => handleShare(ticket)}
                data-testid={`button-share-${ticket.id}`}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Tickets</h1>
            <p className="text-muted-foreground">
              View and manage all your event bookings
            </p>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming" data-testid="tab-upcoming">
                Upcoming ({upcomingTickets.length})
              </TabsTrigger>
              <TabsTrigger value="past" data-testid="tab-past">
                Past Events ({pastTickets.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingTickets.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">No upcoming events</p>
                  <Button onClick={() => window.location.href = "/events"}>
                    Browse Events
                  </Button>
                </Card>
              ) : (
                upcomingTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} />
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastTickets.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No past events</p>
                </Card>
              ) : (
                pastTickets.map((ticket) => (
                  <TicketCard key={ticket.id} ticket={ticket} isPast />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />

      {/* QR Code Modal */}
      <Dialog open={showQRModal} onOpenChange={setShowQRModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Event Ticket</DialogTitle>
          </DialogHeader>
          {selectedBooking && (
            <div className="space-y-4">
              <div className="text-center">
                <h3 className="font-bold text-lg mb-2">{selectedBooking.eventTitle}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {selectedBooking.eventDate.toLocaleDateString()} • {selectedBooking.eventTime}
                </p>
              </div>
              
              <div className="flex flex-col items-center justify-center bg-white p-6 rounded-lg">
                <QRCodeSVG
                  value={selectedBooking.confirmationCode}
                  size={200}
                  level="H"
                  data-testid="qr-code-modal"
                />
                <p className="text-sm font-mono font-bold mt-4 text-gray-800">
                  {selectedBooking.confirmationCode}
                </p>
                <p className="text-xs text-gray-600 mt-2">
                  Show this at venue entrance
                </p>
              </div>

              <div className="text-center text-sm text-muted-foreground">
                <p>{selectedBooking.ticketQuantity} × General Admission</p>
                <p className="font-semibold">{selectedBooking.location}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}