export interface Booking {
    id: string;
    eventId: string;
    eventTitle: string;
    eventDate: Date;
    eventTime: string;
    location: string;
    neighborhood: string;
    imageUrl: string;
    ticketQuantity: number;
    totalAmount: number;
    confirmationCode: string;
    paymentMethod: string;
    bookingDate: Date;
    status: "confirmed" | "cancelled";
  }
  
  const BOOKINGS_KEY = "discover_nairobi_bookings";
  
  export function getBookings(): Booking[] {
    try {
      const stored = localStorage.getItem(BOOKINGS_KEY);
      if (!stored) return [];
      
      const bookings = JSON.parse(stored);
      return bookings.map((b: any) => ({
        ...b,
        eventDate: new Date(b.eventDate),
        bookingDate: new Date(b.bookingDate),
      }));
    } catch (error) {
      console.error("Error loading bookings:", error);
      return [];
    }
  }
  
  export function saveBooking(booking: Booking): void {
    try {
      const bookings = getBookings();
      bookings.push(booking);
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  }
  
  export function getBookingById(id: string): Booking | null {
    const bookings = getBookings();
    return bookings.find((b) => b.id === id) || null;
  }
  
  export function cancelBooking(id: string): void {
    try {
      const bookings = getBookings();
      const updated = bookings.map((b) =>
        b.id === id ? { ...b, status: "cancelled" as const } : b
      );
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  }
  
  export function generateConfirmationCode(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "DN-";
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }