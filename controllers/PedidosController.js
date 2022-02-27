const { Order } = require('../models/index');
const PedidosController = {};




//Creacion de pedido en DB propia
PedidosController.nuevoPedido = async (req, res) => {

    let body = req.body;
    let fechaPedido = '2022-02-27 14:31:39'

    let consulta = `INSERT INTO orders (precio, peliculaId, usuarioId, fechaEntrega, createdAt, updatedAt) 
     VALUES ('${body.precio}', '${body.peliculaId}', '${body.usuarioId}', '${body.fecha}');`;
    
    try {
        let resultado = await Order.sequelize.query(consulta, {
            type: Order.sequelize.QueryTypes.INSERT
        });

        if (resultado) {
            res.send(resultado);
        } else {
            res.send("Ha ocurrido algun error al hacer la consulta")
        }

    } catch (error) {
        res.send(error)
    }


    // Order.create({
    //     precio: body.precio,
    //     peliculaId: body.peliculaId,
    //     usuarioId: body.usuarioId,
    //     fechaEntrega: body.fechaEntrega
    // }).then(pedido => {
    //         if (pedido) {
    //             res.send(pedido)
    //         } else {
    //             res.send("La creación de un nuevo pedido ha fallado");
    //         }
    // }).catch((error => {
    //         res.send(error)
    // }))
}



//Buscamos Pedidos Todos los pedidos en DB
PedidosController.todosPedidos = async(req, res) => {

    let consulta = `SELECT * FROM orders`;

    try {
        let resultado = await Order.sequelize.query(consulta, {
            type: Order.sequelize.QueryTypes.SELECT
        });

        if (resultado) {
            res.send(resultado);
        } else {
            res.send("Ha ocurrido algun error al hacer la consulta")
        }

    } catch (error) {
        res.send(error)
    }
}



//Borramos todos los pedidos en DB
PedidosController.borrarTodos = async (req, res) => {

    let consulta = `DELETE FROM orders`;

    try {
        let resultado = await Order.sequelize.query(consulta, {
            type: Order.sequelize.QueryTypes.DELETE
        });

        if (resultado != 0) {
            res.send("Pedidos Eliminados con exito!");
        } else {
            res.send("Ha ocurrido algun error al borrar los pedidos")
        }

    } catch (error) {
        res.send(error)
    }
}


//Busqueda Avanzada de pedido en DB
PedidosController.infoPedidoAvanzado = async (req, res) => {

    let consulta = `SELECT  usuarios.nombre AS Nombre,
                            usuarios.email AS correo, 
                            usuarios.edad AS Edad,  
                            peliculas.titulo AS Titulo_Alquilado , 
                            peliculas.genero AS Genero, 
                            orders.fechaEntrega AS Fecha_Alquiler
                    FROM usuarios 
                            INNER JOIN orders ON usuarios.id = orders.usuarioId 
                            INNER JOIN peliculas ON peliculas.id = orders.peliculaId `;
    try {
        let resultado = await Order.sequelize.query(consulta, {
            type: Order.sequelize.QueryTypes.SELECT
        });

        if (resultado) {
            res.send(resultado);
        } else {
            res.send("Ha ocurrido algun error al hacer la consulta")
        }

    } catch (error) {
        res.send(error)
    }


}


//Busqueda de Usuarios Menores con peliculas para adultos Alquiladas
PedidosController.paterntalAlert = async (req, res) => {

    let consulta = `SELECT  usuarios.nombre AS Nombre,
                            usuarios.email AS correo, 
                            usuarios.edad AS Edad,  
                            peliculas.adult AS Adultos, 
                            peliculas.titulo AS Titulo_Alquilado
                    FROM usuarios 
                            INNER JOIN orders ON usuarios.id = orders.usuarioId 
                            INNER JOIN peliculas ON peliculas.id = orders.peliculaId
                    WHERE edad < 18 AND adult = 1 ORDER BY edad DESC`;

    let resultado = await Order.sequelize.query(consulta, {
        type: Order.sequelize.QueryTypes.SELECT
    });

    if (resultado) {
        res.send(resultado);
    }

}



module.exports = PedidosController;







