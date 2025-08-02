export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string[];
  technologies: string[];
  caseStudyUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Testimonial {
  id: string;
  name: string;
  title: string;
  company: string;
  image: string;
  quote: string;
  rating: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  message: string;
}

export interface ServiceType {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
}
