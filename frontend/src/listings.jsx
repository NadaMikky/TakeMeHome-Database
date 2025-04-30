import React from 'react';
import Navbar from './navbar'; // Import Navbar
import './listings.css'; // Import CSS for styling

const Listings = () => {
  return (
    <div>
      <Navbar /> {/* Add Navbar */}
      <main className="container">
        <h2>Ride Listings</h2>

        <section className="form-section">
          <h3>Create a New Listing</h3>
          <form>
            <label>Listing Type:</label>
            <select required>
              <option value="offer">Offer a Ride</option>
              <option value="request">Request a Ride</option>
            </select>

            <label>Trip Date:</label>
            <input type="date" required />

            <label>Destination:</label>
            <input type="text" placeholder="Enter destination" required />

            <label>Meet-up Time:</label>
            <input type="time" required />

            <label>Meet-up Location:</label>
            <input type="text" placeholder="Enter meet-up location" required />

            <button type="submit" className="btn">Create Listing</button>
          </form>
        </section>

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
};

export default Listings;