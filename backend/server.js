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

// Logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Error during logout:', err);
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear the session cookie
        return res.status(200).json({ message: 'Logout successful' });
    });
});

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
// subject to be removed 
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

// Add Passenger to database
app.post('/api/passenger', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const studentID = req.session.user.Student_ID;
    const { hasLuggage, payment } = req.body;

    const paymentValue = payment || (req.session.user.payment?.paymentMethod || 'Unknown');

    const sql = 'SELECT * FROM Passenger WHERE Student_ID = ?';
    db.query(sql, [studentID], (err, result) => {
        if (err) {
            console.error('Error checking passenger:', err);
            return res.status(500).json({ message: 'Error checking passenger' });
        }

        const query = result.length > 0
            ? 'UPDATE Passenger SET Has_Luggage = ?, Payment = ? WHERE Student_ID = ?'
            : 'INSERT INTO Passenger (Student_ID, Has_Luggage, Payment) VALUES (?, ?, ?)';

        const params = result.length > 0
            ? [hasLuggage, paymentValue, studentID]
            : [studentID, hasLuggage, paymentValue];

        db.query(query, params, (err2)  => {
            if (err2) {
                console.error('Error inserting/updating passenger:', err2);
                return res.status(500).json({ message: 'Error inserting/updating passenger' });
            }

            const updatedPassenger = { hasLuggage, payment: paymentValue }
            req.session.user.passenger = updatedPassenger; // Update session with passenger info
            return res.status(200).json({ message: 'Passenger information saved successfully' });
        });
    });
});

// Add Driver to database
app.post('/api/driver', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const studentID = req.session.user.Student_ID;
    const { licenseNumber, allowSmoking, insuranceCompany } = req.body;

    const sql = 'SELECT * FROM Driver WHERE Student_ID = ?';
    db.query(sql, [studentID], (err, result) => {
        if (err) {
            console.error('Error checking driver:', err);
            return res.status(500).json({ message: 'Error checking driver' });
        }

        const query = result.length > 0
            ? 'UPDATE Driver SET License_Number = ?, Allow_Smoking = ?, Insurance_Company = ? WHERE Student_ID = ?'
            : 'INSERT INTO Driver (Student_ID, License_Number, Allow_Smoking, Insurance_Company) VALUES (?, ?, ?, ?)';

        const params = result.length > 0
            ? [licenseNumber, allowSmoking, insuranceCompany, studentID]
            : [studentID, licenseNumber, allowSmoking, insuranceCompany];
        db.query(query, params, (err2) => {
            if (err2) {
                console.error('Error inserting/updating driver:', err2);
                return res.status(500).json({ message: 'Error inserting/updating driver' });
            }

            const updatedDriver = { licenseNumber, allowSmoking, insuranceCompany }
            req.session.user.driver = updatedDriver; // Update session with driver info
            return res.status(200).json({ message: 'Driver information saved successfully' });
        });
    });
});

// Add Payment to database
app.post('/api/payment', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const studentID = req.session.user.Student_ID;
    const { paymentMethod, cardNumber, expirationDate, cvv } = req.body;

    const sql = 'SELECT * FROM Payment_Info WHERE ID_Number = ?';
    db.query(sql, [studentID], (err, result) => {
        if (err) {
            console.error('Error checking payment:', err);
            return res.status(500).json({ message: 'Error checking payment' });
        }

        const query = result.length > 0
            ? 'UPDATE Payment_Info SET Payment_Method = ?, Card_Number = ?, Expiration_Date = ?, CVV = ? WHERE ID_Number = ?'
            : 'INSERT INTO Payment_Info (ID_Number, Payment_Method, Card_Number, Expiration_Date, CVV) VALUES (?, ?, ?, ?, ?)';

        const params = result.length > 0
            ? [paymentMethod, cardNumber, expirationDate, cvv, studentID]
            : [studentID, paymentMethod, cardNumber, expirationDate, cvv];

        db.query(query, params, (err2) => {
            if (err2) {
                console.error('Error inserting/updating payment:', err2);
                return res.status(500).json({ message: 'Error inserting/updating payment' });
            }

            // Add to passenger table if exists
            const updatePassenger = 'UPDATE Passenger SET Payment = ? WHERE Student_ID = ?';
            db.query(updatePassenger, [paymentMethod, studentID], (err3) => {
                if (err3) {
                    console.error('Error updating passenger with payment:', err3);
                    return res.status(500).json({ message: 'Error updating passenger with payment' });
                }
            });

            const updatedPayment = { paymentMethod, cardNumber, expirationDate, cvv }
            req.session.user.payment = updatedPayment; // Update session with payment info
            return res.status(200).json({ message: 'Payment information saved successfully' });
        });
    });
});

