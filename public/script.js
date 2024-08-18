document.getElementById('cadastrarFilme').addEventListener('click', function() {
    const nomeFilme = document.getElementById('nomeFilme').value;
    const generoFilme = document.getElementById('generoFilme').value;
    const classificacaoFilme = document.getElementById('classificacao').value;
    const descricaoFilme = document.getElementById('descricaoFilme').value;
    const idioma = document.getElementById('idioma').value;
    const imagemFilme = document.getElementById('imagemFilme').files[0];

    const formData = new FormData();
    formData.append('nomeFilme', nomeFilme);
    formData.append('generoFilme', generoFilme);
    formData.append('classificacaoFilme', classificacaoFilme);
    formData.append('descricaoFilme', descricaoFilme);
    formData.append('idiomaFilme', idioma);
    if (imagemFilme) {
        formData.append('imagemFilme', imagemFilme);
    }

    fetch('/salvarFilme', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        const mensagem = document.createElement('div');
        mensagem.innerText = 'Filme cadastrado com sucesso!';
        mensagem.style.color = 'green';
        document.body.appendChild(mensagem);
        setTimeout(() => {
            document.body.removeChild(mensagem);
        }, 3000);
    })
    .catch(error => {
        console.error('Erro:', error);
        const mensagemErro = document.createElement('div');
        mensagemErro.innerText = 'Erro ao cadastrar o filme!';
        mensagemErro.style.color = 'red';
        document.body.appendChild(mensagemErro);
        setTimeout(() => {
            document.body.removeChild(mensagemErro);
        }, 3000);
    });
});
