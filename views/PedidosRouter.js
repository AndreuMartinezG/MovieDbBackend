const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth')

const PedidosController = require('../controllers/PedidosController');


//Creamos Un pedido nuevo
router.post('/', auth, PedidosController.nuevoPedido);


//Buscamos Pedidos Todos los pedidos en DB
router.get('/', auth, PedidosController.todosPedidos)


//Borramos todos los pedidos en DB
router.delete('/', auth, PedidosController.borrarTodos)


//Busqueda Avanzada de pedido en DB
router.get('/avanzado', auth, PedidosController.infoPedidoAvanzado)


//Busqueda de Usuarios Menores con peliculas para adultos Alquiladas
router.get('/alerta', auth, PedidosController.alert)

module.exports = router;