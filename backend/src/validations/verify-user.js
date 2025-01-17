const { logger } = require("../config/logger");
const db = require('../config/database')


const verifyUser = async (email, userId) => {
    try {
        // Validate input
        if (!email) {
            return {
                status: 400,
                message: "Email is required.",
            };
        }
        if (!userId) {
            return {
                status: 400,
                message: "User ID is required.",
            };
        }

        // Query the database
        const query = 'SELECT * FROM users WHERE email = $1 AND id = $2';
        const res = await db.query(query, [email, userId]);

        // Check if user exists
        if (res?.rowCount > 0) {
            return {
                status: 200,
                message: "Valid user.",
                user: res.rows[0],
            };
        }

        // If no user is found
        return {
            status: 404,
            message: "User not found. Please check the provided email and user ID.",
        };
    } catch (error) {
        // Log the error and return a server error response
        logger.error(`Error verifying user: ${error.message}`);
        return {
            status: 500,
            message: "An error occurred while verifying the user. Please try again later.",
        };
    }
};


module.exports = verifyUser;