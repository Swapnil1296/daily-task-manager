const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');


const db = require("./src/config/database");
const getUserRoutes = require("./src/routes/user.routes.js");
const { logger } = require("./src/config/logger");
const httpLogger = require("./src/middleware/http-logger.middleware");
const specs = require("./src/config/swagger");

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(httpLogger);

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// API Routes
app.use('/api/auth', getUserRoutes);

// Health Check Route (to verify DB connection)
app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()");
        logger.info("Database connection is healthy");
        res.status(200).json({ message: "Connected to DB", timestamp: result.rows[0] });
    } catch (err) {
        logger.error(`Database connection error: ${err.message}`);
        res.status(500).json({ error: "Failed to connect to database" });
    }
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    logger.error(`Error: ${err.message}`);
    res.status(err.status || 500).json({ error: err.message || "Server Error" });
});
// Custom middleware to log rate limit message
app.use((req, res, next) => {
    // Listen for rate-limited requests and log to console
    res.on('finish', () => {
        if (res.statusCode === 429) {
            console.log('Rate limit exceeded: Too many requests');
            console.log('Message:', res.statusMessage);
        }
    });
    next();
});

// Unhandled Promise Rejection Handling
process.on("unhandledRejection", (reason, promise) => {
    logger.error(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
});

// Start Server
app.listen(port, (err) => {
    if (err) {
        logger.error(`Error while starting server: ${err.message}`);
        console.error("Error while starting server:", err);
    } else {
        logger.info(`Server is running at http://localhost:${port}`);
        console.log(`Server is running at http://localhost:${port}`);
        console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
    }
});
