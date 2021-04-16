let router = require('express').Router();

const agendamentoController = require('../controllers/agendamento-controller');

router.post('/', agendamentoController.adicionarAgendamento);

router.get('/', agendamentoController.listarAgendamentos);

router.get('/:id', agendamentoController.listarAgendamentoPorID);

router.put('/:id', agendamentoController.atualizarAgendamento);

router.delete('/:id', agendamentoController.removerAgendamento);

module.exports = router;
