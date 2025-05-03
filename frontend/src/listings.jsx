// src/Listings.jsx
import React, { useState, useEffect } from 'react';
import Navbar from './navbar';
import './listings.css';

export default function Listings() {
  const [listingType, setListingType]   = useState('offer');
  const [tripDate, setTripDate]         = useState('');
  const [destination, setDestination]   = useState('');
  const [meetTime, setMeetTime]         = useState('');
  const [meetLocation, setMeetLocation] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [minTime, setMinTime]           = useState('00:00');
  const [showForm, setShowForm]       = useState(false);

  // Today's date in YYYY-MM-DD for the date picker min
  const todayString = new Date().toISOString().slice(0, 10);

  // Whenever the user picks a date, update minTime if it's today
  useEffect(() => {
    if (tripDate === todayString) {
      const now = new Date();
      const h   = String(now.getHours()).padStart(2, '0');
      const m   = String(now.getMinutes()).padStart(2, '0');
      setMinTime(`${h}:${m}`);
    } else {
      setMinTime('00:00');
    }
  }, [tripDate, todayString]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      listingType,
      tripDate,
      destination,
      meetTime,
      meetLocation,
      ...(listingType === 'offer' && { licensePlate }),
      // can collect other fields (destination, location, etc.)
    };
    console.log('Creating listing:', payload);
    // TODO: send payload to backend or update state
  };

  return (
    <div>
      <Navbar />

      <main className="container">
        <h2>Ride Listings</h2>

        {!showForm && (
          <button className="btn" onClick={() => setShowForm(true)}>
            Create a New Listing
          </button>
        )}
        
        {showForm && (
        <section className="form-section">
          <h3>Create a New Listing</h3>
          <form onSubmit={handleSubmit}>
            <label>Listing Type:</label>
            <select
              required
              value={listingType}
              onChange={e => setListingType(e.target.value)}
            >
              <option value="offer">Offer a Ride</option>
              <option value="request">Request a Ride</option>
            </select>

            <label>Trip Date:</label>
            <input
              type="date"
              required
              value={tripDate}
              min={todayString}
              onChange={e => setTripDate(e.target.value)}
            />

            <label>Destination:</label>
            <input
              type="text"
              placeholder="Enter destination"
              required
              value={destination}
              onChange={e => setDestination(e.target.value)}
            />

            <label>Meet-up Time:</label>
            <input
              type="time"
              required
              value={meetTime}
              min={minTime}
              onChange={e => setMeetTime(e.target.value)}
            />

            <label>Meet-up Location:</label>
            <input
              type="text"
              placeholder="Enter meet-up location"
              required
              value={meetLocation}
              onChange={e => setMeetLocation(e.target.value)}
            />

            {listingType === 'offer' && (
              <>
                <label>License Plate:</label>
                <input
                  type="text"
                  placeholder="Enter license plate"
                  required
                  value={licensePlate}
                  onChange={e => setLicensePlate(e.target.value)}
                />
              </>
            )}

            <button type="submit" className="btn">
              Create Listing
            </button>
          </form>
        </section>
        )}

        <section style={{ marginTop: '60px' }}>
          <h3>Available Listings</h3>

          <div className="listing-card">
            <div className="listing-header">
              <h3>Morgantown to Pittsburgh</h3>
            </div>
            <p><strong>Driver:</strong> A</p>
            <p><strong>Date:</strong> April 25, 2025</p>
            <p><strong>Time:</strong> 10:30 AM</p>
            <p><strong>Meet-up Location:</strong> Evansdale Library</p>
            <button className="btn">Accept</button>
          </div>

          <div className="listing-card">
            <div className="listing-header">
              <h3>Morgantown to Charleston</h3>
            </div>
            <p><strong>Rider:</strong> B</p>
            <p><strong>Date:</strong> April 28, 2025</p>
            <p><strong>Time:</strong> 3:45 PM</p>
            <p><strong>Meet-up Location:</strong> Mountainlair</p>
            <button className="btn">Accept</button>
          </div>
        </section>
      </main>
    </div>
  );
}
