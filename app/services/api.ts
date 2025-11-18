import axios from 'axios';

// Configure o endereço do seu backend aqui
// Para Android Emulator use: http://10.0.2.2:8080
// Para iOS Simulator use: http://localhost:8080
// Para dispositivo físico, use o IP da sua máquina na rede local
const API_BASE_URL = 'http://10.0.2.2:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fichaService = {
  /**
   * Gera o PDF de uma ficha de atendimento
   * @param fichaId - ID da ficha
   * @returns Promise com os dados binários do PDF
   */
  gerarPdf: async (fichaId: string): Promise<Blob> => {
    try {
      const response = await api.get(`/fichas/${fichaId}/pdf`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      throw error;
    }
  },

  /**
   * Busca uma ficha por ID
   * @param fichaId - ID da ficha
   */
  buscarFicha: async (fichaId: string) => {
    try {
      const response = await api.get(`/fichas/${fichaId}`);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar ficha:', error);
      throw error;
    }
  },

  /**
   * Cria uma nova ficha
   * @param ficha - Dados da ficha
   */
  criarFicha: async (ficha: any) => {
    try {
      const response = await api.post('/fichas', ficha);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar ficha:', error);
      throw error;
    }
  },
};

export default api;
