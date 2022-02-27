const { Order } = require('../models/index');
const PedidosController = {};





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

module.exports = PedidosController;