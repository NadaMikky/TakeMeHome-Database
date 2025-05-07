const express = require('express');
const session = require('express-session');
const db = require('./db');
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

// Database Queries

app.get('/', (req, res) => {
    return res.json('Hi, this is a testing msg from Backend -nada');
});

// Add User to database
app.post('/api/createAccount', async (req, res) => {
    const { studentID, firstName, lastName, email, password, classYear } = req.body;
  
    const sql = 'INSERT INTO Users (Student_ID, First_Name, Last_Name, Email, Password, Class) VALUES (?, ?, ?, ?, ?, ?)';
    try {
        await db.query(sql, [studentID, firstName, lastName, email, password, classYear]);
        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error inserting user:', err);
        return res.status(500).json({ message: 'Error creating user' });
    }
  });

  // Login User
  app.post('/api/login', async (req, res) => {
    const {email, password } = req.body;
    const sql = 'SELECT * FROM Users WHERE Email = ? AND Password = ?';

    try {
        const [result] = await db.query(sql, [email, password]);

        if (result.length > 0) {
            req.session.user = result[0];
            return res.status(200).json({ message: 'Login successful', user: result[0] });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        console.error('Error during login:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Verify if user is logged in
app.get('/api/user', (req, res) => {
    if (req.session.user) {
        return res.status(200).json({ loggedIn: true, user: req.session.user });
    } else {
        return res.status(401).json({ loggedIn: false });
    }
});

app.get('/api/users', async (req, res) => {
    const sql = 'SELECT * FROM Users';
    try {
        const [rows] = await db.query(sql);
        return res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ message: 'Error fetching users' });
    }
});

app.listen(8081, () => {
    console.log('Listening');
});

// Add Passenger to database
app.post('/api/passenger', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const studentID = req.session.user.Student_ID;
    const { hasLuggage, payment } = req.body;

    const paymentValue = payment || (req.session.user.payment?.paymentMethod || 'Unknown');

    try {
        // Check if passenger already exists
        const [result] = await db.query('SELECT * FROM Passenger WHERE Student_ID = ?', [studentID]);

        const query = result.length > 0
            ? 'UPDATE Passenger SET Has_Luggage = ?, Payment = ? WHERE Student_ID = ?'
            : 'INSERT INTO Passenger (Student_ID, Has_Luggage, Payment) VALUES (?, ?, ?)';

        const params = result.length > 0
            ? [hasLuggage, paymentValue, studentID]
            : [studentID, hasLuggage, paymentValue];

        // Insert or Update Passenger
        await db.query(query, params);

        const updatedPassenger = { hasLuggage, payment: paymentValue };
        req.session.user.passenger = updatedPassenger; // Update session with passenger info
        return res.status(200).json({ message: 'Passenger information saved successfully' });

    } catch (err) {
        console.error('Error inserting/updating passenger:', err);
        return res.status(500).json({ message: 'Error inserting/updating passenger' });
    }
});

// Add Driver to database
app.post('/api/driver', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const studentID = req.session.user.Student_ID;
    const { licenseNumber, allowSmoking, insuranceCompany } = req.body;

    try {
        // Check if driver already exists
        const [result] = await db.query('SELECT * FROM Driver WHERE Student_ID = ?', [studentID]);

        const query = result.length > 0
            ? 'UPDATE Driver SET License_Number = ?, Allow_Smoking = ?, Insurance_Company = ? WHERE Student_ID = ?'
            : 'INSERT INTO Driver (Student_ID, License_Number, Allow_Smoking, Insurance_Company) VALUES (?, ?, ?, ?)';

        const params = result.length > 0
            ? [licenseNumber, allowSmoking, insuranceCompany, studentID]
            : [studentID, licenseNumber, allowSmoking, insuranceCompany];

        // Insert or Update Driver
        await db.query(query, params);

        const updatedDriver = { licenseNumber, allowSmoking, insuranceCompany };
        req.session.user.driver = updatedDriver; // Update session with driver info
        return res.status(200).json({ message: 'Driver information saved successfully' });

    } catch (err) {
        console.error('Error inserting/updating driver:', err);
        return res.status(500).json({ message: 'Error inserting/updating driver' });
    }
});

// Add Payment to database
app.post('/api/payment', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const studentID = req.session.user.Student_ID;
    const { paymentMethod, cardNumber, expirationDate, cvv } = req.body;

    try {
        // Check if payment info already exists
        const [result] = await db.query('SELECT * FROM Payment_Info WHERE ID_Number = ?', [studentID]);

        const query = result.length > 0
            ? 'UPDATE Payment_Info SET Payment_Method = ?, Card_Number = ?, Expiration_Date = ?, CVV = ? WHERE ID_Number = ?'
            : 'INSERT INTO Payment_Info (ID_Number, Payment_Method, Card_Number, Expiration_Date, CVV) VALUES (?, ?, ?, ?, ?)';

        const params = result.length > 0
            ? [paymentMethod, cardNumber, expirationDate, cvv, studentID]
            : [studentID, paymentMethod, cardNumber, expirationDate, cvv];

        await db.query(query, params);

        // Try updating Passenger table if the user is a passenger
        await db.query('UPDATE Passenger SET Payment = ? WHERE Student_ID = ?', [paymentMethod, studentID]);

        // Update session
        const updatedPayment = { paymentMethod, cardNumber, expirationDate, cvv };
        req.session.user.payment = updatedPayment;

        return res.status(200).json({ message: 'Payment information saved successfully' });

    } catch (err) {
        console.error('Error inserting/updating payment:', err);
        return res.status(500).json({ message: 'Error inserting/updating payment' });
    }
});

