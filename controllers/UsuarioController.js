const { truncate } = require('fs');
const { Usuario } = require('../models/index');
const bcrypt = require('bcrypt')

const UsuarioController = {};


//Funciones del controlador de usuarios

UsuarioController.traeUsuarios = (req, res) => {
    //Búsqueda trayendo a todos los usuarios
    Usuario.findAll()
        .then(data => {

            res.send(data)
        });
};

UsuarioController.traerUsuarioId = (req, res) => {
    //Búsqueda buscando una Id
    Usuario.findByPk(req.params.id)
        .then(data => {
            res.send(data)
        });
};

UsuarioController.traerUsuarioEmail = (req, res) => {
    //Búsqueda comparando un campo
    Usuario.findOne({ where: { email: req.params.email } })
        .then(data => {
            res.send(data)
        });
}

UsuarioController.registraUsuario = async (req, res) => {

    //Registrando un usuario

    try {

        let nombre = req.body.nombre;
        let apellido = req.body.apellido;
        let edad = req.body.edad;
        let email = req.body.email;
        let DNI = req.body.DNI;
        let password = req.body.password;
        let telefono = req.body.telefono;
        let numCuenta = req.body.numCuenta

        //Comprobación de errores.....

        //Guardamos en sequelize el usuario

        Usuario.create({
            nombre = nombre,
            apellido = apellido,
            edad = edad,
            email = email,
            DNI = DNI,
            password = password,
            telefono = telefono,
            numCuenta = numCuenta
        }).then(usuario => {
            console.log("este es mi amigo", usuario);
            res.send(`${usuario.nombre}, bienvenid@ a este infierno`);
        });

    } catch (error) {
        res.send(error);
    }
};

UsuarioController.logUsuario = (req, res) => {

};


UsuarioController.deleteAll = async (req, res) => {

    try {

        Usuario.destroy({
            where: {},
            truncate: false
        })
            .then(usuariosEliminados => {
                res.send(`se han eliminado ${usuariosEliminados} usuarios`)
            })

    } catch (error) {
        res.send(error)
    }

}

UsuarioController.deleteById = async (req, res) => {

    let id = req.params.id

    try {

        Usuario.destroy({
            where: { id: id },
            truncate: false
        })
            .then(usuariosEliminados => {
                res.send(`El usuario con la id ${id} ha sido eliminado ${usuariosEliminados}`)
            })

    } catch (error) {
        res.send(error)
    }

}

UsuarioController.updateProfile = async (req, res) => {

    let datos = req.body;

    let id = req.params.id

    try {

        Usuario.update(datos, {
            where: { id: id }
        })
            .then(actualizado => {
                res.send(actualizado)
            })

    } catch (error) {
        res.send(error)
    }

}







module.exports = UsuarioController;