export interface Profile {
  name: string;
  title: string;
  tagline: string;
  description: string;
  email: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    email: string;
  };
  metrics: Metric[];
  highlights: string[];
}

export interface Metric {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  featured: boolean;
  tech: string[];
  impact: string;
  github?: string;
  demo?: string;
  image: string;
}

export interface SkillCategory {
  name: string;
  icon: string;
  skills: string[];
  tools: string[];
}

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  type: "promotion" | "founding" | "freelance" | "education";
  description: string;
  highlights: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  readingTime: string;
  content: string;
}
