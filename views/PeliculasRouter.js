const express = require('express');
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin")

const PeliculasController = require('../controllers/PeliculasController');


//CRUD RESTful


//////////////////////// ENDPOINTS A Propia DB //////////////////////


//Leer todos las Peliculas de nuestra propia DB
router.get('/', auth, PeliculasController.traePeliculas);
//http://localhost:3000/peliculas

//Registro Peliculas En la propia BD
router.post('/', auth, PeliculasController.registraPelicula);
//http://localhost:3000/peliculas

//Borrar Pelicula DB propia
router.delete('/', auth, PeliculasController.borrarPelicula)

//Busca peliculas por Genero En propia BD
router.get('/genero', auth, PeliculasController.buscaGenero);


//Busca peliculas por Adult En propia BD
router.get('/adult', auth, PeliculasController.buscaAdult);


//Buscar Peliculas por Genero y Titulo en propia DB
router.get('/genero_titulo', auth, PeliculasController.buscaGenTit);




//////////////////////// ENDPOINTS A MOVIE DB //////////////////////


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
