const express = require("express");
const assignmentController = require("../controllers/assignmentController");

const router = new express.Router();

router
    .route("/students/")
    .get(assignmentController.getAllStudentAssignments)
    .post(assignmentController.createStudentAssignment);

router
    .route("/students/:id")
    .get(assignmentController.getAllStudentAssignments)
    .patch(assignmentController.createStudentAssignment)
    .delete(assignmentController.deleteStudentAssignment);

router
    .route("/")
    .get(assignmentController.getAllAssignments)
    .post(assignmentController.createAssignment);

router
    .route("/:id")
    .get(assignmentController.getAssignment)
    .patch(assignmentController.updateAssignment)
    .delete(assignmentController.deleteAssignment);

module.exports = router;
