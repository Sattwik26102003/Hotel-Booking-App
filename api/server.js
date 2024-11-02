const express = require('express');
const cors = require('cors');
const app = express();
const pg = require('pg');
const env =require('dotenv')
// Database connectio
env.config();
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password:process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();


app.use(cors({
    origin: 'http://localhost:5173'
}));
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.json('Server is running successfully');
});

// Register route
app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    db.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [name, email, password],
        (err, dbResult) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error inserting data");
            } else {
                res.status(201).send("User registered successfully");
            }
        }
    );
});

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
