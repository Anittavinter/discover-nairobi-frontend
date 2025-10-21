import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Palette, Laptop, Heart, Utensils, Shirt, Users, Mic, Globe, Wrench, Film, Sparkles } from "lucide-react";

const CATEGORIES = [
  {
    id: "live-music",
    name: "Live Music",
    icon: Music,
    description: "Concerts, DJ sets, and live performances",
    eventCount: 16,
    color: "hsl(var(--primary))",
    bgColor: "hsl(var(--primary) / 0.1)",
  },
  {
    id: "art-exhibitions",
    name: "Art Exhibitions",
    icon: Palette,
    description: "Gallery openings and art shows",
    eventCount: 9,
    color: "hsl(var(--secondary))",
    bgColor: "hsl(var(--secondary) / 0.1)",
  },
  {
    id: "tech-innovation",
    name: "Tech & Innovation",
    icon: Laptop,
    description: "Hackathons, meetups, and tech talks",
    eventCount: 15,
    color: "hsl(var(--accent))",
    bgColor: "hsl(var(--accent) / 0.1)",
  },
  {
    id: "wellness-fitness",
    name: "Wellness & Fitness",
    icon: Heart,
    description: "Yoga, meditation, and fitness classes",
    eventCount: 10,
    color: "hsl(var(--chart-2))",
    bgColor: "hsl(var(--chart-2) / 0.1)",
  },
  {
    id: "food-dining",
    name: "Food & Dining",
    icon: Utensils,
    description: "Food festivals and culinary experiences",
    eventCount: 10,
    color: "hsl(var(--chart-1))",
    bgColor: "hsl(var(--chart-1) / 0.1)",
  },
  {
    id: "fashion-shows",
    name: "Fashion Shows",
    icon: Shirt,
    description: "Runway shows and fashion events",
    eventCount: 15,
    color: "hsl(var(--primary))",
    bgColor: "hsl(var(--primary) / 0.1)",
  },
  {
    id: "cultural-festivals",
    name: "Cultural Festivals",
    icon: Globe,
    description: "Celebrations of culture and heritage",
    eventCount: 7,
    color: "hsl(var(--secondary))",
    bgColor: "hsl(var(--secondary) / 0.1)",
  },
  {
    id: "open-mics",
    name: "Open Mics",
    icon: Mic,
    description: "Poetry, comedy, and spoken word",
    eventCount: 10,
    color: "hsl(var(--accent))",
    bgColor: "hsl(var(--accent) / 0.1)",
  },
  {
    id: "community-events",
    name: "Community Events",
    icon: Users,
    description: "Meetups, networking, and social gatherings",
    eventCount: 15,
    color: "hsl(var(--chart-2))",
    bgColor: "hsl(var(--chart-2) / 0.1)",
  },
  {
    id: "workshops",
    name: "Workshops",
    icon: Wrench,
    description: "Hands-on learning and skill development",
    eventCount: 8,
    color: "hsl(var(--chart-1))",
    bgColor: "hsl(var(--chart-1) / 0.1)",
  },
  {
    id: "film-screenings",
    name: "Film Screenings",
    icon: Film,
    description: "Movie nights and film festivals",
    eventCount: 7,
    color: "hsl(var(--primary))",
    bgColor: "hsl(var(--primary) / 0.1)",
  },
  {
    id: "international-djs",
    name: "International DJs",
    icon: Sparkles,
    description: "Global artists and special performances",
    eventCount: 12,
    color: "hsl(var(--secondary))",
    bgColor: "hsl(var(--secondary) / 0.1)",
  },
];

function CategoryCard({ category }: { category: typeof CATEGORIES[0] }) {
  const Icon = category.icon;

  return (
    <Card 
      className="p-6 hover-elevate active-elevate-2 cursor-pointer group relative overflow-hidden"
      data-testid={`card-category-${category.id}`}
    >
      {/* Background Icon (subtle) */}
      <div 
        className="absolute -right-4 -bottom-4 opacity-5"
      >
        <Icon className="w-32 h-32" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div 
            className="w-14 h-14 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
            style={{ backgroundColor: category.bgColor }}
          >
            <Icon className="w-7 h-7" style={{ color: category.color }} />
          </div>
          <Badge 
            className="text-xs"
            style={{ 
              backgroundColor: category.bgColor,
              color: category.color,
              border: `1px solid ${category.color}`
            }}
          >
            {category.eventCount} events
          </Badge>
        </div>

        <h3 className="text-xl font-bold mb-2" data-testid={`text-category-name-${category.id}`}>
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {category.description}
        </p>
      </div>
    </Card>
  );
}

export default function Categories() {
  const totalEvents = CATEGORIES.reduce((sum, cat) => sum + cat.eventCount, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="py-16 px-4 md:px-8 border-b relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(var(--chart-1)) 0%, hsl(var(--primary)) 33%, hsl(var(--secondary)) 66%, hsl(var(--accent)) 100%)',
          }}
        >
          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Event Categories
            </h1>
            <p className="text-xl text-white/90 mb-2">
              Explore {CATEGORIES.length} categories
            </p>
            <p className="text-lg text-white/80">
              {totalEvents.toLocaleString()} total events across Nairobi
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {CATEGORIES.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section 
          className="py-16 px-4 md:px-8"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(var(--accent) / 0.1) 0%, hsl(var(--primary) / 0.1) 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Browse all events or use our advanced filters to find your perfect experience
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/events">
                <button className="px-6 py-3 bg-primary text-primary-foreground rounded-md hover-elevate active-elevate-2 font-semibold">
                  Browse All Events
                </button>
              </a>
              <a href="/calendar">
                <button className="px-6 py-3 bg-card border border-input rounded-md hover-elevate active-elevate-2 font-semibold">
                  View Calendar
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}