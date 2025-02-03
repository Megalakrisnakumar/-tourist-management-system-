import React, { useState } from "react";
import { BASE_URL } from "../../utils/config";

const EditTour = (props) => {

    // {
    //     title: "",
    //     city: "",
    //     address: "",
    //     distance: 0,
    //     photo: "",
    //     desc: "",
    //     price: 0,
    //     maxGroupSize: 0,
    //     featured: false,
    //   }

  const [formData, setFormData] = useState(props.data);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/tours/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        alert("Tour Edited successfully!");
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
      backgroundColor: 'rgba(0, 0, 0, 0.8)',

      position: "fixed",
        left: "0",
        right: "0",
        bottom: "0",
        top: "0",
      
    }}
  >
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
        Edit Tour Details
      </h1>
      <form>
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
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={formData.photo}
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
        <button
          onClick={handleSubmit}
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
          Edit
        </button>
        <button
          oncclick={props.close}
          style={{

            backgroundColor: "red",
            color: "#fff",
            padding: "10px 15px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
            fontWeight: "bold",
            marginTop: "10px",
          }}
        >
            Cancel
        </button>
      </form>
    </div>
  </div>
  );
};

export default EditTour;
