import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import { Camera, Mail, User, Globe, Calendar, Edit3 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();


  // Helper function to get initials from user name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to split full name into first and last name
  const getFirstName = (name: string) => {
    return name.split(' ')[0] || '';
  };

  const getLastName = (name: string) => {
    const parts = name.split(' ');
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="container mx-auto py-12 px-4 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Overview */}
          <Card className="lg:col-span-1 bg-gradient-card border-border shadow-card">
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative group">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="bg-gradient-primary text-white text-lg">
                      {user ? getInitials(user.name) : 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-background hover:bg-accent"
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                
                <h2 className="text-xl font-semibold mb-1">{user?.name || 'User Name'}</h2>
                <p className="text-muted-foreground mb-3">Portfolio Creator</p>
                
                <Badge variant="outline" className="mb-4">
                  Pro Member
                </Badge>
                
                <div className="w-full space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {user?.email || 'user@example.com'}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    {user?.name ? `${user.name.toLowerCase().replace(/\s+/g, '')}.portfolio` : 'portfolio.site'}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </div>
                </div>
                
              </div>
            </CardContent>
          </Card>
          
          {/* Profile Settings */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input 
                      id="firstName" 
                      defaultValue={user ? getFirstName(user.name) : ''}
                      placeholder="Enter your first name"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      defaultValue={user ? getLastName(user.name) : ''}
                      placeholder="Enter your last name"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    defaultValue={user?.email || ''}
                    placeholder="Enter your email address"
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Professional Title</Label>
                  <Input 
                    id="title" 
                    defaultValue=""
                    placeholder="e.g., Frontend Developer, Designer, etc."
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell us about yourself, your skills, and your passion..."
                    className="bg-background/50 border-border focus:border-primary min-h-[100px]"
                    defaultValue=""
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website URL</Label>
                  <Input 
                    id="website" 
                    placeholder="https://yourwebsite.com"
                    defaultValue=""
                    className="bg-background/50 border-border focus:border-primary"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle>Portfolio Settings</CardTitle>
                <CardDescription>
                  Manage your portfolio preferences and visibility
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Public Profile</p>
                    <p className="text-sm text-muted-foreground">Make your profile visible to others</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enabled
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates about your portfolios</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enabled
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Analytics Tracking</p>
                    <p className="text-sm text-muted-foreground">Track portfolio performance</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enabled
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline">
                Cancel
              </Button>
              <Button variant="gradient">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;