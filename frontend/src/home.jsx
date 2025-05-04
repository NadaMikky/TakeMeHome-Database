import React, { useState, useEffect } from 'react';
import Navbar from './navbar'; // Import Navbar
import './home.css'; // Importing CSS for styling

function Home() {
  const [listings, setListings]         = useState([]);

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

  return (
    <div className="home-container"> {/* Add a container to ensure full height */}
      <Navbar /> {/* Add Navbar manually */}
      {/* Hero Section */}
      <section className="hero">
        <div>
          <h1>Welcome to Take Me Home!</h1> {/* Hero title */}
        </div>
        <div>
          <p>Your trusted WVU platform for finding and sharing rides.</p> {/* Hero description */}
        </div>
        <a href="/listings" className="btn">Create Listing</a> {/* Call-to-action button */}
      </section>

      {/* Featured Listings */}
      <section className="featured-listings">
        <h2>Available Listings</h2> {/* Section title */}
        <div className="listing-grid">
          {/* Example listing card */}
          {listings
            .map((listing) => (
            <div key={`${listing.type}-${listing.ID_Number}`} className="listing-card">
            <h3>{listing.Destination}</h3>
            <p><strong>{listing.type === 'offer' ? 'Driver' : 'Passenger'}:</strong> {listing.type === 'offer' ? listing.Driver_ID : listing.Passenger_ID}</p>
              <p><strong>Date:</strong> {listing.Trip_Date}</p>
              <p><strong>Time:</strong> {listing.Meet_up_Time}</p>
              <p><strong>Meet-up Location:</strong> {listing.Meet_up_Location}</p>

              <div className="listing-type-home">
                {listing.type === 'offer' ? 'Offer' : 'Request'}
              </div>
          </div>
          ))}
          
        </div>
      </section>
    </div>
  );
}

export default Home;