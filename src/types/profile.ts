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