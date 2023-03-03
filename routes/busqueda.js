var express = require('express');

var app = express();


var Usuario = require('../models/usuario');
var Indicadores = require('../models/indicadores')
// ==============================
// Busqueda por colección
// ==============================
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {

        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;
        case 'indicadores':
            promesa = buscarIndicadores(busqueda, regex);
            break;






        default:
            return res.status(400).json({
                ok: false,
                mensaje: 'Los tipos de busqueda sólo son: usuarios, proveedores y lista de informes comerciales',
                error: { message: 'Tipo de tabla/coleccion no válido' }
            });

    }

    promesa.then(data => {

        res.status(200).json({
            ok: true,
            [tabla]: data
        });

    })

});


// ==============================
// Busqueda general
// ==============================
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');


    Promise.all([


        buscarUsuarios(busqueda, regex),
        buscarIndicadores(busqueda, regex),

    ])
        .then(respuestas => {

            res.status(200).json({
                ok: true,


                usuarios: respuestas[1],

            });
        })


});





function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Usuario.find({}, 'usuario email role img')
            .or([{ 'usuario': regex }, { 'email': regex }])
            .exec((err, usuarios) => {

                if (err) {
                    reject('Erro al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }


            })


    });
}


function buscarIndicadores(busqueda, regex) {
     console.log(busqueda)
    return new Promise((resolve, reject) => {

        Indicadores.find({}, 'unidad responde macroProceso fechaReporte ')
            .or([{ 'unidad': regex }, { 'responde': regex }, { 'macroProceso': regex }])
            .exec((err, indicadores) => {

                if (err) {
                    reject('Erro al cargar usuarios', err);
                } else {
                    resolve(indicadores);
                }


            })


    });
}
















module.exports = app;