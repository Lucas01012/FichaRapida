import React, { createContext, useContext, useState, ReactNode } from 'react';

// Interface baseada no backend FichaAtendimento.java
export interface Ficha {
  id: string;
  
  // Dados do cabeçalho
  dataAtendimento: string;
  kmInicial?: string;
  kmFinal?: string;
  
  // Motivo da solicitação
  motivoSolicitacao: string;
  
  // Classificação de risco
  vermelha?: boolean;
  amarela?: boolean;
  verde?: boolean;
  azul?: boolean;
  
  // Dados do local da ocorrência
  residencia?: boolean;
  viaPublica?: boolean;
  rodovia?: boolean;
  ps?: boolean;
  ubs?: boolean;
  localOcorrenciaOutros?: string;
  enderecoOcorrencia?: string;
  numeroEnderecoOcorrencia?: number;
  referenciaEnderecoOcorrencia?: string;
  contatoEnderecoOcorrencia?: string;
  
  // Dados da vítima
  nomeVitima: string;
  idadeVitima: number;
  dataNascimentoVitima?: string;
  enderecoVitima?: string;
  numeroEnderecoVitima?: string;
  bairroEnderecoVitima?: string;
  nomePaiVitima?: string;
  nomeMaeVitima?: string;
  cnsVitima?: string;
  rgVitima?: string;
  cpfVitima?: string;
  
  // Dados do chamado
  horaChamado?: string;
  horaTransmissao?: string;
  horaSaida?: string;
  horaChegadaLocal?: string;
  horaSaidaLocal?: string;
  horaChegadaHospital?: string;
  horaSaidaHospital?: string;
  horaRetornoBase?: string;
  
  // Status da ficha
  status: 'Em andamento' | 'Finalizada';
  
  // Campos simplificados para exibição
  observacoes?: string;
}

interface FichaContextData {
  fichas: Ficha[];
  addFicha: (ficha: Omit<Ficha, 'id'>) => void;
  updateFicha: (id: string, ficha: Partial<Ficha>) => void;
  deleteFicha: (id: string) => void;
  getFichaById: (id: string) => Ficha | undefined;
}

const FichaContext = createContext<FichaContextData>({} as FichaContextData);

export function FichaProvider({ children }: { children: ReactNode }) {
  const [fichas, setFichas] = useState<Ficha[]>([
    {
      id: '1',
      dataAtendimento: '2025-11-03',
      motivoSolicitacao: 'Emergência médica - Dor torácica',
      nomeVitima: 'Maria Santos',
      idadeVitima: 45,
      horaChamado: '10:30',
      residencia: true,
      vermelha: true,
      enderecoOcorrencia: 'Rua das Flores, 123',
      observacoes: 'Paciente apresenta dor torácica há 2 horas',
      status: 'Em andamento',
    },
    {
      id: '2',
      dataAtendimento: '2025-11-03',
      motivoSolicitacao: 'Acidente - Trauma',
      nomeVitima: 'Carlos Oliveira',
      idadeVitima: 32,
      horaChamado: '09:15',
      viaPublica: true,
      amarela: true,
      enderecoOcorrencia: 'Avenida Principal, 456',
      observacoes: 'Queda de moto, fratura exposta no antebraço direito',
      status: 'Finalizada',
    },
    {
      id: '3',
      dataAtendimento: '2025-11-03',
      motivoSolicitacao: 'Crise psiquiátrica',
      nomeVitima: 'Ana Paula Costa',
      idadeVitima: 28,
      horaChamado: '11:00',
      residencia: true,
      verde: true,
      enderecoOcorrencia: 'Rua das Palmeiras, 789',
      observacoes: 'Hiperventilação, tremores',
      status: 'Em andamento',
    },
  ]);

  const addFicha = (ficha: Omit<Ficha, 'id'>) => {
    const newFicha: Ficha = {
      ...ficha,
      id: Date.now().toString(),
    };
    setFichas((prev) => [newFicha, ...prev]);
  };

  const updateFicha = (id: string, updatedData: Partial<Ficha>) => {
    setFichas((prev) =>
      prev.map((ficha) => (ficha.id === id ? { ...ficha, ...updatedData } : ficha))
    );
  };

  const deleteFicha = (id: string) => {
    setFichas((prev) => prev.filter((ficha) => ficha.id !== id));
  };

  const getFichaById = (id: string) => {
    return fichas.find((ficha) => ficha.id === id);
  };

  return (
    <FichaContext.Provider
      value={{
        fichas,
        addFicha,
        updateFicha,
        deleteFicha,
        getFichaById,
      }}
    >
      {children}
    </FichaContext.Provider>
  );
}

export function useFichas() {
  const context = useContext(FichaContext);
  if (!context) {
    throw new Error('useFichas must be used within a FichaProvider');
  }
  return context;
}
