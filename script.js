// Função para criar um ID único para cada dica
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Função para adicionar uma nova dica
function adddica() {
    const materialSelect = document.getElementById('material');
    const dicaInput = document.getElementById('dica');

    const material = materialSelect.value;
    const dica = dicaInput.value;

    // Validação dos campos
    if (material === '' || dica === '') {
        alert('Preencha todos os campos!');
        return;
    }

    const id = generateId();

    // Criação do objeto de dica
    const dicaObj = {
        id: id,
        material: material,
        dica: dica
    };

    // Obtém as dicas já cadastradas ou cria um novo array vazio
    const dicas = JSON.parse(localStorage.getItem('dicas')) || [];

    // Adiciona a nova dica ao array
    dicas.push(dicaObj);

    // Atualiza a Lista de dicas no LocalStorage
    localStorage.setItem('dicas', JSON.stringify(dicas));

    // Limpa os campos do formulário
    materialSelect.value = '';
    dicaInput.value = '';

    // Atualiza a Lista de dicas exibida na tela
    updatedicasList();
}

// Função para filtrar as dicas por material
function filterdicas() {
    const filterInput = document.getElementById('filterInput');
    const filter = filterInput.value.toLowerCase();

    // Validação do campo de filtro
    if (filter === '') {
        alert('Informe um material a ser pesquisado!');
        return;
    }

    const dicas = JSON.parse(localStorage.getItem('dicas')) || [];

    // Filtra as dicas com base no material informado
    const filtereddicas = dicas.filter(dica => dica.material.toLowerCase().includes(filter));

    // Validação de material não encontrado
    if (filtereddicas.length === 0) {
        alert('Material não encontrado!');
        return;
    }

    // Atualiza a Lista de dicas exibida na tela
    updatedicasList(filtereddicas);
}

// Função para remover uma dica
function removedica(id) {
    const dicas = JSON.parse(localStorage.getItem('dicas')) || [];

    // Remove a dica com o ID correspondente
    const updateddicas = dicas.filter(dica => dica.id !== id);

    // Atualiza a Lista de dicas no LocalStorage
    localStorage.setItem('dicas', JSON.stringify(updateddicas));

    // Atualiza a Lista de dicas exibida na tela
    updatedicasList();
}

// Função para atualizar a Lista de dicas exibida na tela
function updatedicasList(dicas) {
    const dicasList = document.getElementById('dicasList');

    // Limpa a Lista de dicas
    dicasList.innerHTML = '';

    if (!dicas) {
        // Obtém as dicas do LocalStorage
        dicas = JSON.parse(localStorage.getItem('dicas')) || [];
    }

    // Adiciona cada dica à Lista
    dicas.forEach(dica => {
        const li = document.createElement('li');
        li.textContent = dica.dica;

        // Adiciona a classe de cor correspondente ao material
        switch (dica.material) {
            case 'plastico':
                li.classList.add('red');
                break;
            case 'metal':
                li.classList.add('yellow');
                break;
            case 'papel':
                li.classList.add('blue');
                break;
            case 'vidro':
                li.classList.add('green');
                break;
            case 'organico':
                li.classList.add('brown');
                break;
        }

        // Cria o botão de remoção
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.addEventListener('click', () => removedica(dica.id));

        // Adiciona o botão à dica
        li.appendChild(removeButton);

        // Adiciona a dica à Lista
        dicasList.appendChild(li);
    });
}

// Função para exibir os horários de coleta por bairro
function showHorarios() {
    const horariosList = document.getElementById('horariosList');

    // Limpa a Lista de horários de coleta
    horariosList.innerHTML = '';

    // Define os bairros e seus respectivos horários de coleta
    const horarios = {
        'Bairro Câmpus Universitários': ['Segunda-feira', 'Quarta-feira', 'Sexta-Feira'],
        'Bairro Cristo Rei': ['Terça-feira', 'Quinta-feira', 'Sábado'],
        'Bairro Distrito Administrativo': ['Terça-feira', 'Sexta-feira'],
        'Bairro Centro': ['Segunda-feira à Sábado'],
        'Bairro Bandeirantes': ['Terça-feira', 'Quinta-feira', 'Sábado']
    };

    // Adiciona cada bairro e seus horários à Lista
    for (const [bairro, dias] of Object.entries(horarios)) {
        const li = document.createElement('li');
        li.textContent = `${bairro}: ${dias.join(', ')}`;

        // Adiciona o bairro e seus horários à Lista
        horariosList.appendChild(li);
    }
}

// Função para exibir o diálogo de cadastro de dicas
function showAddDialog() {
    const dialog = document.getElementById('dialog');
    dialog.classList.remove('hidden');
}

// Função para fechar o diálogo de cadastro de dicas
function closeAddDialog() {
    const dialog = document.getElementById('dialog');
    dialog.classList.add('hidden');
}

// Evento de clique no botão de adicionar dica
document.getElementById('addButton').addEventListener('click', showAddDialog);

// Evento de clique no botão de salvar do diálogo de cadastro de dicas
document.getElementById('saveButton').addEventListener('click', adddica);

// Evento de clique no botão de cancelar do diálogo de cadastro de dicas
document.getElementById('cancelButton').addEventListener('click', closeAddDialog);

// Evento de clique no botão de filtrar
document.getElementById('filterButton').addEventListener('click', filterdicas);

// Evento de clique no botão de ver horários de coleta
document.getElementById('horariosButton').addEventListener('click', showHorarios);

// Carrega a Lista de dicas ao carregar a página
updatedicasList();
