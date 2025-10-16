import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Search triggered:", searchQuery);
  };

  return (
    <div 
      className="relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(to bottom right, hsl(var(--secondary)), hsl(var(--primary)), hsl(var(--accent)))'
      }}
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
      
      <div className="relative container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl text-white drop-shadow-lg" data-testid="text-hero-title">
            Discover Nairobi's Creative Scene
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto drop-shadow">
            From Westlands nightlife to Karen wellness retreats, find every creative event and artist in the city
          </p>
          
          <div className="flex gap-2 max-w-2xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search events, artists, or areas in Nairobi..."
                className="pl-10 bg-white/95 backdrop-blur"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                data-testid="input-search"
              />
            </div>
            <Button 
              onClick={handleSearch}
              className="bg-destructive hover:bg-destructive/90 text-white"
              data-testid="button-search"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}