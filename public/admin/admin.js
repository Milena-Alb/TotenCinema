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
    
    formulario.style.display = 'none';
    cancelarButton.style.display = 'none';

    adicionarFilmeButton.addEventListener('click', () => {
        formulario.style.display = 'block';
        cancelarButton.style.display = 'block';
        adicionarFilmeButton.style.display = 'none';
        if (containerFilmes) {
            containerFilmes.style.display = 'none';
        }
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
            containerFilmes.style.display = 'flex'; /* Certifica-se de que o container é exibido como flex */
        }
    });
}

function inforFilmesAdmin() {
    fetch('/filmes')
        .then(response => response.json())
        .then(filmes => {
            const container = document.getElementById('filmesContainerAdmin');
            container.innerHTML = ''; // Limpa o contêiner antes de adicionar novos filmes
            filmes.forEach(filme => {
                const filmeDiv = document.createElement('div');
                filmeDiv.classList.add('filme-item');
                filmeDiv.innerHTML = `
                    <button class="filme-imagem-btn" data-nome="${filme.nome}" data-genero="${filme.genero}" data-classificacao="${filme.classificacao}" data-descricao="${filme.descricao}" data-idioma="${filme.idioma}" data-imagem="/uploads/${filme.imagem}">
                        <img src="/uploads/${filme.imagem}" alt="${filme.nome}">
                    </button>
                `;
                container.appendChild(filmeDiv);
            });
            document.querySelectorAll('.filme-imagem-btn').forEach(button => {
                button.addEventListener('click', (event) => {
                    const nome = event.currentTarget.getAttribute('data-nome');
                    const genero = event.currentTarget.getAttribute('data-genero');
                    const classificacao = event.currentTarget.getAttribute('data-classificacao');
                    const descricao = event.currentTarget.getAttribute('data-descricao');
                    const idioma = event.currentTarget.getAttribute('data-idioma');
                    const imagem = event.currentTarget.getAttribute('data-imagem');
                    mostrarInformacoes(nome, genero, classificacao, descricao, idioma, imagem);
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar filmes:', error);
        });
}

function mostrarInformacoes(nome, genero, classificacao, descricao, idioma, imagem) {
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
}