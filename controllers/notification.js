const Notification = require('../models/notification');
const Usuario = require('../models/usuario');

// POST CREAR notification
const creaNotification = (req, res) => {
    // Crear un notification
    const notification = new Notification(req.body);

    // GUARDAR UNA OPCION EN MongoDB
    notification.save()
        .then(data => {
            res.json(data);
        }).catch(err => {
            res.status(500).json({
                msg: err.message
            });
        });
};

// todos las opciones x user
const getNotificationId = async(req, res) => {
    const desde = Number(req.query.desde) || 0;

    try {
        const [ notifications, total ] = await Promise.all([
            Notification
                .find({ "receiver" : req.query.user_id })
                .populate('receiver').populate('trasmitter')
                .sort({ fechaReporte: -1 }).skip(desde).limit(10),
            Notification.find({ "receiver" : req.query.user_id }).countDocuments()
        ])
        
        res.json({
            data: notifications,
            total: total,
            desde: desde+notifications.length,
            ok: true
        });
        
    } catch (error) {
        console.log(error)
        res.status(500).send({
            ok: false,
            msg: "Error inesperado"
        });   
    }
};

// get all UDPI
const getAllUPDI = (req, res) => {
    Usuario.find({ "role" : req.query.role },{ _id: 1, role: 1, email: 1, nombre: 1 })
        .then(usuario => {
            res.json({
                data: usuario,
                msg: 'Ok'
            });
        }).catch(err => {
            res.status(500).send({
                msg: err.message
            });
        });
};

// ACTUALIZAR OPCION
const actualizarNotificationes = (req, res) => {
    //Encuentra un notification y actualízalo
    Notification.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(notification => {
            if (!notification) {
                return res.status(404).json({
                    msg: "Opciones not found with id " + req.params._id
                });
            }
            res.json(notification);
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
const eliminarNotification = (req, res) => {
    Notification.findByIdAndDelete(req.params._id)
        .then(notification => {
            if (!notification) {
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

    creaNotification,
    getNotificationId,
    getAllUPDI,
    actualizarNotificationes,
    eliminarNotification

}