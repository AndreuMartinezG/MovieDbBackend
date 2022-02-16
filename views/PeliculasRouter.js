const express = require('express');
const router = express.Router();

const PeliculasController = require('../controllers/PeliculasController');


//CRUD RESTful

//Leer todos los usuarios
router.get('/', PeliculasController.traeGeneros);
//http://localhost:3000/peliculas

//Registro
router.post('/', PeliculasController.registraPelicula);
//http://localhost:3000/peliculas


//Busqueda de peliculas por titulo
router.get('/titulo', PeliculasController.peliculasTitulo)

//Busqueda de novedades
router.get('/novedades', PeliculasController.traeNovedades)

//Busqueda por ID
router.get('/:id', PeliculasController.peliculasPorId)


//Busqueda de Reviews de peliculas por id
router.get('/:id/reviews', PeliculasController.peliculasIdReviews)


//Ultima pelicula subida a la base de datos -- /latest
router.get('/ultimas', PeliculasController.peliculasUltimas)

// Traemos las peliculas con mejor nota -- /mejor_valoradas
router.get('/top_rated', PeliculasController.peliculasValoradas)

//Traemos las peliculas relacionadas con la pelicula ID

router.get('/:id/relacionadas', PeliculasController.peliculasRelacionadas)


module.exports = router;

//:Id
//
//req.params.id