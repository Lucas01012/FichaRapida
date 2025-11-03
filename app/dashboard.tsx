import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { useFichas } from '@/contexts/FichaContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { fichas } = useFichas();

  const fichasEmAndamento = fichas.filter((f) => f.status === 'Em andamento').length;
  const fichasFinalizadas = fichas.filter((f) => f.status === 'Finalizada').length;

  const menuItems = [
    {
      title: 'Nova Ficha',
      icon: 'plus-circle',
      color: '#E53935',
      route: '/nova-ficha',
    },
    {
      title: 'Fichas Cadastradas',
      icon: 'clipboard-text',
      color: '#1565C0',
      route: '/fichas',
    },
    {
      title: 'Perfil',
      icon: 'account-circle',
      color: '#43A047',
      route: '/perfil',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <MaterialCommunityIcons name="medical-bag" size={50} color="#1565C0" />
        <Text variant="headlineMedium" style={styles.welcomeText}>
          Olá, {user?.name}
        </Text>
        <Text variant="bodyMedium" style={styles.roleText}>
          {user?.role}
        </Text>
      </View>

      <View style={styles.statsContainer}>
        <Card style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
          <Card.Content style={styles.statContent}>
            <MaterialCommunityIcons name="clock-outline" size={40} color="#F57C00" />
            <Text variant="headlineMedium" style={styles.statNumber}>
              {fichasEmAndamento}
            </Text>
            <Text variant="bodyMedium">Em Andamento</Text>
          </Card.Content>
        </Card>

        <Card style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
          <Card.Content style={styles.statContent}>
            <MaterialCommunityIcons name="check-circle" size={40} color="#43A047" />
            <Text variant="headlineMedium" style={styles.statNumber}>
              {fichasFinalizadas}
            </Text>
            <Text variant="bodyMedium">Finalizadas</Text>
          </Card.Content>
        </Card>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <Card
            key={index}
            style={styles.menuCard}
            onPress={() => router.push(item.route as any)}
          >
            <Card.Content style={styles.menuContent}>
              <MaterialCommunityIcons name={item.icon as any} size={50} color={item.color} />
              <Text variant="titleLarge" style={styles.menuTitle}>
                {item.title}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E3F2FD',
  },
  header: {
    backgroundColor: '#1565C0',
    padding: 30,
    alignItems: 'center',
    paddingTop: 60,
  },
  welcomeText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 10,
  },
  roleText: {
    color: '#BBDEFB',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
  },
  statCard: {
    flex: 1,
    elevation: 2,
  },
  statContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  statNumber: {
    fontWeight: 'bold',
    marginVertical: 5,
  },
  menuContainer: {
    padding: 20,
    gap: 15,
  },
  menuCard: {
    elevation: 3,
    backgroundColor: '#fff',
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  menuTitle: {
    marginLeft: 20,
    fontWeight: '600',
  },
});
