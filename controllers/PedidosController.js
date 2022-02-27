const { Order } = require('../models/index');
const PedidosController = {};




//Creacion de pedido en DB propia
PedidosController.nuevoPedido = (req, res) => {

    let body = req.body;

    console.log("este es body", body)

    Order.create({
        precio: body.precio,
        peliculaId: body.peliculaId,
        usuarioId: body.usuarioId,
        fechaEntrega: body.fechaEntrega
    })
        .then(pedido => {
            if (pedido) {
                res.send(pedido)
            } else {
                res.send("La creación de un nuevo pedido ha fallado");
            }
        })
        .catch((error => {
            res.send(error)
        }))
}



//Buscamos Pedidos Todos los pedidos en DB
PedidosController.todosPedidos = (req, res) =>{

    Order.findAll({
        where
    })
}



//Busqueda Avanzada de pedido en DB
PedidosController.infoPedidoAvanzado = async (req,res) => {

    let consulta = `SELECT usuarios.nombre AS Nombre,usuarios.email AS correo, usuarios.edad AS Edad,  peliculas.titulo AS Titulo_Alquilado , peliculas.genero AS Genero
    FROM usuarios INNER JOIN orders 
    ON usuarios.id = orders.usuarioId INNER JOIN peliculas 
    ON peliculas.id = orders.peliculaId`; 

    let resultado = await Order.sequelize.query(consulta,{
        type: Order.sequelize.QueryTypes.SELECT});

    if(resultado){
        res.send(resultado);
    }

}

module.exports = PedidosController;