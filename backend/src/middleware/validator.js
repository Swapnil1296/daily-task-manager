const { body, validationResult } = require('express-validator');
const { validatePassword } = require('../validations/password-validator');

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
const signInValidationRule = [
    body('email')
        .trim()
        .isEmail()
        .normalizeEmail()
        .withMessage('Invalid email address'),
    body('password')
        .custom((value) => {
            const result = validatePassword(value);
            if (!result.isValid) {
                throw new Error(result.errors[0]);
            }
            return true;
        })
];

const taskValidationRules = [
    body('title')
        .exists({ checkFalsy: true })
        .withMessage('Title is required.')
        .isString()
        .withMessage('Title must be a string.'),
    body('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required.')
        .isString()
        .withMessage('Description must be a string.'),
    body('dueDate')
        .exists({ checkFalsy: true })
        .withMessage('Due date is required.')
        .isISO8601()
        .withMessage('Due date must be a valid date in YYYY-MM-DD format.'),
    body('priority')
        .exists({ checkFalsy: true })
        .withMessage('Priority is required.')
        .isString()
        .withMessage('Priority must be a string.')
        .isIn(['Low', 'Medium', 'High'])
        .withMessage('Priority must be either Low, Medium, or High.'),
    body('tags')
        .isArray({ min: 1 })
        .withMessage('Tags must be an array with at least one tag.')
        .custom((tags) => {
            if (!tags.every(tag => typeof tag === 'string')) {
                throw new Error('Each tag must be a string.');
            }
            return true;
        }),
    body('subtasks')
        .isArray({ min: 1 })
        .withMessage('Subtasks must be an array with at least one subtask.')
        .custom((subtasks) => {
            if (!subtasks.every(subtask => typeof subtask === 'string')) {
                throw new Error('Each subtask must be a string.');
            }
            return true;
        }),
    // body('newTag')
    //     .optional()
    //     .isString()
    //     .withMessage('New tag must be a string.')
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
    validate,
    signInValidationRule,
    taskValidationRules
};