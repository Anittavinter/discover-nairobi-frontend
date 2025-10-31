import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRoute } from "wouter";
import { useEffect, useState } from "react";
import { CheckCircle, Calendar, Download, MapPin, Clock } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { getBookingById, type Booking } from "@/lib/bookings";

export default function Confirmation() {
  const [, params] = useRoute("/confirmation/:bookingId");
  const bookingId = params?.bookingId;
  const [booking, setBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (bookingId) {
      const found = getBookingById(bookingId);
      setBooking(found);
    }
  }, [bookingId]);

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Booking Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The booking you're looking for doesn't exist.
            </p>
            <Button onClick={() => (window.location.href = "/events")}>
              Browse Events
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleDownloadTicket = () => {
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

  const handleAddToCalendar = () => {
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const startDate = new Date(booking.eventDate);
    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Discover Nairobi//Event Booking//EN',
      'BEGIN:VEVENT',
      `DTSTART:${formatDate(startDate)}`,
      `DTEND:${formatDate(endDate)}`,
      `SUMMARY:${booking.eventTitle}`,
      `DESCRIPTION:Confirmation Code: ${booking.confirmationCode}\\nTickets: ${booking.ticketQuantity}x General Admission`,
      `LOCATION:${booking.location}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${booking.eventTitle.replace(/[^a-z0-9]/gi, '-')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 mb-4">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Your tickets are ready. See you at the event!
            </p>
          </div>

          <Card className="p-6 mb-6">
            <div className="space-y-6">
              <div className="flex gap-4">
                <img 
                  src={booking.imageUrl} 
                  alt={booking.eventTitle}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{booking.eventTitle}</h2>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{booking.eventDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{booking.eventTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{booking.location}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-3">Booking Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Confirmation Code:</span>
                        <span className="font-mono font-semibold">{booking.confirmationCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tickets:</span>
                        <span className="font-semibold">{booking.ticketQuantity}x General Admission</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Paid:</span>
                        <span className="font-semibold">KSh {booking.totalAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment:</span>
                        <span className="font-semibold">{booking.paymentMethod}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-white p-4 rounded-lg">
                    <QRCodeSVG
                      value={booking.confirmationCode}
                      size={150}
                      level="H"
                      data-testid="qr-code"
                    />
                    <p className="text-xs text-gray-600 mt-2">
                      Scan at venue entrance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-3 mb-6">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleDownloadTicket}
              data-testid="button-download-ticket"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Ticket
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={handleAddToCalendar}
              data-testid="button-add-calendar"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Add to Calendar
            </Button>
            <Button 
              className="w-full"
              onClick={() => window.location.href = "/my-tickets"}
              data-testid="button-view-tickets"
            >
              View My Tickets
            </Button>
          </div>

          <Card className="p-4 bg-muted/50">
            <p className="text-sm text-center text-muted-foreground">
              💡 Show this QR code at the event entrance for quick check-in
              <br />
              📱 Save this page or download your ticket for easy access
            </p>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}