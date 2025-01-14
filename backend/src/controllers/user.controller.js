// src/controllers/auth.controller.js
const { logger } = require("../config/logger");
const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const emailService = require("../services/email-service.js");

const authController = {
    signUpUser: async (req, res) => {
        logger.info('Attempting user registration');

        try {
            const { name, email, password } = req.body;

            // Check for existing user
            const existingUser = await userModel.findByEmail(email);
            if (existingUser) {
                return res.status(400).json({
                    success: false,
                    message: 'Email already registered'
                });
            }

            // Hash password
            const hashPass = await bcrypt.hash(password, 10);

            // Create user
            const userInfo = {
                name: name.trim(),
                email: email.toLowerCase(),
                password: hashPass,
                isVerified: false,
                createdAt: new Date()
            };

            const newUser = await userModel.SignUpUser(userInfo);



            // Generate verification token
            // const verificationToken = emailService.generateVerificationToken(newUser.id);

            // Send verification email
            // await emailService.sendVerificationEmail(email, verificationToken);
            if (newUser?.status === 201) {
                logger.info(`User registered successfully: ${email}`);

                return res.status(201).json({
                    success: true,
                    message: 'Registration successful. Please check your email for verification.',
                    data: {
                        userId: newUser.user?.id || null
                    }
                });
            } else {
                logger.error(`User registration failed for email: ${email}`);

                return res.status(400).json({
                    success: false,
                    message: 'Registration failed',
                    error: newUser?.message || 'An unexpected error occurred'
                });
            }
        } catch (error) {
            logger.error(`Registration error: ${error.message}`);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    },

    verifyEmail: async (req, res) => {
        try {
            const { token } = req.query;

            // Verify token
            const decoded = jwt.verify(token, process.env.EMAIL_SECRET);

            // Update user verification status
            await userModel.updateVerificationStatus(decoded.userId);

            return res.status(200).json({
                success: true,
                message: 'Email verified successfully'
            });

        } catch (error) {
            logger.error(`Email verification error: ${error.message}`);
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification token'
            });
        }
    }
};

module.exports = authController;