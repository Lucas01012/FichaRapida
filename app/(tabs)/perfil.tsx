import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Text, Button, Avatar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function PerfilScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Confirmar Logout',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: () => {
            logout();
            router.replace('/(tabs)' as any);
          },
        },
      ]
    );
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Usuário não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Icon size={100} icon="account-circle" style={styles.avatar} />
        <Text variant="headlineMedium" style={styles.userName}>
          {user.name}
        </Text>
        <Text variant="bodyLarge" style={styles.userRole}>
          {user.role}
        </Text>
      </View>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Informações Pessoais
          </Text>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="email" size={24} color="#1565C0" />
            <View style={styles.infoTextContainer}>
              <Text variant="bodySmall" style={styles.infoLabel}>
                Email
              </Text>
              <Text variant="bodyLarge">{user.email}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="badge-account" size={24} color="#1565C0" />
            <View style={styles.infoTextContainer}>
              <Text variant="bodySmall" style={styles.infoLabel}>
                Função
              </Text>
              <Text variant="bodyLarge">{user.role}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="account" size={24} color="#1565C0" />
            <View style={styles.infoTextContainer}>
              <Text variant="bodySmall" style={styles.infoLabel}>
                Nome Completo
              </Text>
              <Text variant="bodyLarge">{user.name}</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Configurações
          </Text>

          <Button
            mode="outlined"
            icon="lock-reset"
            onPress={() => Alert.alert('Alterar Senha', 'Funcionalidade em desenvolvimento')}
            style={styles.actionButton}
          >
            Alterar Senha
          </Button>

          <Button
            mode="outlined"
            icon="bell"
            onPress={() => Alert.alert('Notificações', 'Funcionalidade em desenvolvimento')}
            style={styles.actionButton}
          >
            Configurar Notificações
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleLarge" style={styles.cardTitle}>
            Sobre o App
          </Text>

          <View style={styles.aboutRow}>
            <Text variant="bodyMedium">Versão:</Text>
            <Text variant="bodyMedium" style={styles.aboutValue}>
              1.0.0
            </Text>
          </View>

          <View style={styles.aboutRow}>
            <Text variant="bodyMedium">Desenvolvido por:</Text>
            <Text variant="bodyMedium" style={styles.aboutValue}>
              Equipe Ficharápida
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        icon="logout"
        onPress={handleLogout}
        style={styles.logoutButton}
        buttonColor="#E53935"
      >
        Sair
      </Button>

      <View style={styles.footer} />
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
    backgroundColor: '#fff',
  },
  userName: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 16,
  },
  userRole: {
    color: '#BBDEFB',
    marginTop: 4,
  },
  card: {
    margin: 16,
    marginBottom: 0,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: 'bold',
    color: '#1565C0',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  infoTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  infoLabel: {
    color: '#666',
  },
  actionButton: {
    marginBottom: 12,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  aboutValue: {
    fontWeight: 'bold',
    color: '#1565C0',
  },
  logoutButton: {
    margin: 16,
    marginTop: 24,
  },
  footer: {
    height: 20,
  },
});
