import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";import { useState } from "react";
import { Search, MapPin, Calendar, Users, Clock, X } from "lucide-react";
// Sample event data with vibrant categories
const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Amapiano Night at Westlands",
    category: "Live Music",
    date: "2025-10-25",
    time: "8:00 PM",
    location: "The Alchemist",
    neighborhood: "Westlands",
    price: 1500,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    attendees: 234,
    organizer: "Nairobi Nights",
  },
  {
    id: 2,
    title: "Morning Yoga at Karura Forest",
    category: "Wellness & Fitness",
    date: "2025-10-23",
    time: "6:30 AM",
    location: "Karura Forest",
    neighborhood: "Kiambu Road",
    price: 0,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    attendees: 45,
    organizer: "Zen Wellness",
  },
  {
    id: 3,
    title: "Tech Startup Pitch Night",
    category: "Tech & Innovation",
    date: "2025-10-24",
    time: "6:00 PM",
    location: "iHub Nairobi",
    neighborhood: "CBD",
    price: 500,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    attendees: 120,
    organizer: "Nairobi Tech Community",
  },
  {
    id: 4,
    title: "Nyama Choma Festival",
    category: "Food & Dining",
    date: "2025-10-26",
    time: "12:00 PM",
    location: "Karen Gardens",
    neighborhood: "Karen",
    price: 2000,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    attendees: 567,
    organizer: "Nairobi Foodies",
  },
  {
    id: 5,
    title: "Contemporary Art Exhibition",
    category: "Art Exhibitions",
    date: "2025-10-27",
    time: "10:00 AM",
    location: "Nairobi Gallery",
    neighborhood: "Lavington",
    price: 800,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    attendees: 89,
    organizer: "Art Collective KE",
  },
  {
    id: 6,
    title: "Open Mic Comedy Night",
    category: "Open Mics",
    date: "2025-10-25",
    time: "7:30 PM",
    location: "Churchill's Pub",
    neighborhood: "Westlands",
    price: 500,
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800",
    attendees: 145,
    organizer: "Laugh Factory KE",
  },
  {
    id: 7,
    title: "Afrobeat Dance Workshop",
    category: "Workshops",
    date: "2025-10-28",
    time: "3:00 PM",
    location: "Dance Studio 254",
    neighborhood: "Kilimani",
    price: 1000,
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800",
    attendees: 32,
    organizer: "Move254",
  },
  {
    id: 8,
    title: "Rooftop Sundowner Party",
    category: "Community Events",
    date: "2025-10-26",
    time: "5:00 PM",
    location: "Sky Lounge",
    neighborhood: "Parklands",
    price: 1200,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
    attendees: 178,
    organizer: "Social Nairobi",
  },
];

const CATEGORIES = [
  "All Categories",
  "Live Music",
  "Art Exhibitions",
  "Tech & Innovation",
  "Wellness & Fitness",
  "Food & Dining",
  "Fashion Shows",
  "Cultural Festivals",
  "Open Mics",
  "Community Events",
  "Workshops",
  "Film Screenings",
];

const NEIGHBORHOODS = [
  "All Areas",
  "Westlands",
  "Karen",
  "Limuru",
  "Kiambu Road",
  "CBD",
  "Kilimani",
  "Lavington",
  "Parklands",
  "Runda",
  "Spring Valley",
];

const PRICE_RANGES = [
  { label: "All Prices", min: 0, max: Infinity },
  { label: "Free", min: 0, max: 0 },
  { label: "Under KES 500", min: 0, max: 500 },
  { label: "KES 500 - 1000", min: 500, max: 1000 },
  { label: "KES 1000 - 2000", min: 1000, max: 2000 },
  { label: "Over KES 2000", min: 2000, max: Infinity },
];

