import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import ExploreTemplates from "./pages/ExploreTemplates";
import GeneratePortfolio from "./pages/GeneratePortfolio";
import PortfolioDisplay from "./components/PortfolioDisplay";
import TemplateA from "./portfolio/templatea";
import TemplateB from "./portfolio/templateb";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<ExploreTemplates />} />
          <Route path="/generate" element={<GeneratePortfolio />} />
          {/* Portfolio Display Routes */}
          <Route path="/me/:portfolioId" element={<PortfolioDisplay />} />
          <Route path="/p/:portfolioId" element={<PortfolioDisplay />} />
          {/* Legacy Template Routes - keeping for backward compatibility */}
          <Route path="/template" element={<TemplateA />} />
          <Route path="/template2" element={<TemplateB />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;