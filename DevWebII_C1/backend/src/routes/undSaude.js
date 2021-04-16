let router = require('express').Router();

const undSaudeController = require('../controllers/undSaude-controller');

router.post('/', undSaudeController.adicionarUndSaude);

router.get('/', undSaudeController.listarUndsSaude);

router.get('/:id', undSaudeController.listarUndSaudeID);

router.put('/:id', undSaudeController.atualizarUndSaude);

router.delete('/:id', undSaudeController.removerUndSaude);

module.exports = router;

