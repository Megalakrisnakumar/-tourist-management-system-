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
  Modal,
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
const API_KEY = "43aca55071d54f1ba2340acfd77eef87";

const Booking = ({ tour, avgRating }) => {
  const { price, title, address } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [validationErrors, setValidationErrors] = useState({});
  const [fromPlace, setFromPlace] = useState("");
  const [loadingDistance, setLoadingDistance] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardDetails, setCardDetails] = useState({ cardNumber: "", cvv: "", expiry: "" });
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

  const validateForm = () => {
    const errors = {};
    const phoneRegex = /^\d{10}$/;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(booking.bookAt);
    selectedDate.setHours(0, 0, 0, 0);

    if (!booking.fullName.trim()) errors.fullName = "Full name is required";
    if (!booking.phone.trim()) errors.phone = "Phone is required";
    else if (!phoneRegex.test(booking.phone)) errors.phone = "Phone must be 10 digits";
    if (!booking.bookAt) errors.bookAt = "Date is required";
    else if (selectedDate < today) errors.bookAt = "Date must be today or in the future";
    if (!booking.guestSize || booking.guestSize < 1) errors.guestSize = "Guest size must be at least 1";
    if (!fromPlace.trim()) errors.fromPlace = "Starting location is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateDistance = async (from, to) => {
    if (!from || !to) return;
    setLoadingDistance(true);

    try {
      const geo = async (place) => {
        const res = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(place)}&apiKey=${API_KEY}`);
        const data = await res.json();
        return data.features[0]?.geometry?.coordinates;
      };

      const [fromCoords, toCoords] = await Promise.all([geo(from), geo(to)]);
      if (!fromCoords || !toCoords) return;

      const res = await fetch(`https://api.geoapify.com/v1/routematrix?apiKey=${API_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "drive",
          sources: [{ location: fromCoords }],
          targets: [{ location: toCoords }],
        }),
      });

      const data = await res.json();
      const distanceInMeters = data.sources_to_targets[0][0].distance;
      const distanceInKm = (distanceInMeters / 1000).toFixed(2);

      setBooking((prev) => ({ ...prev, distance: distanceInKm }));
    } catch (error) {
      console.error("Error calculating distance:", error);
    } finally {
      setLoadingDistance(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (fromPlace.trim()) {
        calculateDistance(fromPlace, address);
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [fromPlace]);

  useEffect(() => {
    const serviceFee = 200;
    const transportCost = (transportRates[booking.transport] || 0) * Number(booking.distance || 1);
    const localTransportCost = (localTransportRates[booking.localtransport] || 0) * Number(booking.distance || 1);
    const accommodationCost = accommodationRates[booking.accommodation] * Number(booking.guestSize);
    const foodCost = foodRates[booking.food] * Number(booking.guestSize);
    const guideCost = booking.guide ? guideFee : 0;

    const newTotal = (Number(price) * Number(booking.guestSize)) + serviceFee + transportCost + localTransportCost + accommodationCost + foodCost + guideCost;
    setTotalAmount(newTotal);
  }, [booking]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setBooking((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const openPaymentModal = (e) => {
    e.preventDefault();
    if (!user) return alert("Please Sign In!");
    if (!validateForm()) return;
    setPaymentModalOpen(true);
  };

  const handlePayment = async () => {
    if (paymentMethod === "card") {
      const { cardNumber, cvv, expiry } = cardDetails;
      if (cardNumber.length !== 16 || cvv.length !== 3 || !expiry) {
        return alert("Please enter valid card details!");
      }
    }
    try {
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: { "content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...booking, TotalPrice: totalAmount }),
      });
      const result = await res.json();
      if (!res.ok) return alert(result.message);

      setPaymentModalOpen(false);
      navigate("/thank-you");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
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
              <TextField fullWidth label="Full Name" id="fullName" onChange={handleChange} required error={!!validationErrors.fullName} helperText={validationErrors.fullName} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth type="number" label="Phone" id="phone" onChange={handleChange} required error={!!validationErrors.phone} helperText={validationErrors.phone} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="date" id="bookAt" onChange={handleChange} required error={!!validationErrors.bookAt} helperText={validationErrors.bookAt} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth type="number" label="Guests" id="guestSize" onChange={handleChange} required error={!!validationErrors.guestSize} helperText={validationErrors.guestSize} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="From Location" value={fromPlace} onChange={(e) => setFromPlace(e.target.value)} placeholder="Enter your starting place" error={!!validationErrors.fromPlace} helperText={validationErrors.fromPlace} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Distance (km)" value={booking.distance} InputProps={{ readOnly: true }} helperText={loadingDistance ? "Calculating..." : ""} />
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
          <Button fullWidth variant="contained" color="primary" sx={{ mt: 3 }} onClick={openPaymentModal}>
            Book Now
          </Button>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <Modal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)}>
        <Box sx={{ width: 400, margin: "100px auto", background: "#fff", p: 4, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>Payment</Typography>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <Select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <MenuItem value="card">Card</MenuItem>
              <MenuItem value="bank">Bank Transfer</MenuItem>
            </Select>
          </FormControl>

          {paymentMethod === "card" && (
            <>
              <TextField fullWidth label="Card Number" value={cardDetails.cardNumber} onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Expiry" placeholder="MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
                </Grid>
              </Grid>
            </>
          )}

          <Button fullWidth variant="contained" color="success" sx={{ mt: 3 }} onClick={handlePayment}>
            Confirm Payment ₹{totalAmount}
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Booking;
