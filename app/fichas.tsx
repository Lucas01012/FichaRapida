import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, Text, Chip, Searchbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useFichas } from '@/contexts/FichaContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function FichasScreen() {
  const router = useRouter();
  const { fichas } = useFichas();
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredFichas = fichas.filter((ficha) =>
    ficha.nomeVitima.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    return status === 'Em andamento' ? '#FFA726' : '#66BB6A';
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar por nome do paciente"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      <ScrollView style={styles.scrollView}>
        {filteredFichas.length === 0 ? (
          <Card style={styles.emptyCard}>
            <Card.Content style={styles.emptyContent}>
              <MaterialCommunityIcons name="clipboard-text-off" size={60} color="#999" />
              <Text variant="bodyLarge" style={styles.emptyText}>
                Nenhuma ficha encontrada
              </Text>
            </Card.Content>
          </Card>
        ) : (
          filteredFichas.map((ficha) => (
            <TouchableOpacity
              key={ficha.id}
              onPress={() => router.push(`/(tabs)/explore?fichaId=${ficha.id}` as any)}
            >
              <Card style={styles.fichaCard}>
                <Card.Content>
                  <View style={styles.cardHeader}>
                    <View style={styles.headerLeft}>
                      <MaterialCommunityIcons name="account" size={24} color="#1565C0" />
                      <Text variant="titleLarge" style={styles.patientName}>
                        {ficha.nomeVitima}
                      </Text>
                    </View>
                    <Chip
                      mode="flat"
                      style={{ backgroundColor: getStatusColor(ficha.status) }}
                      textStyle={{ color: '#fff' }}
                    >
                      {ficha.status}
                    </Chip>
                  </View>

                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="clock-outline" size={16} color="#666" />
                    <Text variant="bodyMedium" style={styles.infoText}>
                      {ficha.dataAtendimento} às {ficha.horaChamado || 'N/A'}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="alert-circle-outline" size={16} color="#666" />
                    <Text variant="bodyMedium" style={styles.infoText}>
                      {ficha.motivoSolicitacao}
                    </Text>
                  </View>

                  <View style={styles.infoRow}>
                    <MaterialCommunityIcons name="human" size={16} color="#666" />
                    <Text variant="bodyMedium" style={styles.infoText}>
                      {ficha.idadeVitima} anos • {ficha.enderecoOcorrencia || 'Endereço não informado'}
                    </Text>
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
  searchBar: {
    margin: 15,
    elevation: 2,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 15,
  },
  fichaCard: {
    marginBottom: 15,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  patientName: {
    marginLeft: 10,
    fontWeight: 'bold',
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoText: {
    marginLeft: 8,
    color: '#666',
  },
  emptyCard: {
    marginTop: 50,
    elevation: 0,
  },
  emptyContent: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 15,
    color: '#999',
  },
});
