const express = require('express');
const router = express.Router();

const PeliculasController = require('../controllers/PeliculasController');


//CRUD RESTful

//Leer todos los usuarios
router.get('/', PeliculasController.traePeliculas);
//http://localhost:3000/peliculas

//Registro
router.post('/', PeliculasController.registraPelicula);
//http://localhost:3000/peliculas


//Busqueda de peliculas por titulo
router.get('/titulo', PeliculasController.peliculasTitulo)

//Busqueda de novedades
router.get('/novedades', PeliculasController.traeNovedades)


module.exports = router;