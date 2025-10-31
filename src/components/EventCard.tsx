import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Calendar, Heart } from "lucide-react";
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
  isFavorite?: boolean;
  onToggleFavorite?: (eventId: string) => void;
}

export function EventCard({ event, onClick, isFavorite = false, onToggleFavorite }: EventCardProps) {
  const getGradient = () => {
    const hour = parseInt(event.time.split(":")[0]);
    if (hour < 12) return "from-chart-4 to-accent";
    if (hour < 17) return "from-accent to-primary";
    if (hour < 21) return "from-primary to-chart-5";
    return "from-secondary to-primary";
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite?.(event.id);
  };

  return (
    <Card 
      className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer group transition-all touch-manipulation"
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
        <div className="absolute top-3 right-3 flex gap-2">
          <Badge className="bg-white/90 backdrop-blur-sm text-foreground border-0">
            <Clock className="w-3 h-3 mr-1" />
            {event.time}
          </Badge>
          {/* Enhanced Favorite Button - Better Touch Target */}
          {onToggleFavorite && (
            <button
              onClick={handleFavoriteClick}
              className="bg-white/90 backdrop-blur-sm rounded-full min-w-10 min-h-10 flex items-center justify-center hover-elevate active-elevate-2 transition-all touch-manipulation"
              data-testid={`button-favorite-${event.id}`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart 
                className={`w-5 h-5 transition-colors ${
                  isFavorite 
                    ? 'fill-red-500 text-red-500' 
                    : 'text-muted-foreground'
                }`}
              />
            </button>
          )}
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display font-bold text-lg md:text-xl text-white drop-shadow-lg line-clamp-2">
            {event.title}
          </h3>
        </div>
      </div>
      <div className="p-4 md:p-5 space-y-2">
        <div className="flex items-center gap-2 text-sm md:text-base">
          <Calendar className="w-4 h-4 md:w-5 md:h-5 text-primary flex-shrink-0" />
          <span className="font-medium">{format(event.date, "EEE, MMM d")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground">
          <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          <span className="line-clamp-1">{event.location}</span>
        </div>
      </div>
    </Card>
  );
}