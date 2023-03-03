const mongoose = require("mongoose");
const { Schema } = mongoose;


const teamSchema = new Schema(
    {
        nameOfTeam: { type: String, required: true },
        phone: { type: String, required: true },
        representativeName: { type: String, required: true },
        identificationCard: { type: String, required: true },
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

module.exports = mongoose.model("team", teamSchema);
