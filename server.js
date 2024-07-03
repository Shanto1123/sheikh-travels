const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();

// MySQL connection setup
const db = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',      // Update with your MySQL username
    password: ' ',  // Update with your MySQL password
    database: 'travel_agency'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public')); // To serve static files like CSS

// Route to handle form submission
app.post('/submit_booking', (req, res) => {
    const { firstName, lastName, email, phone, destination, travelDates, message } = req.body;
    
    const query = 'INSERT INTO bookings (first_name, last_name, email, phone, destination, travel_dates, message) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [firstName, lastName, email, phone, destination, travelDates, message], (err, result) => {
        if (err) throw err;
        res.send('Booking submitted successfully');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
