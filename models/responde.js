const mongoose = require('mongoose');

const RespondeSchema = mongoose.Schema({

    responde:  String,
   

})

module.exports = mongoose.model('Responde',RespondeSchema);