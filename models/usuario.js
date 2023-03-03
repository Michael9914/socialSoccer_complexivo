
const mongoose = require('mongoose');

                              
var rolesValidos = {
   values: ['ADMIN_ROLE', 'USER_ROLE', 'VOCAL_ROLE' ],
   message: '{VALUE} no es un rol permitido'
};


const UsuarioSchema = mongoose.Schema({

   nombre: { type: String },
   apellido:{type: String},
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true, },
   img: { type: String },
   role: {
      type: String,
      required: true,
      default: 'USER_ROLE',
      enum: rolesValidos
   },


});


/* UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
})  */



module.exports = mongoose.model('Usuario', UsuarioSchema);
