const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const { Usuario } = require('../models/index');

module.exports = (req, res, next) => {

    console.log(req.Usuario.token);

    // Comprobar que existe el token
    if (!req.Usuario.token) {
        res.status(401).json({ msg: "Acceso no autorizado" });
    } else {

        // Comrpobar la validez de este token
        let token = req.Usuario.token;

        // Comprobar la validez de este token
        jwt.verify(token, authConfig.secret, (err, decoded) => {

            if (err) {
                res.status(500).json({ msg: "Ha ocurrido un problema al decodificar el token", err });
            } else {
                req.user = decoded;
                next();
            }
        })
    }
};