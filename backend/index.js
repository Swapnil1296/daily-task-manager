const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./src/config/database");
require("./src/config/database");

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Routes (Example)
app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT NOW()"); // Simple query to check connection
        res.status(200).json({ message: "Connected to DB", timestamp: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(port, (err) => {
    if (err) {
        console.error("Error while starting server:", err);
    } else {
        console.log(`Server is running at http://localhost:${port}`);
    }
});
