const mongoose = require('mongoose');

const ReformaSchema = mongoose.Schema({


    requirente:String,
numeroModificacion:String,
fechapresupuestaria:String,
tipoGasto:String,
tipoModificacion:String,
montoSolicitado:String,
justificacion:String,
resolucion:String,
modificacionPresupuestaria:Array,
reprogramacionFinaciera:Array,


requisito1:String,
requisito2:String,
requisito3:String,
requisito4:String,
descripcion:String,

urlPdf:Array,
  

fechaReporte: { type: Date, required: true, default: Date.now },
usuario: {
type: mongoose.Types.ObjectId, ref: 'Usuario'
},
   

})

module.exports = mongoose.model('Reforma',ReformaSchema);