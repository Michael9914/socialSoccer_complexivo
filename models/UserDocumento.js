const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Schema 
const userSchema = new Schema({
 
  avatar: {
    type: Array
  },

  usuario: {
    type: Schema.Types.ObjectId, ref: 'Usuario'
  },

  fechaReporte: { type: Date, required: true, default: Date.now },

})

module.exports = mongoose.model('Userdocumento', userSchema)   