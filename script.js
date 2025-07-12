// === CONFIGURAÇÃO: Insira aqui os endpoints da sua MockAPI ===
const API_MEMBROS = 'https://68726c0376a5723aacd4a47f.mockapi.io/membros'; // Altere para o endpoint real
const API_DESPESAS = 'https://68726c0376a5723aacd4a47f.mockapi.io/despesas'; // Altere para o endpoint real

// === ELEMENTOS DA INTERFACE ===
const formMembro = document.getElementById('form-membro');
const nomeMembroInput = document.getElementById('nome-membro');
const listaMembros = document.getElementById('lista-membros');
const formDespesa = document.getElementById('form-despesa');
const descricaoDespesaInput = document.getElementById('descricao-despesa');
const valorDespesaInput = document.getElementById('valor-despesa');
const pagadorDespesaSelect = document.getElementById('pagador-despesa');
const listaDespesas = document.getElementById('lista-despesas');
const balancoDiv = document.getElementById('balanco');

// === FUNÇÕES DE ATUALIZAÇÃO DA INTERFACE ===

async function atualizarMembros() {
    try {
        const membros = await API.getMembros();
        listaMembros.innerHTML = '';
        pagadorDespesaSelect.innerHTML = '<option value="">Quem pagou?</option>';
        
        membros.forEach(membro => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${membro.nome}</span>
                <div class="acoes-membro">
                    <button class="btn-editar" data-id="${membro.id}" data-nome="${membro.nome}">Editar</button>
                    <button class="btn-excluir" data-id="${membro.id}">Excluir</button>
                </div>
            `;
            listaMembros.appendChild(li);
            
            // Adiciona ao select de pagador
            const option = document.createElement('option');
            option.value = membro.id;
            option.textContent = membro.nome;
            pagadorDespesaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao atualizar membros:', error);
        mostrarMensagem('Erro ao carregar membros', 'erro');
    }
}

async function atualizarDespesas() {
    try {
        const despesas = await API.getDespesas();
        const membros = await API.getMembros();
        const idToNome = Object.fromEntries(membros.map(m => [m.id, m.nome]));
        
        listaDespesas.innerHTML = '';
        despesas.forEach(despesa => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div class="info-despesa">
                    <span class="descricao">${despesa.descricao}</span>
                    <span class="valor">R$ ${Number(despesa.valor).toFixed(2)}</span>
                    <span class="pagador">Pago por: ${idToNome[despesa.pagadorId] || 'N/A'}</span>
                </div>
                <div class="acoes-despesa">
                    <button class="btn-editar" data-id="${despesa.id}" data-descricao="${despesa.descricao}" data-valor="${despesa.valor}" data-pagador="${despesa.pagadorId}">Editar</button>
                    <button class="btn-excluir" data-id="${despesa.id}">Excluir</button>
                </div>
            `;
            listaDespesas.appendChild(li);
        });
    } catch (error) {
        console.error('Erro ao atualizar despesas:', error);
        mostrarMensagem('Erro ao carregar despesas', 'erro');
    }
}

// === FUNÇÕES DE MENSAGENS ===
function mostrarMensagem(texto, tipo = 'info') {
    const mensagem = document.createElement('div');
    mensagem.className = `mensagem mensagem-${tipo}`;
    mensagem.textContent = texto;
    document.body.appendChild(mensagem);
    
    setTimeout(() => {
        mensagem.remove();
    }, 3000);
}

