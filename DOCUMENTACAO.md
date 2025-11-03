# 📱 Ficharápida - Documentação Completa

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Estrutura do Projeto](#estrutura-do-projeto)
3. [Fluxo de Navegação](#fluxo-de-navegação)
4. [Gerenciamento de Estado](#gerenciamento-de-estado)
5. [Telas e Funcionalidades](#telas-e-funcionalidades)
6. [Dados Mockados](#dados-mockados)
7. [Como Iniciar](#como-iniciar)

---

## 🎯 Visão Geral

O **Ficharápida** é uma aplicação React Native com Expo que simula um sistema de registro e consulta de fichas de atendimento de emergência. O app é **100% mockado**, sem necessidade de backend, ideal para demonstrações e protot ipagem.

### Características Principais:

- ✅ Autenticação simulada
- ✅ CRUD completo de fichas
- ✅ Busca e filtros
- ✅ Design moderno com React Native Paper
- ✅ Gerenciamento de estado com Context API
- ✅ Validações e feedback visual

---

## 🗂️ Estrutura do Projeto

```
FichaRapida-frontend/
│
├── app/                          # Diretório principal (Expo Router)
│   │
│   ├── _layout.tsx               # Layout raiz com providers
│   ├── index.tsx                 # Redirect inicial
│   │
│   ├── (tabs)/                   # Navegação em tabs
│   │   ├── _layout.tsx           # Layout das tabs
│   │   ├── index.tsx             # Tab Login (rota inicial)
│   │   └── explore.tsx           # Tab Dashboard (pós-login)
│   │
│   ├── login.tsx                 # Tela de Login standalone
│   ├── dashboard.tsx             # Dashboard standalone
│   ├── nova-ficha.tsx            # Formulário de nova ficha
│   ├── fichas.tsx                # Lista de fichas
│   ├── ficha-detalhes.tsx        # Detalhes de uma ficha
│   ├── perfil.tsx                # Perfil do socorrista
│   └── modal.tsx                 # Modal genérico (exemplo)
│
├── contexts/                     # Context API
│   ├── AuthContext.tsx           # Gerencia autenticação
│   └── FichaContext.tsx          # Gerencia fichas
│
├── components/                   # Componentes reutilizáveis
│   ├── ui/                       # Componentes de UI
│   └── ...                       # Outros componentes
│
├── constants/                    # Constantes e temas
│   └── theme.ts                  # Configurações de tema
│
├── hooks/                        # Hooks customizados
│   ├── use-color-scheme.ts
│   └── use-theme-color.ts
│
├── assets/                       # Imagens e recursos
│   └── images/
│
├── app.json                      # Configuração do Expo
├── package.json                  # Dependências
├── tsconfig.json                 # Configuração TypeScript
└── README.md                     # Documentação principal
```

---

## 🔄 Fluxo de Navegação

### Fluxo Principal:

```
[Início]
   │
   ├─> [Login] (/(tabs)/index.tsx)
   │      │
   │      └─> Login bem-sucedido
   │             │
   ├─> [Dashboard] (/(tabs)/explore.tsx)
   │      │
   │      ├─> [Nova Ficha] (/nova-ficha.tsx)
   │      │      │
   │      │      └─> Salvar → Volta ao Dashboard
   │      │
   │      ├─> [Fichas Cadastradas] (/fichas.tsx)
   │      │      │
   │      │      └─> [Detalhes da Ficha] (/ficha-detalhes.tsx)
   │      │             │
   │      │             ├─> Finalizar ficha
   │      │             └─> Excluir ficha
   │      │
   │      └─> [Perfil] (/perfil.tsx)
   │             │
   │             └─> Logout → Volta ao Login
   │
   └─> [Modal] (/modal.tsx) - Exemplo de modal
```

### Rotas Configuradas:

| Rota | Descrição | Header |
|------|-----------|---------|
| `/(tabs)` | Tabs principais | Oculto |
| `/(tabs)/index.tsx` | Login | Oculto |
| `/(tabs)/explore.tsx` | Dashboard | Visível |
| `/login` | Login standalone | Oculto |
| `/dashboard` | Dashboard standalone | Oculto |
| `/nova-ficha` | Nova ficha | "Nova Ficha" |
| `/fichas` | Lista | "Fichas Cadastradas" |
| `/ficha-detalhes` | Detalhes | "Detalhes da Ficha" |
| `/perfil` | Perfil | "Perfil" |
| `/modal` | Modal | Modal |

---

## 🔐 Gerenciamento de Estado

### AuthContext

**Responsabilidades:**
- Gerenciar usuário logado
- Controlar estado de autenticação
- Funções de login/logout

**Interface:**
```typescript
interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}
```

**Uso:**
```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

### FichaContext

**Responsabilidades:**
- Armazenar lista de fichas
- CRUD de fichas (Create, Read, Update, Delete)
- Buscar ficha por ID

**Interface:**
```typescript
interface FichaContextData {
  fichas: Ficha[];
  addFicha: (ficha: Omit<Ficha, 'id'>) => void;
  updateFicha: (id: string, ficha: Partial<Ficha>) => void;
  deleteFicha: (id: string) => void;
  getFichaById: (id: string) => Ficha | undefined;
}

interface Ficha {
  id: string;
  patientName: string;
  age: number;
  gender: 'Masculino' | 'Feminino' | 'Outro';
  mainComplaint: string;
  date: string;
  time: string;
  observations: string;
  status: 'Em andamento' | 'Finalizada';
}
```

**Uso:**
```typescript
const { fichas, addFicha, updateFicha, deleteFicha, getFichaById } = useFichas();
```

---

## 📱 Telas e Funcionalidades

### 1. 🔐 Login (`/(tabs)/index.tsx` ou `/login.tsx`)

**Funcionalidades:**
- Campos de email e senha
- Validação básica (campos não vazios)
- Login mockado (aceita qualquer credencial)
- Redirect automático para Dashboard após login

**Componentes:**
- TextInput (email, senha)
- Button (Entrar)
- MaterialCommunityIcons (medical-bag)

**Fluxo:**
1. Usuário insere email e senha
2. Clica em "Entrar"
3. Sistema valida (não vazio)
4. Chama `login()` do AuthContext
5. Redireciona para `/explore`

---

### 2. 📊 Dashboard (`/(tabs)/explore.tsx` ou `/dashboard.tsx`)

**Funcionalidades:**
- Exibe nome do socorrista logado
- Mostra estatísticas:
  - Total de fichas em andamento
  - Total de fichas finalizadas
- Botões de navegação para:
  - Nova Ficha
  - Fichas Cadastradas
  - Perfil

**Componentes:**
- Card (estatísticas)
- Button/Card (navegação)
- MaterialCommunityIcons (vários)

---

### 3. ➕ Nova Ficha (`/nova-ficha.tsx`)

**Funcionalidades:**
- Formulário completo:
  - Nome do paciente *
  - Idade *
  - Gênero (Masculino/Feminino/Outro) *
  - Queixa principal *
  - Observações (opcional)
- Data/hora preenchida automaticamente
- Validação de campos obrigatórios
- Salvar ficha
- Feedback visual (Alert)

**Componentes:**
- TextInput (nome, idade, queixa, observações)
- SegmentedButtons (gênero)
- Button (Salvar)

**Fluxo:**
1. Preenche formulário
2. Clica em "Salvar"
3. Sistema valida campos
4. Chama `addFicha()` do FichaContext
5. Exibe Alert de sucesso
6. Volta para tela anterior

---

### 4. 📋 Lista de Fichas (`/fichas.tsx`)

**Funcionalidades:**
- Lista todas as fichas
- Barra de busca (por nome do paciente)
- Card para cada ficha mostrando:
  - Nome do paciente
  - Data/hora do atendimento
  - Queixa principal
  - Idade e gênero
  - Status (chip colorido)
- Click em ficha → Detalhes

**Componentes:**
- Searchbar
- FlatList/ScrollView
- Card (cada ficha)
- Chip (status)

---

### 5. 🔍 Detalhes da Ficha (`/ficha-detalhes.tsx`)

**Funcionalidades:**
- Exibe todos os dados da ficha
- Badge de status (cor dinâmica)
- Informações organizadas:
  - Paciente
  - Idade
  - Gênero
  - Data/Hora
  - Queixa Principal
  - Observações
- Ações:
  - Finalizar ficha (se em andamento)
  - Excluir ficha
- Confirmações com Alert

**Componentes:**
- Card (informações)
- Button (ações)
- Alert (confirmações)

**Fluxo de Finalizar:**
1. Clica em "Finalizar Ficha"
2. Alert de confirmação
3. Chama `updateFicha()` com status 'Finalizada'
4. Exibe Alert de sucesso

**Fluxo de Excluir:**
1. Clica em "Excluir Ficha"
2. Alert de confirmação (destructive)
3. Chama `deleteFicha()`
4. Volta para tela anterior

---

### 6. 👤 Perfil (`/perfil.tsx`)

**Funcionalidades:**
- Avatar do usuário
- Informações pessoais:
  - ID do Socorrista
  - Nome completo
  - Email
  - Função
- Sobre o app:
  - Nome e descrição
  - Versão
- Botão "Sair"
- Logout com confirmação

**Componentes:**
- Avatar
- Card (informações)
- Button (Sair)

**Fluxo de Logout:**
1. Clica em "Sair"
2. Alert de confirmação
3. Chama `logout()` do AuthContext
4. Redireciona para Login

---

## 🗄️ Dados Mockados

### Usuário Mock (AuthContext):

Ao fazer login com **qualquer** email/senha, é criado:

```typescript
{
  id: '1',
  name: 'Dr. João Silva',
  email: '<email inserido>',
  role: 'Socorrista',
}
```

### Fichas Mock (FichaContext):

3 fichas pré-cadastradas:

```typescript
[
  {
    id: '1',
    patientName: 'Maria Santos',
    age: 45,
    gender: 'Feminino',
    mainComplaint: 'Dor no peito',
    date: '2025-11-03',
    time: '10:30',
    observations: 'Paciente apresenta dor torácica há 2 horas',
    status: 'Em andamento',
  },
  {
    id: '2',
    patientName: 'Carlos Oliveira',
    age: 32,
    gender: 'Masculino',
    mainComplaint: 'Fratura no braço',
    date: '2025-11-03',
    time: '09:15',
    observations: 'Queda de moto, fratura exposta no antebraço direito',
    status: 'Finalizada',
  },
  {
    id: '3',
    patientName: 'Ana Paula Costa',
    age: 28,
    gender: 'Feminino',
    mainComplaint: 'Crise de ansiedade',
    date: '2025-11-03',
    time: '11:00',
    observations: 'Hiperventilação, tremores',
    status: 'Em andamento',
  },
]
```

---

## 🚀 Como Iniciar

### Passo a Passo:

```bash
# 1. Navegue até o projeto
cd FichaRapida-frontend

# 2. Instale as dependências
npm install

# 3. Inicie o servidor
npm start

# 4. Escolha a plataforma:
# - Pressione 'a' para Android
# - Pressione 'i' para iOS (apenas macOS)
# - Pressione 'w' para Web
# - Ou escaneie o QR Code com Expo Go
```

### Teste Rápido:

1. **Login**: Use `teste@email.com` / `123456`
2. **Dashboard**: Veja as estatísticas
3. **Nova Ficha**: Cadastre uma ficha teste
4. **Lista**: Busque pela ficha criada
5. **Detalhes**: Finalize ou exclua a ficha
6. **Perfil**: Veja suas informações e faça logout

---

## 🎨 Personalização

### Cores (constants/theme.ts):

```typescript
const theme = {
  colors: {
    primary: '#1565C0',     // Azul principal
    accent: '#E53935',      // Vermelho (ações)
    success: '#43A047',     // Verde (sucesso)
    background: '#E3F2FD',  // Fundo claro
    surface: '#FFFFFF',     // Superfícies
    text: '#000000',        // Texto principal
    disabled: '#BDBDBD',    // Desabilitado
  },
};
```

### Adicionar Nova Tela:

1. Crie arquivo em `app/minha-tela.tsx`
2. Adicione a rota em `app/_layout.tsx`:
```typescript
<Stack.Screen name="minha-tela" options={{ title: 'Minha Tela' }} />
```
3. Navegue com:
```typescript
router.push('/minha-tela');
```

---

## 🐛 Troubleshooting

### Problema: App não inicia

**Solução:**
```bash
# Limpe o cache
npm start -- --clear

# Ou
expo start -c
```

### Problema: Erro de TypeScript

**Solução:**
```bash
# Reinstale dependências
rm -rf node_modules
npm install
```

### Problema: Navegação não funciona

**Verificar:**
- Todas as rotas estão em `_layout.tsx`?
- Os nomes das rotas estão corretos?
- Providers estão envolvendo as rotas?

---

## 📚 Recursos Adicionais

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Paper](https://callstack.github.io/react-native-paper/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Navigation](https://reactnavigation.org/)

---

## ✅ Checklist de Funcionalidades

- [x] Login mockado
- [x] Dashboard com estatísticas
- [x] Cadastro de fichas
- [x] Listagem com busca
- [x] Detalhes completos
- [x] Edição de status
- [x] Exclusão com confirmação
- [x] Perfil do usuário
- [x] Logout
- [x] Validações
- [x] Feedback visual
- [x] Design responsivo
- [x] Navegação fluida

---

**🎉 Projeto 100% funcional e pronto para uso!**

💡 **Dica Final**: Explore o código, customize as cores, adicione novas funcionalidades e divirta-se!