// Add vehile to database
app.post('/api/vehicle', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const studentID = req.session.user.Student_ID;
    const { make, model, year, vin, licensePlate, seatingCapacity } = req.body;

    try {
        // Check if a vehicle already exists for this student
        const [existing] = await db.query('SELECT * FROM Vehicle WHERE Student_ID = ?', [studentID]);

        const query = existing.length > 0
            ? 'UPDATE Vehicle SET Make = ?, Model = ?, Year = ?, VIN = ?, License_Plate = ?, Seating_Capacity = ? WHERE Student_ID = ?'
            : 'INSERT INTO Vehicle (Make, Model, Year, VIN, License_Plate, Seating_Capacity, Student_ID) VALUES (?, ?, ?, ?, ?, ?, ?)';

        const params = existing.length > 0
            ? [make, model, year, vin, licensePlate, seatingCapacity, studentID]
            : [make, model, year, vin, licensePlate, seatingCapacity, studentID];

        await db.query(query, params);

        const updatedVehicle = { make, model, year, vin, licensePlate, seatingCapacity };
        req.session.user.vehicle = updatedVehicle;

        return res.status(200).json({ message: 'Vehicle information saved successfully' });
    } catch (err) {
        console.error('Error inserting/updating vehicle:', err);
        return res.status(500).json({ message: 'Error inserting/updating vehicle' });
    }
});

// Add Listing to database
app.post('/api/listings', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const studentID = req.session.user.Student_ID;
    const { listingType, tripDate, destination, meetTime, meetLocation, licensePlate } = req.body;

    try {
        if (listingType === 'offer') {
            const [driver] = await db.query('SELECT * FROM Driver WHERE Student_ID = ?', [studentID]);
            if (driver.length === 0) {
                return res.status(400).json({ message: 'User is not a driver' });
            }

            const offerSQL = `
                INSERT INTO Ride_Offer (Trip_Date, Meet_up_Location, Destination, Meet_up_Time, Driver_ID)
                VALUES (?, ?, ?, ?, ?)
            `;
            const offerParams = [tripDate, meetLocation, destination, meetTime, studentID];
            await db.query(offerSQL, offerParams);

            return res.status(200).json({ message: 'Ride offer created successfully' });

        } else if (listingType === 'request') {
            const [passenger] = await db.query('SELECT * FROM Passenger WHERE Student_ID = ?', [studentID]);
            if (passenger.length === 0) {
                return res.status(400).json({ message: 'User is not a passenger' });
            }

            const requestSQL = `
                INSERT INTO Ride_Request (Trip_Date, Meet_up_Location, Destination, Meet_up_Time, Passenger_ID)
                VALUES (?, ?, ?, ?, ?)
            `;
            const requestParams = [tripDate, meetLocation, destination, meetTime, studentID];
            await db.query(requestSQL, requestParams);

            return res.status(200).json({ message: 'Ride request created successfully' });
        } else {
            return res.status(400).json({ message: 'Invalid listing type' });
        }
    } catch (err) {
        console.error('Error processing listing:', err);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

// Get all listings
app.get('/api/listings', async (req, res) => {
    // Offer and request listings
    const offerQuery = `SELECT 'offer' AS type, r.ID_Number, DATE(r.Trip_Date) AS Trip_Date, r.Meet_up_Location, r.Destination, r.Meet_up_Time, d.Student_ID AS Driver_ID, 'No passenger assigned' AS Passenger_ID
        FROM Ride_Offer r
        JOIN Driver d ON r.Driver_ID = d.Student_ID
        WHERE r.Trip_Date >= CURDATE()`;

    const requestQuery = `SELECT 'request' AS type, r.ID_Number, DATE(r.Trip_Date) AS Trip_Date, r.Meet_up_Location, r.Destination, r.Meet_up_Time, COALESCE(r.Driver_ID, 'No driver assigned') AS Driver_ID,
        r.Passenger_ID AS Passenger_ID
        FROM Ride_Request r
        WHERE r.Trip_Date >= CURDATE()`;

        try {
            const combinedQuery = `${offerQuery} UNION ${requestQuery}`;
            const countQuery = `SELECT COUNT(*) AS total
                FROM (${combinedQuery}) AS all_listings`;
            const [listings] = await db.query(combinedQuery);
            const [[{ total }]] = await db.query(countQuery);
            return res.status(200).json({ listings, total });
        } catch (err) {
            console.error('Error fetching listings:', err);
            return res.status(500).json({ message: 'Error fetching listings' });
        }
});

// Accept a ride
app.post('/api/listings/accept', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const studentID = req.session.user.Student_ID;
    const { listingID, type } = req.body;

    if (!type || !listingID) {
        return res.status(400).json({ message: 'Missing listing type or ID' });
    }

    let query = '';
    let params = [];

    if (type === 'offer') {
        query = 'UPDATE Ride_Offer SET Passenger_ID = ? WHERE ID_Number = ?';
        params = [studentID, listingID];
    } else if (type === 'request') {
        query = 'UPDATE Ride_Request SET Driver_ID = ? WHERE ID_Number = ?';
        params = [studentID, listingID];
    } else {
        return res.status(400).json({ message: 'Invalid listing type' });
    }

    db.query(query, params, (err) => {
        if (err) {
            console.error('Error accepting ride:', err);
            return res.status(500).json({ message: 'Error accepting ride' });
        }
        return res.status(200).json({ message: 'Ride accepted successfully' });
    });
});

// Delete a listing
app.delete('/api/listings/:type/:id', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const { type, id } = req.params;

    // Validate the type parameter
    if (type !== 'offer' && type !== 'request') {
        return res.status(400).json({ message: 'Invalid listing type' });
    }
    const table = type === 'offer' ? 'Ride_Offer' : 'Ride_Request';

    try {
        const query = `DELETE FROM ${table} WHERE ID_Number = ?`;
        const [result] = await db.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Listing not found' });
        }

        return res.status(200).json({ message: 'Listing deleted successfully' });
    } catch (err) {
        console.error('Error deleting listing:', err);
        return res.status(500).json({ message: 'Error deleting listing' });
    }
});

