const axios = require('axios');
const PeliculasController = {};
const { Pelicula } = require('../models/index');



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


//Registro de Peliculas en la BD propia
PeliculasController.registraPelicula = (req, res) => {

    let titulo = req.body.titulo;
    let genero = req.body.genero;
    let sinopsis = req.body.sinopsis;
    let adult = req.body.email;
    let fecha = req.body.dni;

    Pelicula.findAll({
        where: { titulo: titulo }
    }).then(peliculaRepetida => {
        if (peliculaRepetida == 0) {
            Pelicula.create({
                titulo: titulo,
                genero: genero,
                sinopsis: sinopsis,
                adult: adult,
                fecha: fecha
            }).then(pelicula => {
                res.send(`${pelicula.titulo} ha sido registrada`)
            }).catch((error) => {
                res.send(error);
            });
        } else {
            res.send("La pelicula ya esta registrada")
        }

    }).catch(error => {
        res.send(error)
    });

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


///// Endpoint Retos /////

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
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`)
        res.send(resultado.data)

    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}

PeliculasController.peliculasIdReviews = async (req, res) => {

    let id = req.params.id
    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}&language=en-US&page=1`)
        res.send(resultado.data)

    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}

PeliculasController.peliculasUltimas = async (req, res) => {

    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/latest?api_key=${key}&language=en-US`)
        res.send(resultado.data)
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}

PeliculasController.peliculasValoradas = async (req, res) => {

    try {
        let result = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`)
        res.send(result.data);
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}

PeliculasController.peliculasRelacionadas = async (req, res) => {

    let id = req.params.id

    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}&language=en-US&page=1`)
        res.send(resultado.data)
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}




module.exports = PeliculasController;