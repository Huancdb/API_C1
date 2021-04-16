const undSaudeModel = require('../models/undSaude-model');

exports.adicionarUndSaude = (req, res) => {
    undSaudeModel.find((err, undSaudes) => {
        if(err){
            console.log("Não foi possível recuperar as unidades!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar as uniades e, portanto, inserir a nova!"
            });
        }

        for(let i = 0; i < undSaudes.length; i++){
            if(req.body.nome === undSaude[i].nome){
                res.json({
                    status: "erro",
                    message: `A Unidade ${req.body.nome} já está cadastrada`
                });
                return;
            }
        }

        let undSaude = new undSaudeModel();
        undSaude.nome = req.body.nome;
        undSaude.descricao = req.body.descricao;
        undSaude.telefone = req.body.telefone;
        undSaude.email = req.body.email;
        undSaude.latlong = req.body.latlong;
        undSaude.endereco = req.body.endereco;

        undSaude.save((erro) => {
            if(erro){
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir a unidade."
                });
            }else{
                res.send({
                    status: "ok",
                    message: `${req.body.nome} inserido(a) com sucesso!`
                });
            }
        })
    });
}

exports.listarUndsSaude = (req, res) => {
    undSaudeModel.find(function(err, undSaude){
        if(err){
            console.log("Não foi possível recuperar a lista de unidades!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar a lista de unidades!"
            });
        }else{
            res.json({
                status: "ok",
                undSaude: undSaude
            })
        }
        
    });
}

exports.listarUndSaudeID = (req, res) => {
    let id_undSaude = req.params.id;
    
    undSaudeModel.findById(id_undSaude, function(err, undSaude){
        if(err || !undSaude){
            console.log(`Não foi possivel recuperar a unidade de id: ${id_undSaude}`);
            res.json({
                status: "erro",
                message: `Não foi possivel recuperar a unidade de id: ${id_undSaude}`
            });
        }else{
            res.json({
                status: "ok",
                undSaude: undSaude
            })
        }
        
    });
}

exports.atualizarUndSaude = (req, res) => {
    let id_undSaude = req.params.id;

    undSaudeModel.findById(id_undSaude, (erro, undSaude) => {
        if(erro || !undSaude){
            console.log("Não foi possível recuperar a unidade!");
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a unidade de id ${id_undSaude} para atualização`
            });
        }else{
            undSaude.nome = req.body.nome;
            undSaude.descricao = req.body.descricao;
            undSaude.telefone = req.body.telefone;
            undSaude.email = req.body.email;
            undSaude.latlong = req.body.latlong;
            undSaude.endereco = req.body.endereco;
            
            undSaude.save((err => {
                if(err){
                    res.json({
                        status: "erro",
                        message: "Houve um erro ao atualizar a unidade"
                    });
                }else{
                    res.json({
                        status: "ok",
                        message: `Unidade ${undSaude.nome} atualizada com sucesso!`,
                        novaUndSaude: undSaude
                    })
                }
            }))
        }
    });
}

exports.removerUndSaude = (req, res) => {
    let id_undSaude = req.params.id;

    undSaudeModel.remove({
        _id: id_undSaude
    }, (err) => {
        if(err){
            res.json({
                status: "erro",
                message: "Houve um erro ao deletar a unidade."
            });
        }else{
            res.json({
                status: "ok",
                message: `Unidade deletada com sucesso!`
            })
        }
    });
}