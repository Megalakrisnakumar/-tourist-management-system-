import React from 'react';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';
import { Link, useNavigate } from 'react-router-dom';

const AccommodationCard = ({ accommodation }) => {
  const location =accommodation.location ;
  const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}`;

    const navigate = useNavigate()

    const handleBookingClick = (accommodation) => {
        // Make sure you're only passing the relevant data, not the event
        navigate(`/book/${accommodation._id}`, { state: accommodation });
      };

  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '10px',
    overflow: 'hidden',
    width: '300px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px',
    textAlign: 'center',
  };

  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  };

  const contentStyle = {
    padding: '15px',
  };

  const nameStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#333',
  };

  const locationStyle = {
    fontSize: '1rem',
    color: '#777',
    margin: '10px 0',
  };

  const priceStyle = {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#ff5733',
    marginBottom: '10px',
  };

  const availableRoomsStyle = {
    fontSize: '1rem',
    color: '#333',
  };

  return (
    <div style={cardStyle}>
      <img
        src={"http://localhost:8000/uploads/"+accommodation.images[0]}
        alt={accommodation.name}
        style={imageStyle}
      />
      <div style={contentStyle}>
        <div style={nameStyle}>{accommodation.name}</div>
        <div style={locationStyle}>{accommodation.location}</div>
        <div style={priceStyle}>${accommodation.pricePerNight} / Night</div>
        <div style={availableRoomsStyle}>Available Rooms: {accommodation.availableRooms}</div>
        
        <button
             onClick={()=> handleBookingClick(accommodation)}
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
 <br />
 <br />
            <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          padding: '10px 20px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        
      >
        Go to Map
      </a>
           
      </div>
    </div>
  );
};





const Accommodations = () => {
    const {data:Accomodations,loading,error}=useFetch(`${BASE_URL}/accomondation/getAll`)
    console.log(Accomodations);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

    {
        Accomodations?.map((item,index)=>{
             
            return  <AccommodationCard accommodation={item} />

        })
    }
     
    </div>
  );
};

export default Accommodations;
