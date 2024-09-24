const { Assignment } = require("../models/assignmentModel");
const StudentAssignment = require("../models/studentAssignmentModel");
const factoryController = require("./factoryController");

exports.getAllAssignments = factoryController.getAll(Assignment);
exports.getAssignment = factoryController.getOne(Assignment);
exports.createAssignment = factoryController.createOne(Assignment);
exports.updateAssignment = factoryController.updateOne(Assignment);
exports.deleteAssignment = factoryController.deleteOne(Assignment);

exports.getAllStudentAssignments = factoryController.getAll(StudentAssignment);
exports.getStudentAssignment = factoryController.getOne(StudentAssignment);
exports.createStudentAssignment =
    factoryController.createOne(StudentAssignment);
exports.updateStudentAssignment =
    factoryController.updateOne(StudentAssignment);
exports.deleteStudentAssignment =
    factoryController.deleteOne(StudentAssignment);
