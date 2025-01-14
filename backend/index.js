const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./src/config/database");
require("./src/config/database");
const { logger } = require('./src/config/logger');
const httpLogger = require('./src/middleware/http-logger.middleware');
dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(httpLogger);

// Routes (Example)
app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()");
        logger.info('connecting to db');// Simple query to check connection
        res.status(200).json({ message: "Connected to DB", timestamp: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Example usage of logger in error middleware
app.use((err, req, res, next) => {
    logger.error(`Error ${err.message}`);
    res.status(500).send('Server Error');
});

// Example usage of logger in controllers
const userController = {
    createUser: async (req, res) => {
        try {
            logger.info('Creating new user');
            // Your logic here
        } catch (error) {
            logger.error(`Error creating user: ${error.message}`);
            res.status(500).send('Error creating user');
        }
    }
};

app.listen(port, (err) => {
    if (err) {
        console.error("Error while starting server:", err);
    } else {
        console.log(`Server is running at http://localhost:${port}`);
    }
});
