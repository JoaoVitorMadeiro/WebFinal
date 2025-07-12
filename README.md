# Racha a Conta - API com MockAPI

Este projeto implementa uma aplicação web para gerenciar despesas em grupo com uma API fake usando MockAPI.

## 🚀 Funcionalidades

- **CRUD Completo**: Criar, Ler, Atualizar e Deletar membros e despesas
- **Operações HTTP**: GET, POST, PUT e DELETE implementados
- **Interface Moderna**: Design responsivo com modais e mensagens
- **Cálculo Automático**: Balanço financeiro automático
- **Tratamento de Erros**: Mensagens de feedback para o usuário

## 📋 Pré-requisitos

- Conta no [MockAPI](https://mockapi.io/)
- Navegador web moderno

## ⚙️ Configuração do MockAPI

### 1. Criar Projeto no MockAPI

1. Acesse [mockapi.io](https://mockapi.io/)
2. Faça login ou crie uma conta
3. Clique em "Create Project"
4. Dê um nome ao projeto (ex: "racha-conta")

### 2. Criar Resource "membros"

1. Clique em "Add Resource"
2. Configure o resource "membros":
   ```
   Name: membros
   Schema:
   - nome (String, required)
   ```

### 3. Criar Resource "despesas"

1. Clique em "Add Resource" novamente
2. Configure o resource "despesas":
   ```
   Name: despesas
   Schema:
   - descricao (String, required)
   - valor (Number, required)
   - pagadorId (String, required)
   - data (String, required)
   ```

### 4. Obter URLs da API

1. No seu projeto MockAPI, copie a URL base
2. As URLs finais serão:
   - Membros: `https://mockapi.io/projects/SEU_PROJECT_ID/membros`
   - Despesas: `https://mockapi.io/projects/SEU_PROJECT_ID/despesas`

## 🔧 Configuração da Aplicação

### 1. Atualizar URLs da API

Edite o arquivo `api-config.js` e substitua as URLs:

```javascript
// Substitua 'your-project-id' pelo ID real do seu projeto
const API_BASE_URL = 'https://mockapi.io/projects/your-project-id';
```

### 2. Testar a API

Abra o console do navegador (F12) e teste as funções:

```javascript
// Testar GET - buscar membros
API.getMembros().then(console.log);

// Testar POST - criar membro
API.createMembro("João").then(console.log);

// Testar PUT - atualizar membro
API.updateMembro("ID_DO_MEMBRO", "João Silva").then(console.log);

// Testar DELETE - excluir membro
API.deleteMembro("ID_DO_MEMBRO").then(console.log);
```

## 📁 Estrutura do Projeto

```
WebFinal/
├── index.html          # Interface principal
├── script.js           # Lógica da aplicação
├── style.css           # Estilos CSS
├── api-config.js       # Configuração da API
└── README.md           # Este arquivo
```

## 🔄 Operações HTTP Implementadas

### Membros

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/membros` | Buscar todos os membros |
| GET | `/membros/:id` | Buscar membro específico |
| POST | `/membros` | Criar novo membro |
| PUT | `/membros/:id` | Atualizar membro |
| DELETE | `/membros/:id` | Excluir membro |

### Despesas

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/despesas` | Buscar todas as despesas |
| GET | `/despesas/:id` | Buscar despesa específica |
| POST | `/despesas` | Criar nova despesa |
| PUT | `/despesas/:id` | Atualizar despesa |
| DELETE | `/despesas/:id` | Excluir despesa |

## 🎯 Como Usar

1. **Adicionar Membros**: Digite o nome e clique em "Adicionar Membro"
2. **Adicionar Despesas**: Preencha descrição, valor e selecione quem pagou
3. **Editar**: Clique no botão "Editar" ao lado do item
4. **Excluir**: Clique no botão "Excluir" ao lado do item
5. **Ver Balanço**: O cálculo é automático e mostra quem deve pagar para quem

## 🎨 Funcionalidades da Interface

- **Modais de Edição**: Interface intuitiva para editar dados
- **Mensagens de Feedback**: Notificações de sucesso e erro
- **Design Responsivo**: Funciona em desktop e mobile
- **Validação**: Campos obrigatórios e validação de dados
- **Confirmação**: Diálogos de confirmação para exclusões

## 🐛 Tratamento de Erros

A aplicação inclui tratamento robusto de erros:

- **Erro de Rede**: Mensagens quando a API não responde
- **Erro de Validação**: Feedback sobre dados inválidos
- **Erro de Servidor**: Tratamento de códigos HTTP de erro
- **Fallback**: Interface continua funcional mesmo com erros

## 📱 Responsividade

A interface se adapta a diferentes tamanhos de tela:

- **Desktop**: Layout em grid com duas colunas
- **Tablet**: Layout ajustado para telas médias
- **Mobile**: Layout em coluna única com botões otimizados

## 🔒 Segurança

- **Validação de Entrada**: Todos os dados são validados
- **Sanitização**: Dados são limpos antes de enviar
- **Tratamento de Erros**: Não expõe informações sensíveis

## 🚀 Deploy

Para fazer deploy da aplicação:

1. **GitHub Pages**: Faça upload dos arquivos para um repositório GitHub
2. **Netlify**: Arraste a pasta para o Netlify
3. **Vercel**: Conecte seu repositório ao Vercel
4. **Servidor Local**: Use qualquer servidor web local

## 📞 Suporte

Se encontrar problemas:

1. Verifique se as URLs da API estão corretas
2. Confirme se o MockAPI está funcionando
3. Verifique o console do navegador para erros
4. Teste as funções da API individualmente

## 🎉 Próximos Passos

Possíveis melhorias futuras:

- [ ] Autenticação de usuários
- [ ] Histórico de despesas
- [ ] Exportação de relatórios
- [ ] Notificações em tempo real
- [ ] Backup automático dos dados 