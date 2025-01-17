const passwordValidator = require('password-validator');

const schema = new passwordValidator();
schema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(1)
    .has().symbols(1)
    .has().not().spaces();

const validatePassword = (password) => {
    const validationResult = schema.validate(password, { list: true });
    if (validationResult.length === 0) return { isValid: true };

    const errors = {
        min: 'Password must be at least 8 characters',
        max: 'Password must not exceed 100 characters',
        uppercase: 'Password must contain uppercase letters',
        lowercase: 'Password must contain lowercase letters',
        digits: 'Password must contain at least 1 number',
        symbols: 'Password must contain at least 1 special character',
        spaces: 'Password must not contain spaces'
    };

    return {
        isValid: false,
        errors: validationResult.map(error => errors[error])
    };
};

module.exports = { validatePassword };