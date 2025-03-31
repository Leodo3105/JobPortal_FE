export interface Application {
    id: string;
    job: {
      id: string;
      title: string;
      location: string;
      company: {
        id: string;
        name: string;
        logo?: string;
      };
    };
    user: {
      id: string;
      name: string;
      avatar?: string;
      email: string;
    };
    profile: {
      id: string;
      title: string;
    };
    coverLetter?: string;
    attachedCV: string;
    status: 'pending' | 'viewed' | 'interview' | 'accepted' | 'rejected';
    notes: Array<{
      content: string;
      createdAt: string;
    }>;
    employerFeedback?: string;
    interviews: Array<{
      date: string;
      location: string;
      type: 'in-person' | 'phone' | 'video';
      notes?: string;
    }>;
    createdAt: string;
    updatedAt: string;
  }