-- CREATE TABLE Users (
--     Student_ID VARCHAR(20) PRIMARY KEY,
--     First_Name VARCHAR(50) NOT NULL,
--     Last_Name VARCHAR(50) NOT NULL,
--     Email VARCHAR(100) NOT NULL UNIQUE,
--     Password VARCHAR(255) NOT NULL,
--     Class VARCHAR(20) NOT NULL
-- );

-- CREATE TABLE Passenger (
--     Student_ID VARCHAR(20) PRIMARY KEY,
--     Has_Luggage BOOLEAN,
--     Payment VARCHAR(20) NOT NULL,
--     FOREIGN Key (Student_ID) REFERENCES Users(Student_ID)
-- );

-- CREATE TABLE Driver (
--     Student_ID VARCHAR(20) PRIMARY KEY,
--     License_Number VARCHAR(20) NOT NULL,
--     Allow_Smoking BOOLEAN,
--     Insurance_Company VARCHAR(50) NOT NULL,
--     FOREIGN Key (Student_ID) REFERENCES Users(Student_ID)
-- );

-- CREATE TABLE Vehicle (
--     Make VARCHAR(50) NOT NULL,
--     Model VARCHAR(50) NOT NULL,
--     Year INT NOT NULL,
--     VIN VARCHAR(20) NOT NULL UNIQUE,
--     License_Plate VARCHAR(20) PRIMARY KEY,
--     Seating_Capacity INT NOT NULL,
--     Student_ID VARCHAR(20) ,
--     FOREIGN KEY (Student_ID) REFERENCES Driver(Student_ID)
-- );

-- CREATE TABLE Ride_Request (
--     ID_Number INT AUTO_INCREMENT PRIMARY KEY,
--     Trip_Date DATE NOT NULL,
--     Meet_up_Location VARCHAR(100) NOT NULL,
--     Destination VARCHAR(100) NOT NULL,
--     Meet_up_Time TIME NOT NULL,
--     Passenger_ID VARCHAR(20) NOT NULL,
--     Driver_ID VARCHAR(20) NOT NULL DEFAULT '0',
--     FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Student_ID),
--     FOREIGN KEY (Driver_ID) REFERENCES Driver(Student_ID)
-- );

-- CREATE TABLE Ride_Offer (
--     ID_Number INT AUTO_INCREMENT PRIMARY KEY,
--     Trip_Date DATE NOT NULL,
--     Meet_up_Location VARCHAR(100) NOT NULL,
--     Destination VARCHAR(100) NOT NULL,
--     Meet_up_Time TIME NOT NULL,
--     Driver_ID VARCHAR(20) NOT NULL,
--     Passenger_ID VARCHAR(20) NOT NULL DEFAULT '0',
--     FOREIGN KEY (Driver_ID) REFERENCES Driver(Student_ID),
--     FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Student_ID)
-- );

-- CREATE TABLE Payment_Info (
--     ID_Number VARCHAR(20) PRIMARY KEY,
--     Payment_Method VARCHAR(50) NOT NULL,
--     Card_Number VARCHAR(16) NOT NULL UNIQUE,
--     Expiration_Date VARCHAR(5) NOT NULL,
--     CVV VARCHAR(4) NOT NULL,
--     FOREIGN KEY (ID_Number) REFERENCES Passenger(Student_ID)
-- );

-- ALTER TABLE Ride_Request AUTO_INCREMENT = 100000000;
-- ALTER TABLE Ride_Offer AUTO_INCREMENT = 600000000;
-- ALTER TABLE Passenger ADD Payment VARCHAR(20) NOT NULL DEFAULT 'Unknown';

-- INSERT INTO Users
-- VALUES ('0', 'Unknown', 'User', 'dne@mix.wvu.edu', 'password', 'Unknown');
-- INSERT INTO Passenger
-- VALUES ('0', '0', 'Unknown');
-- INSERT INTO Driver
-- VALUES ('0', 'Unknown', '0', 'Unknown');

-- SELECT * FROM Users;
-- SELECT * FROM Passenger;
-- SELECT * FROM Driver;
-- SELECT * FROM Vehicle;
-- SELECT * FROM Ride_Request;
-- SELECT * FROM Ride_Offer;
-- SELECT * FROM Payment_Info;

-- INSERT INTO Ride_Offer
-- VALUES ('600000000', '2025-05-03', 'Morgantown, WV', 'Pittsburgh, PA', '08:00:00', '7009988765', '0');

-- CREATE INDEX idx_rideoffer_tripdate ON Ride_Offer (Trip_Date);
-- CREATE INDEX idx_riderequest_tripdate ON Ride_Request (Trip_Date);
-- CREATE INDEX idx_rideoffer_driverid ON Ride_Offer (Driver_ID);
-- CREATE INDEX idx_riderequest_passengerid ON Ride_Request (Passenger_ID);
