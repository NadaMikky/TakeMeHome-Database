CREATE TABLE Ride_Request (
    ID_Number INT PRIMARY KEY,
    Trip_Date DATE NOT NULL,
    Meet_up_Location VARCHAR(100) NOT NULL,
    Destination VARCHAR(100) NOT NULL,
    Passenger_Student_ID VARCHAR(20),
    Driver_ID VARCHAR(20),
    FOREIGN KEY (Passenger_Student_ID) REFERENCES Passenger(Student_ID),
    FOREIGN KEY (Driver_ID) REFERENCES Driver(Student_ID)
);

CREATE TABLE Ride_Offer (
    ID_Number INT PRIMARY KEY,
    Trip_Date DATE NOT NULL,
    Meet_up_Location VARCHAR(100) NOT NULL,
    Destination VARCHAR(100) NOT NULL,
    Meet_up_Time TIME NOT NULL,
    Driver_ID VARCHAR(20),
    Passenger_ID VARCHAR(20),
    FOREIGN KEY (Driver_ID) REFERENCES Driver(Student_ID),
    FOREIGN KEY (Passenger_ID) REFERENCES Passenger(Student_ID)
);

