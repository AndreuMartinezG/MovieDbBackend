const authConfig = require('../config/auth');
const { Usuario } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const UsuarioController = {};


//Funciones del controlador de usuarios


//Búsqueda trayendo a todos los usuarios
UsuarioController.traeUsuarios = (req, res) => {

    Usuario.findAll()
        .then(data => {

            res.send(data)
        });
};



//Registro de usuarios
UsuarioController.registraUsuario = async (req, res) => {

    //Registrando un usuario
    console.log("Esstamos dentro")
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let edad = req.body.edad;
    let email = req.body.email;
    let dni = req.body.dni;
    let password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
    let telefono = req.body.telefono;
    let numCuenta = req.body.numCuenta

    //Comprobación de errores.....
    Usuario.findAll({
        where: {

            [Op.or]: [
                {
                    email: {
                        [Op.like]: email
                    }
                },
                //{
                //    nickname : {
                //        [Op.like] : nickname
                //
                //        //------------------------- A MODIFICAR -----------------
                //    }
                //}
            ]

        }
    }).then(datosRepetidos => {
        console.log("Hemos pasado la fase de comprobacion")
        if (datosRepetidos == 0) {
            Usuario.create({
                nombre: nombre,
                apellido: apellido,
                edad: edad,
                email: email,
                dni: dni,
                password: password,
                telefono: telefono,
                numCuenta: numCuenta
            }).then(usuario => {
                console.log("este es mi amigo", usuario);
                res.send(`${usuario.nombre}, bienvenid@ a este infierno`);
            }).catch((error) => {
                res.send(error);
            });
        } else {
            res.send("El usuario con ese e-mail ya existe en nuestra base de datos");
        }
    }).catch(error => {
        res.send(error)
    });
    //Guardamos en sequelize el usuario



};



//Borra todos los usuarios de la db
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



//Login de un usuario registrado
UsuarioController.logUsuario = (req, res) => {
    let correo = req.body.email;
    let password = req.body.password;

    Usuario.findOne({
        where: { email: correo }
    }).then(Usuario => {

        if (!Usuario) {
            res.send("Usuario o contraseña inválido");
        } else {
            //el usuario existe, por lo tanto, vamos a comprobar
            //si el password es correcto

            if (bcrypt.compareSync(password, Usuario.password)) { //COMPARA CONTRASEÑA INTRODUCIDA CON CONTRASEÑA GUARDADA, TRAS DESENCRIPTAR



                let token = jwt.sign({ usuario: Usuario }, authConfig.secret, {
                    expiresIn: authConfig.expires
                });
                Usuario.token = token
                res.json({
                    usuario: Usuario,
                    token: token,
                    loginSucces: true
                })
            } else {
                res.status(401).json({ msg: "Usuario o contraseña inválidos" });
            }
        };


    }).catch(error => {
        res.send(error);
    })
};


//Actualizar contraseña del usuario
UsuarioController.updatePassword = (req, res) => {


    let id = req.body.id;

    let oldPassword = req.body.oldPassword;

    let newPassword = req.body.newPassword;

    Usuario.findOne({
        where: { id: id }
    }).then(usuarioFound => {

        if (usuarioFound) {

            if (bcrypt.compareSync(oldPassword, usuarioFound.password)) {

                //En caso de que el Password antiguo SI sea el correcto....

                //1er paso..encriptamos el nuevo password....

                newPassword = bcrypt.hashSync(newPassword, Number.parseInt(authConfig.rounds));

                ////////////////////////////////7

                //2do paso guardamos el nuevo password en la base de datos

                let data = {
                    password: newPassword
                }

                console.log("esto es data", data);

                Usuario.update(data, {
                    where: { id: id }
                })
                    .then(actualizado => {
                        res.send(actualizado);
                    })
                    .catch((error) => {
                        res.status(401).json({ msg: `Ha ocurrido un error actualizando el password` });
                    });

            } else {
                res.status(401).json({ msg: "Usuario o contraseña inválidos" });
            }


        } else {
            res.send(`Usuario no encontrado`);
        }

    }).catch((error => {
        res.send(error);
    }));

};


//Busca usuarios por ID
UsuarioController.traerUsuarioId = (req, res) => {
    //Búsqueda buscando una Id
    Usuario.findByPk(req.params.id)
        .then(data => {
            res.send(data)
        });
};



//Borra Usuarios por ID
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


//Actualiza Datos por ID
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



//Busca usuarios en la DB por EMAIL
UsuarioController.traerUsuarioEmail = (req, res) => {
    //Búsqueda comparando un campo
    Usuario.findOne({ where: { email: req.params.email } })
        .then(data => {
            res.send(data)
        });
}

















module.exports = UsuarioController;