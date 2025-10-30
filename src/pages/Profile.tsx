import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { EventCard, type Event } from "@/components/EventCard";
import { useToast } from "@/hooks/use-toast";

// Sample events (same as Home.tsx - in production, this would come from backend)
const sampleEvents: Event[] = [
  {
    id: "1",
    title: "Rooftop Jazz Night at Kilimanjaro",
    description: "Experience an unforgettable evening of live jazz under the Nairobi stars.",
    category: "Live Music",
    date: new Date(2025, 9, 20),
    time: "19:30",
    location: "Kilimanjaro Jamia, Westlands",
    neighborhood: "Westlands",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    organizer: { name: "Nairobi Jazz Collective" }
  },
  {
    id: "2",
    title: "Sunrise Yoga & Meditation",
    description: "Start your day with peace and mindfulness in the heart of nature.",
    category: "Wellness & Fitness",
    date: new Date(2025, 9, 21),
    time: "07:00",
    location: "Karura Forest, Muthaiga",
    neighborhood: "Muthaiga",
    imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    organizer: { name: "Nairobi Wellness Hub" }
  },
  {
    id: "3",
    title: "Tech Innovators Meetup",
    description: "Connect with Nairobi's thriving tech community.",
    category: "Tech & Innovation",
    date: new Date(2025, 9, 22),
    time: "14:00",
    location: "iHub, Ngong Road",
    neighborhood: "Kilimani",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
    organizer: { name: "Nairobi Tech Scene" }
  },
  {
    id: "4",
    title: "International DJ Night: Afro House",
    description: "Dance till dawn with top international DJs.",
    category: "International DJs",
    date: new Date(2025, 9, 23),
    time: "22:00",
    location: "Alchemist Bar, Westlands",
    neighborhood: "Westlands",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800",
    organizer: { name: "Nairobi Nightlife" }
  },
  {
    id: "5",
    title: "Contemporary Art Exhibition",
    description: "Showcasing the finest contemporary art from East African artists.",
    category: "Art Exhibitions",
    date: new Date(2025, 9, 24),
    time: "11:00",
    location: "Circle Art Gallery, Karen",
    neighborhood: "Karen",
    imageUrl: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800",
    organizer: { name: "Circle Art Gallery" }
  },
  {
    id: "6",
    title: "Street Food Festival",
    description: "Taste Nairobi's best street food all in one place.",
    category: "Food & Dining",
    date: new Date(2025, 9, 25),
    time: "16:00",
    location: "Two Rivers Mall, Ruaka",
    neighborhood: "Ruaka",
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800",
    organizer: { name: "Nairobi Foodies" }
  },
  {
    id: "7",
    title: "Organic Farmers Market",
    description: "Fresh organic produce and artisan goods from Karen's best farmers.",
    category: "Community Events",
    date: new Date(2025, 9, 26),
    time: "09:00",
    location: "Karen Country Club",
    neighborhood: "Karen",
    imageUrl: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800",
    organizer: { name: "Karen Farmers Collective" }
  },
  {
    id: "8",
    title: "Morning Run & Coffee",
    description: "Join our running club for a refreshing 5K through Karura Forest.",
    category: "Wellness & Fitness",
    date: new Date(2025, 9, 27),
    time: "06:30",
    location: "Karura Forest Main Gate",
    neighborhood: "Muthaiga",
    imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800",
    organizer: { name: "Nairobi Runners Club" }
  },
  {
    id: "9",
    title: "Jockey Polo Tournament",
    description: "Experience the elegance and excitement of polo at Karen's premier equestrian venue.",
    category: "Sports & Adventure",
    date: new Date(2025, 9, 28),
    time: "15:00",
    location: "Karen Polo Club",
    neighborhood: "Karen",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    organizer: { name: "Karen Polo Club" }
  }
];

const USER_PROFILE_KEY = 'discover-nairobi-user';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export default function Profile() {
  const { toast } = useToast();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(USER_PROFILE_KEY);
    return saved ? JSON.parse(saved) : {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+254 700 000000",
      avatarUrl: ""
    };
  });

  const [editedProfile, setEditedProfile] = useState(profile);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfile(editedProfile);
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const savedEvents = sampleEvents.filter(event => favorites.includes(event.id));

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <div className="flex items-center gap-6 mb-8">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                {getInitials(profile.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-display text-3xl font-bold mb-1">{profile.name}</h1>
              <p className="text-muted-foreground">{profile.email}</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" data-testid="tab-profile">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="security" data-testid="tab-security">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="saved" data-testid="tab-saved">
                <Heart className="h-4 w-4 mr-2" />
                Saved Events ({favorites.length})
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your personal information and contact details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={editedProfile.name}
                        onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                        data-testid="input-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                        data-testid="input-email"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={editedProfile.phone}
                        onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                        data-testid="input-phone"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Avatar URL (optional)</Label>
                      <Input
                        id="avatar"
                        placeholder="https://example.com/avatar.jpg"
                        value={editedProfile.avatarUrl || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, avatarUrl: e.target.value })}
                        data-testid="input-avatar"
                      />
                    </div>
                    <Button type="submit" data-testid="button-save-profile">
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Change Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        data-testid="input-current-password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        data-testid="input-new-password"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        data-testid="input-confirm-password"
                      />
                    </div>
                    <Button type="submit" data-testid="button-change-password">
                      Change Password
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Saved Events Tab */}
            <TabsContent value="saved">
              {savedEvents.length === 0 ? (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center">
                      <Heart className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="font-display text-xl font-bold mb-2">No Saved Events</h3>
                      <p className="text-muted-foreground mb-4">
                        Start saving events to see them here!
                      </p>
                      <Button asChild>
                        <a href="/events">Browse Events</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedEvents.map(event => (
                    <EventCard
                      key={event.id}
                      event={event}
                      isFavorite={isFavorite(event.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  );
}
