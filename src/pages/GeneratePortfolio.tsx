import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const GeneratePortfolio = () => {
   const { toast } = useToast();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [usernameStatus, setUsernameStatus] = useState({
      isChecking: false,
      isAvailable: null,
      message: ""
   });
   const [formData, setFormData] = useState({
      fullName: "",
      title: "",
      email: "",
      phone: "",
      bio: "",
      template: "",
      username: "",
      profileImage: null,
      resumePdf: null,
      skillList: [
         { name: "", percent: "" },
         { name: "", percent: "" },
         { name: "", percent: "" },
         { name: "", percent: "" },
         { name: "", percent: "" },
         { name: "", percent: "" },
      ],
      socials: [],
      projects: [
         { title: "", summary: "", link: "", image: null},
         { title: "", summary: "", link: "", image: null},
      ],
   });

   const handleInputChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
   };

   // Debounced username check function
   const checkUsernameAvailability = useCallback(async (username) => {
      if (!username || username.length < 3) {
         setUsernameStatus({
            isChecking: false,
            isAvailable: null,
            message: username.length > 0 && username.length < 3 ? "Username must be at least 3 characters" : ""
         });
         return;
      }

      // Validate username format first
      if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
         setUsernameStatus({
            isChecking: false,
            isAvailable: false,
            message: "Username can only contain letters, numbers, underscores, and hyphens"
         });
         return;
      }

      setUsernameStatus(prev => ({ ...prev, isChecking: true }));

      try {
         const response = await axios.get(`https://folio-hszb.onrender.com/portfolio/check-username/${username}`, {
            withCredentials: true,
         });

         console.log(response.data)
         const isAvailable = response.data.status;
         setUsernameStatus({
            isChecking: false,
            isAvailable: isAvailable,
            message: isAvailable === "success" ? "✓ Username is available" : "✗ Username is already taken"
         });
      } catch (error) {
         console.log('Username check error:', error);
         setUsernameStatus({
            isChecking: false,
            isAvailable: null,
            message: "Error checking username availability"
         });
      }
   }, []);

   // Debounce effect for username checking
   useEffect(() => {
      const timeoutId = setTimeout(() => {
         if (formData.username) {
            checkUsernameAvailability(formData.username);
         }
      }, 500); // 500ms delay

      return () => clearTimeout(timeoutId);
   }, [formData.username, checkUsernameAvailability]);

   const handleFileChange = (field, file) => {
      setFormData((prev) => ({ ...prev, [field]: file }));
   };

   const handleSkillChange = (index, field, value) => {
      const newSkills = [...formData.skillList];
      newSkills[index] = { ...newSkills[index], [field]: value };
      setFormData((prev) => ({ ...prev, skillList: newSkills }));
   };

   const handleProjectChange = (index, field, value) => {
      const newProjects = [...formData.projects];
      newProjects[index] = { ...newProjects[index], [field]: value };
      setFormData((prev) => ({ ...prev, projects: newProjects }));
   };

   const handleProjectFileChange = (index, file) => {
      const newProjects = [...formData.projects];
      newProjects[index] = { ...newProjects[index], image: file };
      setFormData((prev) => ({ ...prev, projects: newProjects }));
   };

   const addProject = () => {
      setFormData((prev) => ({
         ...prev,
         projects: [...prev.projects, { title: "", summary: "", link: "", image: null}],
      }));
   };

   const removeProject = (index) => {
      const newProjects = formData.projects.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, projects: newProjects }));
   };

   // Convert file to base64
   const fileToBase64 = (file) => {
      return new Promise((resolve, reject) => {
         const reader = new FileReader();
         reader.onload = () => resolve(reader.result);
         reader.onerror = () => reject(new Error("Failed to convert file to base64"));
         reader.readAsDataURL(file);
      });
   };

   // Validate form data
   const validateForm = () => {
      if (!formData.fullName.trim()) {
         toast({
            title: "Validation Error",
            description: "Full name is required",
            variant: "destructive",
         });
         return false;
      }
      if (!formData.email.trim()) {
         toast({
            title: "Validation Error",
            description: "Email is required",
            variant: "destructive",
         });
         return false;
      }
      if (!formData.template) {
         toast({
            title: "Validation Error",
            description: "Please select a portfolio template",
            variant: "destructive",
         });
         return false;
      }
      if (!formData.username.trim()) {
         toast({
            title: "Validation Error",
            description: "Username is required",
            variant: "destructive",
         });
         return false;
      }
      // Check if username contains only valid characters (alphanumeric, underscore, hyphen)
      if (!/^[a-zA-Z0-9_-]+$/.test(formData.username)) {
         toast({
            title: "Validation Error",
            description: "Username can only contain letters, numbers, underscores, and hyphens",
            variant: "destructive",
         });
         return false;
      }
      // Check if username is available
      if (usernameStatus.isAvailable === false) {
         toast({
            title: "Validation Error",
            description: "Username is already taken. Please choose a different one.",
            variant: "destructive",
         });
         return false;
      }
      // Check if username availability is still being checked
      if (usernameStatus.isChecking) {
         toast({
            title: "Validation Error",
            description: "Please wait while we check username availability",
            variant: "destructive",
         });
         return false;
      }
      return true;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
         return;
      }

      setIsSubmitting(true);

      try {
         // Show processing toast
         toast({
            title: "Processing Files",
            description: "Converting files and preparing your portfolio...",
         });

         // Prepare data for submission
         const submissionData = {
            fullName: formData.fullName,
            title: formData.title,
            email: formData.email,
            phone: formData.phone,
            bio: formData.bio,
            template: formData.template,
            username: formData.username,
            skillList: formData.skillList.filter((skill) => skill.name.trim() !== ""),
            socials: formData.socials,
            projects: [],
            profileImageBase64: null,
            resumePdfBase64: null,
         };

         // Convert files to base64 if they exist
         if (formData.profileImage) {
            submissionData.profileImageBase64 = await fileToBase64(formData.profileImage);
         }

         if (formData.resumePdf) {
            submissionData.resumePdfBase64 = await fileToBase64(formData.resumePdf);
         }

         // Process projects with images
         for (const project of formData.projects.filter((project) => project.title.trim() !== "")) {
            const processedProject = {
               title: project.title,
               summary: project.summary,
               link: project.link,
               imageBase64: null,
            };

            if (project.image) {
               processedProject.imageBase64 = await fileToBase64(project.image);
            }

            submissionData.projects.push(processedProject);
         }
         // Submit to API
         const response = await axios.post("https://folio-hszb.onrender.com/portfolio/generate-portfolio", submissionData, {
            headers: {
               "Content-Type": "application/json",
            },
            withCredentials: true,
         });

         const result = response.data.data;

         toast({
            title: "Success!",
            description: "Your portfolio has been generated successfully!",
         });

         console.log("Portfolio created:", result.newPortfolio);

         // Reset form or redirect to portfolio
         // window.location.href = `/portfolio/${result.portfolioId}`;
      } catch (error) {
         console.error("Submission error:", error);
         toast({
            title: "Error",
            description: error.message || "Failed to generate portfolio. Please try again.",
            variant: "destructive",
         });
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="min-h-screen bg-background py-12 px-4">
         <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
               <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-4">
                  Generate Your Portfolio
               </h1>
               <p className="text-xl text-muted-foreground">
                  Fill out the form below to create your professional portfolio
               </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
               {/* Personal Information */}
               <Card className="shadow-card">
                  <CardHeader>
                     <CardTitle className="text-2xl text-primary">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <Label htmlFor="fullName">Full Name</Label>
                           <Input
                              id="fullName"
                              value={formData.fullName}
                              onChange={(e) => handleInputChange("fullName", e.target.value)}
                              placeholder="John Doe"
                              className="border-border/50"
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="title">Professional Title</Label>
                           <Input
                              id="title"
                              value={formData.title}
                              onChange={(e) => handleInputChange("title", e.target.value)}
                              placeholder="Software Developer"
                              className="border-border/50"
                           />
                        </div>
                     </div>

                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <Label htmlFor="email">Email</Label>
                           <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              placeholder="john@example.com"
                              className="border-border/50"
                           />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="phone">Phone</Label>
                           <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => handleInputChange("phone", e.target.value)}
                              placeholder="+1 (555) 123-4567"
                              className="border-border/50"
                           />
                        </div>
                     </div>

                     <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                           id="bio"
                           value={formData.bio}
                           onChange={(e) => handleInputChange("bio", e.target.value)}
                           placeholder="Tell us about yourself..."
                           rows={4}
                           className="border-border/50"
                        />
                     </div>

                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <Label htmlFor="template">Portfolio Template</Label>
                           <Select
                              value={formData.template}
                              onValueChange={(value) => handleInputChange("template", value)}
                           >
                              <SelectTrigger className="border-border/50">
                                 <SelectValue placeholder="Choose a template" />
                              </SelectTrigger>
                              <SelectContent>
                                 <SelectItem value="modern">Modern</SelectItem>
                                 <SelectItem value="professional">Professional</SelectItem>
                                 <SelectItem value="creative">Creative</SelectItem>
                                 <SelectItem value="minimal">Minimal</SelectItem>
                              </SelectContent>
                           </Select>
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="username">Username</Label>
                           <div className="relative">
                              <Input
                                 id="username"
                                 value={formData.username}
                                 onChange={(e) => handleInputChange("username", e.target.value.toLowerCase())}
                                 placeholder="johndoe"
                                 className={`border-border/50 pr-10 ${
                                    usernameStatus.isAvailable === true ? 'border-green-500 focus:border-green-500' :
                                    usernameStatus.isAvailable === false ? 'border-red-500 focus:border-red-500' : ''
                                 }`}
                              />
                              {usernameStatus.isChecking && (
                                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                 </div>
                              )}
                              {!usernameStatus.isChecking && usernameStatus.isAvailable === true && (
                                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <span className="text-green-500 text-sm">✓</span>
                                 </div>
                              )}
                              {!usernameStatus.isChecking && usernameStatus.isAvailable === false && (
                                 <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <span className="text-red-500 text-sm">✗</span>
                                 </div>
                              )}
                           </div>
                           {usernameStatus.message && (
                              <p className={`text-xs ${
                                 usernameStatus.isAvailable === true ? 'text-green-600' :
                                 usernameStatus.isAvailable === false ? 'text-red-600' :
                                 'text-muted-foreground'
                              }`}>
                                 {usernameStatus.message}
                              </p>
                           )}
                           <p className="text-xs text-muted-foreground">
                              Your portfolio will be available at: yurl.io/<span className="font-medium">{formData.username || 'username'}</span>
                           </p>
                        </div>
                     </div>

                     {/* File Uploads Section */}
                     <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <Label htmlFor="profileImage" className="flex items-center space-x-2">
                              <span>Profile Image</span>
                              <span className="text-sm text-muted-foreground">(JPG, PNG)</span>
                           </Label>
                           <div className="relative">
                              <Input
                                 id="profileImage"
                                 type="file"
                                 accept="image/*"
                                 onChange={(e) => handleFileChange("profileImage", e.target.files?.[0] || null)}
                                 className="border-border/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                              />
                              {formData.profileImage && (
                                 <p className="text-sm text-success mt-1">✓ {formData.profileImage.name}</p>
                              )}
                           </div>
                        </div>

                        <div className="space-y-2">
                           <Label htmlFor="resumePdf" className="flex items-center space-x-2">
                              <span>Resume/CV</span>
                              <span className="text-sm text-muted-foreground">(PDF only)</span>
                           </Label>
                           <div className="relative">
                              <Input
                                 id="resumePdf"
                                 type="file"
                                 accept=".pdf"
                                 onChange={(e) => handleFileChange("resumePdf", e.target.files?.[0] || null)}
                                 className="border-border/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent/10 file:text-accent hover:file:bg-accent/20"
                              />
                              {formData.resumePdf && (
                                 <p className="text-sm text-success mt-1">✓ {formData.resumePdf.name}</p>
                              )}
                           </div>
                        </div>
                     </div>

                     <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                        <div className="flex items-start space-x-3">
                           <div className="w-5 h-5 bg-primary/20 rounded-full flex items-center justify-center mt-0.5">
                              <span className="text-xs text-primary">💡</span>
                           </div>
                           <div className="space-y-1">
                              <p className="text-sm font-medium">File Upload Tips</p>
                              <ul className="text-sm text-muted-foreground space-y-1">
                                 <li>• Profile image should be square (1:1 ratio) for best results</li>
                                 <li>• Maximum file size: 5MB for images, 10MB for PDFs</li>
                                 <li>• Your resume will be available as a download link in your portfolio</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </CardContent>
               </Card>

               {/* Skills Section */}
               <Card className="shadow-card">
                  <CardHeader>
                     <CardTitle className="text-2xl text-primary">Skills</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {formData.skillList.map((skill, index) => (
                        <div key={index} className="grid md:grid-cols-2 gap-4">
                           <div className="space-y-2">
                              <Label htmlFor={`skill-name-${index}`}>Skill {index + 1} Name</Label>
                              <Input
                                 id={`skill-name-${index}`}
                                 value={skill.name}
                                 onChange={(e) => handleSkillChange(index, "name", e.target.value)}
                                 placeholder="React.js"
                                 className="border-border/50"
                              />
                           </div>
                           <div className="space-y-2">
                              <Label htmlFor={`skill-percent-${index}`}>Proficiency (%)</Label>
                              <Input
                                 id={`skill-percent-${index}`}
                                 type="number"
                                 min="0"
                                 max="100"
                                 value={skill.percent}
                                 onChange={(e) => handleSkillChange(index, "percent", e.target.value)}
                                 placeholder="85"
                                 className="border-border/50"
                              />
                           </div>
                        </div>
                     ))}
                  </CardContent>
               </Card>

               {/* Projects Section */}
               <Card className="shadow-card">
                  <CardHeader className="flex flex-row items-center justify-between">
                     <CardTitle className="text-2xl text-primary">Projects</CardTitle>
                     <Button
                        type="button"
                        onClick={addProject}
                        variant="outline"
                        className="border-primary/20 text-primary hover:bg-primary/5"
                     >
                        Add Project
                     </Button>
                  </CardHeader>
                  <CardContent className="space-y-6">
                     {formData.projects.map((project, index) => (
                        <div key={index} className="space-y-4 p-4 border border-border/50 rounded-lg bg-muted/30">
                           <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-lg">Project {index + 1}</h4>
                              {formData.projects.length > 2 && (
                                 <Button
                                    type="button"
                                    onClick={() => removeProject(index)}
                                    variant="outline"
                                    size="sm"
                                    className="text-destructive border-destructive/20 hover:bg-destructive/5"
                                 >
                                    Remove
                                 </Button>
                              )}
                           </div>

                           <div className="space-y-4">
                              <div className="space-y-2">
                                 <Label htmlFor={`project-title-${index}`}>Project Title</Label>
                                 <Input
                                    id={`project-title-${index}`}
                                    value={project.title}
                                    onChange={(e) => handleProjectChange(index, "title", e.target.value)}
                                    placeholder="E-commerce Website"
                                    className="border-border/50"
                                 />
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor={`project-summary-${index}`}>Project Summary</Label>
                                 <Textarea
                                    id={`project-summary-${index}`}
                                    value={project.summary}
                                    onChange={(e) => handleProjectChange(index, "summary", e.target.value)}
                                    placeholder="A full-stack e-commerce platform built with React and Node.js..."
                                    rows={3}
                                    className="border-border/50"
                                 />
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor={`project-link-${index}`}>Project Link</Label>
                                 <Input
                                    id={`project-link-${index}`}
                                    type="url"
                                    value={project.link}
                                    onChange={(e) => handleProjectChange(index, "link", e.target.value)}
                                    placeholder="https://github.com/username/project"
                                    className="border-border/50"
                                 />
                              </div>

                              <div className="space-y-2">
                                 <Label htmlFor={`project-image-${index}`} className="flex items-center space-x-2">
                                    <span>Project Image</span>
                                    <span className="text-sm text-muted-foreground">(JPG, PNG - Optional)</span>
                                 </Label>
                                 <div className="relative">
                                    <Input
                                       id={`project-image-${index}`}
                                       type="file"
                                       accept="image/*"
                                       onChange={(e) => handleProjectFileChange(index, e.target.files?.[0] || null)}
                                       className="border-border/50 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                    />
                                    {project.image && (
                                       <p className="text-sm text-success mt-1">✓ {project.image.name}</p>
                                    )}
                                 </div>
                                 <p className="text-xs text-muted-foreground">
                                    Upload a screenshot or preview of your project (max 5MB)
                                 </p>
                              </div>
                           </div>
                        </div>
                     ))}
                  </CardContent>
               </Card>

               {/* Submit Button */}
               <div className="text-center">
                  <Button
                     type="submit"
                     size="lg"
                     disabled={isSubmitting}
                     className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-lg px-12 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                           <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                           <span>Processing...</span>
                        </div>
                     ) : (
                        "Generate Portfolio"
                     )}
                  </Button>

                  {isSubmitting && (
                     <p className="text-sm text-muted-foreground mt-3">
                        Converting files and submitting data... This may take a few moments.
                     </p>
                  )}
               </div>
            </form>
         </div>
      </div>
   );
};

export default GeneratePortfolio;
