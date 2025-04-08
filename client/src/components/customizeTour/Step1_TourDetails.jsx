import React, { useState } from 'react';
import {
  TextField, Button, MenuItem, Select, InputLabel, FormControl,
  OutlinedInput, Checkbox, ListItemText, FormHelperText
} from '@mui/material';
import tours from '../../assets/data/tours';


const indianDestinations = [
  'Taj Mahal, Agra', 'Red Fort, Delhi', 'Gateway of India, Mumbai', 'Hawa Mahal, Jaipur',
  'Mysore Palace, Mysuru', 'Charminar, Hyderabad', 'Qutub Minar, Delhi', 'India Gate, Delhi',
  'Lotus Temple, Delhi', 'Golden Temple, Amritsar', 'Meenakshi Temple, Madurai',
  'Ajanta Caves, Maharashtra', 'Ellora Caves, Maharashtra', 'Sundarbans National Park, West Bengal',
  'Kaziranga National Park, Assam', 'Backwaters, Kerala', 'Beaches of Goa', 'Dal Lake, Srinagar',
  'Ranthambore National Park, Rajasthan', 'Jim Corbett National Park, Uttarakhand',
  'Amer Fort, Jaipur', 'Jaisalmer Fort, Jaisalmer', 'Mehrangarh Fort, Jodhpur',
  'Khajuraho Temples, Madhya Pradesh', 'Konark Sun Temple, Odisha', 'Mahabodhi Temple, Bodh Gaya',
  'Rameshwaram, Tamil Nadu', 'Kanyakumari, Tamil Nadu', 'Shimla, Himachal Pradesh',
  'Manali, Himachal Pradesh', 'Leh-Ladakh, Jammu & Kashmir', 'Andaman & Nicobar Islands',
  'Lakshadweep Islands', 'Sanchi Stupa, Madhya Pradesh', 'Brihadeeswarar Temple, Thanjavur',
  'Chittorgarh Fort, Rajasthan', 'Bandipur National Park, Karnataka',
  'Periyar Wildlife Sanctuary, Kerala', 'Elephanta Caves, Mumbai', 'Hampi, Karnataka',
  'Lonavala, Maharashtra', 'Kodaikanal, Tamil Nadu', 'Ooty, Tamil Nadu', 'Coorg, Karnataka',
  'Munnar, Kerala', 'Nainital, Uttarakhand', 'Darjeeling, West Bengal', 'Gangtok, Sikkim',
  'Shillong, Meghalaya', 'Pondicherry', 'Bikaner, Rajasthan', 'Udaipur, Rajasthan',
  'Mount Abu, Rajasthan', 'Haridwar, Uttarakhand', 'Rishikesh, Uttarakhand',
  'Varanasi, Uttar Pradesh', 'Allahabad, Uttar Pradesh', 'Lucknow, Uttar Pradesh',
  'Chennai, Tamil Nadu', 'Bangalore, Karnataka', 'Kolkata, West Bengal', 'Hyderabad, Telangana',
  'Chandigarh', 'Ahmedabad, Gujarat', 'Surat, Gujarat', 'Vadodara, Gujarat', 'Pune, Maharashtra',
  'Nagpur, Maharashtra', 'Bhopal, Madhya Pradesh', 'Indore, Madhya Pradesh', 'Patna, Bihar',
  'Raipur, Chhattisgarh', 'Bhubaneswar, Odisha', 'Thiruvananthapuram, Kerala',
  'Visakhapatnam, Andhra Pradesh', 'Vijayawada, Andhra Pradesh', 'Dehradun, Uttarakhand',
  'Shimoga, Karnataka', 'Hospet, Karnataka', 'Madurai, Tamil Nadu', 'Thanjavur, Tamil Nadu',
  'Kanchipuram, Tamil Nadu', 'Mahabalipuram, Tamil Nadu', 'Tirupati, Andhra Pradesh',
  'Warangal, Telangana', 'Aurangabad, Maharashtra', 'Nasik, Maharashtra', 'Kolhapur, Maharashtra',
  'Solapur, Maharashtra', 'Panaji, Goa', 'Margao, Goa', 'Imphal, Manipur', 'Aizawl, Mizoram',
  'Kohima, Nagaland', 'Itanagar, Arunachal Pradesh', 'Agartala, Tripura', 'Port Blair, Andaman & Nicobar Islands',
  'Daman, Daman & Diu', 'Silvassa, Dadra & Nagar Haveli', 'Kargil, Ladakh', 'Dras, Ladakh',
  'Tawang, Arunachal Pradesh', 'Ziro Valley, Arunachal Pradesh', 'Majuli, Assam', 'Cherrapunji, Meghalaya'
];

