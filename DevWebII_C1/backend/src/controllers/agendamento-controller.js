const agendamentoModel = require('../models/agendamento-model');

exports.adicionarAgendamento = (req, res) => {
    agendamentoModel.find((err, agendamentos) => {
        if(err){
            console.log("Não foi possível recuperar os agendamentos!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar os agendamentos e portanto inserir um novo!"
            });
        }

        let agendamento = new agendamentoModel();
        agendamento.dt_hora = req.body.dt_hora;
        agendamento.necessidades_spc = req.body.necessidades_spc;
        agendamento.obs = req.body.obs;
        agendamento.id_pessoa = req.body.id_pessoa;
        agendamento.id_undSaude = req.body.id_undSaude;
       
        agendamento.save((erro) => {
            if(erro){
                res.send({
                    status: "erro",
                    message: "Não foi possível realizar o agendamento."
                });
            }else{
                res.send({
                    status: "ok",
                    message: `Agendamento inserido com sucesso!`
                });
            }
        })
    });
}

exports.listarAgendamentos = (req, res) => {
    agendamentoModel.find(function(err, agendamento){
        if(err){
            console.log("Não foi possível recuperar a lista de agendamentos!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar a lista de agendamentos!"
            });
        }else{
            res.json({
                status: "ok",
                agendamento: agendamento
            })
        }
        
    });
}

exports.listarAgendamentoPorID = (req, res) => {
    let id_agendamento = req.params.id;
    
    agendamentoModel.findById(id_agendamento, function(err, agendamento){
        if(err || !agendamento){
            console.log(`Não foi possivel recuperar o agendamento de id: ${id_agendamento}`);
            res.json({
                status: "erro",
                message: `Não foi possivel recuperar o agendamento de id: ${id_agendamento}`
            });
        }else{
            res.json({
                status: "ok",
                agendamento: agendamento
            })
        }
        
    });
}

exports.atualizarAgendamento = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.findById(id_agendamento, (erro, agendamento) => {
        if(erro || !agendamento){
            console.log("Não foi possível recuperar o agendamento!");
            res.json({
                status: "erro",
                message: `Não foi possível recuperar o agendamento de id ${id_agendamento} para atualização`
            });
        }else{
            agendamento.dt_hora = req.body.dt_hora;
            agendamento.necessidades_spc = req.body.necessidades_spc;
            agendamento.obs = req.body.obs;
            agendamento.id_pessoa = req.body.id_pessoa;
            agendamento.id_undSaude = req.body.id_undSaude;

            agendamento.save((err => {
                if(err){
                    res.json({
                        status: "erro",
                        message: "Houve um erro ao atualizar o agendamento"
                    });
                }else{
                    res.json({
                        status: "ok",
                        message: `Agendamento atualizado com sucesso!`,
                        novoAgendamento: agendamento
                    })
                }
            }))
        }
    });
}

exports.removerAgendamento = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.remove({
        _id: id_agendamento
    }, (err) => {
        if(err){
            res.json({
                status: "erro",
                message: "Houve um erro ao deletar o agendamento"
            });
        }else{
            res.json({
                status: "ok",
                message: `Agendamento deletado com sucesso!`
            })
        }
    });
}