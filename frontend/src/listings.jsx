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
  const [showForm, setShowForm]         = useState(false);
  const [listings, setListings]         = useState([]);

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

  // Fetch listings from the server
  useEffect(() => {
    async function fetchListings() {
      try {
        const resp = await fetch('http://localhost:8081/api/listings', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await resp.json();
        if (resp.ok) {
          setListings(data.listings);
        } else {
          console.error('Failed to fetch listings:', data.message);
        }
      } catch (err) {
        console.error('Error fetching listings:', err);
      }
    }

    fetchListings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      listingType,
      tripDate,
      destination,
      meetTime,
      meetLocation,
      ...(listingType === 'offer' && { licensePlate }),
    };

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Listing created:', data);
        setShowForm(false);
      } else {}
        console.log('Failed to create listing', data);
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };

  const handleAccept = async (listing) => {
    try {
      const response = await fetch('http://localhost:8081/api/listings/accept', {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        credentials: 'include',
        body: JSON.stringify({
          listingID: listing.ID_Number,
          type: listing.type
        })
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Listing accepted:', data);
      } else {
        console.error('Failed to accept listing:', data.message);
      }
    } catch (error) {
      console.error('Error accepting listing:', error);
    }
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

          {listings
            .filter((listing) => {
              // For Offers: Check if Passenger_ID is '0' (not accepted)
              if (listing.type === 'offer') {
                return listing.Passenger_ID === '0';
              }
          
              // For Requests: Check if Driver_ID is '0' (not accepted)
              if (listing.type === 'request') {
                return listing.Driver_ID === '0';
              }
          
              return true; // Default case, just in case
            })
            .map((listing) => (
            <div key={`${listing.type}-${listing.ID_Number}`} className="listing-card">
              <div className="listing-header">
                <h3>{listing.Destination}</h3>
              </div>
              <p><strong>{listing.type === 'offer' ? 'Driver' : 'Passenger'}:</strong> {listing.type === 'offer' ? listing.Driver_ID : listing.Passenger_ID}</p>
              <p><strong>Date:</strong> {listing.Trip_Date?.slice(0, 10)}</p>
              <p><strong>Time:</strong> {listing.Meet_up_Time}</p>
              <p><strong>Meet-up Location:</strong> {listing.Meet_up_Location}</p>

              <div className="listing-type">
                {listing.type === 'offer' ? 'Offer' : 'Request'}
              </div>

              <button className="btn" onClick={() => handleAccept(listing)}>Accept</button>
            </div>
          ))}

        </section>
      </main>
    </div>
  );
}
