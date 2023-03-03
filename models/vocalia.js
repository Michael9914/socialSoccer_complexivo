const mongoose = require("mongoose");
const { Schema } = mongoose;

var cards = {
    values: ['TARJETA_ROJA', 'TARJETA_AMARILLA','NINGUNA' ],
    message: '{VALUE} no es un rol permitido'
  };

const vocaliaSchema = new Schema(
  {
    team: {type: String,required: true,},
    nameOfPlayer: {type: String,required: true,},
    numberOfTShirt: {type: Number,required: true,},
    changes: {type: String},
    card: {type: String,required: true,},
    goals: {type: Number},
    numberOfChanges: {type: String},
  },
{
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Vocalia", vocaliaSchema);