import React, { useState } from "react";
import { BASE_URL } from "../../utils/config";
// import UserMapComponent from "../map/usermap";
import { TextField, Button, Box } from "@mui/material";

const AddTour = () => {
  const [formData, setFormData] = useState({
    title: "",
    city: "",
    address: "",
    distance: 0,
    photo: null, // Changed to store a File object
    desc: "",
    price: 0,
    maxGroupSize: 0,
    featured: false,
    latitude: "",
    longitude: "",
    
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setFormData({
      ...formData,
      photo: file, // Store the file object
    });
  };



  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setFormData({
          ...formData,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(`${BASE_URL}/tours`, {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        alert("Tour added successfully!");
        console.log(data);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add the tour.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f7f8fa",
      }}
    >


{/* <UserMapComponent/> */}


      <div
        style={{
          backgroundColor: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#333", marginBottom: "1.5rem" }}>
          Add a New Tour
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="number"
            name="distance"
            placeholder="Distance"
            value={formData.distance}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />

          {/* Image Upload Input */}
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              backgroundColor: "#fff",
            }}
          />

          <textarea
            name="desc"
            placeholder="Description"
            value={formData.desc}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          ></textarea>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <input
            type="number"
            name="maxGroupSize"
            placeholder="Max Group Size"
            value={formData.maxGroupSize}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <label style={{ marginRight: "10px", color: "#555" }}>Featured:</label>
            <input
              type="checkbox"
              name="featured"
              checked={formData.featured}
              onChange={handleChange}
              style={{ transform: "scale(1.2)" }}
            />
          </div>

          <TextField
            label="Latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={getCurrentLocation}
            sx={{ mt: 2, mb: 2 }}
          >
            Get Live Location
          </Button>


          <button
            type="submit"
            style={{
              backgroundColor: "#007BFF",
              color: "#fff",
              padding: "10px 15px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%",
              fontWeight: "bold",
            }}
          >
            Add Tour
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTour;
