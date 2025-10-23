import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Download, Share2 } from "lucide-react";

const upcomingTickets = [
  {
    id: "1",
    eventTitle: "International DJ Night: Afro House",
    eventDate: "Thu, Oct 23",
    eventTime: "22:00",
    location: "Alchemist Bar, Westlands",
    ticketQuantity: 2,
    confirmationCode: "DN-AH2023",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
    status: "confirmed",
  },
  {
    id: "2",
    eventTitle: "Jockey Polo Tournament",
    eventDate: "Mon, Oct 28",
    eventTime: "15:00",
    location: "Karen Polo Club",
    ticketQuantity: 1,
    confirmationCode: "DN-POLO2023",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    status: "confirmed",
  },
];

const pastTickets = [
  {
    id: "3",
    eventTitle: "Rooftop Jazz Night at Kilimanjaro",
    eventDate: "Mon, Oct 20",
    eventTime: "19:30",
    location: "Kilimanjaro Jamia, Westlands",
    ticketQuantity: 2,
    confirmationCode: "DN-JAZZ2023",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    status: "attended",
  },
];

export default function MyTickets() {
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

            {/* Upcoming Tickets */}
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
                  <Card key={ticket.id} className="overflow-hidden">
                    <div className="md:flex">
                      {/* Event Image */}
                      <div className="md:w-48 h-48 md:h-auto">
                        <img 
                          src={ticket.imageUrl} 
                          alt={ticket.eventTitle}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Ticket Details */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <Badge className="mb-2">{ticket.status}</Badge>
                            <h3 className="text-xl font-bold mb-2">{ticket.eventTitle}</h3>
                            <div className="space-y-1 text-sm text-muted-foreground">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{ticket.eventDate}</span>
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
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => alert("Download coming soon!")}
                              data-testid={`button-download-${ticket.id}`}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => alert("Share coming soon!")}
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
                ))
              )}
            </TabsContent>

            {/* Past Tickets */}
            <TabsContent value="past" className="space-y-4">
              {pastTickets.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No past events</p>
                </Card>
              ) : (
                pastTickets.map((ticket) => (
                  <Card key={ticket.id} className="overflow-hidden opacity-75">
                    <div className="md:flex">
                      <div className="md:w-48 h-48 md:h-auto">
                        <img 
                          src={ticket.imageUrl} 
                          alt={ticket.eventTitle}
                          className="w-full h-full object-cover grayscale"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <Badge variant="secondary" className="mb-2">{ticket.status}</Badge>
                        <h3 className="text-xl font-bold mb-2">{ticket.eventTitle}</h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{ticket.eventDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{ticket.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}