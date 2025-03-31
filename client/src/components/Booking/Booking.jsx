import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Grid,
  Divider,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const transportRates = { train: 100, flight: 3000, boat: 300, other: 100 };
const localTransportRates = { bus: 2, car: 6, bike: 3, other: 4 };
const accommodationRates = { standard: 1000, deluxe: 2000, suite: 3000 };
const foodRates = { veg: 500, nonveg: 800, combo: 1200 };
const guideFee = 1000;

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user?._id,
    userEmail: user?.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
    distance: 0,
    transport: "train",
    localtransport: "bus",
    accommodation: "standard",
    food: "veg",
    guide: false,
  });

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const serviceFee = 200;
    const transportCost = (transportRates[booking.transport] || 0) * Number(booking.distance || 1);
    const localTransportCost = (localTransportRates[booking.localtransport] || 0) * Number(booking.distance || 1);
    const accommodationCost = accommodationRates[booking.accommodation] * Number(booking.guestSize);
    const foodCost = foodRates[booking.food] * Number(booking.guestSize);
    const guideCost = booking.guide ? guideFee : 0;
    
    const newTotal = Number(price) * Number(booking.guestSize) + serviceFee + transportCost + localTransportCost + accommodationCost + foodCost + guideCost;
    setTotalAmount(newTotal);
  }, [booking]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setBooking((prev) => ({ ...prev, [id]: type === "checkbox" ? checked : value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please Sign In!");
    try {
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...booking, TotalPrice: totalAmount }),
      });
      const result = await res.json();
      if (!res.ok) return alert(result.message);
      navigate("/thank-you");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Card sx={{ maxWidth: 600, margin: "auto", p: 3, boxShadow: 5, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h4" color="primary" align="center" gutterBottom>
          {title}
        </Typography>

        <motion.div whileHover={{ scale: 1.05 }}>
          <Typography variant="h5" color="secondary" align="center" gutterBottom>
            ₹{price} / per person
          </Typography>
        </motion.div>

        <Divider sx={{ my: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Full Name" id="fullName" onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth type="number" label="Phone" id="phone" onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="date" id="bookAt" onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="number" label="Guests" id="guestSize" onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth type="number" label="Distance (km)" id="distance" onChange={handleChange} required />
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select id="transport" value={booking.transport} onChange={handleChange}>
                {Object.keys(transportRates).map((key) => (
                  <MenuItem key={key} value={key}>{`${key} - ₹${transportRates[key]}/km`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={6}>
            <FormControl fullWidth>
              <Select id="localtransport" value={booking.localtransport} onChange={handleChange}>
                {Object.keys(localTransportRates).map((key) => (
                  <MenuItem key={key} value={key}>{`${key} - ₹${localTransportRates[key]}/km`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="h5" align="center" color="success.main">
              Total: ₹{totalAmount}
            </Typography>
          </Grid>
        </Grid>
        <Button fullWidth variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleClick}>
          Book Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default Booking;