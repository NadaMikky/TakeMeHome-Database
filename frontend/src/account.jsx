// src/Account.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import './account.css';

export default function Account() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('pending');
  const [showPassengerForm, setShowPassengerForm] = useState(false);
  const [passengerInfo, setPassengerInfo] = useState({
    hasLuggage: false,
    payment: '',
  });
  const [paymentInfo, setShowPaymentInfo] = useState({
    paymentMethod: '',
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showDriverForm, setShowDriverForm] = useState(false);
  const [driverInfo, setDriverInfo]       = useState({
    licenseNumber: '',
    allowSmoking: false,
    insuranceCompany: '',
  });

  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
    seatingCapacity: ''
  });
  const [payment, setPayment] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: ''
  });
  const navigate = useNavigate();

  // Add validation functions for payment fields
  const validateCardNumber = (cardNumber) => /^\d{16}$/.test(cardNumber);
  const validateExpirationDate = (expirationDate) => /^(0[1-9]|1[0-2])\/\d{2}$/.test(expirationDate);
  const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv);

  // Fetch user and any relevant data on load
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

          if (data.user.passenger) {
            // preload passenger into form state
            setPassengerInfo({
              hasLuggage: data.user.passenger.hasLuggage || false,
              payment: data.user.passenger.payment || ''
            });
          }

          if (data.user.payment) {
            // preload payment into form state
            setPayment({
              paymentMethod: data.user.payment.paymentMethod || '',
              cardNumber: data.user.payment.cardNumber || '',
              expirationDate: data.user.payment.expirationDate || '',
              cvv: data.user.payment.cvv || ''
            });
          }

          if (data.user.driver) {
            // preload driver into form state
            setDriverInfo({
              licenseNumber: data.user.driver.licenseNumber || '',
              allowSmoking: data.user.driver.allowSmoking || false,
              insuranceCompany: data.user.driver.insuranceCompany || ''
            });
          }

          if (data.user.vehicle) {
            // preload vehicle into form state
            setVehicle({
              make: data.user.vehicle.make || '',
              model: data.user.vehicle.model || '',
              year: data.user.vehicle.year || '',
              vin: data.user.vehicle.vin || '',
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

  // Handle passenger form field changes
  const handlePassengerChange = e => {
    const { name, value, type, checked } = e.target;
    setPassengerInfo(p => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  // Handle payment form field changes
  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPayment((a) => ({ ...a, [name]: value }));
  };

  // Handle driver form field changes
  const handleDriverChange = e => {
    const { name, value, type, checked } = e.target;
    setDriverInfo(d => ({ ...d, [name]: type === 'checkbox' ? checked : value }));
  };

  // Handle vehicle form field changes
  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicle((v) => ({ ...v, [name]: value }));
  };

  // Submit passenger info to backend
  const handlePassengerSubmit = async e => {
    e.preventDefault();
    try {
      const resp = await fetch('http://localhost:8081/api/passenger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(passengerInfo)
      });
      const data = await resp.json();
      if (resp.ok) {
        // attach returned passenger to user in state
        setUser(u => ({ ...u, passenger: data.passenger }));
        setShowPassengerForm(false);
      } else {
        setError(data.message || 'Failed to save passenger info');
      }
    } catch {
      setError('Error saving passenger info');
    }
  };

  // Submit payment to backend
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Validate payment fields
    if (!validateCardNumber(payment.cardNumber)) {
      alert('Card number must be 16 digits.');
      return;
    }
    if (!validateExpirationDate(payment.expirationDate)) {
      alert('Expiration date must be in MM/YY format.');
      return;
    }
    if (!validateCVV(payment.cvv)) {
      alert('CVV must be 3 or 4 digits.');
      return;
    }

    try {
      const resp = await fetch('http://localhost:8081/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payment),
      });
      const data = await resp.json();
      if (resp.ok) {
        // Attach returned payment info to user in state
        setUser((u) => ({ ...u, payment: data.payment }));
        setShowPaymentForm(false);
      } else {
        setError(data.message || 'Failed to save payment information');
      }
    } catch {
      setError('Error saving payment information');
    }
  };

  // Submit driver info to backend
  const handleDriverSubmit = async e => {
    e.preventDefault();
    try {
      const resp = await fetch('http://localhost:8081/api/driver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(driverInfo)
      });
      const data = await resp.json();
      if (resp.ok) {
        // attach returned driver to user in state
        setUser(u => ({ ...u, driver: data.driver }));
        setShowDriverForm(false);
      } else {
        setError(data.message || 'Failed to save driver info');
      }
    } catch {
      setError('Error saving driver info');
    }
  };

  // Submit vehicle to backend
  const handleVehicleSubmit = async (e) => {
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
        setUser((u) => ({ ...u, vehicle: data.vehicle }));
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

        {/* PASSENGER SECTION */}
        <div className="passenger-section">
          <h2>Passenger Information</h2>
          
          {/* If they already have passenger info & not editing, show it */}
          {user.passenger && !showPassengerForm && (
            <div className="card">
              <p><strong>Has Luggage:</strong> {user.passenger.hasLuggage ? 'Yes' : 'No'}</p>
              <button className="btn" onClick={() => setShowPassengerForm(true)}>
                Edit Passenger Information
              </button>
            </div>
          )}

          {/* If no passenger info yet & not editing, show “Add” button */}
          {!user.passenger && !showPassengerForm && (
            <button className="btn" onClick={() => setShowPassengerForm(true)}>
              Add Passenger Information
            </button>
          )}

          {/* PASSENGER FORM */}
          {showPassengerForm && (
            <form className="passenger-form" onSubmit={handlePassengerSubmit}>
              <label>Has Luggage:</label>
              <input
                type="checkbox"
                name="hasLuggage"
                checked={passengerInfo.hasLuggage}
                onChange={handlePassengerChange}
              />

              <div className="passenger-form-buttons">
                <button type="submit" className="btn">Save Passenger</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPassengerForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

        {/* PAYMENT SECTION */}
          {/* If they already have payment info & not editing, show it */}
          {user.payment && !showPaymentForm && (
            <div className="card">
              <p><strong>Card Number:</strong> **** **** **** {user.payment.cardNumber.slice(-4)}</p>
              <p><strong>Expiration Date:</strong> {user.payment.expirationDate}</p>
              <button className="btn" onClick={() => setShowPaymentForm(true)}>
                Edit Payment Information
              </button>
            </div>
          )}

          {/* If no payment info yet & not editing, show “Add” button */}
          {!user.payment && !showPaymentForm && (
            <button className="btn" onClick={() => setShowPaymentForm(true)}>
              Add Payment Information
            </button>
          )}

          {/* PAYMENT FORM */}
          {showPaymentForm && (
            <form className="payment-form" onSubmit={handlePaymentSubmit}>
              <label>Payment Mehtod:</label>
              <select
                name="paymentMethod"
                value={payment.paymentMethod}
                onChange={handlePaymentChange}
                required
              >
                <option value="">Select a payment method</option>
                <option value="visa">Visa</option>
                <option value="masterCard">Master Card</option>
                <option value="discover">Discover</option>
                <option value="americanExpress">American Express</option>
                <option value="other">Other</option>
              </select>

              <label>Card Number:</label>
              <input
                type="text"
                name="cardNumber"
                value={payment.cardNumber}
                onChange={handlePaymentChange}
                required
              />

              <label>Expiration Date:</label>
              <input
                type="text"
                name="expirationDate"
                placeholder="MM/YY"
                value={payment.expirationDate}
                onChange={handlePaymentChange}
                required
              />

              <label>CVV:</label>
              <input
                type="text"
                name="cvv"
                value={payment.cvv}
                onChange={handlePaymentChange}
                required
              />

              <div className="payment-form-buttons">
                <button type="submit" className="btn">Save Payment</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPaymentForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* DRIVER SECTION */}
        <div className="driver-section">
          <h2>Driver Information</h2>

          {/* If they already have driver info & not editing, show it */}
          {user.driver && !showDriverForm && (
            <div className="card">
              <p><strong>License Number:</strong> {user.driver.licenseNumber}</p>
              <p><strong>Allow Smoking:</strong> {user.driver.allowSmoking ? 'Yes' : 'No'}</p>
              <p><strong>Insurance Company:</strong> {user.driver.insuranceCompany}</p>
              <button className="btn" onClick={() => setShowDriverForm(true)}>
                Edit Driver Information
              </button>
            </div>
          )}

          {/* If no driver info yet & not editing, show “Add” button */}
          {!user.driver && !showDriverForm && (
            <button className="btn" onClick={() => setShowDriverForm(true)}>
              Add Driver Information
            </button>
          )}

          {/* DRIVER FORM */}
          {showDriverForm && (
            <form className="driver-form" onSubmit={handleDriverSubmit}>
              <label>License Number:</label>
              <input
                type="text"
                name="licenseNumber"
                value={driverInfo.licenseNumber}
                onChange={handleDriverChange}
                required
              />

              <label>Allow Smoking:</label>
              <div>
                <label>
                  <input
                    type="radio"
                    name="allowSmoking"
                    value="true"
                    checked={driverInfo.allowSmoking === true}
                    onChange={() => setDriverInfo((d) => ({ ...d, allowSmoking: true }))}
                  />
                  Yes
                </label>
                <label style={{ marginLeft: '10px' }}>
                  <input
                    type="radio"
                    name="allowSmoking"
                    value="false"
                    checked={driverInfo.allowSmoking === false}
                    onChange={() => setDriverInfo((d) => ({ ...d, allowSmoking: false }))}
                  />
                  No
                </label>
              </div>

              <label>Insurance Company:</label>
              <input
                type="text"
                name="insuranceCompany"
                value={driverInfo.insuranceCompany}
                onChange={handleDriverChange}
                required
              />

              <div className="driver-form-buttons">
                <button type="submit" className="btn">Save Driver</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDriverForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

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
                min="1"
                max="6"
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
