import React, { useState, useEffect } from 'react';

const BookingAccommodations = () => {
  // Sample data for accommodations
  const accommodations = [
    {
      id: 'A001',
      name: 'Oceanview Resort',
      location: 'Beach City',
      pricePerNight: 200,
      availableRooms: 5,
    },
    {
      id: 'A002',
      name: 'Mountain Retreat',
      location: 'Highland Village',
      pricePerNight: 150,
      availableRooms: 3,
    },
    {
      id: 'A003',
      name: 'City Center Hotel',
      location: 'Downtown',
      pricePerNight: 100,
      availableRooms: 10,
    },
  ];

  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const handleBooking = (accommodation) => {
    setSelectedAccommodation(accommodation);
    setShowBookingForm(true);
  };

  return (
    <div>
      <h1>Available Accommodations</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {accommodations.map((accommodation) => (
          <div
            key={accommodation.id}
            style={{
              border: '1px solid #ddd',
              padding: '20px',
              margin: '10px',
              width: '200px',
              borderRadius: '10px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h3>{accommodation.name}</h3>
            <p>{accommodation.location}</p>
            <p>Price: ${accommodation.pricePerNight} per night</p>
            <p>Available Rooms: {accommodation.availableRooms}</p>
            <button
              onClick={() => handleBooking(accommodation)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      {showBookingForm && selectedAccommodation && (
        <div style={{ marginTop: '30px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px' }}>
          <h2>Booking Details</h2>
          <form>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Accommodation Name</label>
              <input
                type="text"
                value={selectedAccommodation.name}
                readOnly
                style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Location</label>
              <input
                type="text"
                value={selectedAccommodation.location}
                readOnly
                style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Price per Night</label>
              <input
                type="number"
                value={selectedAccommodation.pricePerNight}
                readOnly
                style={{ width: '100%', padding: '8px', borderRadius: '5px' }}
              />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>Number of Nights</label>
              <input
                type="number"
                placeholder="Enter number of nights"
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
              }}
            >
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingAccommodations;
