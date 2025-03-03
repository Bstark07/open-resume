export interface ResumeData {
  basics: {
    name: string;
    label?: string;
    email?: string;
    phone?: string;
    url?: string;
    location?: {
      address?: string;
      city?: string;
      region?: string;
      postalCode?: string;
      country?: string;
    };
    summary?: string;
  };
  content?: string;  // HTML content of the resume
  work?: WorkExperience[];
  education?: Education[];
  skills?: Skill[];
  projects?: Project[];
  awards?: Award[];
  certificates?: Certificate[];
  languages?: Language[];
}

export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
  location?: string;
}

export interface Education {
  institution: string;
  area: string;
  studyType?: string;
  startDate: string;
  endDate?: string;
  score?: string;
  courses?: string[];
}

export interface Skill {
  name: string;
  level?: string;
  keywords?: string[];
}

export interface Project {
  name: string;
  description?: string;
  highlights?: string[];
  keywords?: string[];
  startDate?: string;
  endDate?: string;
  url?: string;
}

export interface Award {
  title: string;
  date?: string;
  awarder?: string;
  summary?: string;
}

export interface Certificate {
  name: string;
  date?: string;
  issuer?: string;
  url?: string;
}

export interface Language {
  language: string;
  fluency?: string;
} 