const User = require("../models/usuario");

const userCtrl = {};

userCtrl.getUsers = async(req, res, next) => {
  const users = await User.find();
  res.json(users);
}

userCtrl.createUser = async (req, res, next) => {
  const user = new User({
    nombre: req.body.nombre,
    apellido: req.body.lastname,
    password: req.body.password,
    email: req.body.email,
  });
  await user.save();
  res.json({ status: "User created" });
};

userCtrl.getUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.json(user);
};

userCtrl.editUser = async (req, res, next) => {
  const { id } = req.params;
  await User.findByIdAndUpdate(id, {$set: req.body}, {new: true});
  res.json({ status: "User Updated" });
};

userCtrl.deleteUser = async (req, res, next) => {
  await User.findByIdAndRemove(req.params.id);
  res.json({ status: "User Deleted" });
};

module.exports = userCtrl;
