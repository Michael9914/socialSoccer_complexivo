const mongoose = require("mongoose");
const { Schema } = mongoose;


var roles = {
  values: ['ADMIN_ROLE', 'USER_ROLE','VOCAL_ROLE' ],
  message: '{VALUE} no es un rol permitido'
};

const userSchema = new Schema(
  {
    name: { type: String},
    lastname: { type: String},
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: 'USER_ROLE',
      enum: roles
   },
  },
{
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
