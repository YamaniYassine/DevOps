const express = require("express");
const router = express.Router();

//Controller
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

// auth routes
router.route("/signup").post(authController.signup);
router.route("/login").post(authController.login);
router.route("/add-employee").post(authController.addEmployee);
// route for updateProfile
router.route("/update-profile").patch(authController.updateProfile);
// router.route("/forgotPassword").post(authController.forgotPassword);
// router.route("/resetPassword/:resettoken").patch(authController.resetPassword);

router.route("/").post(userController.createUser);

router.route("/:id").get(userController.getUser);
router.route("/:id").delete(userController.deleteUser);
router.route("/").get(userController.getAllUsers);

module.exports = router;