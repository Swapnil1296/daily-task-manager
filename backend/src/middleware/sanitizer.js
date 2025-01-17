const xss = require('xss');
const mongoSanitize = require('express-mongo-sanitize');

const sanitizeData = (obj) => {
    const clean = {};
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            clean[key] = xss(obj[key]);
        } else {
            clean[key] = obj[key];
        }
    }
    return clean;
};

const inputSanitizer = (req, res, next) => {
    req.body = sanitizeData(req.body);
    req.query = sanitizeData(req.query);
    req.params = sanitizeData(req.params);
    next();
};

module.exports = { inputSanitizer, mongoSanitize };
