const mongoose = require('mongoose');

const undSaudeSchema = mongoose.Schema({
    nome: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    descricao: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    telefone: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    email: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    latlong: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    endereco: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

let UndSaude = module.exports = mongoose.model('undSaude', undSaudeSchema);

module.exports.get = function(callback, limit){
    UndSaude.find(callback).limit(limit);
}