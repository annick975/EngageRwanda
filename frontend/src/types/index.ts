export interface Citizen {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface CitizenAuthResponse {
  id?: number;
  name: string;
  email: string;
  role: string;
  success?: boolean;
  message?: string;
  token?: string;
}

export interface CitizenLoginRequest {
  email: string;
  password: string;
}

export interface CitizenRegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface Complaint {
  id: number;
  ticketId: string;
  name: string;
  email: string;
  category: string;
  description: string;
  agencyName: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  responseMessage?: string;
}

export interface ComplaintRequest {
  name: string;
  email: string;
  category: string;
  description: string;
  agencyName: string;
  citizenEmail?: string;
}

export interface StatusUpdateRequest {
  status: string;
  responseMessage: string;
}

export interface Agency {
  id: number;
  name: string;
  description: string;
}

export interface Admin {
  id: number;
  username: string;
  agencyName: string;
}

export interface AuthResponse {
  username: string;
  role: string;
  agencyName: string;
  success?: boolean;
  message?: string;
  token?: string;
}

export interface LoginRequest {
  username: string;
  email?: string;
  password: string;
}

// Union type for user authentication
export type UserAuth = CitizenAuthResponse | AuthResponse;

// Type guard functions
export const isCitizenAuth = (user: UserAuth): user is CitizenAuthResponse => {
  return 'name' in user && 'email' in user;
};

export const isAdminAuth = (user: UserAuth): user is AuthResponse => {
  return 'username' in user && 'agencyName' in user;
}; 