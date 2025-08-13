import axios from "axios";
import { PortfolioData, TemplateId } from "@/types/portfolio";

// Configure axios base URL - update this to match your backend
const API_BASE_URL = "https://folio-hszb.onrender.com";

const api = axios.create({
   baseURL: API_BASE_URL,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

// Add authorization token to requests if available
api.interceptors.request.use((config) => {
   const token = localStorage.getItem("authToken");
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

export const portfolioService = {
   // Fetch portfolio by unique ID
   async getPortfolio(portfolioId: string): Promise<PortfolioData> {
      try {
         const response = await api.get(`/portfolio/get/${portfolioId}`, {
            withCredentials: true,
         });
         return response.data.data.portfolio;
      } catch (error) {
         console.error("Error fetching portfolio:", error);
         throw new Error("Failed to fetch portfolio data");
      }
   },

   // Create a new portfolio
   //  async createPortfolio(portfolioData: CreatePortfolioRequest): Promise<{ portfolioId: string; url: string }> {
   //     try {
   //        const response = await api.post("/portfolios", portfolioData);
   //        return {
   //           portfolioId: response.data.id,
   //           url: response.data.url || `/portfolio/${response.data.id}`,
   //        };
   //     } catch (error) {
   //        console.error("Error creating portfolio:", error);
   //        throw new Error("Failed to create portfolio");
   //     }
   //  },

   // Update existing portfolio
   //  async updatePortfolio(portfolioData: UpdatePortfolioRequest): Promise<PortfolioData> {
   //     try {
   //        const response = await api.put(`/portfolios/${portfolioData.id}`, portfolioData);
   //        return response.data;
   //     } catch (error) {
   //        console.error("Error updating portfolio:", error);
   //        throw new Error("Failed to update portfolio");
   //     }
   //  },

   // Delete portfolio
   async deletePortfolio(portfolioId: string): Promise<void> {
      try {
         await api.delete(`/portfolios/${portfolioId}`);
      } catch (error) {
         console.error("Error deleting portfolio:", error);
         throw new Error("Failed to delete portfolio");
      }
   },

   // Get user's portfolios
   async getUserPortfolios(): Promise<PortfolioData[]> {
      try {
         const response = await api.get("/portfolios/user");
         return response.data;
      } catch (error) {
         console.error("Error fetching user portfolios:", error);
         throw new Error("Failed to fetch user portfolios");
      }
   },

   // Generate unique portfolio URL
   generatePortfolioUrl(portfolioId: string, short: boolean = false): string {
      const baseUrl = window.location.origin;
      const path = short ? `/p/${portfolioId}` : `/portfolio/${portfolioId}`;
      return `${baseUrl}${path}`;
   },

   // Validate template ID
   isValidTemplateId(templateId: string): templateId is TemplateId {
      const validTemplates: TemplateId[] = ["minimal", "modern", "creative", "professional"];
      return validTemplates.includes(templateId as TemplateId);
   },
};

export default portfolioService;
