const express = require('express');
const cors = require('cors');
const app = express();
const pg = require('pg');
const env =require('dotenv')
const jwt=require('jsonwebtoken')
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
app.post('/login', async (req,res)=>{
    const {email,password}=req.body;
    const result=await db.query("SELECT * FROM users where email=$1",[email]);
    // console.log(result.rows[0].password);
    if(result.rows.length){
        if(password==result.rows[0].password){
            jwt.sign({email:result.rows[0].email,id:result.rows[0].userid},jwtsecret,{},(err,token)=>{
                if(err){
                    throw err;
                }
                else{
                    console.log(token);
                    res.cookie('token',token,{
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                    }).json(result.rows[0]);
                }
            })
        }
        else{
            res.json("not ok");
        }
    }
})

app.listen(4000, () => {
    console.log("Server running on port 4000");
});
