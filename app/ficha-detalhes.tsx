import { fichaService } from '@/app/services/api';
import { useFichas } from '@/contexts/FichaContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { File, Paths } from 'expo-file-system';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';

export default function FichaDetalhesScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getFichaById, updateFicha, deleteFicha } = useFichas();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const ficha = getFichaById(id as string);

  if (!ficha) {
    return (
      <View style={styles.container}>
        <Card style={styles.errorCard}>
          <Card.Content style={styles.errorContent}>
            <MaterialCommunityIcons name="alert-circle" size={60} color="#E53935" />
            <Text variant="titleLarge" style={styles.errorText}>
              Ficha não encontrada
            </Text>
          </Card.Content>
        </Card>
      </View>
    );
  }

  const handleFinalize = async () => {
    Alert.alert(
      'Finalizar Ficha', 
      'Deseja realmente finalizar esta ficha? Um PDF será gerado automaticamente.', 
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Finalizar',
          style: 'default',
          onPress: async () => {
            setIsGeneratingPdf(true);
            
            try {
              console.log('=== INICIANDO FINALIZAÇÃO ===');
              console.log('ID local da ficha:', ficha.id, '(tipo:', typeof ficha.id, ')');
              
              // PASSO 1: Enviar ficha ao backend
              console.log('PASSO 1: Enviando ficha ao backend...');
              console.log('Dados da ficha:', {
                nomeVitima: ficha.nomeVitima,
                idadeVitima: ficha.idadeVitima,
                dataAtendimento: ficha.dataAtendimento,
                motivoSolicitacao: ficha.motivoSolicitacao,
              });
              
              const fichaBackend = await fichaService.criarFicha(ficha);
              
              console.log('✅ Ficha criada no backend com sucesso!');
              console.log('ID retornado pelo backend:', fichaBackend.id, '(tipo:', typeof fichaBackend.id, ')');
              
              // Validação crítica: verificar se recebemos um ID válido
              if (!fichaBackend.id) {
                throw new Error('Backend não retornou um ID válido. Verifique a resposta do servidor.');
              }
              
              // PASSO 2: Gerar PDF usando o ID do backend
              console.log('PASSO 2: Gerando PDF com ID do backend:', fichaBackend.id);
              await gerarEBaixarPdf(fichaBackend.id);
              
              // PASSO 3: Atualizar status local
              console.log('PASSO 3: Atualizando status local...');
              updateFicha(ficha.id, { 
                status: 'Finalizada',
              });
              
              console.log('=== FINALIZAÇÃO CONCLUÍDA COM SUCESSO ===');
              
            } catch (error: any) {
              console.error('=== ERRO NA FINALIZAÇÃO ===');
              console.error('Tipo de erro:', error.name);
              console.error('Mensagem:', error.message);
              
              let mensagemErro = 'Não foi possível finalizar a ficha. ';
              let detalhesTecnicos = '';
              
              if (error.response) {
                // Erro da API com resposta do servidor
                const status = error.response.status;
                console.error('Status HTTP:', status);
                console.error('Dados da resposta:', error.response.data);
                
                if (status === 404) {
                  mensagemErro += 'Ficha não encontrada no servidor (404).';
                  detalhesTecnicos = 'O ID da ficha pode estar incorreto ou a rota não existe.';
                } else if (status === 500) {
                  mensagemErro += 'Erro interno no servidor (500).';
                  detalhesTecnicos = 'Verifique os logs do backend para mais detalhes.';
                } else if (status === 400) {
                  mensagemErro += 'Dados inválidos (400).';
                  detalhesTecnicos = JSON.stringify(error.response.data);
                } else {
                  mensagemErro += `Erro do servidor (${status}).`;
                }
              } else if (error.request) {
                // Requisição foi feita mas não houve resposta
                console.error('Requisição enviada mas sem resposta');
                mensagemErro += 'Não foi possível conectar ao servidor.';
                detalhesTecnicos = 'Verifique se o backend está rodando em http://localhost:8080';
              } else {
                // Outro tipo de erro
                console.error('Erro ao configurar requisição:', error.message);
                mensagemErro += error.message || 'Erro desconhecido';
              }
              
              // Mostrar erro detalhado
              Alert.alert(
                'Erro', 
                mensagemErro + '\n\n' + detalhesTecnicos,
                [
                  { text: 'OK' },
                  {
                    text: 'Ver Logs',
                    onPress: () => {
                      console.log('=== LOGS COMPLETOS DO ERRO ===');
                      console.log(error);
                    }
                  }
                ]
              );
            } finally {
              setIsGeneratingPdf(false);
            }
          },
        },
      ]
    );
  };

  /**
   * Gera e faz download do PDF
   * @param fichaIdBackend - ID numérico retornado pelo backend
   */
  const gerarEBaixarPdf = async (fichaIdBackend: number) => {
    try {
      console.log('>>> Iniciando geração de PDF');
      console.log('>>> ID da ficha:', fichaIdBackend, '(tipo:', typeof fichaIdBackend, ')');
      
      // Chama a API para gerar o PDF usando o ID do backend
      const pdfBlob = await fichaService.gerarPdf(fichaIdBackend);
      
      console.log('>>> PDF recebido do backend');
      console.log('>>> Tamanho do blob:', pdfBlob.size, 'bytes');
      
      if (pdfBlob.size === 0) {
        throw new Error('PDF gerado está vazio (0 bytes)');
      }
      
      // Converte o blob para ArrayBuffer
      const arrayBuffer = await pdfBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      console.log('>>> Convertido para Uint8Array, tamanho:', uint8Array.length);
      
      // Define o caminho do arquivo usando a nova API
      const fileName = `ficha_atendimento_${fichaIdBackend}_${new Date().getTime()}.pdf`;
      const file = new File(Paths.cache, fileName);
      
      console.log('>>> Salvando arquivo:', fileName);
      console.log('>>> Caminho:', file.uri);
      
      // Salva o arquivo usando a nova API
      await file.write(uint8Array);
      
      console.log('>>> Arquivo salvo com sucesso');
      
      // Verifica se é possível compartilhar
      const canShare = await Sharing.isAvailableAsync();
      console.log('>>> Compartilhamento disponível:', canShare);
      
      if (canShare) {
        // Compartilha o PDF
        await Sharing.shareAsync(file.uri, {
          mimeType: 'application/pdf',
          dialogTitle: 'Ficha de Atendimento',
          UTI: 'com.adobe.pdf',
        });
        
        Alert.alert(
          'Sucesso', 
          'Ficha finalizada e PDF gerado com sucesso!'
        );
      } else {
        Alert.alert(
          'Sucesso', 
          `Ficha finalizada e PDF salvo em: ${file.uri}`
        );
      }
      
    } catch (error: any) {
      console.error('>>> Erro ao gerar/salvar PDF:', error);
      
      // Trata erros específicos
      if (error.response) {
        const status = error.response.status;
        console.error('>>> Status HTTP:', status);
        
        if (status === 404) {
          throw new Error(
            'Ficha não encontrada no servidor. ' +
            'O ID pode estar incorreto ou a ficha foi deletada.'
          );
        } else if (status === 500) {
          throw new Error(
            'Erro no servidor ao gerar o PDF. ' +
            'Verifique se o PdfService está implementado corretamente.'
          );
        }
      } else if (error.request) {
        throw new Error(
          'Não foi possível conectar ao servidor. ' +
          'Verifique se o backend está rodando.'
        );
      }
      
      throw error;
    }
  };

  const handleDelete = () => {
    Alert.alert('Excluir Ficha', 'Deseja realmente excluir esta ficha?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteFicha(ficha.id);
          Alert.alert('Sucesso', 'Ficha excluída com sucesso!');
          router.back();
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Title 
          title={`Ficha de ${ficha.nomeVitima}`}
          subtitle={`Data: ${ficha.dataAtendimento}`}
        />
        <Divider />
        
        <Card.Content style={styles.content}>
          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Informações da Vítima
            </Text>
            <Text>Nome: {ficha.nomeVitima}</Text>
            <Text>Idade: {ficha.idadeVitima} anos</Text>
            {ficha.enderecoVitima && <Text>Endereço: {ficha.enderecoVitima}</Text>}
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Detalhes do Atendimento
            </Text>
            <Text>Motivo: {ficha.motivoSolicitacao}</Text>
            <Text>Status: {ficha.status}</Text>
          </View>

          {ficha.observacoes && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.section}>
                <Text variant="titleMedium" style={styles.sectionTitle}>
                  Observações
                </Text>
                <Text>{ficha.observacoes}</Text>
              </View>
            </>
          )}
        </Card.Content>

        <Card.Actions style={styles.actions}>
          <Button 
            mode="contained" 
            onPress={handleFinalize}
            loading={isGeneratingPdf}
            disabled={ficha.status === 'Finalizada' || isGeneratingPdf}
            style={styles.finalizeButton}
          >
            {isGeneratingPdf ? 'Gerando PDF...' : 'Finalizar e Gerar PDF'}
          </Button>
          <Button 
            mode="outlined" 
            onPress={handleDelete}
            disabled={isGeneratingPdf}
            textColor="#E53935"
          >
            Excluir
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
  },
  content: {
    paddingTop: 16,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 16,
  },
  actions: {
    justifyContent: 'flex-end',
    padding: 16,
    flexDirection: 'row',
    gap: 8,
  },
  finalizeButton: {
    marginRight: 8,
  },
  errorCard: {
    margin: 16,
    padding: 24,
  },
  errorContent: {
    alignItems: 'center',
    gap: 16,
  },
  errorText: {
    textAlign: 'center',
  },
});
