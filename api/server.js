const express = require('express');
const cors = require('cors');
const app = express();
const pg = require('pg');
const env = require('dotenv');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const download = require('image-downloader');
const multer = require('multer');
const path = require('path');

env.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}_${req.userId}_${file.originalname}`;
        cb(null, uniqueName);
    }
});
const upload = multer({ storage });
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Middleware for user authentication
const auth = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

// Database connection
const db = new pg.Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
db.connect();

// JWT secret
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

// Routes
app.get('/', (req, res) => {
    res.json('Server is running successfully');
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    db.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [name, email, password],
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error inserting data");
            } else {
                res.status(201).send("User registered successfully");
            }
        }
    );
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const result = await db.query("SELECT * FROM users WHERE email=$1", [email]);

    if (result.rows.length) {
        if (password === result.rows[0].password) {
            jwt.sign(
                { email: result.rows[0].email, id: result.rows[0].userid },
                jwtSecret,
                { expiresIn: '1h' },
                (err, token) => {
                    if (err) {
                        throw err;
                    } else {
                        res.cookie('token', token, {
                            httpOnly: true,
                            secure: process.env.NODE_ENV === 'production',
                            sameSite: 'lax',
                            maxAge: 3600000, // 1 hour
                        }).json(result.rows[0]);
                    }
                }
            );
        } else {
            res.status(404).json("Incorrect password");
        }
    } else {
        res.status(404).json('User not found');
    }
});

app.get('/profile', auth, async (req, res) => {
    const result = await db.query('SELECT * FROM users WHERE userid=$1', [req.userId]);
    res.json(result.rows[0]);
});

app.post('/logout', (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: new Date(0),
    }).status(200).json({ message: 'Logged out successfully' });
});

// Upload image via URL
app.post('/upload-photo-url', auth, (req, res) => {
    const imageUrl = req.body.url;
    if (!imageUrl || typeof imageUrl !== 'string') {
        return res.status(400).json({ message: 'Invalid URL' });
    }

    const fileName = `${Date.now()}_${req.userId}.jpeg`;
    const options = {
        url: imageUrl.trim(),
        dest: path.join(__dirname, 'uploads', fileName),
    };

    download.image(options)
        .then(({ filename }) => {
            res.json({ filename: path.basename(filename) });
        })
        .catch(err => {
            console.error(err.message);
            res.status(500).json({ message: 'Error downloading image' });
        });
});

// Upload image from device
app.post('/upload-photo-device', auth, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'File upload failed' });
    }
    res.json({ filename: req.file.filename });
});

app.post('/save-place' ,auth,async (req,res)=>{
    console.log(req.body);
    const {title, address, addedPhotos,description, perks, extraInfo,checkIn, checkOut, maxGuests}=req.body
    await db.query(
        'insert into accomodation (title, address, photos,description, perks, extraInfo,checkIn, checkOut, maxGuests,userid) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
        [title, address, addedPhotos,description, perks, extraInfo,checkIn, checkOut, maxGuests,req.userId],
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).send("Error inserting data");
            } else {
                res.status(201).send("Accomodation added successfully");
                console.log("place added");
            }
        }
    )
});

app.get('/places', auth, async (req, res) => {
    try {
        const places = await db.query(
            'SELECT * FROM accomodation WHERE userid=$1',
            [req.userId]
        );
        res.json(places.rows); // Send all rows
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch places' });
    }
});


app.listen(4000, () => {
    console.log("Server running on port 4000");
});

