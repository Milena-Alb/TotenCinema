window.onload = () => {
    carregarFilmes();
};

function carregarFilmes() {
    fetch('/filmes')
        .then(response => response.json())
        .then(filmes => {
            const container = document.getElementById('filmesContainerTotem');
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
    const filmesContainer = document.getElementById('filmesContainerTotem');
    const detalhes = document.getElementById('detalhesFilmeTotem');
    filmesContainer.style.display = 'none';
    detalhes.innerHTML = `
        <img src="${imagem}" alt="${nome}">
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
    document.getElementById('voltarButton').addEventListener('click', () => {
        filmesContainer.style.display = 'flex';
        detalhes.style.display = 'none';
    });
}
