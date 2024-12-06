const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const port = 3000;
// Configuração do multer para armazenamento de arquivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
if (!fs.existsSync('uploads')){
    fs.mkdirSync('uploads');
}
const arquivoFilmes = path.join(__dirname, 'filme.json');
app.get('/', (req, res) => {
    res.redirect('/totem');
});
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'admin', 'admin.html'));
});
app.get('/totem', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'totem', 'totem.html'));
});
app.get('/filmes', (req, res) => {
    fs.readFile(arquivoFilmes, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao processar dados');
        }
        let filmes = [];
        if (data) {
            filmes = JSON.parse(data);
        }
        res.json(filmes);
    });
});
app.post('/salvarFilme', upload.single('imagemFilme'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('Erro: Imagem do filme é obrigatória.');
    }
    const novoFilme = {
        id: req.file.filename,
        nome: req.body.nomeFilme,
        genero: req.body.generoFilme,
        classificacao: req.body.classificacaoFilme,
        descricao: req.body.descricaoFilme,
        idioma: req.body.idiomaFilme,
        imagem: req.file.filename
    };
    fs.readFile(arquivoFilmes, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro ao processar dados');
        }
        let filmes = [];
        if (data) {
            filmes = JSON.parse(data);
        }
        filmes.push(novoFilme);
        fs.writeFile(arquivoFilmes, JSON.stringify(filmes, null, 2), 'utf8', (err) => {
            if (err) {
                console.error('Erro ao salvar os dados:', err);
                return res.status(500).send('Erro ao salvar os dados.');
            }
            console.log('Filme cadastrado com sucesso!');
            res.redirect('/totem'); // Redireciona para o totem após o cadastro
        });
    });
});
app.put('/filme/:id', upload.single('imagemFilme'), (req, res) => {
    fs.readFile(arquivoFilmes, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro no servidor.');
        }
        let filmes = JSON.parse(data);
        const filmeId = req.params.id;
        let filmeIndex = filmes.findIndex(f => f.id == filmeId);

        if (filmeIndex !== -1) {
            const novaImagem = req.file ? req.file.filename : null;
            const novoId = novaImagem || filmeId;
            filmes[filmeIndex] = {
                id: novoId,
                nome: req.body.nomeFilme,
                genero: req.body.generoFilme,
                classificacao: req.body.classificacaoFilme,
                descricao: req.body.descricaoFilme,
                idioma: req.body.idiomaFilme,
                imagem: novaImagem || filmes[filmeIndex].imagem
            };
            fs.writeFile(arquivoFilmes, JSON.stringify(filmes, null, 2), err => {
                if (err) {
                    console.error('Erro ao escrever no arquivo:', err);
                    return res.status(500).send('Erro no servidor.');
                }
                res.send('Filme atualizado com sucesso.');
            });
        } else {
            res.status(404).send('Filme não encontrado.');
        }
    });
});
app.delete('/filme/:id', (req, res) => {
    const filmeId = req.params.id;
    console.log(`Recebido pedido de exclusão para o filme com ID: ${filmeId}`);

    if (!filmeId) {
        return res.status(400).send('ID do filme não fornecido.');
    }

    fs.readFile(arquivoFilmes, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o arquivo:', err);
            return res.status(500).send('Erro no servidor.');
        }

        let filmes = JSON.parse(data);
        const filme = filmes.find(f => f.id === filmeId);
        if (!filme) {
            console.log(`Filme com ID: ${filmeId} não encontrado.`);
            return res.status(404).send('Filme não encontrado.');
        }

        filmes = filmes.filter(f => f.id !== filmeId);
        const caminhoImagem = path.join(__dirname, 'uploads', filme.imagem);

        fs.unlink(caminhoImagem, (err) => {
            if (err) {
                console.error('Erro ao remover a imagem:', err);
                return res.status(500).send('Erro ao remover a imagem do servidor.');
            }
            console.log(`Imagem do filme com ID: ${filmeId} removida com sucesso.`);

            fs.writeFile(arquivoFilmes, JSON.stringify(filmes, null, 2), err => {
                if (err) {
                    console.error('Erro ao escrever no arquivo:', err);
                    return res.status(500).send('Erro no servidor.');
                }
                console.log(`Filme com ID: ${filmeId} excluído com sucesso.`);
                res.send('Filme excluído com sucesso.');
            });
        });
    });
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
