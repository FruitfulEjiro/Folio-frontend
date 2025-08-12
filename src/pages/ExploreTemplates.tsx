import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import { Search, Eye, Heart, Star, Filter } from "lucide-react";

const templates = [
  {
    id: 1,
    name: "Modern Developer",
    category: "Developer",
    description: "Clean and minimalist portfolio perfect for developers and engineers",
    image: "/placeholder.svg",
    rating: 4.9,
    downloads: 1240,
    isPremium: false,
    tags: ["Minimal", "Developer", "Clean"]
  },
  {
    id: 2,
    name: "Creative Studio",
    category: "Creative",
    description: "Bold and artistic design for creative professionals and artists",
    image: "/placeholder.svg",
    rating: 4.8,
    downloads: 980,
    isPremium: true,
    tags: ["Creative", "Bold", "Artistic"]
  },
  {
    id: 3,
    name: "Business Pro",
    category: "Business",
    description: "Professional corporate template for business leaders and consultants",
    image: "/placeholder.svg",
    rating: 4.7,
    downloads: 756,
    isPremium: false,
    tags: ["Professional", "Corporate", "Business"]
  },
  {
    id: 4,
    name: "Designer Showcase",
    category: "Design",
    description: "Visual-heavy template perfect for showcasing design work",
    image: "/placeholder.svg",
    rating: 5.0,
    downloads: 1450,
    isPremium: true,
    tags: ["Visual", "Designer", "Showcase"]
  },
  {
    id: 5,
    name: "Photographer",
    category: "Creative",
    description: "Image-focused template designed for photographers",
    image: "/placeholder.svg",
    rating: 4.6,
    downloads: 623,
    isPremium: false,
    tags: ["Photography", "Visual", "Gallery"]
  },
  {
    id: 6,
    name: "Tech Innovator",
    category: "Developer",
    description: "Futuristic design for tech enthusiasts and innovators",
    image: "/placeholder.svg",
    rating: 4.8,
    downloads: 892,
    isPremium: true,
    tags: ["Tech", "Futuristic", "Innovation"]
  }
];

const ExploreTemplates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || template.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <div className="container mx-auto py-12 px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Explore <span className="bg-gradient-primary bg-clip-text text-transparent">Templates</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover professionally designed portfolio templates crafted by top designers
          </p>
        </div>

        {/* Filters */}
        <Card className="mb-8 bg-gradient-card border-border shadow-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-background/50 border-border focus:border-primary"
                />
              </div>
              
              <div className="flex gap-3">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] bg-background/50 border-border">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="creative">Creative</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[150px] bg-background/50 border-border">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="downloads">Most Downloaded</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="group bg-gradient-card border-border hover:shadow-glow transition-all duration-300 cursor-pointer">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={template.image} 
                    alt={template.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    {template.isPremium && (
                      <Badge className="bg-gradient-primary text-white">Premium</Badge>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button size="sm" variant="gradient" className="flex-1">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <Button variant="ghost" size="icon" className="w-8 h-8">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                
                <CardDescription className="mb-4 text-muted-foreground">
                  {template.description}
                </CardDescription>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {template.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-primary text-primary" />
                    <span>{template.rating}</span>
                  </div>
                  <span>{template.downloads.toLocaleString()} downloads</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Templates
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExploreTemplates;