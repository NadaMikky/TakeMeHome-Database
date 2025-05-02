// src/Account.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import './account.css';

export default function Account() {
  const [user, setUser]                   = useState(null);
  const [error, setError]                 = useState('');
  const [activeTab, setActiveTab]         = useState('pending');
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
    seatingCapacity: ''
  });

  const navigate = useNavigate();

  // 1) Fetch user (and any existing vehicle) on load
  useEffect(() => {
    async function fetchUser() {
      try {
        const resp = await fetch('http://localhost:8081/api/user', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await resp.json();
        if (resp.ok) {
          setUser(data.user);
          if (data.user.vehicle) {
            // preload vehicle into form state
            setVehicle({
              make: data.user.vehicle.make || '',
              model: data.user.vehicle.model || '',
              year: data.user.vehicle.year   || '',
              vin: data.user.vehicle.vin     || '',
              licensePlate: data.user.vehicle.licensePlate || '',
              seatingCapacity: data.user.vehicle.seatingCapacity || ''
            });
          }
        } else {
          setError(data.message || 'Failed to fetch user');
        }
      } catch (err) {
        setError('Error fetching user data');
      }
    }
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  // 2) Handle vehicle form field changes
  const handleVehicleChange = e => {
    const { name, value } = e.target;
    setVehicle(v => ({ ...v, [name]: value }));
  };

  // 3) Submit vehicle to backend
  const handleVehicleSubmit = async e => {
    e.preventDefault();
    try {
      const resp = await fetch('http://localhost:8081/api/vehicle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(vehicle)
      });
      const data = await resp.json();
      if (resp.ok) {
        // attach returned vehicle to user in state
        setUser(u => ({ ...u, vehicle: data.vehicle }));
        setShowVehicleForm(false);
      } else {
        setError(data.message || 'Failed to save vehicle');
      }
    } catch {
      setError('Error saving vehicle');
    }
  };

  return (
    <>
      <Navbar />
      <main className="container">
        <h1>Welcome, {user.First_Name} {user.Last_Name}</h1>

        <div className="card user-info-card">
          <p><strong>Email:</strong> {user.Email}</p>
          <p><strong>Class:</strong> {user.Class}</p>
        </div>

        {/* DRIVER SECTION */}
        <div className="driver-section">
          <h2>Driver Information</h2>

          {/* If they already have a vehicle & not editing, show it */}
          {user.vehicle && !showVehicleForm && (
            <div className="card">
              <p><strong>Make:</strong> {user.vehicle.make}</p>
              <p><strong>Model:</strong> {user.vehicle.model}</p>
              <p><strong>Year:</strong> {user.vehicle.year}</p>
              <p><strong>VIN:</strong> {user.vehicle.vin}</p>
              <p><strong>License Plate:</strong> {user.vehicle.licensePlate}</p>
              <p><strong>Seating Capacity:</strong> {user.vehicle.seatingCapacity}</p>
              <button className="btn" onClick={() => setShowVehicleForm(true)}>
                Edit Vehicle
              </button>
            </div>
          )}

          {/* If no vehicle yet & not editing, show “Add” button */}
          {!user.vehicle && !showVehicleForm && (
            <button className="btn" onClick={() => setShowVehicleForm(true)}>
              Add Vehicle Information
            </button>
          )}

          {/* VEHICLE FORM */}
          {showVehicleForm && (
            <form className="driver-form" onSubmit={handleVehicleSubmit}>
              <label>Make:</label>
              <input
                name="make"
                value={vehicle.make}
                onChange={handleVehicleChange}
                required
              />

              <label>Model:</label>
              <input
                name="model"
                value={vehicle.model}
                onChange={handleVehicleChange}
                required
              />

              <label>Year:</label>
              <input
                name="year"
                type="number"
                value={vehicle.year}
                onChange={handleVehicleChange}
                required
              />

              <label>VIN:</label>
              <input
                name="vin"
                value={vehicle.vin}
                onChange={handleVehicleChange}
                required
              />

              <label>License Plate:</label>
              <input
                name="licensePlate"
                value={vehicle.licensePlate}
                onChange={handleVehicleChange}
                required
              />

              <label>Seating Capacity:</label>
              <input
                name="seatingCapacity"
                type="number"
                value={vehicle.seatingCapacity}
                onChange={handleVehicleChange}
                required
              />

              <div className="driver-form-buttons">
                <button type="submit" className="btn">Save Vehicle</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowVehicleForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* TABS */}
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
            {/* … */}
          </div>
        )}
        {activeTab === 'accepted' && (
          <div className="grid">
            {/* … */}
          </div>
        )}
        {activeTab === 'completed' && (
          <div className="grid">
            {/* … */}
          </div>
        )}
      </main>
    </>
  );
}
