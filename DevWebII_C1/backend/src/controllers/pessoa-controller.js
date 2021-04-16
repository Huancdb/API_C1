const pessoaModel = require('../models/pessoa-model');

exports.adicionarPessoa = (req, res) => {
    pessoaModel.find((err, pessoas) => {
        if(err){
            console.log("Não foi possível recuperar as pessoas!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar as pessoas e portanto inserir a nova pessoa!"
            });
        }

        for(let i = 0; i < pessoas.length; i++){
            if(req.body.cpf === pessoas[i].cpf){
                res.json({
                    status: "erro",
                    message: `O cpf ${req.body.cpf} já está cadastrado.`
                });
                return;
            }
        }

        let pessoa = new pessoaModel();
        pessoa.nome = req.body.nome;
        pessoa.cpf = req.body.cpf;
        pessoa.email = req.body.email;
        pessoa.telefone = req.body.telefone;
        pessoa.endereco = req.body.endereco;
        pessoa.data_nasc = req.body.data_nasc;
        pessoa.grupo = req.body.grupo;
        
        pessoa.save((erro) => {
            if(erro){
                res.send({
                    status: "erro",
                    message: "Não foi possível inserir a pessoa."
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

exports.listarPessoas = (req, res) => {
    pessoaModel.find(function(err, pessoa){
        if(err){
            console.log("Não foi possível recuperar a lista de pessoas!");
            res.json({
                status: "erro",
                message: "Não foi possível recuperar a lista de pessoas!"
            });
        }else{
            res.json({
                status: "ok",
                pessoa: pessoa
            })
        }
        
    });
}

exports.listarPessoaPorID = (req, res) => {
    let id_pessoa = req.params.id;
    
    pessoaModel.findById(id_pessoa, function(err, pessoa){
        if(err || !pessoa){
            console.log(`Não foi possivel recuperar a pessoa de id: ${id_pessoa}`);
            res.json({
                status: "erro",
                message: `Não foi possivel recuperar a pessoa de id: ${id_pessoa}`
            });
        }else{
            res.json({
                status: "ok",
                pessoa: pessoa
            })
        }
        
    });
}

exports.atualizarPessoa = (req, res) => {
    let id_pessoa = req.params.id;

    pessoaModel.findById(id_pessoa, (erro, pessoa) => {
        if(erro || !pessoa){
            console.log("Não foi possível recuperar a pessoa!");
            res.json({
                status: "erro",
                message: `Não foi possível recuperar a pessoa de id ${id_pessoa} para atualização`
            });
        }else{
            pessoa.nome = req.body.nome;
            pessoa.cpf = req.body.cpf;
            pessoa.email = req.body.email;
            pessoa.telefone = req.body.telefone;
            pessoa.endereco = req.body.endereco;
            pessoa.data_nasc = req.body.data_nasc;
            pessoa.grupo = req.body.grupo;

            pessoa.save((err => {
                if(err){
                    res.json({
                        status: "erro",
                        message: "Houve um erro ao atualizar a pessoa"
                    });
                }else{
                    res.json({
                        status: "ok",
                        message: `Pessoa ${pessoa.nome} atualizada com sucesso!`,
                        novaPessoa: pessoa
                    })
                }
            }))
        }
    });
}

exports.removerPessoa = (req, res) => {
    let id_pessoa = req.params.id;

    pessoaModel.remove({
        _id: id_pessoa
    }, (err) => {
        if(err){
            res.json({
                status: "erro",
                message: "Houve um erro ao deletar a pessoa"
            });
        }else{
            res.json({
                status: "ok",
                message: `Pessoa deletada com sucesso!`
            })
        }
    });
}