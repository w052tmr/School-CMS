const express = require("express");
const courseController = require("../controllers/courseController");
const authController = require("../controllers/authController");

const router = new express.Router({ mergeParams: true });

router.use(authController.protect);

// router.route("/:courseId/grade").get(courseController.getStudentGrade);

router
    .route("/")
    .get(courseController.getAllCourses)
    .post(courseController.createCourse);

router
    .route("/:id")
    .get(courseController.getCourse)
    .patch(courseController.updateCourse)
    .delete(courseController.deleteCourse);

module.exports = router;
