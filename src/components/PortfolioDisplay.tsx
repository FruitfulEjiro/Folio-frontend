import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PortfolioData } from "@/types/portfolio";
import { getTemplateComponent } from "@/templates/registry";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import portfolioService from "@/services/portfolioService";
import axios from "axios";

interface PortfolioDisplayProps {
   isPreview?: boolean;
}

const PortfolioDisplay: React.FC<PortfolioDisplayProps> = ({ isPreview = false }) => {
   const { portfolioId } = useParams<{ portfolioId: string }>();
   const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchPortfolioData = async () => {
         if (!portfolioId) {
            setError("No portfolio ID provided");
            setLoading(false);
            return;
         }

         try {
            setLoading(true);
            const result = await portfolioService.getPortfolio(portfolioId);
            setPortfolioData(result);
            setError(null);
         } catch (err) {
            setError("Failed to load portfolio data");
            console.error("Error fetching portfolio:", err);
         } finally {
            setLoading(false);
         }
      };

      fetchPortfolioData();
   }, [portfolioId]);

   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <Card className="w-full max-w-md">
               <CardContent className="pt-6">
                  <div className="flex items-center justify-center space-x-4">
                     <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900">Loading Portfolio</h3>
                        <p className="text-gray-600">Please wait while we fetch the data...</p>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      );
   }

   if (error || !portfolioData) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
               <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                     <AlertCircle className="h-8 w-8 text-red-600" />
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900">Portfolio Not Found</h3>
                        <p className="text-gray-600">{error || "The requested portfolio could not be found."}</p>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      );
   }

   // Get the template component based on the portfolio's templateId
   const TemplateComponent = getTemplateComponent(portfolioData.templateId as any);

   if (!TemplateComponent) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <Card className="w-full max-w-md">
               <CardContent className="pt-6">
                  <div className="flex items-center space-x-4">
                     <AlertCircle className="h-8 w-8 text-red-600" />
                     <div>
                        <h3 className="text-lg font-semibold text-gray-900">Template Not Found</h3>
                        <p className="text-gray-600">The template for this portfolio is not available.</p>
                     </div>
                  </div>
               </CardContent>
            </Card>
         </div>
      );
   }

   return <TemplateComponent data={portfolioData} isPreview={isPreview} />;
};

export default PortfolioDisplay;
