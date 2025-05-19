
import httpClient from './http-client';

export interface Plan {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  brinquedos_por_mes: number;
}

export interface CheckoutResponse {
  success: boolean;
  subscription_id: number;
  message: string;
}

export interface CancelResponse {
  success: boolean;
  message: string;
}

const planService = {
  getPlans: async (): Promise<Plan[]> => {
    const response = await httpClient.get('/planos');
    return response.data;
  },
  
  checkout: async (planoId: number): Promise<CheckoutResponse> => {
    const response = await httpClient.post('/checkout', { plano_id: planoId });
    return response.data;
  },
  
  cancelSubscription: async (subscriptionId: number): Promise<CancelResponse> => {
    const response = await httpClient.post(`/cancelar-subscricao/${subscriptionId}`);
    return response.data;
  }
};

export default planService;
