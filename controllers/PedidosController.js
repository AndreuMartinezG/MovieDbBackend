const { Order } = require('../models/index');
const PedidosController = {};




//Creacion de pedido en DB propia
PedidosController.nuevoPedido = async (req, res) => {

    let body = req.body;

    //////////////INTENTO DE CREAR PEDIDO POR RAW SQL /////////////////

    // let fechaPedido = '2022-02-27 14:31:39'

    // let consulta = `INSERT INTO orders (precio, peliculaId, usuarioId, fechaEntrega, createdAt, updatedAt) 
    //  VALUES ('${body.precio}', '${body.peliculaId}', '${body.usuarioId}', '${body.fechaEntrega}', '${fechaPedido}', '${fechaPedido}');`;

    // try {
    //     let resultado = await Order.sequelize.query(consulta, {
    //         type: Order.sequelize.QueryTypes.INSERT
    //     });

    //     if (resultado) {
    //         res.send(resultado);
    //     } else {
    //         res.send("Ha ocurrido algun error al hacer la consulta")
    //     }

    // } catch (error) {
    //     res.send(error)
    // }


    //////////////OPCION INICIAL PARA CREAR PEDIDO /////////////////
    Order.create({
        precio: body.precio,
        peliculaId: body.peliculaId,
        usuarioId: body.usuarioId,
        fechaEntrega: body.fechaEntrega
    }).then(pedido => {
        if (pedido) {
            res.send(pedido)
        } else {
            res.send("La creación de un nuevo pedido ha fallado");
        }
    }).catch((error => {
        res.send(error)
    }))
}



//Buscamos Pedidos Todos los pedidos en DB
PedidosController.todosPedidos = async (req, res) => {

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


//Busqueda avanzada de Usuarios con alquiler
PedidosController.infoUsuarios = async (req, res) => {

    let consulta = `SELECT  usuarios.nombre AS Nombre,
                            usuarios.apellido AS Apellido,
                            usuarios.email AS correo, 
                            usuarios.edad AS Edad,
                            usuarios.telefono AS NºTelefono,
                            usuarios.dni AS DNI,
                            peliculas.titulo AS Titulo_Alquilado,
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



//Busqueda Avanzada de Usuarios por Nombre
PedidosController.pedidoNombre = async (req, res) => {
    
    let nombre = req.params.nombre

    let consulta = `SELECT  usuarios.nombre AS Nombre,
                            usuarios.email AS correo, 
                            usuarios.edad AS Edad,  
                            peliculas.titulo AS Titulo_Alquilado , 
                            peliculas.genero AS Genero, 
                            orders.fechaEntrega AS Fecha_Alquiler
                    FROM usuarios 
                            INNER JOIN orders ON usuarios.id = orders.usuarioId 
                            INNER JOIN peliculas ON peliculas.id = orders.peliculaId
                    WHERE nombre LIKE '%${nombre}%'`;
    
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


//Borrar pedidos de Ususarios por Nombre
PedidosController.borrarNombre = async (req, res) => {
    
    let nombre = req.params.nombre

    let consulta = `DELETE FROM orders 
    INNER JOIN usuarios ON usuarios.id = orders.usuarioId WHERE (nombre = '${nombre}');`;

    try {
        let resultado = await Order.sequelize.query(consulta, {
            type: Order.sequelize.QueryTypes.DELETE
        });

        if (resultado != 0) {
            res.send(`pedidos de ${nombre} eliminados con exito!`);
        } else {
            res.send("Ha ocurrido algun error al borrar los pedidos")
        }

    } catch (error) {
        res.send(error)
    }
}

//Borrar pedidos por ID en DB
PedidosController.borrarPorId = async (req, res) => {

    let id = req.params.id

    let consulta = `DELETE FROM orders WHERE (id = ${id});`;

    try {
        let resultado = await Order.sequelize.query(consulta, {
            type: Order.sequelize.QueryTypes.DELETE
        });

        if (resultado != 0) {
            res.send("Pedido eliminado con exito!");
        } else {
            res.send("Ha ocurrido algun error al borrar los pedidos")
        }

    } catch (error) {
        res.send(error)
    }

}

PedidosController.pedidosPorId = async (req, res) => {
       
    let id = req.params.id
    let consulta = `SELECT  
                            peliculas.titulo AS Titulo_Alquilado ,
                            orders.precio AS Precio,
                            orders.fechaEntrega AS Fecha_Alquiler
                    FROM heroku_459a2091d24bf28.usuarios 
                    INNER JOIN heroku_459a2091d24bf28.orders ON usuarios.id = orders.usuarioId 
                    INNER JOIN heroku_459a2091d24bf28.peliculas ON peliculas.id = orders.peliculaId
                    WHERE usuarioId = ${id}`;

    let resultado = await Order.sequelize.query(consulta,{
        type: Order.sequelize.QueryTypes.SELECT});
    if(resultado){
        res.send(resultado);
    }else{
        res.send(error)
    }

}



module.exports = PedidosController;







