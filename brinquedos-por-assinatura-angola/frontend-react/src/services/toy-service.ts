import httpClient from './http-client';

export interface Toy {
  id: number;
  nome: string;
  descricao: string;
  idade_recomendada: string;
  categoria: string;
  imagem_url: string;
}

export const toyService = {
  getToys: async (): Promise<Toy[]> => {
    const response = await httpClient.get('/brinquedos');
    return response.data;
  },
  
  getToyById: async (id: number): Promise<Toy> => {
    const response = await httpClient.get(`/brinquedos/${id}`);
    return response.data;
  },
};

export default toyService;