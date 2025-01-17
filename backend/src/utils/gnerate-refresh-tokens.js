

const crypto = require('crypto');

const generateRefreshToken = () => {
    return crypto.randomBytes(40).toString('hex'); // Generates a 40-byte secure token
};
module.exports = generateRefreshToken
