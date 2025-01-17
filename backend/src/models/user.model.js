const db = require('../config/database');
const { logger } = require('../config/logger');





module.exports = {

    SignUpUser: async (userInfo) => {
        try {
            // Destructure with validation
            const { email, name, password } = userInfo || {};

            // More specific error messages for each missing field
            if (!email) throw new Error('Email is required');
            if (!name) throw new Error('Name is required');
            if (!password) throw new Error('Password is required');

            // SQL query with specific column selection
            const query = `
                INSERT INTO users (fullname, email, password)
                VALUES ($1, $2, $3)
                RETURNING id, fullname, email`;

            const result = await db.query(query, [name, email, password]);

            // Simplified success check - rowCount is sufficient
            if (result.rowCount > 0) {
                return {
                    status: 201,
                    message: 'User created successfully',
                    user: result.rows[0]
                };
            }

            // If insertion didn't return a row
            throw new Error('Failed to create user');

        } catch (error) {
            // Check for specific database errors
            if (error.code === '23505') { // Postgres unique violation
                logger.error(`Email already exists: ${email}`);
                throw new Error('Email already exists');
            }

            logger.error(`User creation failed: ${error.message}`);
            throw error; // Throw the original error for better debugging
        }
    },
    findByEmail: async (email) => {
        if (!email) {
            throw new Error('Email is required');
        }

        try {
            const query = 'SELECT * FROM users WHERE users.email = $1 LIMIT 1';
            const result = await db.query(query, [email]);



            if (result.rowCount > 0) {
                logger.info("user already exist with provided email id")
                return {
                    status: 400,
                    message: "User already exists",
                    user: result.rows[0]
                };
            }

            return null;
        } catch (error) {
            // Log the error for debugging
            logger.info(error)
            console.error('Database error:', error);
            throw new Error('Failed to check user existence');
        }
    }

}
