import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Text, Button, Avatar, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PerfilScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair do aplicativo?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/(tabs)' as any);
        },
      },
    ]);
  };

  const InfoCard = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
    <View style={styles.infoCard}>
      <MaterialCommunityIcons name={icon as any} size={24} color="#1565C0" />
      <View style={styles.infoContent}>
        <Text variant="labelMedium" style={styles.infoLabel}>
          {label}
        </Text>
        <Text variant="bodyLarge" style={styles.infoValue}>
          {value}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Icon size={100} icon="account-circle" style={styles.avatar} />
        <Text variant="headlineMedium" style={styles.userName}>
          {user?.name}
        </Text>
        <Text variant="bodyLarge" style={styles.userRole}>
          {user?.role}
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Informações Pessoais
          </Text>
          <Divider style={styles.divider} />

          <InfoCard icon="identifier" label="ID do Socorrista" value={user?.id || 'N/A'} />
          <InfoCard icon="account" label="Nome Completo" value={user?.name || 'N/A'} />
          <InfoCard icon="email" label="Email" value={user?.email || 'N/A'} />
          <InfoCard icon="briefcase" label="Função" value={user?.role || 'N/A'} />
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Sobre o App
          </Text>
          <Divider style={styles.divider} />

          <View style={styles.aboutContainer}>
            <MaterialCommunityIcons name="medical-bag" size={50} color="#1565C0" />
            <Text variant="headlineSmall" style={styles.appName}>
              Ficharápida
            </Text>
            <Text variant="bodyMedium" style={styles.appDescription}>
              Sistema de Registro e Consulta de Fichas de Atendimento de Emergência
            </Text>
            <Text variant="bodySmall" style={styles.version}>
              Versão 1.0.0 (Mock)
            </Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonsContainer}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          buttonColor="#E53935"
          icon="logout"
        >
          Sair do Sistema
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
  header: {
    backgroundColor: '#1565C0',
    padding: 30,
    alignItems: 'center',
    paddingTop: 40,
  },
  avatar: {
    backgroundColor: '#0D47A1',
  },
  userName: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 15,
  },
  userRole: {
    color: '#BBDEFB',
    marginTop: 5,
  },
  card: {
    margin: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  divider: {
    marginBottom: 15,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  infoContent: {
    marginLeft: 15,
    flex: 1,
  },
  infoLabel: {
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontWeight: '500',
  },
  aboutContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  appName: {
    fontWeight: 'bold',
    color: '#1565C0',
    marginTop: 10,
  },
  appDescription: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  version: {
    color: '#999',
    marginTop: 15,
  },
  buttonsContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  logoutButton: {
    paddingVertical: 5,
  },
});
