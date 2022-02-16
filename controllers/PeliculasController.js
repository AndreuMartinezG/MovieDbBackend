const axios = require('axios');
const res = require('express/lib/response');
const { redirect } = require('express/lib/response');
const PeliculasController = {};


//Funciones del controlador
const key = '210d6a5dd3f16419ce349c9f1b200d6d'

PeliculasController.traeGeneros = async (req, res) => {
    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en-US`)
        res.send(console.log(resultado.data.genres))
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
};

PeliculasController.registraPelicula = (req, res) => {

};

PeliculasController.peliculasTitulo = async (req, res) => {

    let busqueda = req.query.titulo;

    try {

        let resultado = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${busqueda}&page=1&include_adult=false`)
        res.send(resultado.data)
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}

PeliculasController.traeNovedades = async (req, res) => {

    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`)
        res.send(resultado.data);
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}

PeliculasController.peliculasPorId = async (req, res) => {

    let id = req.params.id
    try {
        let resultado = await axios.get(`
        https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`)
        res.send(resultado.data)

    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}

PeliculasController.peliculasIdReviews = async ()








module.exports = PeliculasController;