// === FUNÇÕES DE EDIÇÃO ===
function mostrarModalEdicao(tipo, dados = {}) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>Editar ${tipo === 'membro' ? 'Membro' : 'Despesa'}</h3>
            <form id="form-edicao">
                ${tipo === 'membro' ? 
                    `<input type="text" id="edit-nome" value="${dados.nome || ''}" placeholder="Nome" required>` :
                    `<input type="text" id="edit-descricao" value="${dados.descricao || ''}" placeholder="Descrição" required>
                     <input type="number" id="edit-valor" value="${dados.valor || ''}" placeholder="Valor" min="0.01" step="0.01" required>
                     <select id="edit-pagador" required>
                         <option value="">Quem pagou?</option>
                     </select>`
                }
                <div class="botoes-modal">
                    <button type="submit">Salvar</button>
                    <button type="button" class="btn-cancelar">Cancelar</button>
                </div>
            </form>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Preencher select de pagadores se for edição de despesa
    if (tipo === 'despesa') {
        API.getMembros().then(membros => {
            const select = modal.querySelector('#edit-pagador');
            membros.forEach(membro => {
                const option = document.createElement('option');
                option.value = membro.id;
                option.textContent = membro.nome;
                if (membro.id === dados.pagadorId) option.selected = true;
                select.appendChild(option);
            });
        });
    }
    
    // Eventos do modal
    const form = modal.querySelector('#form-edicao');
    const btnCancelar = modal.querySelector('.btn-cancelar');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            if (tipo === 'membro') {
                const nome = modal.querySelector('#edit-nome').value;
                await API.updateMembro(dados.id, nome);
                mostrarMensagem('Membro atualizado com sucesso!', 'sucesso');
            } else {
                const descricao = modal.querySelector('#edit-descricao').value;
                const valor = modal.querySelector('#edit-valor').value;
                const pagadorId = modal.querySelector('#edit-pagador').value;
                await API.updateDespesa(dados.id, descricao, valor, pagadorId);
                mostrarMensagem('Despesa atualizada com sucesso!', 'sucesso');
            }
            modal.remove();
            await atualizarMembros();
            await atualizarDespesas();
            await atualizarBalanco();
        } catch (error) {
            console.error('Erro ao atualizar:', error);
            mostrarMensagem('Erro ao atualizar', 'erro');
        }
    });
    
    btnCancelar.addEventListener('click', () => {
        modal.remove();
    });
}

// === EVENTOS ===
formMembro.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = nomeMembroInput.value.trim();
    if (!nome) return;
    
    try {
        await API.createMembro(nome);
        nomeMembroInput.value = '';
        await atualizarMembros();
        mostrarMensagem('Membro adicionado com sucesso!', 'sucesso');
    } catch (error) {
        console.error('Erro ao adicionar membro:', error);
        mostrarMensagem('Erro ao adicionar membro', 'erro');
    }
});

formDespesa.addEventListener('submit', async (e) => {
    e.preventDefault();
    const descricao = descricaoDespesaInput.value.trim();
    const valor = valorDespesaInput.value;
    const pagadorId = pagadorDespesaSelect.value;
    
    if (!descricao || !valor || !pagadorId) return;
    
    try {
        await API.createDespesa(descricao, valor, pagadorId);
        descricaoDespesaInput.value = '';
        valorDespesaInput.value = '';
        pagadorDespesaSelect.value = '';
        await atualizarDespesas();
        await atualizarBalanco();
        mostrarMensagem('Despesa adicionada com sucesso!', 'sucesso');
    } catch (error) {
        console.error('Erro ao adicionar despesa:', error);
        mostrarMensagem('Erro ao adicionar despesa', 'erro');
    }
});

// Eventos para membros (editar e excluir)
listaMembros.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-editar')) {
        const id = e.target.getAttribute('data-id');
        const nome = e.target.getAttribute('data-nome');
        mostrarModalEdicao('membro', { id, nome });
    } else if (e.target.classList.contains('btn-excluir')) {
        const id = e.target.getAttribute('data-id');
        if (confirm('Tem certeza que deseja excluir este membro?')) {
            try {
                await API.deleteMembro(id);
                await atualizarMembros();
                await atualizarDespesas();
                await atualizarBalanco();
                mostrarMensagem('Membro excluído com sucesso!', 'sucesso');
            } catch (error) {
                console.error('Erro ao excluir membro:', error);
                mostrarMensagem('Erro ao excluir membro', 'erro');
            }
        }
    }
});

