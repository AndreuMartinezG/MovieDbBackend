const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

const PedidosController = require('../controllers/PedidosController');


//Creamos Un pedido nuevo
router.post('/', auth, PedidosController.nuevoPedido);

//Buscamos Pedidos en DB
//router.get('/', auth, PedidosController.getAll);


//Borramos pedidos en DB por ID
//router.delete('/:id', auth, PedidosController.delete);

module.exports = router;