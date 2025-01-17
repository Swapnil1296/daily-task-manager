// src/routes/auth.routes.js
const express = require("express");

const authController = require("../controllers/user.controller");
const { authLimiter } = require("../middleware/rate-limiter");
const { inputSanitizer } = require("../middleware/sanitizer");
const {
  signupValidationRules,
  validate,
  signInValidationRule,
} = require("../middleware/validator");

// Swagger documentation
require("../docs/swagger-doc");

const router = express.Router();

router.post(
  "/signup",
  // authLimiter,
  inputSanitizer,
  signupValidationRules,
  validate,
  authController.signUpUser
);
router.post(
  "/signin",
  authLimiter,
  inputSanitizer,
  validate,
  signInValidationRule,
  authController.singInUser
);

router.get("/verify-email", authController.verifyEmail);

module.exports = router;
