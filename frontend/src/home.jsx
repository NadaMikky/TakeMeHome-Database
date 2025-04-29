import React from 'react';
import './home.css'; // Importing CSS for styling
function Home() {
  return (
    <div>
      {/* Navbar */}
      <div id="navbar-placeholder"></div>

      {/* Hero Section */}
      <section className="hero">
        <div>
          <h1>Welcome to Take Me Home!</h1>
        </div>
        <div>
          <p>Your trusted WVU platform for finding and sharing rides.</p>
        </div>
        {/* Changed "View Listings" to "Create Listing" */}
        <a href="listings.html" className="btn">Create Listing</a>
      </section>

      {/* Changed "Featured Listings" to "View Listings" */}
      <section className="featured-listings">
        <h2>View Listings</h2>
        <div className="listing-grid">
          <div className="listing-card">
            <h3>Morgantown to Pittsburgh</h3>
            <p><strong>Driver:</strong> A</p>
            <p><strong>Date:</strong> April 25, 2025</p>
            <p><strong>Time:</strong> 10:30 AM</p>
            <p><strong>Meet-up Location:</strong> Evansdale Library</p>
          </div>
          <div className="listing-card">
            <h3>Morgantown to Charleston</h3>
            <p><strong>Rider:</strong> B</p>
            <p><strong>Date:</strong> April 28, 2025</p>
            <p><strong>Time:</strong> 3:45 PM</p>
            <p><strong>Meet-up Location:</strong> Mountainlair</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;