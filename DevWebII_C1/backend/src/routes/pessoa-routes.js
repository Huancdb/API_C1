let router = require('express').Router();

const pessoaController = require('../controllers/pessoa-controller');

router.post('/', pessoaController.adicionarPessoa);

router.get('/', pessoaController.listarPessoas);

router.get('/:id', pessoaController.listarPessoaPorID);

router.put('/:id', pessoaController.atualizarPessoa);

router.delete('/:id', pessoaController.removerPessoa);

module.exports = router;
