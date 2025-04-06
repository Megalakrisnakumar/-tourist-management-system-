import React, { useState } from 'react';
import { TextField, Button, IconButton, Typography } from '@mui/material';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import tours from '../../assets/data/tours';


const Step2 = ({ onNext, onBack }) => {
  const [primaryGuests, setPrimaryGuests] = useState([
    { name: '', age: '' },
  ]);

  const [managedGuest, setManagedGuest] = useState({ name: '', email: '', phone: '' });

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
    onNext({ primaryGuests, managedGuest });
  };

  return (

    <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px",backgroundColor:"lightblue" ,borderRadius:"20px",padding:"20px"}}> 
      <div style={{backgroundColor:"lightgray",borderRadius:"20px",padding:"20px"}}>
        <div className="space-y-4 mt-4" style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
          <Typography variant="h6">Primary Guests</Typography>
          {primaryGuests.map((guest, index) => (
            <div key={index} className="space-y-2 border p-4 rounded-lg shadow-sm relative">
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={guest.name}
                onChange={(e) => handlePrimaryGuestChange(index, e)}
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
          <div className="space-y-2 border p-4 rounded-lg shadow-sm">
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={managedGuest.name}
              onChange={handleManagedGuestChange}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={managedGuest.email}
              onChange={handleManagedGuestChange}
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={managedGuest.phone}
              onChange={handleManagedGuestChange}
            />
          </div>

          <div className="flex justify-between" style={{ display: "flex", gap:"30px",  }}>
            <Button variant="outlined" onClick={onBack}>Back</Button>
            <Button variant="contained" onClick={handleNext}>Next</Button>
          </div>
        </div>
      </div>
      <div >
<img src={tours[0].photo} alt="" />
      </div>
    </div>

  );
};

export default Step2;