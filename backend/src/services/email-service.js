const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

const emailService = {
    transporter: nodemailer.createTransport({
        // Configure your email service
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }),

    generateVerificationToken: (userId) => {
        return jwt.sign(
            { userId },
            process.env.EMAIL_SECRET,
            { expiresIn: '24h' }
        );
    },

    sendVerificationEmail: async (email, token) => {
        const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;

        await emailService.transporter.sendMail({
            to: email,
            subject: 'Email Verification',
            html: `
                <h1>Verify Your Email</h1>
                <p>Click the link below to verify your email address:</p>
                <a href="${verificationUrl}">Verify Email</a>
                <p>Link expires in 24 hours.</p>
            `
        });
    }
};

module.exports = emailService;