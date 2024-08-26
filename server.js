window.onload = () => {
    adicionarFilme();
    inforFilmesAdmin();
    cancelar();
};
function adicionarFilme() {
    const adicionarFilmeButton = document.getElementById('adicionarButton');
    const cancelarButton = document.getElementById('cancelar');
    const formulario = document.querySelector('form.filmes');
    const containerFilmes = document.getElementById('filmesContainerAdmin');
    const cadastrarButton = document.getElementById('cadastrar');
    const salvarAtualizacaoButton = document.getElementById('salvarAtualizacao');
    formulario.style.display = 'none';
    cancelarButton.style.display = 'none';
    adicionarFilmeButton.addEventListener('click', () => {
        formulario.style.display = 'block';
        cancelarButton.style.display = 'block';
        adicionarFilmeButton.style.display = 'none';
        cadastrarButton.style.display = 'block';
        salvarAtualizacaoButton.style.display = 'none';
        formulario.reset();
        document.getElementById('filmeId').value = '';
        if (containerFilmes) {
            containerFilmes.style.display = 'none';
        }
    });
    formulario.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(formulario);
        const filmeId = document.getElementById('filmeId').value;
        const url = filmeId ? `/filme/${filmeId}` : '/salvarFilme';
        const method = filmeId ? 'PUT' : 'POST';
        fetch(url, {
            method: method,
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error); 
            } else if (data.mensagem) {
                alert(data.mensagem); 
            } else {
                alert('Operação realizada com sucesso!'); 
            }
            formulario.reset();
            formulario.style.display = 'none';
            cancelarButton.style.display = 'none';
            adicionarFilmeButton.style.display = 'block';
            if (containerFilmes) {
                containerFilmes.style.display = 'flex';
            }
            inforFilmesAdmin();
        })
        .catch(error => {
            console.error('Erro ao salvar o filme:', error);
            alert('Erro ao salvar o filme.');
        });
    });
}
function cancelar() {
    const adicionarFilmeButton = document.getElementById('adicionarButton');
    const cancelarButton = document.getElementById('cancelar');
    const formulario = document.querySelector('form.filmes');
    const containerFilmes = document.getElementById('filmesContainerAdmin');
    cancelarButton.addEventListener('click', () => {
        formulario.style.display = 'none';
        cancelarButton.style.display = 'none';
        adicionarFilmeButton.style.display = 'block';
        if (containerFilmes) {
            containerFilmes.style.display = 'flex'; 
        }
    });
}
function inforFilmesAdmin() {
    fetch('/filmes')
        .then(response => response.json())
        .then(filmes => {
            const container = document.getElementById('filmesContainerAdmin');
            container.innerHTML = ''; 
            filmes.forEach(filme => {
                const filmeDiv = document.createElement('div');
                filmeDiv.classList.add('filme-item');
                filmeDiv.innerHTML = `
                    <button class="filme-imagem-btn" data-id="${filme.id}" data-nome="${filme.nome}" data-genero="${filme.genero}" data-classificacao="${filme.classificacao}" data-descricao="${filme.descricao}" data-idioma="${filme.idioma}" data-imagem="/uploads/${filme.imagem}">
                        <img src="/uploads/${filme.imagem}" alt="${filme.nome}">
                    </button>
                `;
                container.appendChild(filmeDiv);
            });
            document.querySelectorAll('.filme-imagem-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const id = event.currentTarget.getAttribute('data-id');
                    const nome = event.currentTarget.getAttribute('data-nome');
                    const genero = event.currentTarget.getAttribute('data-genero');
                    const classificacao = event.currentTarget.getAttribute('data-classificacao');
                    const descricao = event.currentTarget.getAttribute('data-descricao');
                    const idioma = event.currentTarget.getAttribute('data-idioma');
                    const imagem = event.currentTarget.getAttribute('data-imagem');
                    mostrarInformacoes(id, nome, genero, classificacao, descricao, idioma, imagem);
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar filmes:', error);
        });
}
function mostrarInformacoes(id, nome, genero, classificacao, descricao, idioma, imagem) {
    const detalhes = document.getElementById('detalhesFilmeAdmin');
    const adicionarFilmeButton = document.getElementById('adicionarButton');
    
    detalhes.innerHTML = `
        <img src="${imagem}" alt="${nome}" style="width: 200px; height: auto;">
        <div>
            <h3>${nome}</h3>
            <p>Gênero: ${genero}</p>
            <p>Classificação: ${classificacao}</p>
            <p>Descrição: ${descricao}</p>
            <p>Idioma: ${idioma}</p>
        </div>
        <button id="voltarButton">Voltar</button>
        <input type="button" id="atualizarButton" value="Atualizar">
        <input type="button" id="excluirButton" value="Excluir">
    `;
    detalhes.style.display = 'block';
    adicionarFilmeButton.style.display = 'none';
    const containerFilmes = document.getElementById('filmesContainerAdmin');
    if (containerFilmes) {
        containerFilmes.style.display = 'none';
    }
    document.getElementById('voltarButton').addEventListener('click', () => {
        detalhes.style.display = 'none';
        adicionarFilmeButton.style.display = 'block';
        if (containerFilmes) {
            containerFilmes.style.display = 'flex'; 
        }
    });
    document.getElementById('atualizarButton').addEventListener('click', () => {
        preencherFormularioParaAtualizacao(id, nome, genero, classificacao, descricao, idioma, imagem);
    });
    document.getElementById('excluirButton').addEventListener('click', () => {
        if (confirm('Você tem certeza que deseja excluir este filme?')) {
            fetch(`/filme/${id}`, {
                method: 'DELETE'
            })
            .then(response => response.text())
            .then(message => {
                alert(message);
                inforFilmesAdmin(); // Atualiza a lista de filmes
                detalhes.style.display = 'none';
                adicionarFilmeButton.style.display = 'block';
                if (containerFilmes) {
                    containerFilmes.style.display = 'flex'; 
                }
            })
            .catch(error => {
                console.error('Erro ao excluir o filme:', error);
                alert('Erro ao excluir o filme.');
            });
        }
    });
}
function preencherFormularioParaAtualizacao(id, nome, genero, classificacao, descricao, idioma, imagem) {
    const formulario = document.querySelector('form.filmes');
    const cancelarButton = document.getElementById('cancelar');
    const cadastrarButton = document.getElementById('cadastrar');
    const salvarButton = document.getElementById('salvarAtualizacao');
    document.getElementById('filmeId').value = id;
    document.getElementById('nomeFilme').value = nome;
    document.getElementById('generoFilme').value = genero;
    document.getElementById('classificacaoFilme').value = classificacao;
    document.getElementById('descricaoFilme').value = descricao;
    document.getElementById('idiomaFilme').value = idioma;
    formulario.style.display = 'block';
    cancelarButton.style.display = 'block';
    cadastrarButton.style.display = 'none'; 
    salvarButton.style.display = 'block'; 
    const adicionarFilmeButton = document.getElementById('adicionarButton');
    adicionarFilmeButton.style.display = 'none';
    const containerFilmes = document.getElementById('filmesContainerAdmin');
    if (containerFilmes) {
        containerFilmes.style.display = 'none';
    }
}
