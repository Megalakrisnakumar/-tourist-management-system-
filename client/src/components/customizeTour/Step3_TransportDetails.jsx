import React, { useState } from 'react';
import { TextField, Button, MenuItem, FormControl, InputLabel, Select, FormHelperText } from '@mui/material';
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

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setTransportData({ ...transportData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const timePattern = /^([0-1]\d|2[0-3]):([0-5]\d)$/;

    if (!transportData.transportType) newErrors.transportType = 'Transport Type is required';
    if (!transportData.pickupLocation) newErrors.pickupLocation = 'Pickup Location is required';
    if (!transportData.dropLocation) newErrors.dropLocation = 'Drop Location is required';
   
    if (!transportData.localTransport) newErrors.localTransport = 'Local Transport is required';
    

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      onNext({ transportDetails: transportData });
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }} className="text-2xl font-bold ">Step 3: Transport Details</h2>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "20px", backgroundColor: "lightblue", borderRadius: "20px" }}>
        <div style={{ borderRadius: "20px", padding: "20px", marginTop: "20px" }}>
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
          <div className="space-y-4 mt-4" style={{ backgroundColor: "lightsteelblue", display: "flex", flexDirection: "column", gap: "20px", padding: "60px", borderRadius: "20px" }}>
            <FormControl fullWidth error={!!errors.transportType}>
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
              {errors.transportType && <FormHelperText>{errors.transportType}</FormHelperText>}
            </FormControl>

            <TextField
              fullWidth
              label="Pickup Location"
              name="pickupLocation"
              value={transportData.pickupLocation}
              onChange={handleChange}
              error={!!errors.pickupLocation}
              helperText={errors.pickupLocation}
            />
            <TextField
              fullWidth
              label="Drop Location"
              name="dropLocation"
              value={transportData.dropLocation}
              onChange={handleChange}
              error={!!errors.dropLocation}
              helperText={errors.dropLocation}
            />
          

            <FormControl fullWidth error={!!errors.localTransport}>
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
              {errors.localTransport && <FormHelperText>{errors.localTransport}</FormHelperText>}
            </FormControl>

          

            <div className="flex justify-between" style={{ display: "flex", gap: "20px" }}>
              <Button variant="outlined" onClick={onBack}>Back</Button>
              <Button variant="contained" onClick={handleNext}>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3;
