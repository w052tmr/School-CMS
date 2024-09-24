const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const courseRoutes = require("./courseRoutes");

const router = express.Router();

router.use("/:id/courses", courseRoutes);
router.use("/:userId/courses", courseRoutes);

router.route("/signup").post(authController.signup);

router.route("/login").post(authController.login);

router.use(authController.protect);

router.route("/changePassword").patch(authController.changePassword);

router.route("/me").get(authController.getMe);

router
    .route("/")
    .get(authController.restrictTo("admin"), userController.getAllUsers)
    .post(userController.createUser);

router
    .route("/:id")
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;
