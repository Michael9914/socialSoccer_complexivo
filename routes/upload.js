var express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');
//modelos
var Usuario = require('../models/usuario');


var app = express();

app.use(fileUpload());







app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;

    //tipos de colecciones 
    var tiposValidos = ['usuarios'];
    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'tipo de coleccion no es valida',
            errors: { message: ' Debe de selccionar una imagen' }
        });

    }  

 
    if (!req.files) { 
        return res.status(400).json({
            ok: false,
            mensaje: ' No selecciono nada',
            errors: { message: ' Debe de selccionar una imagen' }
        });
    }

    //obtener nombre del archivo

    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extencionArchivo = nombreCortado[nombreCortado.length - 1];

    //Solo se aceptan estas extensiones
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extencionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: ' No selecciono nada',
            errors: { message: 'Las  extensiones validas son ' + extensionesValidas.join(', ') }
        });

    }

    //nombre del archivo
    // id 0000000- 123. extension
    var nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extencionArchivo}`;

    //mover el archivo
  



    var path = `./uploads/${tipo}/${nombreArchivo}`;

    archivo.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: ' Error al mover archivo',
                errors: err
            });
        }
        subirPorTipo(tipo, id, nombreArchivo, res) 
    })

    /* 
   }); */

});






function subirPorTipo(tipo, id, nombreArchivo, res) {


    if (tipo === 'usuarios') {

        Usuario.findById(id, (err, usuario) => {

            var pathViejo = './uploads/usuarios' + usuario.img;
            // Si existe elimina la imagen anterior
            if (fs.existsSync(pathViejo)) {
               // fs.unlink(pathViejo);
            }
            usuario.img = nombreArchivo

            usuario.save((err, usuarioActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'imagen de usuario actualizada',
                    usuario: usuarioActualizado
                })
            })
        });

    }

   


}


 

module.exports = app;