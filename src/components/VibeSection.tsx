import { Music, Palette, UtensilsCrossed, Dumbbell, Bike, GraduationCap } from "lucide-react";

const vibes = [
  {
    id: 1,
    icon: Music,
    title: "Music & Nightlife",
    description: "DJ sets, live bands, rooftop parties, bartender competitions",
    bgColors: { from: "hsl(var(--secondary))", to: "hsl(var(--primary))" }
  },
  {
    id: 2,
    icon: Palette,
    title: "Art & Design",
    description: "Gallery openings, design week events, artist studios, exhibitions",
    bgColors: { from: "hsl(var(--accent))", to: "hsl(var(--chart-4))" }
  },
  {
    id: 3,
    icon: UtensilsCrossed,
    title: "Food & Drink",
    description: "Pop-up restaurants, wine tastings, farmers markets, food festivals",
    bgColors: { from: "hsl(var(--chart-5))", to: "hsl(var(--primary))" }
  },
  {
    id: 4,
    icon: Dumbbell,
    title: "Wellness & Fitness",
    description: "Yoga retreats, meditation sessions, hiking groups, wellness workshops",
    bgColors: { from: "hsl(var(--chart-4))", to: "hsl(var(--accent))" }
  },
  {
    id: 5,
    icon: Bike,
    title: "Sports & Adventure",
    description: "Boxing matches, polo events, horse riding, outdoor adventures",
    bgColors: { from: "hsl(var(--primary))", to: "hsl(var(--chart-5))" }
  },
  {
    id: 6,
    icon: GraduationCap,
    title: "Culture & Learning",
    description: "Workshops, talks, cultural festivals, skill-sharing sessions",
    bgColors: { from: "hsl(var(--secondary))", to: "hsl(var(--accent))" }
  }
];

export function VibeSection() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="font-display font-bold text-3xl md:text-4xl text-center mb-12">
        What's Your Vibe?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vibes.map((vibe) => {
          const Icon = vibe.icon;
          return (
            <div
              key={vibe.title}
              className="relative overflow-hidden rounded-lg border bg-card hover-elevate active-elevate-2 cursor-pointer group transition-all"
              onClick={() => console.log("Vibe clicked:", vibe.title)}
              data-testid={`card-vibe-${vibe.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div 
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                style={{
                  backgroundImage: `linear-gradient(to bottom right, ${vibe.bgColors.from}, ${vibe.bgColors.to})`
                }}
              />
              
              <div className="relative p-6 text-center space-y-4">
                <div 
                  className="inline-flex p-4 rounded-full shadow-lg"
                  style={{
                    backgroundImage: `linear-gradient(to bottom right, ${vibe.bgColors.from}, ${vibe.bgColors.to})`
                  }}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="font-display font-semibold text-xl">{vibe.title}</h3>
                <p className="text-sm text-muted-foreground">{vibe.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}