export interface PersonalInfo {
   name: string;
   title: string;
   email: string;
   phone?: string;
   location?: string;
   website?: string;
   linkedin?: string;
   github?: string;
   bio: string;
   profileImage?: string;
}

export interface Experience {
   id: string;
   title: string;
   company: string;
   location?: string;
   startDate: string;
   endDate?: string;
   current: boolean;
   description: string;
   technologies?: string[];
}

export interface Education {
   id: string;
   degree: string;
   institution: string;
   location?: string;
   startDate: string;
   endDate?: string;
   current: boolean;
   gpa?: string;
   description?: string;
}

export interface Project {
   id: string;
   projectTitle: string;
   projectSummary: string;
   projectUrl: string;
   projectImage: string;
}

export interface Skill {
   id: string;
   name: string;
   percentage: string;
}

export interface PortfolioData {
   name: string;
   email: string;
   phoneNumber: number;
   bio: string;
   slug: string;
   skills: Skill[];
   socials: [];
   projects: Project[];
   resume: string;
   jobRole: string;
   templateId: string;
   // id: string;
   // personalInfo: PersonalInfo;
   // experience: Experience[];
   // education: Education[];
   // projects: Project[];
   // skills: Skill[];
   // templateId: string;
   // createdAt: string;
   // updatedAt: string;
}

export interface TemplateConfig {
   id: string;
   name: string;
   description: string;
   preview: string;
   category: "minimal" | "creative" | "professional" | "modern";
   color: string;
   features: string[];
}

export type TemplateId = "minimal" | "modern" | "creative" | "professional";
