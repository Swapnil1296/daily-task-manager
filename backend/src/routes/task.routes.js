const express = require("express");
const taskController = require("../controllers/task.controller");
const { taskValidationRules, validate } = require("../middleware/validator");
const { inputSanitizer } = require("../middleware/sanitizer");
const verifyToken = require("../middleware/verif-token");
const { authLimiter } = require("../middleware/rate-limiter");

const router = express.Router();

router.post(
  "/add-task",
  authLimiter,
  verifyToken,
  inputSanitizer,
  taskValidationRules,
  validate,
  taskController.addTask
);

router.post(
  "/update-task/:taskId",
  authLimiter,
  verifyToken,
  inputSanitizer,
  taskValidationRules,
  validate,
  taskController.updateTask
);

router.get(
  "/get-all-task",
  authLimiter,
  verifyToken,
  taskController.getTaskByUser
);

module.exports = router;
