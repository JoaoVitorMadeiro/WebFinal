// === EXEMPLO DE CONFIGURAÇÃO DO MOCKAPI ===
// Copie este arquivo para api-config.js e substitua as URLs

// Exemplo de configuração - SUBSTITUA pelos seus dados reais
const API_BASE_URL = 'https://mockapi.io/projects/68726c0376a5723aacd4a480';
const API_MEMBROS = `${API_BASE_URL}/membros`;
const API_DESPESAS = `${API_BASE_URL}/despesas`;

// === INSTRUÇÕES PARA CONFIGURAR ===

/*
1. Acesse https://mockapi.io/
2. Crie uma conta ou faça login
3. Crie um novo projeto
4. Adicione dois resources:

   RESOURCE 1: "membros"
   - nome (String, required)

   RESOURCE 2: "despesas"  
   - descricao (String, required)
   - valor (Number, required)
   - pagadorId (String, required)
   - data (String, required)

5. Copie a URL do seu projeto
6. Substitua 'SEU_PROJECT_ID_AQUI' pelo ID real do seu projeto

Exemplo de URL real:
const API_BASE_URL = 'https://mockapi.io/projects/64f8a1234567890abcdef123';
*/

// === TESTE RÁPIDO ===
// Descomente as linhas abaixo para testar se a API está funcionando:

/*
// Teste de conectividade
fetch(API_MEMBROS)
  .then(response => response.json())
  .then(data => console.log('✅ API conectada!', data))
  .catch(error => console.error('❌ Erro na API:', error));
*/

// === ESTRUTURA DOS DADOS ===

/*
Membros:
{
  "id": "1",
  "nome": "João Silva"
}

Despesas:
{
  "id": "1", 
  "descricao": "Almoço",
  "valor": 25.50,
  "pagadorId": "1",
  "data": "2024-01-15T10:30:00.000Z"
}
*/ 