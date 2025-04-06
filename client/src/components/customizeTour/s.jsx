import React, { useState } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Typography
} from '@mui/material';

import img from '../../assets/images/pexels-pixabay-258154.jpg'; // Example image path

//pexels-pixabay-258154.jpg

const roomTypes = ['Single Room', 'Double Room', 'Deluxe Room', 'Suite'];
const sharingOptions = ['Single Sharing', 'Double Sharing', 'Triple Sharing'];
const acOptions = ['AC', 'Non-AC'];

const Step4 = ({ data, onNext, onBack }) => {
  const totalGuests =
    (data?.primaryGuests?.length || 0) + (1);
  console.log(data);

  const [accommodationData, setAccommodationData] = useState({
    roomType: '',
    sharingType: '',
    acType: '',
    membersCount: totalGuests
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccommodationData({ ...accommodationData, [name]: value });
  };

  const handleNext = () => {
    onNext({ accommodation: accommodationData });
  };

  return (
    <div>
       <h2 style={{ textAlign: "center" }} className="text-2xl font-bold ">Step 4: Accommodation Details</h2>
     <div style={{ display: "flex", marginTop: "20px", gap: "20px", backgroundColor: "lightblue", borderRadius: "20px" }}>
       <div>
       <img src={img} alt="" height={"600px"} />
      </div>
      <div style={{width:"100%",  display: "flex", flexDirection: "column", gap: "20px", padding: "20px" }}>
        <div className="space-y-4 mt-4" style={{ backgroundColor: "lightsteelblue", display: "flex", flexDirection: "column", gap: "20px", padding: "60px", borderRadius: "20px" }}>
          

          <FormControl fullWidth>
            <InputLabel>Room Type</InputLabel>
            <Select
              name="roomType"
              value={accommodationData.roomType}
              onChange={handleChange}
              label="Room Type"
            >
              {roomTypes.map((type, i) => (
                <MenuItem key={i} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Sharing Type</InputLabel>
            <Select
              name="sharingType"
              value={accommodationData.sharingType}
              onChange={handleChange}
              label="Sharing Type"
            >
              {sharingOptions.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>AC Type</InputLabel>
            <Select
              name="acType"
              value={accommodationData.acType}
              onChange={handleChange}
              label="AC Type"
            >
              {acOptions.map((option, i) => (
                <MenuItem key={i} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Number of Members"
            name="membersCount"
            type="number"
            value={accommodationData.membersCount}

          />

          <div className="flex justify-between" style={{ display: "flex", gap: "20px" }}>

            <Button variant="outlined" onClick={onBack}>
              Back
            </Button>
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default Step4;
