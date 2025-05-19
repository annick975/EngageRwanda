import axios, { AxiosError } from 'axios';
import { CitizenAuthResponse, CitizenLoginRequest, CitizenRegistrationRequest, Complaint, ComplaintRequest, StatusUpdateRequest, Agency, AuthResponse, LoginRequest } from '../types';

const API_URL = 'http://localhost:8080/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Citizen endpoints
export const registerCitizen = async (data: CitizenRegistrationRequest): Promise<CitizenAuthResponse> => {
  try {
    const response = await api.post<CitizenAuthResponse>('/citizens/register', data);
    console.log('Raw registration response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Registration error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });
    }
    throw error;
  }
};

export const loginCitizen = async (data: CitizenLoginRequest) => {
  const response = await api.post<CitizenAuthResponse>('/citizens/login', data);
  return response.data;
};

export const getCitizenProfile = async () => {
  const response = await api.get<CitizenAuthResponse>('/citizens/profile');
  return response.data;
};

export const getCitizenComplaints = async () => {
  const response = await api.get<Complaint[]>('/citizens/complaints');
  return response.data;
};

// Complaint endpoints
export const createComplaint = async (data: ComplaintRequest) => {
  const response = await api.post<Complaint>('/complaints/authenticated', data);
  return response.data;
};

export const createAuthenticatedComplaint = async (data: ComplaintRequest) => {
  const response = await api.post<Complaint>('/complaints/authenticated', data);
  return response.data;
};

export const getComplaintByTicketId = async (ticketId: string) => {
  const response = await api.get<Complaint>(`/complaints/citizen/track/${ticketId}`);
  return response.data;
};

// Agency endpoints
export const getAllAgencies = async () => {
  const response = await api.get<Agency[]>('/agencies/list');
  return response.data;
};

// Admin endpoints
export const loginAdmin = async (data: LoginRequest): Promise<AuthResponse> => {
  const payload = {
    email: data.username,
    password: data.password
  };
  const response = await api.post<AuthResponse>('/auth/login', payload);
  return response.data;
};

export const getAdminComplaints = async () => {
  const response = await api.get<Complaint[]>('/complaints/admin/complaints');
  return response.data;
};

export const updateComplaintStatus = async (complaintId: number, data: StatusUpdateRequest) => {
  const response = await api.put<Complaint>(`/complaints/admin/${complaintId}`, data);
  return response.data;
};

export const updateComplaintStatusByTicketId = async (ticketId: string, data: StatusUpdateRequest) => {
  const response = await api.put<Complaint>(`/complaints/admin/ticket/${ticketId}`, data);
  return response.data;
};

export default api; 