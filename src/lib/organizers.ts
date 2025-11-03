export interface OrganizerEvent {
    id: string;
    organizerId: string;
    organizerName: string;
    title: string;
    description: string;
    category: string;
    date: Date;
    time: string;
    location: string;
    neighborhood: string;
    imageUrl: string;
    price: number;
    capacity: number;
    tags: string[];
    status: "draft" | "published" | "cancelled";
    createdAt: Date;
  }
  
  export interface Organizer {
    id: string;
    name: string;
    email: string;
    phone: string;
    bio: string;
    createdAt: Date;
  }
  
  const ORGANIZER_EVENTS_KEY = "discover_nairobi_organizer_events";
  const CURRENT_ORGANIZER_KEY = "discover_nairobi_current_organizer";
  
  // Organizer Management
  export function getCurrentOrganizer(): Organizer | null {
    try {
      const stored = localStorage.getItem(CURRENT_ORGANIZER_KEY);
      if (!stored) return null;
      const organizer = JSON.parse(stored);
      return {
        ...organizer,
        createdAt: new Date(organizer.createdAt),
      };
    } catch (error) {
      console.error("Error loading organizer:", error);
      return null;
    }
  }
  
  export function setCurrentOrganizer(organizer: Organizer): void {
    try {
      localStorage.setItem(CURRENT_ORGANIZER_KEY, JSON.stringify(organizer));
    } catch (error) {
      console.error("Error saving organizer:", error);
    }
  }
  
  // For demo: Create a default organizer if none exists
  export function ensureDefaultOrganizer(): Organizer {
    let organizer = getCurrentOrganizer();
    if (!organizer) {
      organizer = {
        id: `ORG${Date.now()}`,
        name: "Nairobi Events Co.",
        email: "organizer@discovernairobi.ke",
        phone: "+254 700 000 000",
        bio: "Premier event organizer in Nairobi, bringing the city's best experiences to life.",
        createdAt: new Date(),
      };
      setCurrentOrganizer(organizer);
    }
    return organizer;
  }
  
  // Event Management
  export function getOrganizerEvents(): OrganizerEvent[] {
    try {
      const stored = localStorage.getItem(ORGANIZER_EVENTS_KEY);
      if (!stored) return [];
      
      const events = JSON.parse(stored);
      return events.map((e: any) => ({
        ...e,
        date: new Date(e.date),
        createdAt: new Date(e.createdAt),
      }));
    } catch (error) {
      console.error("Error loading organizer events:", error);
      return [];
    }
  }
  
  export function saveOrganizerEvent(event: OrganizerEvent): void {
    try {
      const events = getOrganizerEvents();
      events.push(event);
      localStorage.setItem(ORGANIZER_EVENTS_KEY, JSON.stringify(events));
    } catch (error) {
      console.error("Error saving event:", error);
    }
  }
  
  export function updateOrganizerEvent(eventId: string, updates: Partial<OrganizerEvent>): void {
    try {
      const events = getOrganizerEvents();
      const index = events.findIndex(e => e.id === eventId);
      if (index !== -1) {
        events[index] = { ...events[index], ...updates };
        localStorage.setItem(ORGANIZER_EVENTS_KEY, JSON.stringify(events));
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  }
  
  export function deleteOrganizerEvent(eventId: string): void {
    try {
      const events = getOrganizerEvents();
      const filtered = events.filter(e => e.id !== eventId);
      localStorage.setItem(ORGANIZER_EVENTS_KEY, JSON.stringify(filtered));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  }
  
  export function getEventById(eventId: string): OrganizerEvent | null {
    const events = getOrganizerEvents();
    return events.find(e => e.id === eventId) || null;
  }
  
  // Analytics
  export function getEventAnalytics(eventId: string) {
    // Get bookings from bookings.ts
    const bookingsJson = localStorage.getItem("discover_nairobi_bookings");
    if (!bookingsJson) {
      return {
        totalTicketsSold: 0,
        totalRevenue: 0,
        bookings: [],
      };
    }
  
    const allBookings = JSON.parse(bookingsJson);
    const eventBookings = allBookings.filter((b: any) => b.eventId === eventId);
  
    const totalTicketsSold = eventBookings.reduce((sum: number, b: any) => sum + b.ticketQuantity, 0);
    const totalRevenue = eventBookings.reduce((sum: number, b: any) => sum + b.totalAmount, 0);
  
    return {
      totalTicketsSold,
      totalRevenue,
      bookings: eventBookings.length,
    };
  }