
const mongoose = require('mongoose');

const NotificationSchema = mongoose.Schema({

    title:String,
    view:Boolean,
    fechaReporte: { type: Date, required: true, default: Date.now},
    uri: String,
    role: String,
    detalle: String,
    trasmitter: {
        type: mongoose.Types.ObjectId, 
        ref: 'Usuario',
        require: true
    },
    receiver: {
        type: mongoose.Types.ObjectId, 
        ref: 'Usuario',
        require: true
    }

})

module.exports = mongoose.model('Notification', NotificationSchema);

