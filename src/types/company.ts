export interface Company {
    id: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
      avatar?: string;
    };
    name: string;
    description: string;
    website?: string;
    industry: string;
    companySize: '1-10' | '11-50' | '51-200' | '201-500' | '501-1000' | '1000+';
    location: string;
    logo?: string;
    foundedYear?: number;
    socialMedia?: {
      facebook?: string;
      linkedin?: string;
      twitter?: string;
    };
    subscription: {
      type: 'free' | 'basic' | 'premium' | 'enterprise';
      startDate: string;
      endDate: string;
      status: 'active' | 'expired' | 'canceled';
    };
    featured: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CompanyStats {
    jobStats: {
      total: number;
      active: number;
      closed: number;
    };
    applicationStats: {
      total: number;
      pending: number;
      interview: number;
      accepted: number;
      rejected: number;
    };
  }