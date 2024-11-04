const express = require('express');
const cors = require('cors');
const app = express();
const pg = require('pg');
const env =require('dotenv')
const jwt=require('jsonwebtoken')
const cookieParser= require('cookie-parser')

app.use(cookieParser())

//user-authentication middleware
const auth=(req,res,next)=>{
    try {
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({message:'no login brotha'})
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId=decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}


// Database connection
env.config();
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password:process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();
const jwtsecret='hbhjewvbchvwucvwbbxuw'

app.use(cors({
    origin: 'http://localhost:5173', // Your React app’s URL
    credentials: true, // Allows cookies to be sent
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
//Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await db.query("SELECT * FROM users where email=$1", [email]);

    if (result.rows.length) {
        if (password == result.rows[0].password) {
            jwt.sign(
                { email: result.rows[0].email, id: result.rows[0].userid },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }, // Set token expiration to 1 hour
                (err, token) => {
                    if (err) {
                        throw err;
                    } else {
                        res.cookie('token', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax',
                            maxAge: 3600000, // 1 hour in milliseconds
                        }).json(result.rows[0]);
                    }
                }
            );
        } else {
            res.json("not ok");
        }
    } else {
        res.status(404).json('not found');
    }
});


app.get('/profile',auth,async (req,res)=>{
    const result =await db.query('SELECT * FROM users where userid=$1',[req.userId]);
    res.json(result.rows[0]);
})

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
