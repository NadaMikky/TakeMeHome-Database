const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
app.use(express.json());

// Configure account session
app.use(session({
    secret: 'TakeMehomeCountryroadsFromWVU',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false, // Set to true if using HTTPS
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
}));

//database connection
const db = mysql.createConnection({
    host: 'mysql-edcf05-take-me-home.l.aivencloud.com',
    port: 15398,
    user: 'avnadmin',
    password: 'AVNS_CPA5OmNrKwBD2xMko_a',
    database: 'defaultdb',
    ssl: {
        rejectUnauthorized: false // optional, but recommended
    }
});
// subbject to be removed 
function handleDisconnect() {
    db.connect(err => {
        if (err) {
            console.error('Error reconnecting to the database:', err);
           process.exit(1); 
        } else {
            console.log('Reconnected to the database.');
        }
    });

    db.on('error', err => {
        console.error('Database error:', err);
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleDisconnect(); // Reconnect if the connection is lost
        } else {
            throw err;
        }
    });
}

handleDisconnect();

// Database Queries

app.get('/', (req, res) => {
    return res.json('Hi, this is a testing msg from Backend -nada');
});

// Add User to database
app.post('/api/createAccount', (req, res) => {
    const { studentID, firstName, lastName, email, password, classYear } = req.body;
  
    const sql = 'INSERT INTO Users (Student_ID, First_Name, Last_Name, Email, Password, Class) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [studentID, firstName, lastName, email, password, classYear], (err, result) => {
      if (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ message: 'Error creating user' });
      }
      return res.status(201).json({ message: 'User created successfully' });
    });
  });

  // Login User
  app.post('/api/login', (req, res) => {
    const {email, password } = req.body;
    const sql = 'SELECT * FROM Users WHERE Email = ? AND Password = ?';

    db.query(sql, [email, password], (err, result) => {
    if (err) {
      console.error('Error during login:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }

    if (result.length > 0) {
      req.session.user = result[0];
      return res.status(200).json({ message: 'Login successful', user: result[0] });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    });
});

// Verify if user is logged in
app.get('/api/user', (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        return res.status(401).json({ loggedIn: false });
    }
});

app.get('/Users', (req, res) => {
    const sql = 'SELECT * FROM Users'
    db.query(sql, (err, result) => {
        if (err) return res.json(err)
        return res.json(result)
    })
})
    app.listen(8081, () => {
        console.log('Listening');
    });
