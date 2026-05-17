import axios from 'axios';
import { apiBaseUrl } from './client';

export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  message: string;
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: 'employee' | 'manager' | 'admin';
  };
};

export type MeResponse = {
  user: AuthResponse['user'];
};

const http = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
});

export async function loginRequest(payload: LoginPayload) {
  const response = await http.post<AuthResponse>('/auth/login', payload);
  return response.data;
}

export async function fetchCurrentUser() {
  const response = await http.get<MeResponse>('/auth/me');
  return response.data;
}
