import React, { useState } from 'react';
import { TextField, Button, IconButton, Typography } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import tours from '../../assets/data/tours';

const Step2 = ({ onNext, onBack }) => {
  const [primaryGuests, setPrimaryGuests] = useState([{ name: '', age: '' }]);
  const [managedGuest, setManagedGuest] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePhone = (phone) =>
    /^\d{10}$/.test(phone);

  const handlePrimaryGuestChange = (index, e) => {
    const updated = [...primaryGuests];
    updated[index][e.target.name] = e.target.value;
    setPrimaryGuests(updated);
  };

  const handleManagedGuestChange = (e) => {
    setManagedGuest({ ...managedGuest, [e.target.name]: e.target.value });
  };

  const addPrimaryGuest = () => {
    setPrimaryGuests([...primaryGuests, { name: '', age: '' }]);
  };

  const removePrimaryGuest = (index) => {
    const updated = primaryGuests.filter((_, i) => i !== index);
    setPrimaryGuests(updated);
  };

  const handleNext = () => {
    let tempErrors = {};

    // Validate managed guest
    if (!managedGuest.name || managedGuest.name.length < 5)
      tempErrors.managedName = "Name must be at least 5 characters";
    if (!validateEmail(managedGuest.email))
      tempErrors.managedEmail = "Invalid email format";
    if (!validatePhone(managedGuest.phone))
      tempErrors.managedPhone = "Phone must be 10 digits";

    // Validate each primary guest (only if name is entered)
    primaryGuests.forEach((guest, idx) => {
      if (guest.name && guest.name.length < 5) {
        tempErrors[`primaryName${idx}`] = "Name must be at least 5 characters";
      }
    });

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
    } else {
      setErrors({});
      onNext({ primaryGuests, managedGuest });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px", backgroundColor: "lightblue", borderRadius: "20px", padding: "20px" }}>
      <div style={{ backgroundColor: "lightgray", borderRadius: "20px", padding: "20px",width: "100%", maxWidth: "600px" ,marginLeft:"40px" }}>
        <div className="space-y-4 mt-4" style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <Typography variant="h6">Primary Guests</Typography>
          {primaryGuests.map((guest, index) => (
            <div key={index} className="space-y-2 border p-4 rounded-lg shadow-sm relative" style={{ display: "flex",flexDirection:"column",  gap: "18px" }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={guest.name}
                onChange={(e) => handlePrimaryGuestChange(index, e)}
                error={!!errors[`primaryName${index}`]}
                helperText={errors[`primaryName${index}`]}
              />
              <TextField
                fullWidth
                label="Age"
                name="age"
                value={guest.age}
                onChange={(e) => handlePrimaryGuestChange(index, e)}
              />
              {primaryGuests.length > 1 && (
                <IconButton
                  onClick={() => removePrimaryGuest(index)}
                  className="absolute top-2 right-2 text-red-500"
                  color="error"
                >
                  <RemoveCircle />
                </IconButton>
              )}
            </div>
          ))}

          <Button startIcon={<AddCircle />} onClick={addPrimaryGuest} variant="outlined">
            Add Another Primary Guest
          </Button>

          <Typography variant="h6" className="mt-6">Managed Guest</Typography>
          <div className="space-y-2 border p-4 rounded-lg shadow-sm" style={{ display: "flex",flexDirection:"column",  gap: "15px" }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={managedGuest.name}
              onChange={handleManagedGuestChange}
              error={!!errors.managedName}
              helperText={errors.managedName}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={managedGuest.email}
              onChange={handleManagedGuestChange}
              error={!!errors.managedEmail}
              helperText={errors.managedEmail}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={managedGuest.phone}
              onChange={handleManagedGuestChange}
              error={!!errors.managedPhone}
              helperText={errors.managedPhone}
            />
          </div>

          <div className="flex justify-between" style={{ display: "flex", gap: "30px" }}>
            <Button variant="outlined" onClick={onBack}>Back</Button>
            <Button variant="contained" onClick={handleNext}>Next</Button>
          </div>
        </div>
      </div>
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%", }}>
        <img src={tours[0].photo} alt="tour" />
      </div>
    </div>
  );
};

export default Step2;
