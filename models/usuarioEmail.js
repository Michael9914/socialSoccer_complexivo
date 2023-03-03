const mongoose = require('mongoose');

const UsuarioEMailSchema = mongoose.Schema({ 

    email:{
        type:String
    }

})

module.exports = mongoose.model( 'Emails', UsuarioEMailSchema );