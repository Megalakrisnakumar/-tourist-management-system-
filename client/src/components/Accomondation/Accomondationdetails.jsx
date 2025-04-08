import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const AccBookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [numOfNights, setNumOfNights] = useState(1);
  const [totalPrice, setTotalPrice] = useState(state.pricePerNight);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const { user, dispatch } = useContext(AuthContext);

  const handleCheckInChange = (e) => {
    const selectedDate = e.target.value;
    setCheckInDate(selectedDate);

    // If checkout date is already selected and now invalid, reset it
    if (checkOutDate && new Date(selectedDate) >= new Date(checkOutDate)) {
      setCheckOutDate('');
    }
  };

  const handleCheckOutChange = (e) => {
    setCheckOutDate(e.target.value);
  };

  const handleNightsChange = (e) => {
    const nights = e.target.value;
    setNumOfNights(nights);
    setTotalPrice(state.pricePerNight * nights);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    if (checkIn < today) {
      alert("Check-in date cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    const data = {
      userId: user._id,
      accommodationId: state.accommodationId,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      totalPrice: totalPrice
    };

    axios.post(BASE_URL + "/accomondation/booking/create", data).then(res => {
      if (res.data.success) {
        navigate('/thank-you');
      } else {
        alert("Booking failed");
      }
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: "400px", padding: '20px' }}>
      {/* Image Section */}
      <div style={{ padding: '1px' }}>
        <img
          src={"http://localhost:8000/uploads/" + state.images[0]}
          alt={state.name}
          style={{ width: '70%', borderRadius: '10px', objectFit: 'cover', height: '400px' }}
        />
      </div>

      {/* Form Section */}
      <div
        style={{
          width: '400px',
          marginLeft: '20px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '10px',
        }}
      >
        <h2>Booking Your Stay</h2>
        <h3>{state.name}</h3>
        <p>{state.location}</p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Accommodation Name</label>
            <input
              type="text"
              value={state.name}
              readOnly
              style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Location</label>
            <input
              type="text"
              value={state.location}
              readOnly
              style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Price per Night</label>
            <input
              type="number"
              value={state.pricePerNight}
              readOnly
              style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Check-in Date</label>
            <input
              type="date"
              value={checkInDate}
              onChange={handleCheckInChange}
              style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Check-out Date</label>
            <input
              type="date"
              value={checkOutDate}
              onChange={handleCheckOutChange}
              style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Number of Nights</label>
            <input
              type="number"
              value={numOfNights}
              onChange={handleNightsChange}
              min="1"
              style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Total Price</label>
            <input
              type="number"
              value={totalPrice}
              readOnly
              style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccBookingPage;
