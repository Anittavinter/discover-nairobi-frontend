import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Calendar } from "lucide-react";
import { CategoryBadge, type Category } from "./CategoryBadge";
import { format } from "date-fns";

export interface Event {
  id: string;
  title: string;
  description: string;
  category: Category;
  date: Date;
  time: string;
  location: string;
  neighborhood: string;
  imageUrl: string;
  organizer: {
    name: string;
    avatar?: string;
  };
}

interface EventCardProps {
  event: Event;
  onClick?: () => void;
}

export function EventCard({ event, onClick }: EventCardProps) {
  const getGradient = () => {
    const hour = parseInt(event.time.split(":")[0]);
    if (hour < 12) return "from-chart-4 to-accent";
    if (hour < 17) return "from-accent to-primary";
    if (hour < 21) return "from-primary to-chart-5";
    return "from-secondary to-primary";
  };

  return (
    <Card 
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group transition-all"
      onClick={onClick}
      data-testid={`card-event-${event.id}`}
    >
      <div className="relative aspect-video overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-60`} />
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <CategoryBadge category={event.category} className="bg-background/90 backdrop-blur-sm" />
        </div>
        <div className="absolute top-3 right-3">
          <Badge className="bg-white/90 backdrop-blur-sm text-foreground border-0">
            <Clock className="w-3 h-3 mr-1" />
            {event.time}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display font-bold text-lg text-white drop-shadow-lg line-clamp-2">
            {event.title}
          </h3>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="font-medium">{format(event.date, "EEE, MMM d")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
      </div>
    </Card>
  );
}