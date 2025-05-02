import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';    
import './account.css';           

const Account = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8081/api/user', {
          method: 'GET',
          credentials: 'include', // check session cookie
        });
      
        const data = await response.json();
        if (response.ok) {
          setUser(data.user); // Store ussr data
        } else {
          setError(data.message || 'Failed to fetch user data');
          console.error('Error fetching user data:', data.message);
        }
    } catch (error) {
      setError('Error fetching user data');
      console.error('Error:', error);
    }
  };
    fetchUserData();
}, [navigate]);

if (!user) {
  return <div>Loading...</div>;
}

  return (
    <>
      <Navbar />

      <main className="container">
        <h1>Welcome, {user.First_Name} {user.Last_Name}</h1>

        <div className="card user-info-card">
          <p><strong>Email:</strong> {user.Email}</p>
          <p><strong>Class:</strong> {user.Class}</p>
        </div>

        <div className="tab-control">
          <button
            className={`tab-btn${activeTab === 'pending' ? ' active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            Your Pending Listings
          </button>
          <button
            className={`tab-btn${activeTab === 'accepted' ? ' active' : ''}`}
            onClick={() => setActiveTab('accepted')}
          >
            Accepted Rides
          </button>
          <button
            className={`tab-btn${activeTab === 'completed' ? ' active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Completed Rides
          </button>
        </div>

        {activeTab === 'pending' && (
          <div className="grid">
            <div className="card">
              <h3>Morgantown to Charleston</h3>
              <span className="badge badge-primary">Offering Ride</span>
              <p><strong>Date:</strong> April 27, 2025</p>
              <p><strong>Time:</strong> 9:30 AM</p>
              <p><strong>Meet-up Location:</strong> Rec Center</p>
              <button className="btn btn-error btn-sm">Delete</button>
            </div>
          </div>
        )}

        {activeTab === 'accepted' && (
          <div className="grid">
            <div className="card">
              <span className="badge badge-secondary">PASSENGER</span>
              <p><strong>Driver:</strong> Alex Green</p>
              <p><strong>Passenger:</strong> You</p>
              <p><strong>Date:</strong> May 1, 2025</p>
              <p><strong>Time:</strong> 4:00 PM</p>
              <p><strong>Meet-up Location:</strong> Engineering Loop</p>
              <p><strong>Destination:</strong> Pittsburgh</p>
              <button className="btn btn-error btn-sm">Cancel</button>
              <button className="btn btn-success btn-sm">Mark Completed</button>
            </div>
          </div>
        )}

        {activeTab === 'completed' && (
          <div className="grid">
            <div className="card">
              <h3>Pittsburgh to Morgantown</h3>
              <p><strong>Date:</strong> March 15, 2025</p>
              <p><strong>Time:</strong> 1:30 PM</p>
              <p><strong>Location:</strong> Mountaineer Station</p>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default Account;