// Add vehile to database
app.post('/api/vehicle', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const studentID = req.session.user.Student_ID;
    const { make, model, year, vin, licensePlate, seatingCapacity } = req.body;

    const sql = 'SELECT * FROM Vehicle WHERE Student_ID = ?';
    db.query(sql, [studentID], (err, result) => {
        if (err) {
            console.error('Error checking vehicle:', err);
            return res.status(500).json({ message: 'Error checking vehicle' });
        }

        const query = result.length > 0
            ? 'UPDATE Vehicle SET Make = ?, Model = ?, Year = ?, VIN = ?, License_Plate = ?, Seating_Capacity = ? WHERE Student_ID = ?'
            : 'INSERT INTO Vehicle (Make, Model, Year, VIN, License_Plate, Seating_Capacity, Student_ID) VALUES (?, ?, ?, ?, ?, ?, ?)';

        const params = result.length > 0
            ? [make, model, year, vin, licensePlate, seatingCapacity, studentID]
            : [make, model, year, vin, licensePlate, seatingCapacity, studentID];

        db.query(query, params, (err2) => {
            if (err2) {
                console.error('Error inserting/updating vehicle:', err2);
                return res.status(500).json({ message: 'Error inserting/updating vehicle' });
            }

            const updatedVehicle = { make, model, year, vin, licensePlate, seatingCapacity }
            req.session.user.vehicle = updatedVehicle; // Update session with vehicle info
            return res.status(200).json({ message: 'Vehicle information saved successfully' });
        });
    });
});

// Add Listing to database
app.post('/api/listings', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const studentID = req.session.user.Student_ID;
    const { listingType, tripDate, destination, meetTime, meetLocation, licensePlate } = req.body;

    if (listingType === 'offer') {
        // Confirm user is a driver
        const sqlDriver = 'SELECT * FROM Driver WHERE Student_ID = ?';
        db.query(sqlDriver, [studentID], (err, result) => {
            if (err) {
                console.error('Error checking driver:', err);
                return res.status(500).json({ message: 'Error checking driver' });
            }

            if (result.length === 0) {
                return res.status(400).json({ message: 'User is not a driver' });
            }

            const insertOfferSQL = 
                'INSERT INTO Ride_Offer (Trip_Date, Meet_up_Location, Destination, Meet_up_Time, Driver_ID) VALUES (?, ?, ?, ?, ?)';
            const offerParams = [tripDate, meetLocation, destination, meetTime, studentID];

            db.query(insertOfferSQL, offerParams, (err2) => {
                if (err2) {
                    console.error('Error inserting ride offer:', err2);
                    return res.status(500).json({ message: 'Error inserting ride offer' });
                }

                return res.status(200).json({ message: 'Ride offer created successfully' });
            });
        });
    }

    else if (listingType === 'request') {
        // Confirm user is a passenger
        const sqlPassenger = 'SELECT * FROM Passenger WHERE Student_ID = ?';
        db.query(sqlPassenger, [studentID], (err, result) => {
            if (err) {
                console.error('Error checking passenger:', err);
                return res.status(500).json({ message: 'Error checking passenger' });
            }

            if (result.length === 0) {
                return res.status(400).json({ message: 'User is not a passenger' });
            }

            const insertRequestSQL = 
                'INSERT INTO Ride_Request (Trip_Date, Meet_up_Location, Destination, Meet_up_Time, Passenger_ID) VALUES (?, ?, ?, ?, ?)';
            const requestParams = [tripDate, meetLocation, destination, meetTime, studentID];

            db.query(insertRequestSQL, requestParams, (err2) => {
                if (err2) {
                    console.error('Error inserting ride request:', err2);
                    return res.status(500).json({ message: 'Error inserting ride request' });
                }

                return res.status(200).json({ message: 'Ride request created successfully' });
            });
        });
    }
});
