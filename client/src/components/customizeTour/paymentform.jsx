import React, { useState } from 'react';
import { TextField, Button, Typography, Card, CardContent, Grid } from '@mui/material';
import { FaCcVisa, FaCcMastercard, FaCreditCard } from 'react-icons/fa';

const detectCardType = (number) => {
  const visa = /^4[0-9]{0,}$/;
  const masterCard = /^(5[1-5]|2[2-7])[0-9]{0,}$/;

  if (visa.test(number)) return 'Visa';
  if (masterCard.test(number)) return 'MasterCard';
  return 'Unknown';
};

const PaymentForm = ({ data, onBack, onSubmit }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardType, setCardType] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiry, setExpiry] = useState('');
  const [errors, setErrors] = useState({});

  const handleCardChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(value);
    setCardType(detectCardType(value));
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (cardNumber.length < 16) newErrors.cardNumber = 'Card number must be 16 digits';
    if (!/^\d{3,4}$/.test(cvv)) newErrors.cvv = 'Invalid CVV';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) newErrors.expiry = 'Invalid expiry format MM/YY';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log(data);
      data.paymentStatus="Completed"
      
      onSubmit(data);
      alert('Payment Submitted Successfully!');
      
    }
  };

  const renderCardIcon = () => {
    switch (cardType) {
      case 'Visa':
        return <FaCcVisa size={30} color="#1a1f71" />;
      case 'MasterCard':
        return <FaCcMastercard size={30} color="#eb001b" />;
      default:
        return <FaCreditCard size={30} color="#888" />;
    }
  };

  return (
    <Card sx={{ maxWidth: 400, margin: 'auto', mt: 5, p: 2, borderRadius: 3, boxShadow: 4 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Payment Details
        </Typography>

        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <TextField
              fullWidth
              label="Card Number"
              value={cardNumber}
              onChange={handleCardChange}
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
              placeholder="1234 5678 9012 3456"
            />
          </Grid>
          <Grid item xs={2}>
            {renderCardIcon()}
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="CVV"
              value={cvv}
              onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
              error={!!errors.cvv}
              helperText={errors.cvv}
              placeholder="123"
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Expiry Date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              error={!!errors.expiry}
              helperText={errors.expiry}
              placeholder="MM/YY"
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, borderRadius: 2 }}
          onClick={handleSubmit}
        >
          Pay Now
        </Button>
      </CardContent>
    </Card>
  );
};

export default PaymentForm;
