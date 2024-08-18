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
    const novoFilme = {
        nome: req.body.nomeFilme,
        genero: req.body.generoFilme,
        classificacao: req.body.classificacaoFilme,
        descricao: req.body.descricaoFilme,
        idioma: req.body.idiomaFilme,
        imagem: req.file ? req.file.filename : null 
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
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
