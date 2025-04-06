import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import img from '../../assets/images/tw.jpg';
import { motion } from "framer-motion";

const Step3 = ({ onNext, onBack }) => {
  const [transportData, setTransportData] = useState({
    transportType: '',
    pickupLocation: '',
    dropLocation: '',
    preferredTime: '',
    localTransport: '',
    localPickup: '',
  });

  const handleChange = (e) => {
    setTransportData({ ...transportData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }} className="text-2xl font-bold ">Step 3: Transport Details</h2>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px", backgroundColor: "lightblue",borderRadius:"20px" }}>
        <div style={{  borderRadius: "20px", padding: "20px",marginTop:"20px" }}>
          {/* <img src={img} height={"600px"}  alt="" style={{borderRadius:'10px'}} /> */}
        <motion.img
        src={img}
        height={"600px"}
        style={{ borderRadius: "20px" }}
        alt="Animated"
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      />
        </div>
        <div style={{ width: "100%", borderRadius: "10px", display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
          <div className="space-y-4 mt-4" style={{  backgroundColor: "lightsteelblue", display: "flex", flexDirection: "column", gap: "20px",padding:"60px",borderRadius:"20px" } }>
            <FormControl fullWidth>
              <InputLabel id="transport-type-label">Transport Type</InputLabel>
              <Select
                labelId="transport-type-label"
                name="transportType"
                value={transportData.transportType}
                label="Transport Type"
                onChange={handleChange}
              >
                <MenuItem value="Train">Train</MenuItem>
                <MenuItem value="Flight">Flight</MenuItem>
                <MenuItem value="Bus">Bus</MenuItem>
                <MenuItem value="Car">Car</MenuItem>
              </Select>
            </FormControl>

            <TextField fullWidth label="Pickup Location" name="pickupLocation" value={transportData.pickupLocation} onChange={handleChange} />
            <TextField fullWidth label="Drop Location" name="dropLocation" value={transportData.dropLocation} onChange={handleChange} />
            <TextField fullWidth label="Preferred Time" name="preferredTime" value={transportData.preferredTime} onChange={handleChange} />

            <FormControl fullWidth>
              <InputLabel id="local-transport-label">Local Transportation</InputLabel>
              <Select
                labelId="local-transport-label"
                name="localTransport"
                value={transportData.localTransport}
                label="Local Transportation"
                onChange={handleChange}
              >
                <MenuItem value="Car">Car</MenuItem>
                <MenuItem value="Bike">Bike</MenuItem>
              </Select>
            </FormControl>

            <TextField fullWidth label="Local Pickup Location" name="localPickup" value={transportData.localPickup} onChange={handleChange} />

            <div className="flex justify-between" style={{display:"flex",gap:"20px"}}>
              <Button variant="outlined" onClick={onBack}>Back</Button>
              <Button variant="contained" onClick={() => onNext({ transportDetails: transportData })}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;