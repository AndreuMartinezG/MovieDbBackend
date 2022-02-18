const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/UsuarioController');

//CRUD RESTful

//Leer todos los usuarios
router.get('/', UsuarioController.traeUsuarios);
//http://localhost:3000/usuarios

//Registro
router.post('/', UsuarioController.registraUsuario);
//http://localhost:3000/usuarios

router.delete('/', UsuarioController.deleteAll)



//Login
router.post('/login', UsuarioController.logUsuario);
router.get('/:id', UsuarioController.traerUsuarioId);
router.delete('/:id', UsuarioController.deleteById);
router.put('/:id', UsuarioController.updateProfile);
router.get('/email/:email', UsuarioController.traerUsuarioEmail);






module.exports = router;