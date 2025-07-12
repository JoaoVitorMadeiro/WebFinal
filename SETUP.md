# 🚀 Setup Rápido - Racha a Conta

## ⚡ Configuração em 5 minutos

### 1. Criar MockAPI
1. Acesse [mockapi.io](https://mockapi.io/)
2. Crie uma conta gratuita
3. Clique em "Create Project"
4. Nome: `racha-conta`

### 2. Criar Resources

**Resource 1: `membros`**
- Adicione campo: `nome` (String, required)

**Resource 2: `despesas`**
- Adicione campos:
  - `descricao` (String, required)
  - `valor` (Number, required)
  - `pagadorId` (String, required)
  - `data` (String, required)

### 3. Configurar URLs
1. Copie a URL do seu projeto MockAPI
2. Edite `api-config.js`
3. Substitua `your-project-id` pelo ID real

### 4. Testar
1. Abra `index.html` no navegador
2. Abra `test-api.html` para testar a API
3. Verifique o console (F12) para erros

## 📁 Arquivos do Projeto

- `index.html` - Aplicação principal
- `script.js` - Lógica da aplicação
- `style.css` - Estilos
- `api-config.js` - Configuração da API
- `test-api.html` - Página de testes
- `README.md` - Documentação completa

## 🔧 Operações HTTP Implementadas

✅ **GET** - Buscar dados
✅ **POST** - Criar dados  
✅ **PUT** - Atualizar dados
✅ **DELETE** - Excluir dados

## 🎯 Funcionalidades

- ✅ CRUD completo para membros e despesas
- ✅ Interface moderna com modais
- ✅ Cálculo automático de balanço
- ✅ Tratamento de erros
- ✅ Design responsivo
- ✅ Mensagens de feedback

## 🐛 Solução de Problemas

**Erro de CORS:**
- Use um servidor local (Live Server no VS Code)

**API não responde:**
- Verifique as URLs no `api-config.js`
- Confirme se o MockAPI está ativo

**Dados não aparecem:**
- Teste primeiro com `test-api.html`
- Verifique o console do navegador

## 📞 Suporte

Se tiver problemas:
1. Verifique o console (F12)
2. Teste com `test-api.html`
3. Confirme as URLs da API
4. Verifique se o MockAPI está funcionando 