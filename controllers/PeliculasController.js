const axios = require('axios');
const { redirect } = require('express/lib/response');
const PeliculasController = {};


//Funciones del controlador

PeliculasController.traePeliculas = async (req, res) => {
    try {
        let resultado = await axios.get("https://api.themoviedb.org/3/genre/movie/list?api_key=c847ba30c2f265e8089e5876b43d2ae2&language=en-US")
        res.send(console.log(resultado.data.genres))
    }catch(error){
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
};

PeliculasController.registraPelicula = (req, res) => {

};

PeliculasController.peliculasTitulo = async (req, res) => {

    let busqueda = req.query.titulo;

    try {
    
        let resultado = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c847ba30c2f265e8089e5876b43d2ae2&language=en-US&query=${busqueda}&page=1&include_adult=false`)
        res.send(resultado.data)
    }catch(error){
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}

PeliculasController.traeNovedades = async (req, res) => {

    try{
        let resultado = await axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=c847ba30c2f265e8089e5876b43d2ae2&language=en-US&page=1")
        res.send(resultado.data);
    }catch(error){
        console.log("El error es: ", error.response.status, error.response.statusText)
    }
}
module.exports = PeliculasController;