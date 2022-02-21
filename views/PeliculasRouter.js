const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");

const PeliculasController = require('../controllers/PeliculasController');


//CRUD RESTful

//Leer todos los usuarios
router.get('/', auth, PeliculasController.traeGeneros);
//http://localhost:3000/peliculas

//Registro
router.post('/', auth, PeliculasController.registraPelicula);
//http://localhost:3000/peliculas


//Busqueda de peliculas por titulo
router.get('/titulo', auth, PeliculasController.peliculasTitulo)

//Busqueda de novedades
router.get('/novedades', auth, PeliculasController.traeNovedades)

//Ultima pelicula subida a la base de datos -- /latest
router.get('/ultimas', auth, PeliculasController.peliculasUltimas)

// Traemos las peliculas con mejor nota -- /mejor_valoradas
router.get('/top_rated', auth, PeliculasController.peliculasValoradas)


//Traemos las peliculas relacionadas con la pelicula ID
router.get('/:id/relacionadas', auth, PeliculasController.peliculasRelacionadas)

//Busqueda por ID
router.get('/:id', auth, PeliculasController.peliculasPorId)

//Busqueda de Reviews de peliculas por id
router.get('/:id/reviews', auth, PeliculasController.peliculasIdReviews)


module.exports = router;
