import { User } from './user';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'jobseeker' | 'employer';
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}