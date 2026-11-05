export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'sets' | 'architecture' | 'packaging' | 'technic' | 'campaigns';
  categoryLabel: string;
  year: string;
  pieces?: number;
  scale?: string;
  client?: string;
  coverImage: string;
  gallery: string[];
  description: string;
  challenge: string;
  solution: string;
  tools: string[];
  metrics?: { label: string; value: string }[];
  featured?: boolean;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  achievements: string[];
}

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  details: string;
}

export interface SkillCategory {
  name: string;
  skills: { name: string; level: number; note: string }[];
}

export interface ShowreelScene {
  id: string;
  title: string;
  timestamp: string;
  category: string;
  description: string;
  thumbnail: string;
  technicalSpecs: {
    engine: string;
    renderTime: string;
    sampleRate: string;
    lighting: string;
  };
}
