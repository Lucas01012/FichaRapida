# Ficharápida - Frontend 🏥

**Sistema de Registro e Consulta de Fichas de Atendimento de Emergência**

## � Sobre o Projeto

O **Ficharápida** é uma aplicação React Native com Expo que simula um sistema completo de registro e consulta de fichas de atendimento de emergência médica. A aplicação é totalmente mockada (sem backend), utilizando dados simulados e armazenamento local via Context API.

## ✨ Funcionalidades

### ✅ Implementadas

- **🔐 Tela de Login**: Autenticação simulada (aceita qualquer email/senha)
- **📊 Dashboard**: Painel com estatísticas de fichas em andamento e finalizadas
- **➕ Nova Ficha**: Formulário completo para cadastrar fichas de atendimento
- **📋 Lista de Fichas**: Visualização com busca por nome do paciente
- **🔍 Detalhes**: Visualização completa e edição de status das fichas
- **👤 Perfil**: Informações do socorrista logado
- **🎨 UI Moderna**: Interface limpa com React Native Paper
- **✅ Validações**: Feedback visual com alerts e validações de campos

## 🎨 Design

### Paleta de Cores:
- **Azul principal**: `#1565C0`
- **Vermelho (Ações)**: `#E53935`
- **Verde (Sucesso)**: `#43A047`
- **Fundo**: `#E3F2FD`

### Componentes:
- React Native Paper para UI
- MaterialCommunityIcons para ícones
- Layout responsivo e moderno

## 🏗️ Arquitetura

```
FichaRapida-frontend/
├── app/
│   ├── contexts/          # Context API (Auth e Fichas)
│   │   ├── AuthContext.tsx
│   │   └── FichaContext.tsx
│   ├── (tabs)/            # Navegação principal
│   │   ├── index.tsx      # Tela de Login
│   │   └── explore.tsx    # Dashboard
│   ├── login.tsx          # Login standalone
│   ├── dashboard.tsx      # Painel principal
│   ├── nova-ficha.tsx     # Cadastro de fichas
│   ├── fichas.tsx         # Lista de fichas
│   ├── ficha-detalhes.tsx # Detalhes completos
│   └── perfil.tsx         # Perfil do usuário
├── components/            # Componentes reutilizáveis
├── constants/             # Temas e constantes
└── hooks/                 # Hooks customizados
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Expo CLI (opcional)
- Emulador Android/iOS ou Expo Go no celular

### Instalação

```bash
# Navegue até a pasta do projeto
cd FichaRapida-frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm start
```

### Executando

```bash
# Android
npm run android

# iOS (apenas macOS)
npm run ios

# Web
npm run web
```

## 📱 Guia de Uso

### 1. Login
- Abra o app
- Digite **qualquer** email e senha
- Clique em "Entrar"
- ✨ Você será logado automaticamente!

### 2. Dashboard
- Visualize estatísticas de fichas
- Acesse as funcionalidades pelos botões:
  - Nova Ficha
  - Fichas Cadastradas
  - Perfil

### 3. Cadastrar Ficha
- Preencha os campos obrigatórios (*)
  - Nome do paciente
  - Idade
  - Gênero
  - Queixa principal
- Adicione observações (opcional)
- Clique em "Salvar Ficha"

### 4. Consultar Fichas
- Veja todas as fichas cadastradas
- Use a barra de busca para filtrar
- Clique em uma ficha para ver detalhes

### 5. Gerenciar Fichas
- Visualize informações completas
- Finalize fichas em andamento
- Exclua fichas (com confirmação)

### 6. Perfil
- Visualize suas informações
- Sair do sistema

## 🗂️ Dados Mockados

O app inclui 3 fichas de exemplo:

1. **Maria Santos**, 45 anos - Dor no peito (Em andamento)
2. **Carlos Oliveira**, 32 anos - Fratura no braço (Finalizada)
3. **Ana Paula Costa**, 28 anos - Crise de ansiedade (Em andamento)

## 🔧 Tecnologias

- **React Native** 0.81.5
- **Expo** ~54.0.20
- **Expo Router** ~6.0.13 (Navegação)
- **React Native Paper** (UI Components)
- **TypeScript** (Tipagem estática)
- **Context API** (Gerenciamento de estado)
- **@expo/vector-icons** (Ícones)

## 📦 Principais Dependências

```json
{
  "expo": "~54.0.20",
  "react": "19.1.0",
  "react-native": "0.81.5",
  "expo-router": "~6.0.13",
  "react-native-paper": "^5.x",
  "@react-navigation/native": "^7.1.8",
  "@expo/vector-icons": "^15.0.3"
}
```

## 🎯 Status do Projeto

✅ **Versão 1.0 - Completa!**

### Funcionalidades Implementadas:

- ✅ Sistema de autenticação mockado
- ✅ Dashboard com estatísticas em tempo real
- ✅ Cadastro de novas fichas com validação
- ✅ Listagem com busca
- ✅ Detalhamento completo
- ✅ Finalização de fichas
- ✅ Exclusão com confirmação
- ✅ Perfil do usuário
- ✅ Logout funcional
- ✅ Feedback visual
- ✅ Design responsivo

## 🔜 Melhorias Futuras

- [ ] Animações com React Native Reanimated
- [ ] Edição completa de fichas existentes
- [ ] Filtros avançados (data, status)
- [ ] Gráficos de estatísticas
- [ ] Exportação de relatórios
- [ ] Modo escuro
- [ ] Persistência com AsyncStorage
- [ ] Integração com backend
- [ ] Notificações
- [ ] Modo offline

## 🤝 Contribuindo

Este é um projeto educacional/demonstrativo. Sugestões são bem-vindas!

## 📝 Notas Importantes

⚠️ **Este projeto é 100% mockado**
- Não há conexão com backend
- Todos os dados são simulados
- Informações não são persistidas entre sessões
- Ideal para demonstração e prototipagem

## 📄 Licença

Projeto educacional e demonstrativo.

---

**Desenvolvido com ❤️ para o sistema Ficharápida**

💡 **Dica**: Use qualquer email/senha para entrar no sistema!
