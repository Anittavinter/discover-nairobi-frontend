import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { type Event } from "./EventCard";
import { format } from "date-fns";

interface EventDetailModalProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

export function EventDetailModal({ event, open, onClose }: EventDetailModalProps) {
  if (!event) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <div className="relative aspect-video overflow-hidden rounded-lg -mt-6 -mx-6 mb-4">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <CategoryBadge category={event.category} className="bg-background/90 backdrop-blur-sm" />
            <Badge variant="outline" className="bg-background/90 backdrop-blur-sm">
              {event.neighborhood}
            </Badge>
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="font-display text-3xl">{event.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="font-medium">{format(event.date, "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{event.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Organized by <span className="font-medium text-foreground">{event.organizer.name}</span>
            </span>
          </div>

          <div className="pt-2">
            <h3 className="font-display font-semibold mb-2">About this event</h3>
            <p className="text-muted-foreground">{event.description}</p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button 
              className="flex-1" 
              onClick={() => {
                localStorage.setItem('pendingBooking', event.id);
                window.location.href = "/login";
              }}
              data-testid="button-get-tickets"
            >
              Book Now
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={() => alert("Share feature coming soon!")}
              data-testid="button-share"
            >
              Share Event
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}