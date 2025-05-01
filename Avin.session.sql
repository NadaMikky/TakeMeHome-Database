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
--     ID_Number INT PRIMARY KEY,
--     Trip_Date DATE NOT NULL,
--     Meet_up_Location VARCHAR(100) NOT NULL,
--     Destination VARCHAR(100) NOT NULL,
--     Passenger_Student_ID VARCHAR(20),
--     Driver_ID VARCHAR(20) NOT NULL,
--     FOREIGN KEY (Passenger_Student_ID) REFERENCES Passenger(Student_ID),
--     FOREIGN KEY (Driver_ID) REFERENCES Driver(Student_ID)
-- );

-- CREATE TABLE Ride_Offer (
--     ID_Number INT PRIMARY KEY,
--     Trip_Date DATE NOT NULL,
--     Meet_up_Location VARCHAR(100) NOT NULL,
--     Destination VARCHAR(100) NOT NULL,
--     Meet_up_Time TIME NOT NULL,
--     Driver_ID VARCHAR(20) NOT NULL,
--     Passenger_ID VARCHAR(20) NOT NULL,
--     FOREIGN KEY (Driver_ID) REFERENCES Driver(Student_ID),
--     FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Student_ID)
-- );

-- INSERT INTO Users
-- VALUES('Jess', 'Remphrey','jer00027@mix.wvu.edu', 'password', '800727272', 'Sophomore');

