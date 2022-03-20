const axios = require('axios');
const PeliculasController = {};
const { Pelicula } = require('../models/index');
const { Op } = require('sequelize')



//Funciones del controlador
const key = '210d6a5dd3f16419ce349c9f1b200d6d'





//////////////////////// ENDPOINTS A Propia DB //////////////////////


//Leer todos las Peliculas de nuestra propia DB
PeliculasController.traePeliculas = (req, res) => {

    Pelicula.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(error => {
            res.send(error)
        })

};


//Registro de Peliculas en la BD propia
PeliculasController.registraPelicula = (req, res) => {
    let movieId = req.body.id;
    let titulo = req.body.titulo;
    let genero = req.body.genero;
    let sinopsis = req.body.sinopsis;
    let adult = req.body.adult;
    let fecha = req.body.fecha;

    Pelicula.findAll({
        where: { titulo: titulo }
    }).then(peliculaRepetida => {
        if (peliculaRepetida == 0) {
            Pelicula.create({
                id: movieId,
                movieId:movieId,
                titulo: titulo,
                genero: genero,
                sinopsis: sinopsis,
                adult: adult,
                fecha: fecha
            }).then(pelicula => {
                res.send([`${pelicula.titulo} ha sido registrada`, pelicula.id])
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


//Borrar Pelicula DB propia
PeliculasController.borrarPelicula = (req, res) => {

    let id = req.body.id
    let titulo = req.body.titulo

    try {

        Pelicula.destroy({
            where: { id: id },
            truncate: false
        })
            .then(peliculaDel => {
                res.send(`La pelicula ${titulo} ha sido eliminada`)
            })

    } catch (error) {
        res.send(error)
    }

}


//Busca peliculas por Genero En propia BD
PeliculasController.buscaGenero = (req, res) => {

    let genero = req.body.genero;

    Pelicula.findAll({
        where: { genero: genero }
    }).then(pelicula => {
        res.send(pelicula)
    }).catch(error => {
        res.send(error)
    })

}


//Busca peliculas por Adult En propia BD
PeliculasController.buscaAdult = (req, res) => {

    Pelicula.findAll({
        where: {
            [Op.not]: [
                {
                    adult: {
                        [Op.like]: 0
                    }
                }
            ]
        }
    }).then(pelicula => {
        res.send(pelicula)
    }).catch(error => {
        res.send(error)
    })

}


//Buscar Peliculas por Genero y Titulo en propia DB
PeliculasController.buscaGenTit = (req, res) => {

    let titulo = req.body.titulo
    let genero = req.body.genero

    Pelicula.findAll({
        where: {

            [Op.and]: [
                {
                    titulo: {
                        [Op.like]: titulo
                    }
                },
                {
                    genero: {
                        [Op.like]: genero
                    }
                }
            ]

        }
    }).then(pelicula => {

        if (pelicula != 0) {
            res.send(pelicula);
        } else {
            res.send(`Película no encontrada`);
        };

    }).catch(error => {
        res.send(error);
    })
}






//////////////////////// ENDPOINTS A MOVIE DB //////////////////////


//Busqueda de peliculas por titulo
PeliculasController.peliculasTitulo = async (req, res) => {

    let busqueda = req.query.titulo;

    try {

        let resultado = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${busqueda}&page=1&include_adult=false`)
        res.send(resultado.data)
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}


//Trae novedades de MOvieDB
PeliculasController.traeNovedades = async (req, res) => {

    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`)
        res.send(resultado.data);
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}


//Busca Ultimas peliculas en MovieDB
PeliculasController.peliculasUltimas = async (req, res) => {

    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/latest?api_key=${key}&language=en-US`)
        res.send(resultado.data)
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}


// Traemos las peliculas con mejor nota -- /mejor_valoradas
PeliculasController.peliculasValoradas = async (req, res) => {

    try {
        let result = await axios.get(`https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`)
        res.send(result.data);
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}


//Traemos las peliculas relacionadas con la pelicula ID
PeliculasController.peliculasRelacionadas = async (req, res) => {

    let id = req.params.id

    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${key}&language=en-US&page=1`)
        res.send(resultado.data)
    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}


//Busca peliculas por ID en MovieDB
PeliculasController.peliculasPorId = async (req, res) => {

    let id = req.params.id
    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`)
        res.send(resultado.data)

    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}


//Busca reviws de pelicula por ID en MOvieDB
PeliculasController.peliculasIdReviews = async (req, res) => {

    let id = req.params.id
    try {
        let resultado = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}&language=en-US&page=1`)
        res.send(resultado.data)

    } catch (error) {
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}






module.exports = PeliculasController;