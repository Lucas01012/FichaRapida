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
              // Atualiza o status da ficha
              updateFicha(ficha.id, { status: 'Finalizada' });
              
              // Gera o PDF
              await gerarEBaixarPdf();
              
            } catch (error) {
              console.error('Erro ao finalizar ficha:', error);
              Alert.alert(
                'Erro', 
                'Não foi possível gerar o PDF. Verifique se o backend está rodando e tente novamente.'
              );
            } finally {
              setIsGeneratingPdf(false);
            }
          },
        },
      ]
    );
  };

  const gerarEBaixarPdf = async () => {
    try {
      // Chama a API para gerar o PDF
      const pdfBlob = await fichaService.gerarPdf(ficha.id);
      
      // Converte o blob para ArrayBuffer
      const arrayBuffer = await pdfBlob.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      // Define o caminho do arquivo usando a nova API
      const fileName = `ficha_atendimento_${ficha.id}_${new Date().getTime()}.pdf`;
      const file = new File(Paths.cache, fileName);
      
      // Salva o arquivo usando a nova API
      await file.write(uint8Array);
      
      // Verifica se é possível compartilhar
      const canShare = await Sharing.isAvailableAsync();
      
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
      console.error('Erro ao gerar PDF:', error);
      
      // Trata erros específicos
      if (error.response) {
        // Erro da API
        if (error.response.status === 404) {
          throw new Error('Ficha não encontrada no servidor');
        } else if (error.response.status === 500) {
          throw new Error('Erro no servidor ao gerar o PDF');
        }
      } else if (error.request) {
        // Requisição foi feita mas não houve resposta
        throw new Error('Não foi possível conectar ao servidor. Verifique se o backend está rodando.');
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
          Alert.alert('Sucesso', 'Ficha excluída com sucesso!', [
            { text: 'OK', onPress: () => router.back() },
          ]);
        },
      },
    ]);
  };

  const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
    <View style={styles.infoRow}>
      <View style={styles.infoLabel}>
        <MaterialCommunityIcons name={icon as any} size={20} color="#1565C0" />
        <Text variant="labelLarge" style={styles.labelText}>
          {label}
        </Text>
      </View>
      <Text variant="bodyLarge" style={styles.valueText}>
        {value}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.header}>
            <MaterialCommunityIcons name="clipboard-text" size={40} color="#1565C0" />
            <Text variant="headlineSmall" style={styles.title}>
              Ficha de Atendimento
            </Text>
          </View>

          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: ficha.status === 'Em andamento' ? '#FFF3E0' : '#E8F5E9',
              },
            ]}
          >
            <Text
              variant="titleMedium"
              style={[
                styles.statusText,
                { color: ficha.status === 'Em andamento' ? '#F57C00' : '#43A047' },
              ]}
            >
              {ficha.status}
            </Text>
          </View>

          <Divider style={styles.divider} />

          <InfoRow icon="account" label="Nome da Vítima" value={ficha.nomeVitima} />
          <InfoRow icon="calendar" label="Idade" value={`${ficha.idadeVitima} anos`} />
          <InfoRow icon="clock-outline" label="Data do Atendimento" value={ficha.dataAtendimento} />
          <InfoRow icon="clock-outline" label="Hora do Chamado" value={ficha.horaChamado || 'N/A'} />
          <InfoRow icon="alert-circle-outline" label="Motivo da Solicitação" value={ficha.motivoSolicitacao} />
          <InfoRow icon="map-marker" label="Local" value={ficha.enderecoOcorrencia || 'Não informado'} />
          
          {(ficha.vermelha || ficha.amarela || ficha.verde || ficha.azul) && (
            <InfoRow 
              icon="alert" 
              label="Classificação de Risco" 
              value={
                ficha.vermelha ? 'Vermelha (Emergência)' :
                ficha.amarela ? 'Amarela (Urgência)' :
                ficha.verde ? 'Verde (Pouco Urgente)' :
                ficha.azul ? 'Azul (Não Urgente)' : 'Não classificada'
              } 
            />
          )}

          {ficha.observacoes && (
            <>
              <Divider style={styles.divider} />
              <View style={styles.observationsContainer}>
                <View style={styles.infoLabel}>
                  <MaterialCommunityIcons name="note-text" size={20} color="#1565C0" />
                  <Text variant="labelLarge" style={styles.labelText}>
                    Observações
                  </Text>
                </View>
                <Text variant="bodyMedium" style={styles.observationsText}>
                  {ficha.observacoes}
                </Text>
              </View>
            </>
          )}
        </Card.Content>
      </Card>

      <View style={styles.buttonsContainer}>
        {ficha.status === 'Em andamento' && (
          <Button
            mode="contained"
            onPress={handleFinalize}
            style={styles.button}
            buttonColor="#43A047"
            icon="check-circle"
            loading={isGeneratingPdf}
            disabled={isGeneratingPdf}
          >
            {isGeneratingPdf ? 'Gerando PDF...' : 'Finalizar Ficha'}
          </Button>
        )}

        <Button
          mode="outlined"
          onPress={handleDelete}
          style={styles.button}
          textColor="#E53935"
          icon="delete"
        >
          Excluir Ficha
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  card: {
    margin: 15,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    marginLeft: 15,
    fontWeight: 'bold',
  },
  statusBadge: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  statusText: {
    fontWeight: 'bold',
  },
  divider: {
    marginVertical: 15,
  },
  infoRow: {
    marginBottom: 15,
  },
  infoLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  labelText: {
    marginLeft: 8,
    color: '#666',
  },
  valueText: {
    marginLeft: 28,
    fontWeight: '500',
  },
  observationsContainer: {
    marginTop: 10,
  },
  observationsText: {
    marginLeft: 28,
    marginTop: 5,
    lineHeight: 22,
  },
  buttonsContainer: {
    padding: 15,
    gap: 10,
  },
  button: {
    paddingVertical: 5,
  },
  errorCard: {
    margin: 50,
    elevation: 0,
  },
  errorContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  errorText: {
    marginTop: 15,
    color: '#E53935',
  },
});
