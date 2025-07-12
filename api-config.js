// === CONFIGURAÇÃO DA API MOCKAPI ===
// Substitua estas URLs pelos endpoints reais do seu MockAPI
const API_BASE_URL = 'https://mockapi.io/projects/68726c0376a5723aacd4a480';
const API_MEMBROS = `${API_BASE_URL}/membros`;
const API_DESPESAS = `${API_BASE_URL}/despesas`;

// === FUNÇÕES DE API - OPERAÇÕES HTTP ===

// GET - Buscar todos os membros
async function getMembros() {
    try {
        const response = await fetch(API_MEMBROS);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar membros:', error);
        return [];
    }
}

// GET - Buscar um membro específico
async function getMembro(id) {
    try {
        const response = await fetch(`${API_MEMBROS}/${id}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar membro:', error);
        return null;
    }
}

// POST - Criar novo membro
async function createMembro(nome) {
    try {
        const response = await fetch(API_MEMBROS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome })
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar membro:', error);
        throw error;
    }
}

// PUT - Atualizar membro existente
async function updateMembro(id, nome) {
    try {
        const response = await fetch(`${API_MEMBROS}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome })
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar membro:', error);
        throw error;
    }
}

// DELETE - Excluir membro
async function deleteMembro(id) {
    try {
        const response = await fetch(`${API_MEMBROS}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error('Erro ao excluir membro:', error);
        throw error;
    }
}

// GET - Buscar todas as despesas
async function getDespesas() {
    try {
        const response = await fetch(API_DESPESAS);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        return [];
    }
}

// GET - Buscar uma despesa específica
async function getDespesa(id) {
    try {
        const response = await fetch(`${API_DESPESAS}/${id}`);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao buscar despesa:', error);
        return null;
    }
}

// POST - Criar nova despesa
async function createDespesa(descricao, valor, pagadorId) {
    try {
        const response = await fetch(API_DESPESAS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                descricao,
                valor: parseFloat(valor),
                pagadorId,
                data: new Date().toISOString()
            })
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao criar despesa:', error);
        throw error;
    }
}

// PUT - Atualizar despesa existente
async function updateDespesa(id, descricao, valor, pagadorId) {
    try {
        const response = await fetch(`${API_DESPESAS}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                descricao,
                valor: parseFloat(valor),
                pagadorId,
                data: new Date().toISOString()
            })
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao atualizar despesa:', error);
        throw error;
    }
}

// DELETE - Excluir despesa
async function deleteDespesa(id) {
    try {
        const response = await fetch(`${API_DESPESAS}/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error('Erro ao excluir despesa:', error);
        throw error;
    }
}

// === EXPORTAÇÃO DAS FUNÇÕES ===
window.API = {
    getMembros,
    getMembro,
    createMembro,
    updateMembro,
    deleteMembro,
    getDespesas,
    getDespesa,
    createDespesa,
    updateDespesa,
    deleteDespesa
}; 