// User listings
app.get('/api/user/listings', async (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const studentID = req.session.user.Student_ID;

    try {
        const offerQuery = `
            SELECT 'offer' AS type, r.ID_Number, DATE(r.Trip_Date) AS Trip_Date, r.Meet_up_Location, r.Destination, r.Meet_up_Time,
                   r.Driver_ID, r.Passenger_ID
            FROM Ride_Offer r
            WHERE r.Driver_ID = ? OR r.Passenger_ID = ?
        `;
        const requestQuery = `
            SELECT 'request' AS type, r.ID_Number, DATE(r.Trip_Date) AS Trip_Date, r.Meet_up_Location, r.Destination, r.Meet_up_Time,
                   r.Driver_ID, r.Passenger_ID
            FROM Ride_Request r
            WHERE r.Passenger_ID = ? OR r.Driver_ID = ?
        `;

        const [offers] = await db.query(offerQuery, [studentID, studentID]);
        const [requests] = await db.query(requestQuery, [studentID, studentID]);

        const listings = [...offers, ...requests];
        return res.status(200).json({ listings });

    } catch (err) {
        console.error('Error fetching user listings:', err);
        return res.status(500).json({ message: 'Failed to fetch user listings' });
    }
});

  // Delete User
  app.delete('/api/user', async (req, res) => {
    const studentId = req.session.user?.Student_ID;
    if (!studentId) return res.status(401).json({ message: 'Unauthorized' });
  
    let conn;
    try {
      conn = await db.getConnection();
      await conn.beginTransaction();
  
      // Deletion order matters due to foreign key constraints
      await conn.query('DELETE FROM Payment_Info WHERE ID_Number = ?', [studentId]);
      await conn.query('DELETE FROM Ride_Request WHERE Passenger_ID = ? OR Driver_ID = ?', [studentId, studentId]);
      await conn.query('DELETE FROM Ride_Offer WHERE Passenger_ID = ? OR Driver_ID = ?', [studentId, studentId]);
      await conn.query('DELETE FROM Vehicle WHERE Student_ID = ?', [studentId]);
      await conn.query('DELETE FROM Passenger WHERE Student_ID = ?', [studentId]);
      await conn.query('DELETE FROM Driver WHERE Student_ID = ?', [studentId]);
      await conn.query('DELETE FROM Users WHERE Student_ID = ?', [studentId]);
  
      await conn.commit();
  
      // Ensure session is destroyed before sending response
      req.session.destroy(err => {
        if (err) {
          console.error('Session destroy failed:', err);
          return res.status(500).json({ message: 'Account deleted, but session cleanup failed' });
        }
        return res.json({ message: 'Account deleted successfully' });
      });
    } catch (err) {
      if (conn) await conn.rollback();
      console.error('Delete failed:', err);
      return res.status(500).json({ message: 'Failed to delete user' });
    } finally {
      if (conn) conn.release();
    }
  });
  