// Eventos para despesas (editar e excluir)
listaDespesas.addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-editar')) {
        const id = e.target.getAttribute('data-id');
        const descricao = e.target.getAttribute('data-descricao');
        const valor = e.target.getAttribute('data-valor');
        const pagadorId = e.target.getAttribute('data-pagador');
        mostrarModalEdicao('despesa', { id, descricao, valor, pagadorId });
    } else if (e.target.classList.contains('btn-excluir')) {
        const id = e.target.getAttribute('data-id');
        if (confirm('Tem certeza que deseja excluir esta despesa?')) {
            try {
                await API.deleteDespesa(id);
                await atualizarDespesas();
                await atualizarBalanco();
                mostrarMensagem('Despesa excluída com sucesso!', 'sucesso');
            } catch (error) {
                console.error('Erro ao excluir despesa:', error);
                mostrarMensagem('Erro ao excluir despesa', 'erro');
            }
        }
    }
});

// === CÁLCULO DO BALANÇO FINANCEIRO ===
async function atualizarBalanco() {
    try {
        const membros = await API.getMembros();
        const despesas = await API.getDespesas();
        
        if (membros.length === 0 || despesas.length === 0) {
            balancoDiv.innerHTML = '<p>Sem dados suficientes para calcular o balanço.</p>';
            return;
        }
        
        // Mapeia IDs para nomes
        const idToNome = Object.fromEntries(membros.map(m => [m.id, m.nome]));
        
        // Calcula total gasto por membro
        const totalPorMembro = {};
        membros.forEach(m => totalPorMembro[m.id] = 0);
        despesas.forEach(d => {
            totalPorMembro[d.pagadorId] += Number(d.valor);
        });
        
        // Total geral e quanto cada um deveria pagar
        const totalGeral = despesas.reduce((acc, d) => acc + Number(d.valor), 0);
        const porPessoa = totalGeral / membros.length;
        
        // Calcula saldo de cada membro
        const saldo = {};
        membros.forEach(m => {
            saldo[m.id] = totalPorMembro[m.id] - porPessoa;
        });
        
        // Gera instruções de pagamento
        let instrucoes = `<h4>Total gasto: R$ ${totalGeral.toFixed(2)}</h4>`;
        instrucoes += `<h4>Valor por pessoa: R$ ${porPessoa.toFixed(2)}</h4>`;
        
        const devedores = membros.filter(m => saldo[m.id] < -0.01);
        const credores = membros.filter(m => saldo[m.id] > 0.01);
        
        if (devedores.length === 0 && credores.length === 0) {
            instrucoes += '<p><strong>Todos estão quites! 🎉</strong></p>';
        } else {
            instrucoes += '<h4>Instruções de pagamento:</h4>';
            let i = 0, j = 0;
            while (i < devedores.length && j < credores.length) {
                const dev = devedores[i];
                const cred = credores[j];
                const valor = Math.min(-saldo[dev.id], saldo[cred.id]);
                if (valor > 0.01) {
                    instrucoes += `<p><strong>${idToNome[dev.id]}</strong> deve pagar <strong>R$ ${valor.toFixed(2)}</strong> para <strong>${idToNome[cred.id]}</strong></p>`;
                    saldo[dev.id] += valor;
                    saldo[cred.id] -= valor;
                }
                if (saldo[dev.id] >= -0.01) i++;
                if (saldo[cred.id] <= 0.01) j++;
            }
        }
        
        balancoDiv.innerHTML = instrucoes;
    } catch (error) {
        console.error('Erro ao atualizar balanço:', error);
        balancoDiv.innerHTML = '<p>Erro ao calcular balanço.</p>';
    }
}

// === INICIALIZAÇÃO ===
async function inicializar() {
    try {
        await atualizarMembros();
        await atualizarDespesas();
        await atualizarBalanco();
        mostrarMensagem('Aplicação carregada com sucesso!', 'sucesso');
    } catch (error) {
        console.error('Erro na inicialização:', error);
        mostrarMensagem('Erro ao carregar aplicação', 'erro');
    }
}

document.addEventListener('DOMContentLoaded', inicializar); 