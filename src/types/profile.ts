export interface EducationInput {
  school: string;
  degree: string;
  fieldOfStudy: string;
  from: string;
  to?: string;
  current: boolean;
  description?: string;
}

export interface ExperienceInput {
  company: string;
  position: string;
  location?: string;
  from: string;
  to?: string;
  current: boolean;
  description?: string;
}

export interface ProfileFormData {
  title: string;
  bio?: string;
  location?: string;
  phone?: string;
  website?: string;
  skills?: string | string[];
  desiredPosition?: string;
  desiredSalary?: string | number;
  workType?: string;
  availableFrom?: string;
  visibility?: boolean;
}