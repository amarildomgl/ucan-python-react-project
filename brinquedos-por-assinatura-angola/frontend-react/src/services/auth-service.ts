
import httpClient from './http-client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  nome: string;
  email: string;
  password: string;
  telefone: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    nome: string;
    email: string;
    telefone: string;
  };
}

export interface UserProfile {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  subscriptions?: any[];
}

const authService = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await httpClient.post('/login', { email, password });
    return response.data;
  },
  
  register: async (nome: string, email: string, password: string, telefone: string): Promise<AuthResponse> => {
    const response = await httpClient.post('/registar', { nome, email, password, telefone });
    return response.data;
  },
  
  getProfile: async (): Promise<UserProfile> => {
    const response = await httpClient.get('/perfil');
    return response.data;
  },
};

export default authService;
