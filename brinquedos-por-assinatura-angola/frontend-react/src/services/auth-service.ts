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

export interface Subscription {
  id: number;
  plano: {
    id: number;
    nome: string;
    quantidade_brinquedos: number;
  };
  data_inicio: string;
  data_fim: string | null;
  ativa: boolean;
  brinquedos: Array<{
    id: number;
    nome: string;
    data_emprestimo: string;
    data_devolucao: string | null;
  }>;
}

export interface UserProfile {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  subscricoes: Subscription[];
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
