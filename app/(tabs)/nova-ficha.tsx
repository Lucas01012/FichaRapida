import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Switch } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useFichas } from '@/contexts/FichaContext';
import { Ficha } from '@/contexts/FichaContext';

export default function NovaFichaScreen() {
  const router = useRouter();
  const { addFicha } = useFichas();

  const [nomeVitima, setNomeVitima] = useState('');
  const [idadeVitima, setIdadeVitima] = useState('');
  const [motivoSolicitacao, setMotivoSolicitacao] = useState('');
  const [enderecoOcorrencia, setEnderecoOcorrencia] = useState('');
  const [observacoes, setObservacoes] = useState('');
  
  // Classificação de risco
  const [vermelha, setVermelha] = useState(false);
  const [amarela, setAmarela] = useState(false);
  const [verde, setVerde] = useState(false);
  const [azul, setAzul] = useState(false);
  
  // Local
  const [residencia, setResidencia] = useState(false);
  const [viaPublica, setViaPublica] = useState(false);

  const handleSubmit = () => {
    // Validações
    if (!nomeVitima.trim()) {
      Alert.alert('Erro', 'Por favor, informe o nome da vítima');
      return;
    }
    if (!idadeVitima.trim() || isNaN(Number(idadeVitima))) {
      Alert.alert('Erro', 'Por favor, informe uma idade válida');
      return;
    }
    if (!motivoSolicitacao.trim()) {
      Alert.alert('Erro', 'Por favor, informe o motivo da solicitação');
      return;
    }

    const novaFicha: Ficha = {
      id: Date.now().toString(),
      dataAtendimento: new Date().toISOString(),
      horaChamado: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      nomeVitima: nomeVitima.trim(),
      idadeVitima: Number(idadeVitima),
      motivoSolicitacao: motivoSolicitacao.trim(),
      enderecoOcorrencia: enderecoOcorrencia.trim() || undefined,
      observacoes: observacoes.trim() || undefined,
      vermelha,
      amarela,
      verde,
      azul,
      residencia,
      viaPublica,
      status: 'Em andamento',
    };

    addFicha(novaFicha);
    Alert.alert('Sucesso', 'Ficha criada com sucesso!', [
      { text: 'OK', onPress: () => router.push('/(tabs)/fichas' as any) },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Dados da Vítima
        </Text>

        <TextInput
          label="Nome da Vítima *"
          value={nomeVitima}
          onChangeText={setNomeVitima}
          style={styles.input}
          mode="outlined"
        />

        <TextInput
          label="Idade *"
          value={idadeVitima}
          onChangeText={setIdadeVitima}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />

        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Classificação de Risco
        </Text>

        <View style={styles.switchRow}>
          <Text>Vermelha (Emergência)</Text>
          <Switch value={vermelha} onValueChange={setVermelha} color="#E53935" />
        </View>

        <View style={styles.switchRow}>
          <Text>Amarela (Urgente)</Text>
          <Switch value={amarela} onValueChange={setAmarela} color="#F57C00" />
        </View>

        <View style={styles.switchRow}>
          <Text>Verde (Pouco Urgente)</Text>
          <Switch value={verde} onValueChange={setVerde} color="#43A047" />
        </View>

        <View style={styles.switchRow}>
          <Text>Azul (Não Urgente)</Text>
          <Switch value={azul} onValueChange={setAzul} color="#1565C0" />
        </View>

        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Local da Ocorrência
        </Text>

        <View style={styles.switchRow}>
          <Text>Residência</Text>
          <Switch value={residencia} onValueChange={setResidencia} />
        </View>

        <View style={styles.switchRow}>
          <Text>Via Pública</Text>
          <Switch value={viaPublica} onValueChange={setViaPublica} />
        </View>

        <TextInput
          label="Endereço da Ocorrência"
          value={enderecoOcorrencia}
          onChangeText={setEnderecoOcorrencia}
          style={styles.input}
          mode="outlined"
        />

        <Text variant="headlineSmall" style={styles.sectionTitle}>
          Detalhes do Atendimento
        </Text>

        <TextInput
          label="Motivo da Solicitação *"
          value={motivoSolicitacao}
          onChangeText={setMotivoSolicitacao}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={3}
        />

        <TextInput
          label="Observações"
          value={observacoes}
          onChangeText={setObservacoes}
          style={styles.input}
          mode="outlined"
          multiline
          numberOfLines={4}
        />

        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.button}
          buttonColor="#43A047"
        >
          Criar Ficha
        </Button>

        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={styles.button}
        >
          Cancelar
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
  form: {
    padding: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 12,
    color: '#1565C0',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  button: {
    marginTop: 8,
    marginBottom: 8,
  },
});
