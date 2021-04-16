const mongoose = require('mongoose');

const agendamentoSchema = mongoose.Schema({
    dt_hora: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    necessidades_spc: {
        type: mongoose.Schema.Types.Boolean,
        required: true
    },
    obs: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    id_pessoa: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    id_undSaude: {
        type: mongoose.Schema.Types.String,
        required: true
    }
});

let Agendamento = module.exports = mongoose.model('agendamento', agendamentoSchema);

module.exports.get = function(callback, limit){
    Agendamento.find(callback).limit(limit);
}