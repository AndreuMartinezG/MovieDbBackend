const UsuarioController = {};


//Funciones del controlador de usuarios

UsuarioController.traeUsuarios = (req, res) => {

};

UsuarioController.registraUsuario = (req, res) => {
    
    let cuerpoRegistro = req.body

    try {

        res.send(cuerpoRegistro)

    }catch(error){
        res.send(error);
    }
};

UsuarioController.logUsuario = (req, res) => {

};

module.exports = UsuarioController;