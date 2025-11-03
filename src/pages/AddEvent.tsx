
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Calendar, MapPin, Clock, DollarSign, Users, Image, Tag } from "lucide-react";
import { saveOrganizerEvent, ensureDefaultOrganizer } from "@/lib/organizers";
import { useToast } from "@/hooks/use-toast";

const CATEGORIES = [
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
  "International DJs",
];

const NEIGHBORHOODS = [
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

export default function AddEvent() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    neighborhood: "",
    imageUrl: "",
    price: "",
    capacity: "",
    tags: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation
    if (!formData.title || !formData.category || !formData.date || !formData.time || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const organizer = ensureDefaultOrganizer();
      const eventId = `EVT${Date.now()}`;

      const newEvent = {
        id: eventId,
        organizerId: organizer.id,
        organizerName: organizer.name,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: new Date(formData.date),
        time: formData.time,
        location: formData.location,
        neighborhood: formData.neighborhood,
        imageUrl: formData.imageUrl || "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
        price: parseFloat(formData.price) || 0,
        capacity: parseInt(formData.capacity) || 100,
        tags: formData.tags.split(",").map((t) => t.trim()).filter((t) => t),
        status: "published" as const,
        createdAt: new Date(),
      };

      saveOrganizerEvent(newEvent);

      toast({
        title: "Event Created! 🎉",
        description: `${formData.title} has been published successfully.`,
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        category: "",
        date: "",
        time: "",
        location: "",
        neighborhood: "",
        imageUrl: "",
        price: "",
        capacity: "",
        tags: "",
      });

      // Redirect to dashboard after 1 second
      setTimeout(() => {
        window.location.href = "/organizer-dashboard";
      }, 1000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Create New Event</h1>
            <p className="text-muted-foreground">
              Fill in the details below to list your event on Discover Nairobi
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="p-6 space-y-6">
              {/* Event Title */}
              <div>
                <Label htmlFor="title" className="text-base font-semibold mb-2 flex items-center gap-2">
                  <Tag className="w-4 h-4" />
                  Event Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Rooftop Jazz Night"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                  data-testid="input-event-title"
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-base font-semibold mb-2">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Tell attendees what makes your event special..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  data-testid="input-event-description"
                />
              </div>

              {/* Category & Neighborhood */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="text-base font-semibold mb-2">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger data-testid="select-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="neighborhood" className="text-base font-semibold mb-2">
                    Neighborhood *
                  </Label>
                  <Select value={formData.neighborhood} onValueChange={(value) => handleChange("neighborhood", value)}>
                    <SelectTrigger data-testid="select-neighborhood">
                      <SelectValue placeholder="Select neighborhood" />
                    </SelectTrigger>
                    <SelectContent>
                      {NEIGHBORHOODS.map((hood) => (
                        <SelectItem key={hood} value={hood}>
                          {hood}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-base font-semibold mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Date *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    required
                    data-testid="input-event-date"
                  />
                </div>

                <div>
                  <Label htmlFor="time" className="text-base font-semibold mb-2 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Time *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time}
                    onChange={(e) => handleChange("time", e.target.value)}
                    required
                    data-testid="input-event-time"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <Label htmlFor="location" className="text-base font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Venue Location *
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., Alchemist Bar, Westlands"
                  value={formData.location}
                  onChange={(e) => handleChange("location", e.target.value)}
                  required
                  data-testid="input-event-location"
                />
              </div>

              {/* Price & Capacity */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price" className="text-base font-semibold mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Ticket Price (KSh)
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0 for free events"
                    value={formData.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    min="0"
                    data-testid="input-event-price"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Leave as 0 for free events</p>
                </div>

                <div>
                  <Label htmlFor="capacity" className="text-base font-semibold mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Capacity
                  </Label>
                  <Input
                    id="capacity"
                    type="number"
                    placeholder="100"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                    min="1"
                    data-testid="input-event-capacity"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <Label htmlFor="imageUrl" className="text-base font-semibold mb-2 flex items-center gap-2">
                  <Image className="w-4 h-4" />
                  Event Image URL
                </Label>
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) => handleChange("imageUrl", e.target.value)}
                  data-testid="input-event-image"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Default image will be used if left empty
                </p>
              </div>

              {/* Tags */}
              <div>
                <Label htmlFor="tags" className="text-base font-semibold mb-2">
                  Tags (comma-separated)
                </Label>
                <Input
                  id="tags"
                  placeholder="e.g., music, nightlife, jazz"
                  value={formData.tags}
                  onChange={(e) => handleChange("tags", e.target.value)}
                  data-testid="input-event-tags"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={isSubmitting}
                  data-testid="button-create-event"
                >
                  {isSubmitting ? "Creating Event..." : "Create Event"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => (window.location.href = "/organizer-dashboard")}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}