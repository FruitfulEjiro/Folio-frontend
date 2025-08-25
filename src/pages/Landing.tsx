import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import { ArrowRight, Zap, Palette, Users, Star } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg"

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
            <Zap className="w-3 h-3 mr-1" />
            AI-Powered Portfolio Generation
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Create Stunning Portfolios
            <br />
            <span className="bg-gradient-primary bg-clip-text text-transparent">In Minutes</span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Choose from professional templates, customize with ease, and showcase your work like never before.
            No coding required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <Button variant="hero" size="xl" className="group">
                Start Creating Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="xl">
                <Palette className="w-5 h-5" />
                Explore Templates
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Hero Image */}
        {/* <div className="relative max-w-5xl mx-auto px-4">
          <img 
            src={heroImage} 
            alt="Portfolio Generation Platform" 
            className="w-full rounded-2xl shadow-card border border-border"
          />
        </div> */}
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to <span className="bg-gradient-primary bg-clip-text text-transparent">Stand Out</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional portfolio creation has never been this simple and powerful.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Beautiful Templates</h3>
                <p className="text-muted-foreground">
                  Choose from dozens of professionally designed templates crafted by top designers.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Generate your portfolio in minutes with our AI-powered customization engine.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border hover:shadow-glow transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Share & Impress</h3>
                <p className="text-muted-foreground">
                  Share your portfolio with custom domains and analytics to track your success.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 border-t border-border">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Build Your <span className="bg-gradient-primary bg-clip-text text-transparent">Dream Portfolio?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of creators who've already built amazing portfolios with our platform.
          </p>
          
          <div className="flex items-center justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-muted-foreground">4.9/5 from 2,000+ users</span>
            </div>
          </div>

          <Link to="/signup">
            <Button variant="hero" size="xl" className="group">
              Start Building Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Landing;