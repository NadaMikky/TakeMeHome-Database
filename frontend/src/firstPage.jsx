import React from 'react';
import FirstPageBar from './firstPageBar'; // Import FirstPageBar
import './firstPage.css'; // Import CSS for styling

const FirstPage = () => {
  return (
    <div>
      <FirstPageBar /> {/* Add FirstPageBar */}
      {/* Hero Section */}
      <section className="hero">
        <div>
          <h1>Welcome to Take Me Home!</h1>
        </div>
        <div>
          <p>Your trusted WVU platform for finding and sharing rides.</p>
        </div>
        <a href="/create-account" className="btn">Get Started</a>
      </section>
    </div>
  );
};

export default FirstPage;
