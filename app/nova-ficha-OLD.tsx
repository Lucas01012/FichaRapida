import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { TextInput, Button, Card, SegmentedButtons } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useFichas } from '@/contexts/FichaContext';

export default function NovaFichaScreen() {
  const router = useRouter();
  const { addFicha } = useFichas();

  const [nomeVitima, setNomeVitima] = useState('');
  const [idade, setIdade] = useState('');
  const [motivoSolicitacao, setMotivoSolicitacao] = useState('');
  const [enderecoOcorrencia, setEnderecoOcorrencia] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const getCurrentDateTime = () => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0].substring(0, 5);
    return { date, time };
  };

  const handleSave = () => {
    if (!nomeVitima.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome da vítima');
      return;
    }

    if (!idade.trim() || isNaN(Number(idade))) {
      Alert.alert('Erro', 'Por favor, informe uma idade válida');
      return;
    }

    if (!motivoSolicitacao.trim()) {
      Alert.alert('Erro', 'Por favor, informe o motivo da solicitação');
      return;
    }

    const { date, time } = getCurrentDateTime();

    addFicha({
      dataAtendimento: date,
      nomeVitima: nomeVitima.trim(),
      idadeVitima: Number(idade),
      motivoSolicitacao: motivoSolicitacao.trim(),
      horaChamado: time,
      enderecoOcorrencia: enderecoOcorrencia.trim() || undefined,
      observacoes: observacoes.trim() || undefined,
      status: 'Em andamento',
    });

    Alert.alert('Sucesso', 'Ficha cadastrada com sucesso!', [
      {
        text: 'OK',
        onPress: () => router.back(),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput
              label="Nome da Vítima *"
              value={nomeVitima}
              onChangeText={setNomeVitima}
              mode="outlined"
              style={styles.input}
              placeholder="Nome completo da vítima"
            />

            <TextInput
              label="Idade *"
              value={idade}
              onChangeText={setIdade}
              mode="outlined"
              keyboardType="numeric"
              style={styles.input}
              placeholder="Idade em anos"
            />

            <TextInput
              label="Motivo da Solicitação *"
              value={motivoSolicitacao}
              onChangeText={setMotivoSolicitacao}
              mode="outlined"
              multiline
              numberOfLines={3}
              style={styles.input}
              placeholder="Ex: Emergência médica, acidente, trauma..."
            />

            <TextInput
              label="Endereço da Ocorrência"
              value={enderecoOcorrencia}
              onChangeText={setEnderecoOcorrencia}
              mode="outlined"
              style={styles.input}
              placeholder="Endereço completo do local"
            />

            <TextInput
              label="Observações"
              value={observacoes}
              onChangeText={setObservacoes}
              mode="outlined"
              multiline
              numberOfLines={4}
              style={styles.input}
              placeholder="Informações adicionais relevantes"
            />

            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.button}
              buttonColor="#E53935"
              icon="content-save"
            >
              Salvar Ficha
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  scrollView: {
    flex: 1,
  },
  card: {
    margin: 15,
    elevation: 3,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
    paddingVertical: 5,
  },
});
