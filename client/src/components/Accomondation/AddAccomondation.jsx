import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const AddAccommodation = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    pricePerNight: '',
    availableRooms: '',
    amenities: '',
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('location', formData.location);
    formDataToSend.append('pricePerNight', formData.pricePerNight);
    formDataToSend.append('availableRooms', formData.availableRooms);
    formDataToSend.append('amenities', JSON.stringify(formData.amenities.split(',')));
    formDataToSend.append('image', formData.images[0]);
    try {
      const response = await axios.post(BASE_URL+'/accomondation/create',formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      alert('Accommodation added successfully!');
      console.log(response.data);
    } catch (error) {
      console.error('Error adding accommodation:', error);
      alert('Failed to add accommodation.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '60%', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Add Accommodation</h2>
      
      <label style={{ display: 'block', marginBottom: '10px' }}>Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      <label style={{ display: 'block', marginBottom: '10px' }}>Location:</label>
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      <label style={{ display: 'block', marginBottom: '10px' }}>Price per Night:</label>
      <input
        type="number"
        name="pricePerNight"
        value={formData.pricePerNight}
        onChange={handleChange}
        required
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      <label style={{ display: 'block', marginBottom: '10px' }}>Available Rooms:</label>
      <input
        type="number"
        name="availableRooms"
        value={formData.availableRooms}
        onChange={handleChange}
        required
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      <label style={{ display: 'block', marginBottom: '10px' }}>Amenities (comma-separated):</label>
      <input
        type="text"
        name="amenities"
        value={formData.amenities}
        onChange={handleChange}
        required
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />

      <label style={{ display: 'block', marginBottom: '10px' }}>Upload Images:</label>
      <input
        type="file"
        name="images"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginBottom: '20px' }}
      />
      
      {previewImages.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h4>Preview:</h4>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {previewImages.map((src, index) => (
              <img
                key={index}
                src={src}
                alt="Preview"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            ))}
          </div>
        </div>
      )}

      <button
        type="submit"
        style={{
          display: 'block',
          width: '100%',
          padding: '15px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Add Accommodation
      </button>
    </form>
  );
};

export default AddAccommodation;
