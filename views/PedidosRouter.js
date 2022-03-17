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
router.get('/paterntalAlert', auth, PedidosController.paterntalAlert)


//Busqueda avanzada de Usuarios con alquiler
router.get('/avanzado/usuarios', auth, PedidosController.infoUsuarios)


//Busqueda Avanzada de Usuarios por Nombre
router.get('/avanzado/usuarios/:nombre', auth, PedidosController.pedidoNombre)


//Borrar pedidos de Ususarios por Nombre
router.delete('/avanzado/usuarios/:nombre', auth, PedidosController.borrarNombre)


//Borrar pedidos por ID en DB
router.delete('/:id', auth, PedidosController.borrarPorId)

router.get('/:usuarioId', auth,  PedidosController.pedidosPorId)

module.exports = router;