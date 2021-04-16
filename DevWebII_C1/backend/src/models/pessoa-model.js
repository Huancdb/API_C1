const mongoose = require('mongoose');

const pessoaSchema = mongoose.Schema({
    nome: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    cpf: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    grupo: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    data_nasc: {
        type: mongoose.Schema.Types.Date,
        default: null
    },
    endereco: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

let Pessoa = module.exports = mongoose.model('pessoa', pessoaSchema);

module.exports.get = function(callback, limit){
    Pessoa.find(callback).limit(limit);
}