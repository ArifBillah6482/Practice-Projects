const User = require("../models/user.model");
//
const getAllUsers = async (req, res) => {
  const users = await User.find({}, { __v: 0, createdOn: 0 });
  //
  res.status(200).json({
    message: "all user",
    users,
  });
};
//
const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(
      { _id: req.params.id },
      { __v: 0, createdOn: 0 }
    );
    res.status(200).json({
      message: "one user",
      user,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};
//
const createUser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      age: Number(req.body.age),
    });
    //
    await newUser.save();
    //
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err.message);
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: req.body.name ? req.body.name : this.name,
        age: req.body.age ? Number(req.body.age) : this.age,
      },
      { new: true }
    );
    res.status(200).json({
      message: "user is updated",
      user,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
//
const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).send({ message: "User is deleted successful!" });
  } catch (err) {
    res.status(200).json({
      message: err.message,
    });
  }
};
//
module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};
