import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";
import { Search, MapPin, Calendar, X, Filter, ArrowUpDown } from "lucide-react";
import { Link } from "wouter";
import { getEvents } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

// Sample event data with vibrant categories
const SAMPLE_EVENTS = [
  {
    id: 1,
    title: "Amapiano Night at Westlands",
    category: "Live Music",
    date: "2025-10-25",
    time: "8:00 PM",
    venue: "The Alchemist",
    neighborhood: "Westlands",
    price: 1500,
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
  },
  {
    id: 2,
    title: "Morning Yoga at Karura Forest",
    category: "Wellness & Fitness",
    date: "2025-10-23",
    time: "6:30 AM",
    venue: "Karura Forest",
    neighborhood: "Kiambu Road",
    price: 0,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
  },
  {
    id: 3,
    title: "Tech Startup Pitch Night",
    category: "Tech & Innovation",
    date: "2025-10-24",
    time: "6:00 PM",
    venue: "iHub Nairobi",
    neighborhood: "CBD",
    price: 500,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  },
  {
    id: 4,
    title: "Nyama Choma Festival",
    category: "Food & Dining",
    date: "2025-10-26",
    time: "12:00 PM",
    venue: "Karen Gardens",
    neighborhood: "Karen",
    price: 2000,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
  },
  {
    id: 5,
    title: "Contemporary Art Exhibition",
    category: "Art Exhibitions",
    date: "2025-10-27",
    time: "10:00 AM",
    venue: "Nairobi Gallery",
    neighborhood: "Lavington",
    price: 800,
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
  },
  {
    id: 6,
    title: "Open Mic Comedy Night",
    category: "Open Mics",
    date: "2025-10-25",
    time: "7:30 PM",
    venue: "Churchill's Pub",
    neighborhood: "Westlands",
    price: 500,
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800",
  },
  {
    id: 7,
    title: "Afrobeat Dance Workshop",
    category: "Workshops",
    date: "2025-10-28",
    time: "3:00 PM",
    venue: "Dance Studio 254",
    neighborhood: "Kilimani",
    price: 1000,
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800",
  },
  {
    id: 8,
    title: "Rooftop Sundowner Party",
    category: "Community Events",
    date: "2025-10-26",
    time: "5:00 PM",
    venue: "Sky Lounge",
    neighborhood: "Parklands",
    price: 1200,
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
  },
] as const;

// Define Event type
type Event = typeof SAMPLE_EVENTS[number];

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

const SORT_OPTIONS = [
  { label: "Date (Earliest)", value: "date-asc" },
  { label: "Date (Latest)", value: "date-desc" },
  { label: "Price (Low to High)", value: "price-asc" },
  { label: "Price (High to Low)", value: "price-desc" },
  { label: "Name (A-Z)", value: "name-asc" },
];

