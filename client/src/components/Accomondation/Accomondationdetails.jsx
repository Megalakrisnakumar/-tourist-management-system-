import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import CloseIcon from '@mui/icons-material/Close';

const AccBookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);

  const [numOfNights, setNumOfNights] = useState(1);
  const [numOfRooms, setNumOfRooms] = useState(1);
  const [totalPrice, setTotalPrice] = useState(state.pricePerNight);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryDate, setExpiryDate] = useState('');

  const detectCardType = (number) => {
    const cleaned = number.replace(/\s+/g, '');
    if (/^4/.test(cleaned)) return 'Visa';
    if (/^5[1-5]/.test(cleaned)) return 'MasterCard';
    return '';
  };

  const calculateNightsAndPrice = (checkIn, checkOut, rooms) => {
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const timeDiff = outDate - inDate;
    const nights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (nights > 0) {
      setNumOfNights(nights);
      setTotalPrice(state.pricePerNight * nights * rooms);
    } else {
      setNumOfNights(0);
      setTotalPrice(0);
    }
  };

  const handleCheckInChange = (e) => {
    const selectedDate = e.target.value;
    setCheckInDate(selectedDate);
    if (checkOutDate) {
      calculateNightsAndPrice(selectedDate, checkOutDate, numOfRooms);
    }
  };

  const handleCheckOutChange = (e) => {
    const selectedDate = e.target.value;
    setCheckOutDate(selectedDate);
    if (checkInDate) {
      calculateNightsAndPrice(checkInDate, selectedDate, numOfRooms);
    }
  };

  const handleNumOfRoomsChange = (e) => {
    const rooms = e.target.value;
    setNumOfRooms(rooms);
    if (checkInDate && checkOutDate) {
      calculateNightsAndPrice(checkInDate, checkOutDate, rooms);
    }
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 16);
    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    setCardNumber(formatted);
    setCardType(detectCardType(value));
  };

  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (value.length >= 3) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    setExpiryDate(value);
  };

  const handleCvvChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setCvv(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    if (!checkInDate || !checkOutDate) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    if (checkIn < today) {
      alert("Check-in date cannot be in the past.");
      return;
    }

    if (checkOut <= checkIn) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    if (cardNumber.replace(/\s/g, '').length !== 16 || !cardType) {
      alert("Please enter a valid card number.");
      return;
    }

    if (cvv.length !== 3) {
      alert("Please enter a valid 3-digit CVV.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      alert("Please enter a valid expiry date in MM/YY format.");
      return;
    }

    const data = {
      userId: user._id,
      accommodationId: state.accommodationId,
      checkInDate,
      checkOutDate,
      numOfRooms,
      totalPrice,
    };

    axios.post(BASE_URL + "/accomondation/booking/create", data).then(res => {
      if (res.data.success) {
        navigate('/thank-you');
      } else {
        alert("Booking failed");
      }
    });
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{
        width: 600,
        bgcolor: 'background.paper',
        borderRadius: 2,
        p: 4,
        m: '100px auto',
        position: 'relative',
        boxShadow: 24,
      }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h5" mb={2}>Booking Your Stay</Typography>

        <form onSubmit={handleSubmit}>
          {/* Accommodation Info */}
          <TextField
            label="Accommodation Name"
            value={state.name}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Location"
            value={state.location}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Price per Night"
            value={state.pricePerNight}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          {/* Stay Details */}
          <TextField
            label="Check-in Date"
            type="date"
            value={checkInDate}
            onChange={handleCheckInChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Check-out Date"
            type="date"
            value={checkOutDate}
            onChange={handleCheckOutChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />

          <TextField
            label="Number of Nights"
            value={numOfNights}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          <TextField
            label="Number of Rooms"
            type="number"
            value={numOfRooms}
            onChange={handleNumOfRoomsChange}
            min="1"
            fullWidth
            margin="normal"
          />

          <TextField
            label="Total Price"
            value={totalPrice}
            fullWidth
            margin="normal"
            InputProps={{ readOnly: true }}
          />

          {/* Payment Section */}
          <Typography variant="h6" mt={3}>Payment Details</Typography>

          <TextField
            label="Card Number"
            value={cardNumber}
            onChange={handleCardNumberChange}
            fullWidth
            margin="normal"
            placeholder="1234 5678 9012 3456"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CreditCardIcon />
                </InputAdornment>
              ),
            }}
          />

          {cardType && (
            <Typography variant="body2" color="green" mb={1}>
              Card Type: {cardType}
            </Typography>
          )}

          <TextField
            label="Expiry Date (MM/YY)"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            fullWidth
            margin="normal"
            placeholder="MM/YY"
          />

          <TextField
            label="CVV"
            value={cvv}
            onChange={handleCvvChange}
            fullWidth
            margin="normal"
            placeholder="123"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PaymentIcon />
                </InputAdornment>
              ),
            }}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Confirm Booking
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AccBookingPage;
