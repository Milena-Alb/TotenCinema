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
        cb(null, Date.now() + path.extname(file.originalname)); // Nome do arquivo com timestamp
    }
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Certifique-se de que a pasta de uploads exista
if (!fs.existsSync('uploads')){
    fs.mkdirSync('uploads');
}

const arquivoFilmes = path.join(__dirname, 'filme.json');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/salvarFilme', upload.single('imagemFilme'), (req, res) => {
    const novoFilme = {
        nome: req.body.nomeFilme,
        genero: req.body.generoFilme,
        classificacao: req.body.classificacaoFilme,
        descricao: req.body.descricaoFilme,
        idioma: req.body.idiomaFilme,
        imagem: req.file ? req.file.filename : null // Nome do arquivo da imagem
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
            res.status(200).send('Filme cadastrado com sucesso!');
        });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
