import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Text, Button, Divider } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useFichas } from '@/contexts/FichaContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FichaDetalhesScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { getFichaById, updateFicha, deleteFicha } = useFichas();

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

  const handleFinalize = () => {
    Alert.alert('Finalizar Ficha', 'Deseja realmente finalizar esta ficha?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Finalizar',
        style: 'default',
        onPress: () => {
          updateFicha(ficha.id, { status: 'Finalizada' });
          Alert.alert('Sucesso', 'Ficha finalizada com sucesso!');
        },
      },
    ]);
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
          >
            Finalizar Ficha
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
