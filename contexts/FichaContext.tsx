import React, { createContext, ReactNode, useContext, useState } from 'react';
import { fichaService } from '../app/services/api';

// Interface baseada no backend FichaAtendimento.java e FichaDTO.java
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
  
  // Dados do atendimento - Tipo de atendimento
  atropelamento?: boolean;
  suspeitaIam?: boolean;
  queimaduras?: boolean;
  psiquiatrico?: boolean;
  transferencia?: boolean;
  acidenteTransito?: boolean;
  suspeitaAvc?: boolean;
  intoxicacao?: boolean;
  hipoHipertensao?: boolean;
  obstetricia?: boolean;
  agressao?: boolean;
  queda?: boolean;
  hipoHiperglicemia?: boolean;
  alcoolizado?: boolean;
  outrosTipoAtendimento?: string;
  
  // Situação local
  morteObvia?: boolean;
  chamadoFalso?: boolean;
  evadiu?: boolean;
  qta?: boolean;
  outrosSituacaoLocal?: string;
  descricaoCena?: string;
  
  // Dados clínicos - Avaliação primária
  viaAereaLiberada?: boolean;
  respiracao?: boolean;
  circulacao?: boolean;
  consciente?: boolean;
  
  // Pupilas
  direitaMidriase?: boolean;
  direitaIsocoria?: boolean;
  direitaMiose?: boolean;
  direitaReativa?: boolean;
  esquerdaMidriase?: boolean;
  esquerdaIsocoria?: boolean;
  esquerdaMiose?: boolean;
  esquerdaReativa?: boolean;
  
  // Sinais vitais
  pressaoSistolica?: number;
  pressaoDiastolica?: number;
  frequenciaCardiaca?: number;
  frequenciaRespiratoria?: number;
  saturacao?: number;
  dextro?: number;
  temperatura?: number;
  
  // Pele
  corada?: boolean;
  cianotica?: boolean;
  quente?: boolean;
  fria?: boolean;
  icterica?: boolean;
  sudoreica?: boolean;
  
  // Antecedentes patológicos
  iam?: boolean;
  avc?: boolean;
  diabetes?: boolean;
  asmaBronquite?: boolean;
  convulsao?: boolean;
  has?: boolean;
  ca?: boolean;
  
  // Medicamentos em uso
  medicamentosEmUso?: string;
  
  // Alergias
  alergias?: string;
  
  // Procedimentos realizados
  canulaGuedel?: boolean;
  oxigenio?: boolean;
  oximetria?: boolean;
  acessoVenoso?: boolean;
  rcp?: boolean;
  dea?: boolean;
  colarCervical?: boolean;
  prancha?: boolean;
  ked?: boolean;
  talas?: boolean;
  contensaoPsq?: boolean;
  kitParto?: boolean;
  curativo?: boolean;
  apoioUsa?: boolean;
  procedimentosRealizadosOutros?: string;
  
  // Conduta
  conduta?: string;
  
  // Médico regulador
  medicoRegulador?: string;
  
  // Descrição dos pertences do paciente
  pertences?: string;
  
  // Relatório de enfermagem
  relatorioEnfermagem?: string;
  
  // Campos de isenção de responsabilidade
  recusaAtendimento?: boolean;
  confirmacaoComparecimento?: boolean;
  altaLocal?: boolean;
  
  // Campos de assinatura e RG
  assinaturaResponsavel?: string;
  rgResponsavel?: string;
  
  // Campos de carimbo
  carimboDestino?: string;
  carimboRecebidoPor?: string;
  carimboTecnicoEnfermagem?: string;
  carimboSocorrista?: string;
  
  // Status da ficha (campo adicional do frontend)
  status: 'Em andamento' | 'Finalizada';
  
  // Campos simplificados para exibição (campo adicional do frontend)
  observacoes?: string;
}

interface FichaContextData {
  fichas: Ficha[];
  addFicha: (ficha: Omit<Ficha, 'id'>) => void;
  updateFicha: (id: string, ficha: Partial<Ficha>) => void;
  deleteFicha: (id: string) => void;
  getFichaById: (id: string) => Ficha | undefined;
  finalizarFicha: (id: string) => Promise<void>;
}

const FichaContext = createContext<FichaContextData>({} as FichaContextData);

export function FichaProvider({ children }: { children: ReactNode }) {
  const [fichas, setFichas] = useState<Ficha[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Carrega fichas do backend ao inicializar
  React.useEffect(() => {
    // Opcional: buscar fichas do backend ao iniciar
    fichaService.buscarTodasFichas()
      .then((response) => {
        if (response && Array.isArray(response)) {
          setFichas(response);
        }
      })
      .catch((error) => {
        console.error('Erro ao buscar fichas:', error);
      });
  }, []);

  const addFicha = (ficha: Omit<Ficha, 'id'>) => {
    const newFicha: Ficha = {
      ...ficha,
      id: Date.now().toString(),
      status: 'Em andamento',
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
  // Função para finalizar ficha: envia ao backend, gera PDF e faz download
  const finalizarFicha = async (id: string) => {
    const ficha = getFichaById(id);
    if (!ficha) {
      console.error('Ficha não encontrada para finalizar');
      return;
    }
    try {
      // Envia ficha para o backend
      const fichaBackend = await fichaService.criarFicha(ficha);
      // Gera PDF
      const pdfBlob = await fichaService.gerarPdf(fichaBackend.id);
      // Faz download do PDF
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ficha_${fichaBackend.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      // Atualiza status local
      updateFicha(id, { status: 'Finalizada' });
    } catch (error) {
      console.error('Erro ao finalizar ficha:', error);
    }
  };

  const getFichaById = (id: string) => {
    return fichas.find((f) => f.id === id);
  };

  return (
    <FichaContext.Provider
      value={{
        fichas,
        addFicha,
        updateFicha,
        deleteFicha,
        getFichaById,
        finalizarFicha,
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
