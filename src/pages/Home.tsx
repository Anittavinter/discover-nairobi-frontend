import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CategoryFilter } from "@/components/CategoryFilter";
import { EventCard, type Event } from "@/components/EventCard";
import { type Category } from "@/components/CategoryBadge";

// Sample events data
const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Rooftop Jazz Night at Kilimanjaro",
    description: "Live jazz under the Nairobi stars",
    category: "Live Music",
    date: new Date(2025, 9, 20),
    time: "19:30",
    location: "Kilimanjaro Jamia, Westlands",
    neighborhood: "Westlands",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    organizer: { name: "Nairobi Jazz Collective" }
  },
  {
    id: "2",
    title: "Sunrise Yoga & Meditation",
    description: "Start your day with peace and mindfulness",
    category: "Wellness & Fitness",
    date: new Date(2025, 9, 21),
    time: "07:00",
    location: "Karura Forest, Muthaiga",
    neighborhood: "Muthaiga",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    organizer: { name: "Nairobi Wellness Hub" }
  },
  {
    id: "3",
    title: "Tech Innovators Meetup",
    description: "Connect with Nairobi's tech community",
    category: "Tech & Innovation",
    date: new Date(2025, 9, 22),
    time: "14:00",
    location: "iHub, Ngong Road",
    neighborhood: "Kilimani",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    organizer: { name: "Nairobi Tech Scene" }
  },
  {
    id: "4",
    title: "International DJ Night: Afro House",
    description: "Dance till dawn with top international DJs",
    category: "International DJs",
    date: new Date(2025, 9, 23),
    time: "22:00",
    location: "Alchemist Bar, Westlands",
    neighborhood: "Westlands",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
    organizer: { name: "Nairobi Nightlife" }
  },
  {
    id: "5",
    title: "Contemporary Art Exhibition",
    description: "Showcasing East African artists",
    category: "Art Exhibitions",
    date: new Date(2025, 9, 24),
    time: "11:00",
    location: "Circle Art Gallery, Karen",
    neighborhood: "Karen",
    imageUrl: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800",
    organizer: { name: "Circle Art Gallery" }
  },
  {
    id: "6",
    title: "Street Food Festival",
    description: "Taste Nairobi's best street food",
    category: "Food & Dining",
    date: new Date(2025, 9, 25),
    time: "16:00",
    location: "Two Rivers Mall, Ruaka",
    neighborhood: "Ruaka",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    organizer: { name: "Nairobi Foodies" }
  }
];

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const handleCategoryToggle = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredEvents = selectedCategories.length === 0
    ? sampleEvents
    : sampleEvents.filter(event => selectedCategories.includes(event.category));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <CategoryFilter 
        selectedCategories={selectedCategories}
        onToggle={handleCategoryToggle}
      />
      
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="font-display text-3xl font-bold mb-2">
            {selectedCategories.length === 0 
              ? "All Events in Nairobi" 
              : `${selectedCategories.join(", ")} Events`}
          </h2>
          <p className="text-muted-foreground">
            {filteredEvents.length} events found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event}
              onClick={() => console.log("Clicked event:", event.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}