function EventCard({ event }: { event: Event }) {
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer group"
      data-testid={`card-event-${event.id}`}
    >
      {/* Event Image */}
      <div className="relative h-56 overflow-hidden bg-muted">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <Badge 
            className="text-xs shadow-lg"
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
            <Badge className="bg-chart-2 text-white shadow-lg text-xs">FREE</Badge>
          </div>
        )}
      </div>

      {/* Event Details */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <h3 className="font-bold text-xl line-clamp-2 leading-tight" data-testid={`text-event-title-${event.id}`}>
          {event.title}
        </h3>

        {/* Date + Time */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span>{formatDate(event.date)} • {event.time}</span>
        </div>

        {/* Venue */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{event.venue}</span>
        </div>

        {/* Price + Button */}
        <div className="flex items-center justify-between pt-3 border-t">
          <div className="font-bold text-lg text-foreground">
            {event.price === 0 ? "FREE" : `KES ${event.price.toLocaleString()}`}
          </div>
          <Link 
            href="/login"
            onClick={() => {
              localStorage.setItem('pendingBooking', event.id.toString());
            }}
          >
            <Button size="sm" data-testid={`button-book-${event.id}`}>
              Book Now
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

function EventCardSkeleton() {
  return (
    <div className="rounded-lg overflow-hidden bg-card border">
      <Skeleton className="h-56 w-full" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3" />
        <div className="flex justify-between items-center pt-3 border-t">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState("All Areas");
  const [selectedPriceRange, setSelectedPriceRange] = useState(PRICE_RANGES[0]);
  const [viewMode, setViewMode] = useState<"all" | "upcoming" | "free">("all");
  const [sortBy, setSortBy] = useState("date-asc");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Use TanStack Query to fetch events from API
  const { data: apiEvents, isLoading, isError } = useQuery({
    queryKey: ['/api/events'],
    queryFn: getEvents,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  });

  // Use API data if available, otherwise fallback to SAMPLE_EVENTS
  const eventsData: Event[] = apiEvents || SAMPLE_EVENTS;

  // Read search query from URL on page load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, []);

  // Filter events
  let filteredEvents = eventsData.filter((event: Event) => {
    // Search filter
    if (searchQuery && !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.venue.toLowerCase().includes(searchQuery.toLowerCase())) {
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

    // Date range filter
    if (dateFrom && event.date < dateFrom) {
      return false;
    }
    if (dateTo && event.date > dateTo) {
      return false;
    }

    // View mode filter
    if (viewMode === "free" && event.price !== 0) {
      return false;
    }
    if (viewMode === "upcoming") {
      const today = new Date().toISOString().split('T')[0];
      if (event.date < today) {
        return false;
      }
    }

    return true;
  });

  // Sort events
  filteredEvents = [...filteredEvents].sort((a, b) => {
    switch (sortBy) {
      case "date-asc":
        return a.date.localeCompare(b.date);
      case "date-desc":
        return b.date.localeCompare(a.date);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const activeFiltersCount = 
    (selectedCategory !== "All Categories" ? 1 : 0) +
    (selectedNeighborhood !== "All Areas" ? 1 : 0) +
    (selectedPriceRange.label !== "All Prices" ? 1 : 0) +
    (dateFrom || dateTo ? 1 : 0);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All Categories");
    setSelectedNeighborhood("All Areas");
    setSelectedPriceRange(PRICE_RANGES[0]);
    setDateFrom("");
    setDateTo("");
    setViewMode("all");
  };

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
              {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} happening in Nairobi
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search events by name or venue..."
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
            {/* Show error message if API fails */}
            {isError && (
              <div className="mb-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md">
                <p className="text-sm text-destructive">
                  ⚠️ Could not connect to backend. Showing sample data. (Backend at: {import.meta.env.VITE_API_URL || 'http://localhost:3000'})
                </p>
              </div>
            )}

            {/* View Mode Tabs */}
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)} className="mb-6">
              <TabsList className="grid w-full max-w-md grid-cols-3">
                <TabsTrigger value="all" data-testid="tab-all-events">All Events</TabsTrigger>
                <TabsTrigger value="upcoming" data-testid="tab-upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="free" data-testid="tab-free">Free Events</TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Filters Row */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Filter className="w-4 h-4" />
                Filters:
              </div>

              {/* Category Filter */}
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

              {/* Neighborhood Filter */}
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

              {/* Price Filter */}
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

              {/* Date From */}
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="h-10 w-auto text-sm"
                placeholder="From date"
                data-testid="input-date-from"
              />

              {/* Date To */}
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="h-10 w-auto text-sm"
                placeholder="To date"
                data-testid="input-date-to"
              />

              {/* Sort */}
              <div className="ml-auto flex items-center gap-2">
                <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-10 px-4 pr-10 rounded-md border border-input bg-background text-sm appearance-none cursor-pointer hover-elevate"
                  data-testid="select-sort"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Active Filter Chips */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategory !== "All Categories" && (
                  <Badge 
                    variant="secondary" 
                    className="gap-1 cursor-pointer hover-elevate"
                    onClick={() => setSelectedCategory("All Categories")}
                    data-testid="chip-category"
                  >
                    {selectedCategory}
                    <X className="w-3 h-3" />
                  </Badge>
                )}
                {selectedNeighborhood !== "All Areas" && (
                  <Badge 
                    variant="secondary" 
                    className="gap-1 cursor-pointer hover-elevate"
                    onClick={() => setSelectedNeighborhood("All Areas")}
                    data-testid="chip-neighborhood"
                  >
                    {selectedNeighborhood}
                    <X className="w-3 h-3" />
                  </Badge>
                )}
                {selectedPriceRange.label !== "All Prices" && (
                  <Badge 
                    variant="secondary" 
                    className="gap-1 cursor-pointer hover-elevate"
                    onClick={() => setSelectedPriceRange(PRICE_RANGES[0])}
                    data-testid="chip-price"
                  >
                    {selectedPriceRange.label}
                    <X className="w-3 h-3" />
                  </Badge>
                )}
                {(dateFrom || dateTo) && (
                  <Badge 
                    variant="secondary" 
                    className="gap-1 cursor-pointer hover-elevate"
                    onClick={() => {
                      setDateFrom("");
                      setDateTo("");
                    }}
                    data-testid="chip-date"
                  >
                    {dateFrom && dateTo ? `${dateFrom} to ${dateTo}` : dateFrom ? `From ${dateFrom}` : `Until ${dateTo}`}
                    <X className="w-3 h-3" />
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="h-6"
                  data-testid="button-clear-all"
                >
                  Clear All
                </Button>
              </div>
            )}

            {/* Events Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <EventCardSkeleton key={i} />
                ))}
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">No events found</p>
                <p className="text-sm text-muted-foreground mb-6">Try adjusting your filters or search query</p>
                <Button
                  variant="outline"
                  onClick={clearAllFilters}
                  data-testid="button-reset-all"
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event: Event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}