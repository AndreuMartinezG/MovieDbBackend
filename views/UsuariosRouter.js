const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

//CRUD RESTful

//Leer todos los usuarios
router.get('/', UsuarioController.traeUsuarios);
//http://localhost:3000/usuarios

//Registro
router.post('/', UsuarioController.registraUsuario);

//Borra todos los usuarios de la base de datos
router.delete('/', UsuarioController.deleteAll)

//Login
router.post('/login', UsuarioController.logUsuario);

//Busca en la db usuarios por ID
router.get('/:id', UsuarioController.traerUsuarioId);

//Borra de la db usuarios por ID
router.delete('/:id', UsuarioController.deleteById);

//Actualiza datos de usuarios en la DB
router.put('/:id', UsuarioController.updateProfile);

//Busca usuarios en la db por email
router.get('/email/:email', UsuarioController.traerUsuarioEmail);






module.exports = router;