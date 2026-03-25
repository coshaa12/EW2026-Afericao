const Repair = require('../models/repair');

// ex1/controllers/repair.js
module.exports.findById = id => {
    return Repair.findOne({ _id: id }).exec();
};

// Devolve lista de reparações (com ou sem filtros de ano e marca)
module.exports.list = (ano, marca) => {
    let query = {};
    if (ano) {
        query.data = new RegExp(`^${ano}`); // Procura datas que comecem por aquele ano
    }
    if (marca) {
        query['viatura.marca'] = marca;
    }
    return Repair.find(query).exec();
};

// Devolve um registo pelo seu ID
module.exports.findById = id => {
    return Repair.findOne({_id: id}).exec();
};

// Devolve a lista de matrículas (sem repetições e ordenada)
module.exports.matriculas = () => {
    return Repair.distinct('viatura.matricula').exec()
        .then(matriculas => matriculas.sort());
};

// Devolve a lista de intervenções (sem repetições e ordenada por código)
module.exports.intervencoes = () => {
    return Repair.aggregate([
        { $unwind: "$intervencoes" },
        { $group: {
            _id: "$intervencoes.codigo",
            nome: { $first: "$intervencoes.nome" },
            descricao: { $first: "$intervencoes.descricao" }
        }},
        { $project: { _id: 0, codigo: "$_id", nome: 1, descricao: 1 }},
        { $sort: { codigo: 1 } }
    ]).exec();
};

// Acrescenta um registo novo
module.exports.insert = repair => {
    return Repair.create(repair);
};

// Elimina um registo
module.exports.remove = id => {
    return Repair.findByIdAndDelete(id).exec();
};