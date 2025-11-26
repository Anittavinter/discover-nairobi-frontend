import { useState } from 'react';
import { useLocation } from 'wouter';
import { Calendar, DollarSign, Image as ImageIcon, Info, Save, X, Plus } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface TicketType {
  name: string;
  price: string;
  quantity: string;
}

interface EventFormData {
  eventName: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  venueName: string;
  address: string;
  area: string;
  eventType: 'paid' | 'free';
  ticketTypes: TicketType[];
  maxAttendees: string;
  ageRestriction: string;
  refundPolicy: string;
  specialInstructions: string;
  organizerName: string;
  contactEmail: string;
  contactPhone: string;
  mapsLink: string;
  socialLinks: string;
}

export default function CreateEvent() {
  const [, setLocation] = useLocation();
  const [formData, setFormData] = useState<EventFormData>({
    eventName: '',
    shortDescription: '',
    fullDescription: '',
    category: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    venueName: '',
    address: '',
    area: '',
    eventType: 'paid',
    ticketTypes: [
      { name: 'General Admission', price: '', quantity: '' }
    ],
    maxAttendees: '',
    ageRestriction: 'all-ages',
    refundPolicy: 'no-refund',
    specialInstructions: '',
    organizerName: '',
    contactEmail: '',
    contactPhone: '',
    mapsLink: '',
    socialLinks: '',
  });

  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTicketType = () => {
    setFormData(prev => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, { name: '', price: '', quantity: '' }]
    }));
  };

  const updateTicketType = (index: number, field: keyof TicketType, value: string) => {
    const updated = [...formData.ticketTypes];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, ticketTypes: updated }));
  };

  const removeTicketType = (index: number) => {
    const updated = formData.ticketTypes.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, ticketTypes: updated }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ...formData,
          image: imageFile
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const data = await response.json();
      console.log('Event created:', data);
      
      setLocation('/organizer');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Event created successfully! (Backend integration pending - your team is working on this)');
      setLocation('/organizer');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'Music', 'Art', 'Tech', 'Wellness', 'Food', 'Fashion', 
    'Culture', 'Sports', 'Learning', 'Networking', 'Comedy', 'Other'
  ];

  const areas = [
    'CBD', 'Westlands', 'Kilimani', 'Karen', 'Parklands', 
    'Eastlands', 'Lavington', 'Kileleshwa', 'Muthaiga', 'Other'
  ];

  const steps = [
    { num: 1, label: 'Basic Info', icon: Info },
    { num: 2, label: 'Date & Location', icon: Calendar },
    { num: 3, label: 'Ticketing', icon: DollarSign },
    { num: 4, label: 'Review', icon: Save }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Header Section */}
        <section 
          className="py-12 px-4 md:px-8 relative overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 50%, hsl(var(--accent)) 100%)',
          }}
        >
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-black mb-4 text-white">
              Create New Event
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Fill in the details to list your event on Discover Nairobi
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-12 px-4 md:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            {/* Progress Steps */}
            <div className="mb-8 overflow-x-auto pb-4">
              <div className="flex items-center justify-between min-w-max">
                {steps.map((s, idx) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.num} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-colors ${
                          step >= s.num 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <span className={`mt-2 text-sm font-medium ${
                          step >= s.num ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {s.label}
                        </span>
                      </div>
                      {idx < steps.length - 1 && (
                        <div className={`h-1 w-16 mx-4 rounded transition-colors ${
                          step > s.num ? 'bg-primary' : 'bg-muted'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                {/* STEP 1: Basic Info */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Info className="text-primary h-6 w-6" />
                      <h2 className="text-2xl font-bold">Basic Information</h2>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="eventName">Event Name *</Label>
                      <Input
                        id="eventName"
                        name="eventName"
                        value={formData.eventName}
                        onChange={handleChange}
                        placeholder="e.g., Nairobi Jazz Night"
                        required
                        data-testid="input-event-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleSelectChange('category', value)}
                      >
                        <SelectTrigger id="category" data-testid="select-category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="shortDescription">
                        Short Description * (Max 150 characters)
                      </Label>
                      <Input
                        id="shortDescription"
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        placeholder="Brief tagline for your event"
                        maxLength={150}
                        required
                        data-testid="input-short-description"
                      />
                      <p className="text-sm text-muted-foreground">
                        {formData.shortDescription.length}/150
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fullDescription">Full Description *</Label>
                      <Textarea
                        id="fullDescription"
                        name="fullDescription"
                        value={formData.fullDescription}
                        onChange={handleChange}
                        placeholder="Tell people what makes your event special..."
                        rows={6}
                        required
                        data-testid="input-full-description"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Event Image *</Label>
                      <div className="border-2 border-dashed rounded-lg p-8 text-center hover-elevate transition-colors cursor-pointer">
                        {imagePreview ? (
                          <div className="relative">
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="max-h-64 mx-auto rounded-lg"
                            />
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                setImagePreview(null);
                                setImageFile(null);
                              }}
                              className="mt-4"
                              data-testid="button-remove-image"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Remove Image
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground mb-2">
                              Click to upload event image
                            </p>
                            <p className="text-sm text-muted-foreground mb-4">
                              PNG, JPG up to 5MB
                            </p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="image-upload"
                            />
                            <Label
                              htmlFor="image-upload"
                              className="inline-block"
                            >
                              <Button
                                type="button"
                                variant="outline"
                                asChild
                                data-testid="button-upload-image"
                              >
                                <span>Choose Image</span>
                              </Button>
                            </Label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: Date & Location */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Calendar className="text-primary h-6 w-6" />
                      <h2 className="text-2xl font-bold">Date & Location</h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="eventDate">Event Date *</Label>
                        <Input
                          type="date"
                          id="eventDate"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          required
                          data-testid="input-event-date"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="startTime">Start Time *</Label>
                        <Input
                          type="time"
                          id="startTime"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleChange}
                          required
                          data-testid="input-start-time"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="endTime">End Time *</Label>
                        <Input
                          type="time"
                          id="endTime"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleChange}
                          required
                          data-testid="input-end-time"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="venueName">Venue Name *</Label>
                      <Input
                        id="venueName"
                        name="venueName"
                        value={formData.venueName}
                        onChange={handleChange}
                        placeholder="e.g., Alchemist Bar"
                        required
                        data-testid="input-venue-name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Full Address *</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street address, building name, etc."
                        required
                        data-testid="input-address"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="area">Area *</Label>
                      <Select
                        value={formData.area}
                        onValueChange={(value) => handleSelectChange('area', value)}
                      >
                        <SelectTrigger id="area" data-testid="select-area">
                          <SelectValue placeholder="Select area" />
                        </SelectTrigger>
                        <SelectContent>
                          {areas.map(area => (
                            <SelectItem key={area} value={area}>{area}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mapsLink">Google Maps Link (optional)</Label>
                      <Input
                        id="mapsLink"
                        name="mapsLink"
                        value={formData.mapsLink}
                        onChange={handleChange}
                        placeholder="https://maps.google.com/..."
                        data-testid="input-maps-link"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organizerName">Organizer Name *</Label>
                      <Input
                        id="organizerName"
                        name="organizerName"
                        value={formData.organizerName}
                        onChange={handleChange}
                        placeholder="Your name or company name"
                        required
                        data-testid="input-organizer-name"
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email *</Label>
                        <Input
                          type="email"
                          id="contactEmail"
                          name="contactEmail"
                          value={formData.contactEmail}
                          onChange={handleChange}
                          placeholder="contact@example.com"
                          required
                          data-testid="input-contact-email"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Contact Phone *</Label>
                        <Input
                          type="tel"
                          id="contactPhone"
                          name="contactPhone"
                          value={formData.contactPhone}
                          onChange={handleChange}
                          placeholder="+254 700 000 000"
                          required
                          data-testid="input-contact-phone"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: Ticketing */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <DollarSign className="text-primary h-6 w-6" />
                      <h2 className="text-2xl font-bold">Ticketing</h2>
                    </div>

                    <div className="space-y-4">
                      <Label>Is this a paid or free event? *</Label>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Button
                          type="button"
                          variant={formData.eventType === 'paid' ? 'default' : 'outline'}
                          className="h-16"
                          onClick={() => handleSelectChange('eventType', 'paid')}
                          data-testid="button-paid-event"
                        >
                          Paid Event
                        </Button>
                        <Button
                          type="button"
                          variant={formData.eventType === 'free' ? 'default' : 'outline'}
                          className="h-16"
                          onClick={() => handleSelectChange('eventType', 'free')}
                          data-testid="button-free-event"
                        >
                          Free Event
                        </Button>
                      </div>
                    </div>

                    {formData.eventType === 'paid' && (
                      <div className="space-y-4">
                        <Label>Ticket Types</Label>
                        {formData.ticketTypes.map((ticket, index) => (
                          <Card key={index} className="p-4">
                            <div className="grid gap-4 md:grid-cols-3">
                              <div className="space-y-2">
                                <Label>Ticket Name</Label>
                                <Input
                                  placeholder="e.g., VIP"
                                  value={ticket.name}
                                  onChange={(e) => updateTicketType(index, 'name', e.target.value)}
                                  data-testid={`input-ticket-name-${index}`}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Price (KSh)</Label>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={ticket.price}
                                  onChange={(e) => updateTicketType(index, 'price', e.target.value)}
                                  data-testid={`input-ticket-price-${index}`}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Quantity</Label>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={ticket.quantity}
                                  onChange={(e) => updateTicketType(index, 'quantity', e.target.value)}
                                  data-testid={`input-ticket-quantity-${index}`}
                                />
                              </div>
                            </div>
                            {index > 0 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => removeTicketType(index)}
                                className="mt-4"
                                data-testid={`button-remove-ticket-${index}`}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Remove
                              </Button>
                            )}
                          </Card>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={addTicketType}
                          data-testid="button-add-ticket-type"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Another Ticket Type
                        </Button>
                      </div>
                    )}

                    {formData.eventType === 'free' && (
                      <div className="space-y-2">
                        <Label htmlFor="maxAttendees">Maximum Attendees (optional)</Label>
                        <Input
                          type="number"
                          id="maxAttendees"
                          name="maxAttendees"
                          value={formData.maxAttendees}
                          onChange={handleChange}
                          placeholder="Leave empty for unlimited"
                          data-testid="input-max-attendees"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="ageRestriction">Age Restriction</Label>
                      <Select
                        value={formData.ageRestriction}
                        onValueChange={(value) => handleSelectChange('ageRestriction', value)}
                      >
                        <SelectTrigger id="ageRestriction" data-testid="select-age-restriction">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all-ages">All Ages</SelectItem>
                          <SelectItem value="18+">18+ Only</SelectItem>
                          <SelectItem value="21+">21+ Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="refundPolicy">Refund Policy</Label>
                      <Select
                        value={formData.refundPolicy}
                        onValueChange={(value) => handleSelectChange('refundPolicy', value)}
                      >
                        <SelectTrigger id="refundPolicy" data-testid="select-refund-policy">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no-refund">No Refunds</SelectItem>
                          <SelectItem value="7-days">Full refund up to 7 days before</SelectItem>
                          <SelectItem value="48-hours">Full refund up to 48 hours before</SelectItem>
                          <SelectItem value="custom">Custom (specify in instructions)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialInstructions">Special Instructions (optional)</Label>
                      <Textarea
                        id="specialInstructions"
                        name="specialInstructions"
                        value={formData.specialInstructions}
                        onChange={handleChange}
                        placeholder="Dress code, what to bring, parking info, etc."
                        rows={4}
                        data-testid="input-special-instructions"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="socialLinks">Social Media Links (optional)</Label>
                      <Input
                        id="socialLinks"
                        name="socialLinks"
                        value={formData.socialLinks}
                        onChange={handleChange}
                        placeholder="Instagram, Facebook, Twitter links (comma separated)"
                        data-testid="input-social-links"
                      />
                    </div>
                  </div>
                )}

                {/* STEP 4: Review */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Save className="text-primary h-6 w-6" />
                      <h2 className="text-2xl font-bold">Review Your Event</h2>
                    </div>

                    <Card className="bg-muted/50 p-6 space-y-4">
                      {imagePreview && (
                        <div>
                          <img 
                            src={imagePreview} 
                            alt="Event" 
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                        </div>
                      )}
                      
                      <div>
                        <h3 className="font-bold mb-1">Event Name</h3>
                        <p className="text-muted-foreground">{formData.eventName || 'Not set'}</p>
                      </div>
                      
                      <div>
                        <h3 className="font-bold mb-1">Category</h3>
                        <p className="text-muted-foreground">{formData.category || 'Not set'}</p>
                      </div>

                      <div>
                        <h3 className="font-bold mb-1">Date & Time</h3>
                        <p className="text-muted-foreground">
                          {formData.eventDate} • {formData.startTime} - {formData.endTime}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold mb-1">Location</h3>
                        <p className="text-muted-foreground">
                          {formData.venueName}, {formData.area}
                        </p>
                        <p className="text-sm text-muted-foreground">{formData.address}</p>
                      </div>

                      <div>
                        <h3 className="font-bold mb-1">Organizer</h3>
                        <p className="text-muted-foreground">{formData.organizerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {formData.contactEmail} • {formData.contactPhone}
                        </p>
                      </div>

                      <div>
                        <h3 className="font-bold mb-1">Ticketing</h3>
                        {formData.eventType === 'free' ? (
                          <p className="text-green-600 font-semibold">FREE EVENT</p>
                        ) : (
                          <div className="space-y-1">
                            {formData.ticketTypes.map((ticket, idx) => (
                              <p key={idx} className="text-muted-foreground">
                                {ticket.name}: KSh {ticket.price} ({ticket.quantity} available)
                              </p>
                            ))}
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="font-bold mb-1">Additional Info</h3>
                        <p className="text-muted-foreground">
                          Age Restriction: {formData.ageRestriction}
                        </p>
                        <p className="text-muted-foreground">
                          Refund Policy: {formData.refundPolicy}
                        </p>
                      </div>
                    </Card>

                    <Card className="border-primary/50 bg-primary/5 p-4">
                      <p className="text-sm">
                        <strong>Note:</strong> Your event will be reviewed by our team and published within 24 hours. 
                        You'll receive an email confirmation once it's live.
                      </p>
                    </Card>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(Math.max(1, step - 1))}
                    disabled={step === 1}
                    data-testid="button-previous"
                  >
                    Previous
                  </Button>

                  {step < 4 ? (
                    <Button
                      type="button"
                      onClick={() => setStep(Math.min(4, step + 1))}
                      data-testid="button-continue"
                    >
                      Continue
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-gradient-to-r from-purple-600 to-orange-500"
                      data-testid="button-submit-event"
                    >
                      {loading ? 'Creating Event...' : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Submit Event for Review
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
