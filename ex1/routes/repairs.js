const express = require('express');
const router = express.Router();
const Repair = require('../controllers/repair');

// GET /repairs/matriculas
router.get('/matriculas', (req, res) => {
    Repair.matriculas()
        .then(dados => res.json(dados))
        .catch(erro => res.status(500).json(erro));
});

// GET /repairs/interv
router.get('/interv', (req, res) => {
    Repair.intervencoes()
        .then(dados => res.json(dados))
        .catch(erro => res.status(500).json(erro));
});

// GET /repairs/:id
router.get('/:id', (req, res) => {
    Repair.findById(req.params.id)
        .then(dados => res.json(dados))
        .catch(erro => res.status(500).json(erro));
});

// GET /repairs (com ou sem query strings ?ano= e ?marca=)
router.get('/', (req, res) => {
    Repair.list(req.query.ano, req.query.marca)
        .then(dados => res.json(dados))
        .catch(erro => res.status(500).json(erro));
});

// POST /repairs (ADICIONADO PARA CUMPRIR O ENUNCIADO)
router.post('/', (req, res) => {
    Repair.insert(req.body) // Assumindo que o teu controller tem o método insert
        .then(dados => res.status(201).json(dados))
        .catch(erro => res.status(500).json(erro));
});

// DELETE /repairs/:id
router.delete('/:id', (req, res) => {
    Repair.remove(req.params.id)
        .then(dados => res.json(dados))
        .catch(erro => res.status(500).json(erro));
});

module.exports = router;