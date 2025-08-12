import React from 'react';
import { TemplateConfig, TemplateId, PortfolioData } from '@/types/portfolio';
import MinimalTemplate from './MinimalTemplate';
import ModernTemplate from './ModernTemplate';
import CreativeTemplate from './CreativeTemplate';
import ProfessionalTemplate from './ProfessionalTemplate';

// Template component type
export interface TemplateProps {
  data: PortfolioData;
  isPreview?: boolean;
}

// Template registry
export const templateComponents: Record<TemplateId, React.ComponentType<TemplateProps>> = {
  minimal: MinimalTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
  professional: ProfessionalTemplate,
};

// Template configurations
export const templateConfigs: Record<TemplateId, TemplateConfig> = {
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and simple design focused on content',
    preview: '/templates/minimal-preview.jpg',
    category: 'minimal',
    color: '#000000',
    features: ['Clean Typography', 'Mobile Responsive', 'Fast Loading', 'SEO Friendly'],
  },
  modern: {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with smooth animations',
    preview: '/templates/modern-preview.jpg',
    category: 'modern',
    color: '#3B82F6',
    features: ['Smooth Animations', 'Dark Mode', 'Interactive Elements', 'Modern UI'],
  },
  creative: {
    id: 'creative',
    name: 'Creative',
    description: 'Bold and expressive layout for creative professionals',
    preview: '/templates/creative-preview.jpg',
    category: 'creative',
    color: '#EC4899',
    features: ['Bold Design', 'Creative Layouts', 'Visual Focus', 'Unique Sections'],
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    description: 'Corporate-style design perfect for business professionals',
    preview: '/templates/professional-preview.jpg',
    category: 'professional',
    color: '#059669',
    features: ['Corporate Style', 'Professional Layout', 'Resume Focus', 'Contact Forms'],
  },
};

// Get template component by ID
export const getTemplateComponent = (templateId: TemplateId) => {
  return templateComponents[templateId];
};

// Get template configuration by ID
export const getTemplateConfig = (templateId: TemplateId) => {
  return templateConfigs[templateId];
};

// Get all template configurations
export const getAllTemplateConfigs = () => {
  return Object.values(templateConfigs);
};
