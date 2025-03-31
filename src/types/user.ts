export interface User {
  id: string;
  name: string;
  email: string;
  role: 'jobseeker' | 'employer' | 'admin';
  avatar?: string;
  avatarUrl?: string; 
  phone?: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: string;
  to?: string;
  current: boolean;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  from: string;
  to?: string;
  current: boolean;
  description?: string;
}

export interface JobseekerProfile {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  title: string;
  bio?: string;
  location?: string;
  dob?: string;
  phone?: string;
  website?: string;
  skills?: string[];
  experience: Experience[];
  education: Education[];
  cvFile?: string;
  socialMedia?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
  desiredPosition?: string;
  desiredSalary?: number;
  workType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  availableFrom?: string;
  visibility: boolean;
  createdAt: string;
  updatedAt: string;
}

export type UserProfile = JobseekerProfile;