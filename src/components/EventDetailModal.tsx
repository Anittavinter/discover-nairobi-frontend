import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Share2, Navigation, CalendarPlus, Check } from "lucide-react";
import { CategoryBadge } from "./CategoryBadge";
import { type Event } from "./EventCard";
import { format } from "date-fns";
import { useState } from "react";
import { SiWhatsapp, SiX } from "react-icons/si";

interface EventDetailModalProps {
  event: Event | null;
  open: boolean;
  onClose: () => void;
}

export function EventDetailModal({ event, open, onClose }: EventDetailModalProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!event) return null;

  const eventUrl = `${window.location.origin}/events?id=${event.id}`;
  const eventDescription = encodeURIComponent(`${event.title} - ${format(event.date, "MMM d")} at ${event.time}`);
  
  const whatsappUrl = `https://wa.me/?text=${eventDescription}%20${encodeURIComponent(eventUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${eventDescription}&url=${encodeURIComponent(eventUrl)}`;
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`;

  const calendarUrl = (() => {
    const startDate = format(event.date, "yyyyMMdd");
    const timeStr = event.time.replace(/[:\s]/g, '');
    const title = encodeURIComponent(event.title);
    const location = encodeURIComponent(event.location);
    const details = encodeURIComponent(event.description);
    
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}T${timeStr}00/${startDate}T${timeStr}00&details=${details}&location=${location}`;
  })();

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(eventUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: 'whatsapp' | 'twitter' | 'copy') => {
    if (platform === 'copy') {
      handleCopyLink();
    } else if (platform === 'whatsapp') {
      window.open(whatsappUrl, '_blank');
    } else if (platform === 'twitter') {
      window.open(twitterUrl, '_blank');
    }
    setShowShareMenu(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto !bg-white !text-gray-900">
        <div className="relative aspect-video overflow-hidden rounded-lg -mt-6 -mx-6 mb-4">
          <img
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
          
          <div className="absolute top-4 left-4 flex gap-2">
            <CategoryBadge category={event.category} className="bg-white/20 backdrop-blur-sm text-white border-white/30" />
            <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-white/30">
              {event.neighborhood}
            </Badge>
          </div>
        </div>

        <DialogHeader>
          <DialogTitle className="font-display text-3xl text-gray-900" data-testid="text-event-detail-title">
            {event.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              <span className="font-medium text-gray-900">{format(event.date, "EEEE, MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <span className="text-gray-900">{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-purple-600" />
              <span className="text-gray-900">{event.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Organized by <span className="font-medium text-gray-900">{event.organizer.name}</span>
            </span>
          </div>

          <div className="pt-2">
            <h3 className="font-display font-semibold mb-2 text-gray-900">About this event</h3>
            <p className="text-gray-700">{event.description}</p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button 
              className="flex-1 min-w-[200px]" 
              onClick={() => {
                localStorage.setItem('pendingBooking', event.id);
                window.location.href = "/login";
              }}
              data-testid="button-get-tickets"
            >
              Book Now
            </Button>
            
            <div className="flex gap-2 flex-1 min-w-[200px]">
              <Button 
                variant="outline" 
                className="flex-1 bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50"
                onClick={() => window.open(mapsUrl, '_blank')}
                data-testid="button-directions"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Directions
              </Button>
              
              <Button 
                variant="outline" 
                className="flex-1 bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50"
                onClick={() => window.open(calendarUrl, '_blank')}
                data-testid="button-add-calendar"
              >
                <CalendarPlus className="h-4 w-4 mr-2" />
                Add to Calendar
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            {!showShareMenu ? (
              <Button 
                variant="outline" 
                className="w-full bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50"
                onClick={() => setShowShareMenu(true)}
                data-testid="button-share"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share Event
              </Button>
            ) : (
              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-900">Share this event:</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-col h-auto py-3 bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50"
                    onClick={() => handleShare('whatsapp')}
                    data-testid="button-share-whatsapp"
                  >
                    <SiWhatsapp className="h-5 w-5 mb-1" style={{ color: '#25D366' }} />
                    <span className="text-xs">WhatsApp</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-col h-auto py-3 bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50"
                    onClick={() => handleShare('twitter')}
                    data-testid="button-share-twitter"
                  >
                    <SiX className="h-5 w-5 mb-1 text-gray-900" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex-col h-auto py-3 bg-white text-gray-900 border-2 border-gray-300 hover:bg-gray-50"
                    onClick={() => handleShare('copy')}
                    data-testid="button-share-copy"
                  >
                    {copied ? (
                      <>
                        <Check className="h-5 w-5 mb-1 text-green-500" />
                        <span className="text-xs text-green-500">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="h-5 w-5 mb-1 text-gray-900" />
                        <span className="text-xs">Copy Link</span>
                      </>
                    )}
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full bg-transparent text-gray-900 hover:bg-gray-100"
                  onClick={() => setShowShareMenu(false)}
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}