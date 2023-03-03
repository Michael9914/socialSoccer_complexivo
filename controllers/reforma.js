var express = require('express');


const Reforma = require('../models/reforma');



// POST CREAR CLIENTE
const creaReforma = (req, res) => {
    // Crear un cliente
    const reforma = new Reforma(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    reforma.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};


// todos las opciones
const getReforma = (req, res) => {
    Reforma.find({}).populate('usuario img')
        .then(reforma => {
            res.json(reforma);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};



// todos las opciones
const getReformaId = (req, res) => {
   Reforma.find({usuario:req.query.usuario_id})

    .populate('usuario ')
        .then(reforma => {
            res.json(reforma);
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};


//ENCUENTRE UNA OPCION
const getIdIReforma=  (req, res) => {
    Reforma.findById(req.params._id)
        .then(reforma => {
            if (!reforma) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(reforma);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Error retrieving Opciones with id " + req.params._id
            });
        });
};

// ACTUALIZAR OPCION
const actualizarReforma =  (req, res) => {
    //Encuentra un cliente y actualízalo
    Reforma.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(reforma => {
            if (!reforma) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(reforma);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Error updating opciones with id " + req.params._id
            });
        });
};






//ELIMINAR OPCION
const eliminarReforma = (req, res) => {
    Reforma.findByIdAndDelete(req.params._id)
        .then(reforma => {
            if (!reforma) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json({ msg: "Opciones deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            return res.status(500).json({
                msg: "Could not delete opciones with id " + req.params._id
            });
        });
};


module.exports = {

    creaReforma,
    getReforma,
    getReformaId,
    getIdIReforma,
    actualizarReforma,
    eliminarReforma

}