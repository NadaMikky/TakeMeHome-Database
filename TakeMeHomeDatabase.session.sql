CREATE TABLE Users (
    Name VARCHAR(50) NOT NULL,
    Email VARCHAR(100) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Student_ID VARCHAR(20) INT PRIMARY KEY,
    Class VARCHAR(20) NOT NULL,
);

CREATE TABLE Passenger(
    Student_ID VARCHAR(20) INT PRIMARY KEY,
    Has_Luggage BOOLEAN NOT NULL,
    Payment NOT NULL,
    FOREIGN Key (Student_ID) REFERENCES Users(Student_ID),
);

CREATE TABLE Driver(
    Student_ID VARCHAR(20) INT PRIMARY KEY,
    License_Number VARCHAR(20) NOT NULL,
    Allow_Smoking BOOLEAN,
    Insurance_Company VARCHAR(50) NOT NULL,
    FOREIGN Key (Student_ID) REFERENCES Users(Student_ID),
);

CREATE TABLE Vehicle(
    Make VARCHAR(50) NOT NULL,
    Model VARCHAR(50) NOT NULL,
    Year INT NOT NULL,
    VIN VARCHAR(20) NOT NULL UNIQUE,
    License_Plate VARCHAR(20)  PRIMARY KEY,
    Seating_Capacity INT NOT NULL,
    Student_ID VARCHAR(20) INT,
    FOREIGN KEY (Student_ID) REFERENCES Driver(Student_ID),
);
CREATE TABLE Ride_Request (
    ID_Number INT PRIMARY KEY,
    Trip_Date DATE NOT NULL,
    Meet-up_Location VARCHAR(100) NOT NULL,
    Destination VARCHAR(100) NOT NULL,
    Passenger Student_ID VARCHAR(20) INT,
    Drive_ID_Number INT,
    FOREIGN KEY (Passenger Student_ID) REFERENCES Passenger(Student_ID),
    FOREIGN KEY (Drive_ID) REFERENCES Driver(Student_ID),
)

CREATE TABLE Ride_Offer(
    ID_Number INT PRIMARY KEY,
    Trip_Date DATE NOT NULL,
    Meet-up_Location VARCHAR(100) NOT NULL,
    Destination VARCHAR(100) NOT NULL,
    Meet-up_Time TIME NOT NULL,
    Driver_ID INT,
    Passenger_ID INT
    FOREIGN KEY (Driver_ID) REFERENCES Driver(Student_ID),
    FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Student_ID),
)

