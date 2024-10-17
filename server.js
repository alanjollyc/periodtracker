const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'PeriodTrackerApp'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected.');
});

// User Registration
app.post('/register', async (req, res) => {
    const { username, email, password, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = 'INSERT INTO Users (username, email, password, age) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, hashedPassword, age], (err, result) => {
        if (err) return res.status(500).send({ message: 'Registration failed', error: err });
        res.send({ message: 'User registered successfully' });
    });
});

// User Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM Users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).send({ message: 'Login failed', error: err });
        if (results.length === 0) return res.status(404).send({ message: 'User not found' });

        const user = results[0];
        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).send({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ user_id: user.user_id }, 'secretkey', { expiresIn: '1h' });
        res.send({ message: 'Login successful', token });
    });
});

// Add a period cycle
app.post('/cycle', authenticate, (req, res) => {
    const { start_date, end_date } = req.body;
    const user_id = req.user_id;

    const query = 'INSERT INTO Period_Cycles (user_id, start_date, end_date) VALUES (?, ?, ?)';
    db.query(query, [user_id, start_date, end_date], (err, result) => {
        if (err) return res.status(500).send({ message: 'Adding cycle failed', error: err });
        res.send({ message: 'Cycle added successfully' });
    });
});

// Get period log and estimated next cycle
app.get('/log', authenticate, (req, res) => {
    const user_id = req.user_id;

    const query = 'SELECT start_date, end_date FROM Period_Cycles WHERE user_id = ? ORDER BY start_date DESC';
    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).send({ message: 'Fetching log failed', error: err });

        // Calculate estimated next cycle based on the last cycle
        if (results.length > 0) {
            const lastPeriod = results[0];
            const nextCycleDate = new Date(lastPeriod.end_date);
            // Assuming a cycle length of 28 days
            nextCycleDate.setDate(nextCycleDate.getDate() + 28);

            return res.send({
                periods: results,
                nextCycle: nextCycleDate.toISOString().split('T')[0] // Format YYYY-MM-DD
            });
        }

        res.send({ periods: results, nextCycle: null });
    });
});

// Middleware to authenticate using JWT
function authenticate(req, res, next) {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).send({ message: 'Unauthorized' });

    jwt.verify(token, 'secretkey', (err, decoded) => {
        if (err) return res.status(401).send({ message: 'Invalid token' });
        req.user_id = decoded.user_id;
        next();
    });
}

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

