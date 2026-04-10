const express = require('express');
const router = express.Router();
const comissaoController = require('../controllers/comissaoController');

router.get('/', comissaoController.listarTodos);
router.post('/', comissaoController.criar);
router.put('/:id', comissaoController.atualizar);
router.delete('/:id', comissaoController.deletar);

module.exports = router;