
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import {
  Plus,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Trash2,
  BarChart3,
  TrendingUp,
} from "lucide-react";
import {
  getOrganizerEvents,
  deleteOrganizerEvent,
  ensureDefaultOrganizer,
  getEventAnalytics,
  type OrganizerEvent,
} from "@/lib/organizers";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

export default function OrganizerDashboard() {
  const { toast } = useToast();
  const [events, setEvents] = useState<OrganizerEvent[]>([]);
  const [deleteEventId, setDeleteEventId] = useState<string | null>(null);
const [organizer] = useState(ensureDefaultOrganizer());
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const allEvents = getOrganizerEvents();
    setEvents(allEvents);
  };

  const handleDelete = (eventId: string) => {
    deleteOrganizerEvent(eventId);
    loadEvents();
    setDeleteEventId(null);
    toast({
      title: "Event Deleted",
      description: "The event has been removed successfully.",
    });
  };

  const now = new Date();
  const upcomingEvents = events.filter((e) => e.date >= now && e.status === "published");
  const pastEvents = events.filter((e) => e.date < now);
  const draftEvents = events.filter((e) => e.status === "draft");

  // Calculate total stats
  const totalRevenue = events.reduce((sum, event) => {
    const analytics = getEventAnalytics(event.id);
    return sum + analytics.totalRevenue;
  }, 0);

  const totalTicketsSold = events.reduce((sum, event) => {
    const analytics = getEventAnalytics(event.id);
    return sum + analytics.totalTicketsSold;
  }, 0);

  const EventCard = ({ event, showAnalytics = false }: { event: OrganizerEvent; showAnalytics?: boolean }) => {
    const analytics = showAnalytics ? getEventAnalytics(event.id) : null;

    return (
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-48 h-48 md:h-auto">
            <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={event.status === "published" ? "default" : "secondary"}>
                    {event.status}
                  </Badge>
                  <Badge variant="outline">{event.category}</Badge>
                </div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {event.date.toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at {event.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <span>{event.price === 0 ? "Free Event" : `KSh ${event.price.toLocaleString()}`}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>Capacity: {event.capacity}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics */}
            {showAnalytics && analytics && (
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Tickets Sold</p>
                  <p className="text-2xl font-bold">{analytics.totalTicketsSold}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Revenue</p>
                  <p className="text-2xl font-bold">KSh {analytics.totalRevenue.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Bookings</p>
                  <p className="text-2xl font-bold">{analytics.bookings}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t">
              <Button size="sm" variant="outline" onClick={() => (window.location.href = `/events`)}>
                <BarChart3 className="w-4 h-4 mr-2" />
                View Public Page
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setDeleteEventId(event.id)}
                data-testid={`button-delete-${event.id}`}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Organizer Dashboard</h1>
              <p className="text-muted-foreground">Welcome back, {organizer.name}!</p>
            </div>
            <Button onClick={() => (window.location.href = "/add-event")} data-testid="button-add-event">
              <Plus className="w-4 h-4 mr-2" />
              Add New Event
            </Button>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                  <p className="text-2xl font-bold">{events.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                  <p className="text-2xl font-bold">{upcomingEvents.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tickets Sold</p>
                  <p className="text-2xl font-bold">{totalTicketsSold}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-500/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">KSh {totalRevenue.toLocaleString()}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Events Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming" data-testid="tab-upcoming">
                Upcoming ({upcomingEvents.length})
              </TabsTrigger>
              <TabsTrigger value="past" data-testid="tab-past">
                Past Events ({pastEvents.length})
              </TabsTrigger>
              {draftEvents.length > 0 && (
                <TabsTrigger value="drafts" data-testid="tab-drafts">
                  Drafts ({draftEvents.length})
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingEvents.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground mb-4">No upcoming events</p>
                  <Button onClick={() => (window.location.href = "/add-event")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Your First Event
                  </Button>
                </Card>
              ) : (
                upcomingEvents.map((event) => <EventCard key={event.id} event={event} showAnalytics />)
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastEvents.length === 0 ? (
                <Card className="p-12 text-center">
                  <p className="text-muted-foreground">No past events</p>
                </Card>
              ) : (
                pastEvents.map((event) => <EventCard key={event.id} event={event} showAnalytics />)
              )}
            </TabsContent>

            {draftEvents.length > 0 && (
              <TabsContent value="drafts" className="space-y-4">
                {draftEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>

      <Footer />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteEventId} onOpenChange={() => setDeleteEventId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Event?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the event and all associated bookings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => deleteEventId && handleDelete(deleteEventId)}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}