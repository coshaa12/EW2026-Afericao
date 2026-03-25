const express = require('express');
const axios = require('axios');
const app = express();
const port = 16026;

app.set('views', './views');
app.set('view engine', 'pug');

// Rota principal: GET /
app.get('/', (req, res) => {
    // CORREÇÃO: Removido o "+ parametro" porque aqui queremos a lista total
    axios.get('http://api:16025/repairs') 
        .then(resposta => {
            res.render('index', { repairs: resposta.data });
        })
        .catch(erro => {
            res.render('error', { error: erro });
        });
});

app.get('/:idOuMarca', (req, res) => {
    const parametro = req.params.idOuMarca.trim();
    const e_um_id = /^[0-9a-fA-F]{24}$/.test(parametro);

    if (e_um_id) {
        axios.get('http://api:16025/repairs/' + parametro)
            .then(resposta => {
                if (resposta.data) {
                    res.render('repair', { repair: resposta.data });
                } else {
                    res.send("Erro: Registo não encontrado.");
                }
            })
            .catch(erro => res.render('error', { error: erro }));
    } else {
        // CORREÇÃO: Mudado de localhost para api para funcionar no Docker
        axios.get('http://api:16025/repairs?marca=' + parametro)
            .then(resposta => {
                const reparacoes = resposta.data;
                const modelos = [...new Set(reparacoes.map(r => r.viatura.modelo))].sort();
                
                res.render('marca', { 
                    marca: parametro, 
                    modelos: modelos, 
                    repairs: reparacoes 
                });
            })
            .catch(erro => {
                res.render('error', { error: erro });
            });
    }
});

app.listen(port, () => {
    console.log(`Interface a escutar na porta ${port}...`);
});