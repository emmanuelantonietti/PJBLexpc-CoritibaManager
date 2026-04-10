const express = require('express');
const router = express.Router();
const partidasController = require('../controllers/partidasController');

router.get('/', partidasController.listarTodas);
router.post('/', partidasController.criar);
router.put('/:id', partidasController.atualizar);
router.delete('/:id', partidasController.deletar);

module.exports = router;