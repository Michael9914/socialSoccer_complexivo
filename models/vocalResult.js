const mongoose = require("mongoose");
const { Schema } = mongoose;


const vocalResultSchema = new Schema(
  {
    team1: { type: String, required: true },
    team2: { type: String, required: true },
    CardsRed1: { type: Number, required: true },
    CardsRed2: { type: Number, required: true },
    CardsYellow1: { type: Number, required: true },
    CardsYellow2: { type: Number, required: true },
    goals1: {type: Number , required: true,},
    goals2: {type: Number , required: true,},
    changes1: {type: Number , required: true,},
    changes2: {type: Number , required: true,},
    observation1: {type: String},
    observation2: {type: String}
  },
{
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("vocalResult", vocalResultSchema);
