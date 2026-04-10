const express = require('express');
const router = express.Router();
const jogadoresController = require('../controllers/jogadoresController');

router.get('/', jogadoresController.listarTodos);
router.get('/:id', jogadoresController.buscarPorId);
router.post('/', jogadoresController.criar);
router.put('/:id', jogadoresController.atualizar);
router.delete('/:id', jogadoresController.deletar);

module.exports = router;