function EventCard({ event }: { event: typeof SAMPLE_EVENTS[0] }) {
  const categoryColors: Record<string, string> = {
    "Live Music": "hsl(var(--primary))",
    "Art Exhibitions": "hsl(var(--secondary))",
    "Tech & Innovation": "hsl(var(--accent))",
    "Wellness & Fitness": "hsl(var(--chart-2))",
    "Food & Dining": "hsl(var(--chart-1))",
    "Open Mics": "hsl(var(--primary))",
    "Workshops": "hsl(var(--secondary))",
    "Community Events": "hsl(var(--accent))",
  };

  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer group"
      data-testid={`card-event-${event.id}`}
    >
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden bg-muted">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge 
            className="shadow-lg"
            style={{ 
              backgroundColor: categoryColors[event.category] || "hsl(var(--primary))",
              color: "white"
            }}
          >
            {event.category}
          </Badge>
        </div>
        {event.price === 0 && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-chart-2 text-white shadow-lg">FREE</Badge>
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-4 space-y-3">
        <h3 className="font-bold text-lg line-clamp-2" data-testid={`text-event-title-${event.id}`}>
          {event.title}
        </h3>

        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            <Clock className="w-4 h-4 flex-shrink-0 ml-2" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{event.location}, {event.neighborhood}</span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="text-xs">{event.attendees} going</span>
            </div>
            <div className="font-bold text-foreground">
              {event.price === 0 ? "FREE" : `KES ${event.price.toLocaleString()}`}
            </div>
          </div>
        </div>

        <Button className="w-full" data-testid={`button-book-${event.id}`}>
          Book Now
        </Button>
      </div>
    </Card>
  );
}

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All Areas");
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);
  const [viewMode, setViewMode] = useState<"all" | "upcoming" | "free">("all");

  // Filter events
  const filteredEvents = SAMPLE_EVENTS.filter((event) => {
    // Search filter
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Category filter
    if (selectedCategory !== "All Categories" && event.category !== selectedCategory) {
      return false;
    }

    // Neighborhood filter
    if (selectedNeighborhood !== "All Areas" && event.neighborhood !== selectedNeighborhood) {
      return false;
    }

    // Price filter
    if (event.price < selectedPriceRange.min || event.price > selectedPriceRange.max) {
      return false;
    }

    // View mode filter
    if (viewMode === "free" && event.price !== 0) {
      return false;
    }

    return true;
  });

  const activeFiltersCount = 
    (selectedCategory !== "All Categories" ? 1 : 0) +
    (selectedNeighborhood !== "All Areas" ? 1 : 0) +
    (selectedPriceRange.label !== "All Prices" ? 1 : 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="py-12 px-4 md:px-8 border-b relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)',
          }}
        >
          <div className="max-w-7xl mx-auto relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white text-center">
              Browse Events
            </h1>
            <p className="text-lg text-white/90 text-center mb-6">
              {filteredEvents.length} events happening in Nairobi
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-12 text-base bg-white"
                data-testid="input-search-events"
              />
            </div>
          </div>
        </section>

        {/* Filters & Events Grid */}
        <section className="py-8 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            {/* View Mode Tabs */}
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)} className="mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all" data-testid="tab-all-events">All Events</TabsTrigger>
                <TabsTrigger value="upcoming" data-testid="tab-upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="free" data-testid="tab-free">Free Events</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-8">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="h-10 px-4 pr-10 rounded-md border border-input bg-background text-sm appearance-none cursor-pointer hover-elevate"
                  data-testid="select-category"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Neighborhood Filter */}
              <div className="relative">
                <select
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  className="h-10 px-4 pr-10 rounded-md border border-input bg-background text-sm appearance-none cursor-pointer hover-elevate"
                  data-testid="select-neighborhood"
                >
                  {NEIGHBORHOODS.map((area) => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select
                  value={selectedPriceRange.label}
                  onChange={(e) => {
                    const range = PRICE_RANGES.find(r => r.label === e.target.value);
                    if (range) setSelectedPriceRange(range);
                  }}
                  className="h-10 px-4 pr-10 rounded-md border border-input bg-background text-sm appearance-none cursor-pointer hover-elevate"
                  data-testid="select-price"
                >
                  {PRICE_RANGES.map((range) => (
                    <option key={range.label} value={range.label}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedCategory("All Categories");
                    setSelectedNeighborhood("All Areas");
                    setSelectedPriceRange(PRICE_RANGES[0]);
                  }}
                  data-testid="button-clear-filters"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''}
                </Button>
              )}
            </div>

            {/* Events Grid */}
            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No events found</h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                    setSelectedNeighborhood("All Areas");
                    setSelectedPriceRange(PRICE_RANGES[0]);
                  }}
                  data-testid="button-reset-all"
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}