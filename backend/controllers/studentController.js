const Student = require("../models/studentModel");
const factoryController = require("./factoryController");
// const catchAsync = require("../utils/catchAsync");

exports.getAllStudents = factoryController.getAll(Student);
exports.getStudent = factoryController.getOne(Student);
exports.createStudent = factoryController.createOne(Student);
exports.updateStudent = factoryController.updateOne(Student);
exports.deleteStudent = factoryController.deleteOne(Student);
