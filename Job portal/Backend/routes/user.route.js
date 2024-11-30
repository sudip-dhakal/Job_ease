const express = require("express");
const {
  login,
  register,
  updateProfile,
  logout,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/authenticate");
const { singleUpload, multiUpload } = require("../middlewares/multer");

const router = express.Router();

// Registration route with single file upload for profilePic
router.route("/register").post(singleUpload, register);

// Login route
router.route("/login").post(login);

// Profile update route with multiUpload for both profilePic and resume
router
  .route("/profile/update")
  .post(isAuthenticated, multiUpload, updateProfile);

// Logout route
router.route("/logout").get(logout);

module.exports = router;
