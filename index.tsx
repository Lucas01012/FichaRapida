import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Card } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (isAuthenticated) {
      router.replace('/explore');
    }
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      setLoading(false);
      if (success) {
        router.replace('/explore');
      }
    }, 500);
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <MaterialCommunityIcons name="medical-bag" size={80} color="#1565C0" />
          <Text variant="displaySmall" style={styles.title}>Ficharápida</Text>
          <Text variant="bodyLarge" style={styles.subtitle}>Sistema de Fichas de Emergência</Text>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <TextInput label="Email" value={email} onChangeText={setEmail} mode="outlined" keyboardType="email-address" autoCapitalize="none" left={<TextInput.Icon icon="email" />} style={styles.input} />
            <TextInput label="Senha" value={password} onChangeText={setPassword} mode="outlined" secureTextEntry left={<TextInput.Icon icon="lock" />} style={styles.input} />
            <Button mode="contained" onPress={handleLogin} loading={loading} disabled={loading} style={styles.button} buttonColor="#1565C0">Entrar</Button>
            <Text variant="bodySmall" style={styles.hint}> Dica: Use qualquer email e senha para entrar</Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E3F2FD' },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 40 },
  title: { fontWeight: 'bold', color: '#1565C0', marginTop: 10 },
  subtitle: { color: '#666', marginTop: 5 },
  card: { elevation: 4 },
  input: { marginBottom: 15 },
  button: { marginTop: 10, paddingVertical: 5 },
  hint: { textAlign: 'center', marginTop: 20, color: '#666' },
});
