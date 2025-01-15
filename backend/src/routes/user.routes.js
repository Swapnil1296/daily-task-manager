// src/routes/auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/user.controller');
const { authLimiter } = require('../middleware/rate-limiter');
const { inputSanitizer } = require('../middleware/sanitizer');
const { signupValidationRules, validate, signInValidationRule } = require('../middleware/validator');

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */



router.post('/signup',
    authLimiter,
    inputSanitizer,
    signupValidationRules,
    validate,
    authController.signUpUser
);
router.post('/signin', authLimiter, inputSanitizer, validate, signInValidationRule, authController.singInUser)

router.get('/verify-email', authController.verifyEmail);

module.exports = router;