export interface Job {
    id: string;
    title: string;
    description: string;
    requirements: string;
    benefits: string;
    location: string;
    jobType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
    category: string;
    skills: string[];
    experienceLevel: 'entry' | 'junior' | 'mid-level' | 'senior' | 'executive';
    educationLevel: 'high-school' | 'associate' | 'bachelor' | 'master' | 'phd' | 'any';
    salaryMin?: number;
    salaryMax?: number;
    salaryCurrency: string;
    showSalary: boolean;
    status: 'active' | 'closed' | 'draft' | 'expired';
    applicationDeadline: string;
    views: number;
    featured: boolean;
    company: {
      id: string;
      name: string;
      logo?: string;
      location: string;
      industry: string;
    };
    createdAt: string;
    updatedAt: string;
  }
  
  export interface JobInput {
    title: string;
    description: string;
    requirements: string;
    benefits: string;
    location: string;
    jobType: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
    category: string;
    skills: string[] | string; // API chấp nhận cả mảng và chuỗi cách nhau bởi dấu phẩy
    experienceLevel: 'entry' | 'junior' | 'mid-level' | 'senior' | 'executive';
    educationLevel: 'high-school' | 'associate' | 'bachelor' | 'master' | 'phd' | 'any';
    salaryMin?: number;
    salaryMax?: number;
    salaryCurrency?: string;
    showSalary?: boolean;
    applicationDeadline: string;
  }

  export interface SavedJob {
    id: string;
    job: {
      id: string;
      title: string;
      company: {
        id: string;
        name: string;
        logo?: string;
      };
      location: string;
      jobType: string;
      status: string;
      applicationDeadline: string;
      createdAt: string;
    };
    createdAt: string;
  }