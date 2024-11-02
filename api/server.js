const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173'
}));

// Root route
app.get('/', (req, res) => {
    res.json('Server is running successfully' );
});

app.listen(4000);