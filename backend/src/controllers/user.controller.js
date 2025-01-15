// src/controllers/auth.controller.js
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const { logger } = require("../config/logger");
const userModel = require("../models/user.model");
const emailService = require("../services/email-service.js");

const authController = {
    signUpUser: async (req, res) => {
        logger.info('Attempting user registration');

        try {
            const { name, email, password } = req.body;

            // Check for existing user
            const existingUser = await userModel.findByEmail(email);
            console.log("existingUser==>", existingUser)
            if (existingUser.status === 200) {
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
    singInUser: async (req, res) => {
        logger.info('Attempting user login');
        try {
            const { email, password } = req.body;
            if (!email) throw new Error("email is required");
            if (!password) throw new Error("password is required");

            const findUser = await userModel.findByEmail(email)
            if (findUser) {

                const matchPassword = await bcrypt.compare(typeof password === "number" ? String(password) : password, findUser?.user?.password)

                if (matchPassword) {
                    const token = jwt.sign({ userId: findUser.user?.id, email: email }, process.env.JWT_SECRET, {
                        expiresIn: '1h'
                    });
                    const userInfo = { email, password, token, userId: findUser?.user?.id };
                    const loginUser = await userModel.singInUser(userInfo);
                    refreshToken = loginUser?.data?.refreshToken
                    if (loginUser.status === 200) {
                        res.cookie("task-tracker", token, {
                            httpOnly: false,
                        });
                        return res.status(200).json({
                            status: 200,
                            message: "signed-in successfully",
                            data: {
                                accesToken: token,
                                refreshToken,
                            }

                        })
                    }
                    logger.info("signed in successfully")

                } else {
                    return res.status(400).json({
                        status: 400,
                        message: "invalid credentials",
                        error: "login failed"
                    })
                }


            }


        } catch (error) {
            logger.error(`Login error : ${error.message}`)
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