const activitiesList = [
  'Sightseeing',
  'Trekking',
  'Boating',
  'Wildlife Safari',
  'Cultural Tour',
  'Beach Activities',
  'Adventure Sports'
];


const Step1 = ({ onNext }) => {
  const [tourData, setTourData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    activities: [],
  });

  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // clear error on change
  };

  const handleNext = () => {
    const newErrors = {};

    if (!tourData.destination) newErrors.destination = 'Destination is required';
    if (!tourData.startDate) newErrors.startDate = 'Start date is required';
    if (!tourData.endDate) newErrors.endDate = 'End date is required';

    if (tourData.startDate && tourData.startDate < today)
      newErrors.startDate = 'Start date cannot be in the past';
    if (tourData.endDate && tourData.endDate < today)
      newErrors.endDate = 'End date cannot be in the past';
    if (tourData.startDate && tourData.endDate && tourData.endDate < tourData.startDate)
      newErrors.endDate = 'End date cannot be before start date';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext({ tourDetails: tourData });
    }
  };

  return (
    <div>
      <br />
      <div>
        <h2 style={{ textAlign: "center" }} className="text-2xl font-bold ">Step 1: Tour Details</h2>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", gap: "20px" }}>
        <div>
          <img src={tours[3].photo} alt="" style={{ borderRadius: "20px" }} />
        </div>

        <div style={{
          width: "100%", borderRadius: "10px", backgroundColor: "lightblue",
          display: "flex", flexDirection: "column", gap: "20px", padding: "80px"
        }}>
          <div className="space-y-4 mt-4" style={{ display: "flex", flexDirection: "column", gap: "30px" }}>

            {/* Destination Dropdown */}
            <FormControl fullWidth error={!!errors.destination}>
              <InputLabel id="destination-label">Destination</InputLabel>
              <Select
                labelId="destination-label"
                name="destination"
                value={tourData.destination}
                onChange={handleChange}
                input={<OutlinedInput label="Destination" />}
              >
                {indianDestinations.map((place) => (
                  <MenuItem key={place} value={place}>
                    {place}
                  </MenuItem>
                ))}
              </Select>
              {errors.destination && <FormHelperText>{errors.destination}</FormHelperText>}
            </FormControl>

            <TextField
              fullWidth
              type="date"
              label="Start Date"
              name="startDate"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              value={tourData.startDate}
              error={!!errors.startDate}
              helperText={errors.startDate}
              inputProps={{ min: today }}
            />

            <TextField
              fullWidth
              type="date"
              label="End Date"
              name="endDate"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              value={tourData.endDate}
              error={!!errors.endDate}
              helperText={errors.endDate}
              inputProps={{ min: today }}
            />

            <FormControl fullWidth>
              <InputLabel id="activities-label">Activities (Optional)</InputLabel>
              <Select
                labelId="activities-label"
                multiple
                name="activities"
                value={tourData.activities}
                onChange={handleChange}
                input={<OutlinedInput label="Activities (Optional)" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {activitiesList.map((activity) => (
                  <MenuItem key={activity} value={activity}>
                    <Checkbox checked={tourData.activities.indexOf(activity) > -1} />
                    <ListItemText primary={activity} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;







