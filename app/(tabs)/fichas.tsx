import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Text, Searchbar, Chip } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useFichas } from '@/contexts/FichaContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FichasScreen() {
  const router = useRouter();
  const { fichas } = useFichas();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFichas = fichas.filter((ficha) =>
    ficha.nomeVitima.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'Em andamento' ? '#F57C00' : '#43A047';
  };

  const getRiskColor = (ficha: any) => {
    if (ficha.vermelha) return '#E53935';
    if (ficha.amarela) return '#F57C00';
    if (ficha.verde) return '#43A047';
    if (ficha.azul) return '#1565C0';
    return '#9E9E9E';
  };

  const getRiskLabel = (ficha: any) => {
    if (ficha.vermelha) return 'VERMELHA';
    if (ficha.amarela) return 'AMARELA';
    if (ficha.verde) return 'VERDE';
    if (ficha.azul) return 'AZUL';
    return 'SEM CLASSIFICAÇÃO';
  };

  const handleFichaPress = (fichaId: string) => {
    router.push(`/ficha-detalhes?id=${fichaId}` as any);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar por nome da vítima"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
      />

      <ScrollView style={styles.scrollView}>
        {filteredFichas.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="clipboard-alert" size={80} color="#ccc" />
            <Text variant="titleLarge" style={styles.emptyText}>
              Nenhuma ficha encontrada
            </Text>
          </View>
        ) : (
          filteredFichas.map((ficha) => (
            <TouchableOpacity key={ficha.id} onPress={() => handleFichaPress(ficha.id)}>
              <Card style={styles.fichaCard}>
                <Card.Content>
                  <View style={styles.cardHeader}>
                    <Text variant="titleLarge" style={styles.nomeVitima}>
                      {ficha.nomeVitima}
                    </Text>
                    <Chip
                      style={[styles.riskChip, { backgroundColor: getRiskColor(ficha) }]}
                      textStyle={styles.chipText}
                    >
                      {getRiskLabel(ficha)}
                    </Chip>
                  </View>

                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="calendar" size={16} color="#666" />
                    <Text variant="bodyMedium" style={styles.infoText}>
                      {new Date(ficha.dataAtendimento).toLocaleDateString('pt-BR')}
                    </Text>
                  </View>

                  {ficha.horaChamado && (
                    <View style={styles.infoRow}>
                      <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
                      <Text variant="bodyMedium" style={styles.infoText}>
                        {ficha.horaChamado}
                      </Text>
                    </View>
                  )}

                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="account" size={16} color="#666" />
                    <Text variant="bodyMedium" style={styles.infoText}>
                      {ficha.idadeVitima} anos
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="clipboard-text" size={16} color="#666" />
                    <Text variant="bodyMedium" style={styles.infoText}>
                      {ficha.motivoSolicitacao}
                    </Text>
                  </View>

                  {ficha.enderecoOcorrencia && (
                    <View style={styles.infoRow}>
                      <MaterialCommunityIcons name="map-marker" size={16} color="#666" />
                      <Text variant="bodyMedium" style={styles.infoText} numberOfLines={1}>
                        {ficha.enderecoOcorrencia}
                      </Text>
                    </View>
                  )}

                  <View style={styles.statusContainer}>
                    <Chip
                      icon="information"
                      style={[styles.statusChip, { backgroundColor: getStatusColor(ficha.status) }]}
                      textStyle={styles.chipText}
                    >
                      {ficha.status}
                    </Chip>
                  </View>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  searchbar: {
    margin: 16,
    elevation: 2,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  fichaCard: {
    marginBottom: 16,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  nomeVitima: {
    fontWeight: 'bold',
    color: '#1565C0',
    flex: 1,
  },
  riskChip: {
    marginLeft: 8,
  },
  chipText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    color: '#666',
    flex: 1,
  },
  statusContainer: {
    marginTop: 12,
    alignItems: 'flex-start',
  },
  statusChip: {
    elevation: 2,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    marginTop: 16,
    color: '#999',
  },
});
