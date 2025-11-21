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

// Interceptor para logging de requisições (útil para debug)
api.interceptors.request.use(
  (config) => {
    console.log('🚀 Requisição:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('❌ Erro na requisição:', error);
    return Promise.reject(error);
  }
);

// Interceptor para logging de respostas (útil para debug)
api.interceptors.response.use(
  (response) => {
    console.log('✅ Resposta:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Erro na resposta:', {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export const fichaService = {
  /**
   * Gera o PDF de uma ficha de atendimento
   * @param fichaId - ID da ficha (número retornado pelo backend)
   * @returns Promise com os dados binários do PDF
   */
gerarPdf: async (fichaId: number | string): Promise<string> => {
  try {
    console.log('📄 Gerando PDF para ficha ID:', fichaId);
    
    const response = await api.get(`/fichas/${fichaId}/pdf`, {
      responseType: 'arraybuffer',
    });
    
    // Converte para base64
    const uint8Array = new Uint8Array(response.data);
    let binary = '';
    for (let i = 0; i < uint8Array.length; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64 = btoa(binary);
    
    console.log('✅ PDF gerado com sucesso');
    return base64;
  } catch (error: any) {
    console.error('❌ Erro ao gerar PDF:', error);
    throw error;
  }
},

  /**
   * Busca uma ficha por ID
   * @param fichaId - ID da ficha (número)
   */
  buscarFicha: async (fichaId: number | string) => {
    try {
      console.log('🔍 Buscando ficha ID:', fichaId);
      const response = await api.get(`/fichas/${fichaId}`);
      console.log('✅ Ficha encontrada:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao buscar ficha:', {
        fichaId,
        status: error.response?.status,
      });
      throw error;
    }
  },

  /**
   * Cria uma nova ficha
   * @param ficha - Dados da ficha
   * @returns Ficha criada com ID gerado pelo backend
   */
  criarFicha: async (ficha: any) => {
    try {
      console.log('➕ Criando nova ficha:', {
        nomeVitima: ficha.nomeVitima,
        idadeVitima: ficha.idadeVitima,
      });
      
      const response = await api.post('/fichas', ficha);
      
      console.log('✅ Ficha criada com sucesso:', {
        id: response.data.id,
        tipo: typeof response.data.id,
      });
      
      // Validação: garantir que o backend retornou um ID
      if (!response.data.id) {
        console.error('⚠️ ATENÇÃO: Backend não retornou ID na resposta!');
        throw new Error('Backend não retornou ID da ficha criada');
      }
      
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao criar ficha:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      throw error;
    }
  },

  /**
   * Busca todas as fichas
   */
  buscarTodasFichas: async () => {
    try {
      console.log('📋 Buscando todas as fichas...');
      const response = await api.get('/fichas');
      console.log('✅ Fichas encontradas:', response.data.length);
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao buscar todas as fichas:', error.response?.status);
      throw error;
    }
  },

  /**
   * Atualiza uma ficha
   */
  atualizarFicha: async (id: number | string, ficha: Partial<any>) => {
    try {
      console.log('✏️ Atualizando ficha ID:', id);
      const response = await api.put(`/fichas/${id}`, ficha);
      console.log('✅ Ficha atualizada');
      return response.data;
    } catch (error: any) {
      console.error('❌ Erro ao atualizar ficha:', {
        id,
        status: error.response?.status,
      });
      throw error;
    }
  },

  /**
   * Deleta uma ficha
   */
  deletarFicha: async (id: number | string) => {
    try {
      console.log('🗑️ Deletando ficha ID:', id);
      await api.delete(`/fichas/${id}`);
      console.log('✅ Ficha deletada');
      return true;
    } catch (error: any) {
      console.error('❌ Erro ao deletar ficha:', {
        id,
        status: error.response?.status,
      });
      throw error;
    }
  },
};

export default api;