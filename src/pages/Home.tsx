import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { VibeSection } from "@/components/VibeSection";
import { WeekendSection } from "@/components/WeekendSection";
import { EventDetailModal } from "@/components/EventDetailModal";
import { Footer } from "@/components/Footer";
import { useFavorites } from "@/hooks/useFavorites";
import type { Event } from "@/components/EventCard";

const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Rooftop Jazz Night at Kilimanjaro",
    description: "Experience an unforgettable evening of live jazz under the Nairobi stars. Featuring top local and international jazz artists, this rooftop event offers stunning city views, craft cocktails, and an atmosphere that captures the soul of Nairobi's vibrant music scene.",
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
    description: "Start your day with peace and mindfulness in the heart of nature. Join us for a rejuvenating morning yoga session followed by guided meditation, surrounded by the serene beauty of Karura Forest.",
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
    description: "Connect with Nairobi's thriving tech community. Network with developers, founders, and innovators while learning about the latest trends in AI, blockchain, and startup culture in East Africa.",
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
    description: "Dance till dawn with top international DJs spinning the best Afro House beats. This high-energy night features special guest DJs from South Africa, Nigeria, and Europe, bringing global sounds to Nairobi's premier nightlife venue.",
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
    description: "Showcasing the finest contemporary art from East African artists. Explore thought-provoking installations, paintings, and sculptures that reflect the dynamic cultural landscape of modern Kenya.",
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
    description: "Taste Nairobi's best street food all in one place. From nyama choma to samosas, enjoy authentic Kenyan flavors alongside international street food favorites. Live music and family-friendly activities included.",
    category: "Food & Dining",
    date: new Date(2025, 9, 25),
    time: "16:00",
    location: "Two Rivers Mall, Ruaka",
    neighborhood: "Ruaka",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    organizer: { name: "Nairobi Foodies" }
  },
  {
    id: "7",
    title: "Organic Farmers Market",
    description: "Fresh organic produce, artisan goods, and local crafts from Karen's best farmers and makers. Support local agriculture while enjoying live music, farm-to-table tastings, and a vibrant community atmosphere.",
    category: "Community Events",
    date: new Date(2025, 9, 26),
    time: "09:00",
    location: "Karen Country Club",
    neighborhood: "Karen",
    imageUrl: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800",
    organizer: { name: "Karen Farmers Collective" }
  },
  {
    id: "8",
    title: "Morning Run & Coffee",
    description: "Join our running club for a refreshing 5K through Karura Forest, followed by artisan coffee and healthy breakfast. All fitness levels welcome!",
    category: "Wellness & Fitness",
    date: new Date(2025, 9, 27),
    time: "06:30",
    location: "Karura Forest Main Gate",
    neighborhood: "Muthaiga",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800",
    organizer: { name: "Nairobi Runners Club" }
  },
  {
    id: "9",
    title: "Jockey Polo Tournament",
    description: "Experience the elegance and excitement of polo at Karen's premier equestrian venue. Watch skilled riders and magnificent horses compete in this thrilling sport, followed by champagne reception and social hour.",
    category: "Sports & Adventure",
    date: new Date(2025, 9, 28),
    time: "15:00",
    location: "Karen Polo Club",
    neighborhood: "Karen",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    organizer: { name: "Karen Polo Club" }
  }
];

export default function Home() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <VibeSection />
      <WeekendSection 
        events={sampleEvents}
        onEventClick={handleEventClick}
        isFavorite={isFavorite}
        onToggleFavorite={toggleFavorite}
      />
      <Footer />
      <EventDetailModal 
        event={selectedEvent}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}