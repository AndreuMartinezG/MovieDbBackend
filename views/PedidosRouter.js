const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

const PedidosController = require('../controllers/PedidosController');


//Creamos Un pedido nuevo
router.post('/', auth, PedidosController.nuevoPedido);


//Buscamos Pedidos Todos los pedidos en DB
router.get('/', auth, PedidosController.todosPedidos)



//Busqueda Avanzada de pedido en DB
router.get('/avanzado', auth, PedidosController.infoPedidoAvanzado)

//router.get('/', auth, PedidosController.getAll);


//Borramos pedidos en DB por ID
//router.delete('/:id', auth, PedidosController.delete);

module.exports = router;