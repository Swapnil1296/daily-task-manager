// src/middleware/http-logger.middleware.js
const morgan = require('morgan');
const { stream } = require('../config/logger');

const httpLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream }
);

module.exports = httpLogger;