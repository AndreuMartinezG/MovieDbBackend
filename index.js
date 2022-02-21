const express = require('express');
const app = express();
const cors = require('cors');
let PORT = process.env.PORT || 3000;
const db = require('./db.js');
const router = require('./router');
const cookieParser = require('cookie-parser')

//process.env.PORT || 

let corsOptions = {//CONFIGURO OPCIONES DE CORS
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

//Middleware

app.use(express.json()); //PUEDO OBTENER JSON DEL BODY
app.use(cors(corsOptions));  //USO CORS
app.use(cookieParser())
app.use(router);


app.get('/', (req, res) => {res.send(//PANTALLA DE BIENVENIDA EN PANTALLA DE INICIO
    '<body style="margin: 0;background-color:rgb(179, 179, 255);font-family: Franklin Gothic Medium, Arial Narrow, Arial, sans-serif;"><div style="width:100%;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:space-between"><div style="background-color:black; width:100vw; height:3em"></div><h1 style="font-size:4em">Movie DB API</h1><p style="font-size:2em">Puedes ver la documentación de la API en el siguiente enlace:</p><a href="https://github.com/AndreuMartinezG/MovieDbBackend" style="text-decoration:none; color:red; font-size:2em">Readme en github</a><div style="background-color:black; width:100vw; height:3em; margin-top:3em"></div></div></body>'
);});

db.then(() => {
    app.listen(PORT, () => console.log(`Server on port ${PORT}`)); //Conectado a la base de datos
})
    .catch((err) => console.log(err.message));  