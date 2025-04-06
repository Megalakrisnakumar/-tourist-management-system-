import React from 'react';
import { Typography, Button, Divider, Box } from '@mui/material';
import { motion } from 'framer-motion';
import img from '../../assets/images/pay.jpg';

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

// Create dynamic pricing object from destination array
const destinationPricing = indianDestinations.reduce((acc, place, index) => {
  acc[place] = 1000 + (index % 10) * 100; // You can customize this logic
  return acc;
}, {});

const transportPricing = {
  Train: 500,
  Flight: 2000,
  Bus: 400,
  Car: 1000,
};

const accommodationPricing = {
  'Single Room': 1000,
  'Double Room': 1800,
  'Deluxe Room': 2500,
  'Suite': 4000,
};

const sharingPricing = {
  'Single Sharing': 1.0,
  'Double Sharing': 0.7,
  'Triple Sharing': 0.5,
};

const acTypePricing = {
  AC: 500,
  'Non-AC': 0,
};

const activityPricing = {
  Sightseeing: 300,
  Trekking: 400,
  Boating: 200,
  'Wildlife Safari': 600,
  'Cultural Tour': 300,
  'Beach Activities': 500,
  'Adventure Sports': 700,
};

const calculateTotalAmount = (data) => {
  const guests = data.primaryGuests?.length || 0;

  const destinationCost = destinationPricing[data.tourDetails.destination] || 1000;
  const transportCost = transportPricing[data.transportDetails.transportType] || 0;

  const roomBase = accommodationPricing[data.accommodation.roomType] || 0;
  const sharingFactor = sharingPricing[data.accommodation.sharingType] || 1;
  const acCost = acTypePricing[data.accommodation.acType] || 0;

  const accommodationCostPerGuest = (roomBase * sharingFactor) + acCost;

  const activityCostPerGuest = (data.tourDetails.activities || []).reduce((total, activity) => {
    return total + (activityPricing[activity] || 200);
  }, 0);

  const totalPerGuest = destinationCost + transportCost + accommodationCostPerGuest + activityCostPerGuest;

  const totalAmount = totalPerGuest * guests;

  return totalAmount;
};

const Step5 = ({ data, onBack, onNext }) => {

  const totalAmount = calculateTotalAmount(data);


  return (
    <div>
      <h2 style={{ textAlign: "center" }} className="text-2xl font-bold ">Step 5: Payment Summary</h2>
      {/* <div style={{ display: "flex", marginTop: "20px", gap: "20px", borderRadius: "20px" }}> */}
       
        <div> 
           <div className="space-y-4 mt-4" style={{width:"100%"}}>
          <Typography variant="h5" gutterBottom color="primary">
            Review Your Details
          </Typography>

          <Box className="bg-gray-50 p-4 rounded shadow">
            <Typography variant="subtitle1" gutterBottom><strong>Tour Info</strong></Typography>
            <p><strong>Title:</strong> {data.tourDetails?.title}</p>
            <p><strong>Destination:</strong> {data.tourDetails?.destination}</p>
            <p><strong>Start Date:</strong> {data.tourDetails?.startDate}</p>
            <p><strong>End Date:</strong> {data.tourDetails?.endDate}</p>
            <p><strong>Activities:</strong> {(data.tourDetails?.activities || []).join(', ')}</p>

            <Divider className="my-3" />

            <Typography variant="subtitle1" gutterBottom><strong>Guests</strong></Typography>
            {data.primaryGuests?.map((guest, idx) => (
              <p key={idx}>👤 {guest.name} — Age: {guest.age}</p>
            ))}

            <p><strong>Managed By:</strong> {data.managedGuest?.name} ({data.managedGuest?.email}, {data.managedGuest?.phone})</p>

            <Divider className="my-3" />

            <Typography variant="subtitle1" gutterBottom><strong>Transport</strong></Typography>
            <p><strong>Type:</strong> {data.transportDetails?.transportType}</p>
            <p><strong>Pickup:</strong> {data.transportDetails?.pickupLocation}</p>
            <p><strong>Drop:</strong> {data.transportDetails?.dropLocation}</p>
            <p><strong>Preferred Time:</strong> {data.transportDetails?.preferredTime}</p>

            <Divider className="my-3" />

            <Typography variant="subtitle1" gutterBottom><strong>Accommodation</strong></Typography>
            <p><strong>Room:</strong> {data.accommodation?.roomType}</p>
            <p><strong>Sharing:</strong> {data.accommodation?.sharingType}</p>
            <p><strong>AC Type:</strong> {data.accommodation?.acType}</p>
            <p><strong>Members:</strong> {data.accommodation?.membersCount}</p>
          </Box>

          <Typography variant="h6" color="secondary">
            Total Amount: ₹{totalAmount}
          </Typography>

          <div className="flex justify-between mt-4">
            <Button variant="outlined" onClick={onBack}>Back</Button>
            <Button variant="contained" onClick={() => onNext({ ...data, totalAmount })}>Next</Button>
          </div>
        </div>
        </div>
{/*        
      </div> */}
    </div>
  );
};

export default Step5;





