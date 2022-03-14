const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const UsuarioController = require('../controllers/UsuarioController');

//CRUD RESTful

//Leer todos los usuarios
router.get('/', auth, UsuarioController.traeUsuarios);
//http://localhost:3000/usuarios

//Registro
router.post('/', UsuarioController.registraUsuario);

//Borra todos los usuarios de la base de datos
router.delete('/', auth, isAdmin, UsuarioController.deleteAll)

//Login
router.post('/login', UsuarioController.logUsuario);

//Actualizar pass usuario
router.put('/newpassword', auth, UsuarioController.updatePassword);

//Busca en la db usuarios por ID
router.get('/:id', auth, UsuarioController.traerUsuarioId);

//Borra de la db usuarios por ID
router.delete('/:id', auth, isAdmin, UsuarioController.deleteById);

//Actualiza datos de usuarios en la DB
router.put('/:id', UsuarioController.updateProfile);

//Busca usuarios en la db por email
router.get('/email/:email', auth, UsuarioController.traerUsuarioEmail);






module.exports = router;