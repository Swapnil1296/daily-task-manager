const { body, validationResult } = require('express-validator');
const { validatePassword } = require('../utils/password-validator');

const signupValidationRules = [
    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email address'),

    body('name')
        .trim()
        .isLength({ min: 2, max: 50 })
        .withMessage('Name must be between 2 and 50 characters')
        .matches(/^[a-zA-Z\s]*$/)
        .withMessage('Name can only contain letters and spaces'),

    body('password')
        .custom((value) => {
            const result = validatePassword(value);
            if (!result.isValid) {
                throw new Error(result.errors[0]);
            }
            return true;
        })
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array().map(err => err.msg)
        });
    }
    next();
};

module.exports = {
    signupValidationRules,
    validate
};