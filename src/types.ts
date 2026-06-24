export interface ContactInfo {
  email: string;
  phone_india: string;
  phone_japan: string;
}

export interface SocialProfile {
  handle: string;
  url: string;
}

export interface Socials {
  github: SocialProfile;
  linkedin: SocialProfile;
  leetcode: SocialProfile;
  codeforces: SocialProfile;
  geeksforgeeks: SocialProfile;
}

export interface PersonalInfo {
  name: string;
  tagline: string;
  summary: string;
  contact: ContactInfo;
  social: Socials;
}

export interface Certification {
  name: string;
  score: string;
  badge_url: string;
  certificate_url: string;
}

export interface ExperienceProject {
  name: string;
  summary: string;
  team: string;
  tech: string[];
  highlights: string[];
}

export interface Experience {
  company: string;
  location: string;
  role: string;
  start: string;
  end: string;
  projects?: ExperienceProject[];
  highlights?: string[];
}

export interface Project {
  name: string;
  repo: string;
  status: 'Active' | 'In Progress' | 'Completed';
  tech: string[];
  summary: string;
  highlights: string[];
}

export interface CloudDevOpsSkills {
  aws: string[];
  containers: string[];
  ci_cd: string[];
  other: string[];
}

export interface Skills {
  languages: {
    primary: string[];
    proficient: string[];
  };
  frameworks_and_libraries: string[];
  databases: string[];
  message_queues: string[];
  cloud_and_devops: CloudDevOpsSkills;
}

export interface Education {
  institution: string;
  location: string;
  degree: string;
  score: string;
  graduated: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  tags: string[];
  summary: string;
  content: string; // Markdown or Rich Text content
  readTime: string;
  date: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
