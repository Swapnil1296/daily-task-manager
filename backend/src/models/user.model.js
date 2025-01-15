const db = require('../config/database');
const { logger } = require('../config/logger');
const generateRefreshToken = require('../utils/gnerate-refresh-tokens');





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
    singInUser: async (userInfo) => {
        try {
            const { email, password, userId } = userInfo

            if (!email) throw new Error("email is requred");
            if (!password) throw new Error("password is required");

            // const query = 'UPDATE users SET auth=$1 where email=$2 RETURNING id'
            const refreshToken = generateRefreshToken();
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

            await db.query(
                'INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES ($1, $2, $3)',
                [refreshToken, userId, expiresAt]
            );
            return {
                status: 200,
                message: "Sign-in successful",
                data: { refreshToken },
            };
        } catch (error) {
            logger.error(error)
            throw new Error(`error while sign in ${error?.message}`)
        }
    },
    findByEmail: async (email) => {
        if (!email) {
            throw new Error("Email is required");
        }

        try {
            const query = "SELECT * FROM users WHERE users.email = $1 LIMIT 1";
            const result = await db.query(query, [email]);

            if (result.rowCount > 0) {
                logger.info("User exists with the provided email ID");
                return {
                    status: 200,
                    message: "User exists",
                    user: result.rows[0],
                };
            }

            logger.info("No user found with the provided email ID");
            return {
                status: 404,
                message: "User does not exist",
                user: null,
            };
        } catch (error) {
            // Log the error for debugging
            logger.error("Database error:", error);
            throw new Error("Failed to check user existence");
        }
    },


}
