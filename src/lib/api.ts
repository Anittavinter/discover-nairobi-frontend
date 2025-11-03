const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Events
export async function getEvents() {
  const response = await fetch(`${API_URL}/api/events`);
  if (!response.ok) throw new Error('Failed to fetch events');
  return response.json();
}

export async function getEvent(id: number) {
  const response = await fetch(`${API_URL}/api/events/${id}`);
  if (!response.ok) throw new Error('Failed to fetch event');
  return response.json();
}

// Bookings
export async function createBooking(bookingData: any) {
  const response = await fetch(`${API_URL}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData)
  });
  if (!response.ok) throw new Error('Failed to create booking');
  return response.json();
}

export async function getUserBookings(userId: string) {
  const response = await fetch(`${API_URL}/api/bookings/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch bookings');
  return response.json();
}

// Organizer Events
export async function createEvent(eventData: any) {
  const response = await fetch(`${API_URL}/api/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(eventData)
  });
  if (!response.ok) throw new Error('Failed to create event');
  return response.json();
}

export async function getOrganizerEvents(organizerId: string) {
  const response = await fetch(`${API_URL}/api/organizer/events/${organizerId}`);
  if (!response.ok) throw new Error('Failed to fetch organizer events');
  return response.json();
}

// M-PESA Payment
export async function initiateMpesaPayment(paymentData: any) {
  const response = await fetch(`${API_URL}/api/payments/mpesa`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentData)
  });
  if (!response.ok) throw new Error('Failed to initiate payment');
  return response.json();
}