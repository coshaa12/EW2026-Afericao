const express = require('express');
const mongoose = require('mongoose');
const repairsRouter = require('./routes/repairs');

const app = express();
const port = 16025; // Porta obrigatória da API

// Ligar à Base de Dados MongoDB que tens no Docker
mongoose.connect('mongodb://mongodb:27017/autoRepair')
    .then(() => console.log('Conexão ao MongoDB com sucesso!'))
    .catch((erro) => console.log('Erro na conexão ao MongoDB:', erro));

// Permite que o servidor perceba JSON que venha nos pedidos POST
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Atribuir as nossas rotas
app.use('/repairs', repairsRouter);

// Iniciar o servidor
app.listen(port, () => {
    console.log(`API de dados a escutar na porta ${port}...`);
});