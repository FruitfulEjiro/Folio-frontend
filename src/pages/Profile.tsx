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
import { Camera, Mail, User, Globe, Calendar, Edit3, UserPlus, LogIn, Star, Shield, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading } = useAuth();

  // Debug authentication state
  useEffect(() => {
    console.log('Profile - Auth State:', { user, isAuthenticated, loading });
  }, [user, isAuthenticated, loading]);

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }


  // Helper function to get initials from user name
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Helper function to split full name into first and last name
  const getFirstName = (name?: string) => {
    if (!name) return '';
    return name.split(' ')[0] || '';
  };

  const getLastName = (name?: string) => {
    if (!name) return '';
    const parts = name.split(' ');
    return parts.length > 1 ? parts.slice(1).join(' ') : '';
  };

  // Render content based on authentication status
  if (!isAuthenticated) {
    // Non-authenticated user view
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        
        <div className="container mx-auto py-12 px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Create Your Profile</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Join our community and start building amazing portfolios today!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Call to Action Card */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl mb-2">Get Started Today</CardTitle>
                <CardDescription className="text-base">
                  Create your account and unlock all the amazing features we have to offer.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/signup">
                  <Button variant="gradient" className="w-full" size="lg">
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create Account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" className="w-full" size="lg">
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground text-center">
                  Already have an account? Sign in to access your profile.
                </p>
              </CardContent>
            </Card>

            {/* Features Card */}
            <Card className="bg-gradient-card border-border shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-primary" />
                  What You'll Get
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Edit3 className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Personalized Profile</h4>
                    <p className="text-sm text-muted-foreground">
                      Customize your profile with your personal information and professional details.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Portfolio Showcase</h4>
                    <p className="text-sm text-muted-foreground">
                      Create and display your professional portfolios to the world.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Secure & Private</h4>
                    <p className="text-sm text-muted-foreground">
                      Your data is protected with enterprise-level security measures.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fast & Easy</h4>
                    <p className="text-sm text-muted-foreground">
                      Get started in minutes with our intuitive interface and tools.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional Info Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Why Choose Our Platform?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Easy Setup</h3>
                <p className="text-sm text-muted-foreground">
                  Create your profile in just a few clicks and start showcasing your work immediately.
                </p>
              </div>
              
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Global Reach</h3>
                <p className="text-sm text-muted-foreground">
                  Share your portfolio with clients and employers worldwide with our platform.
                </p>
              </div>
              
              <div className="p-6">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Professional Quality</h3>
                <p className="text-sm text-muted-foreground">
                  Beautiful, professional templates that make your work stand out from the crowd.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated user view
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
                      {getInitials(user?.name)}
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
                      defaultValue={getFirstName(user?.name)}
                      placeholder="Enter your first name"
                      className="bg-background/50 border-border focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input 
                      id="lastName" 
                      defaultValue={getLastName(user?.name)}
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