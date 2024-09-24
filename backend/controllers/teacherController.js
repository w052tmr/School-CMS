const Teacher = require("../models/teacherModel");
const factoryController = require("./factoryController");

exports.getAllTeachers = factoryController.getAll(Teacher);
exports.getTeacher = factoryController.getOne(Teacher);
exports.createTeacher = factoryController.createOne(Teacher);
exports.updateTeacher = factoryController.updateOne(Teacher);
exports.deleteTeacher = factoryController.deleteOne(Teacher);
