const catchAsync = require("../utils/catchAsync");
const { User } = require("../models/userModel");
const factoryController = require("./factoryController");

exports.getAllUsers = factoryController.getAll(User);
exports.getUser = factoryController.getOne(User);
exports.createUser = factoryController.createOne(User);
exports.updateUser = factoryController.updateOne(User);
exports.deleteUser = factoryController.deleteOne(User);
