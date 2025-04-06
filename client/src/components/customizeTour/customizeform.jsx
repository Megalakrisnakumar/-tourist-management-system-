// CustomizeTourForm.js
import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Card, CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Step1 from './Step1_TourDetails';
import Step2 from './Step2_GuestDetails';
import Step3 from './Step3_TransportDetails';
import Step4 from './s';
import Step5 from './Step5_PaymentSummary';
import PaymentForm from './paymentform';
import { useNavigate } from 'react-router-dom';


const steps = ['Tour Details', 'Guest Details', 'Transport Details','Accomondation Details', 'Payment Summary', 'Payment'];

const CustomizeTourForm = () => {
  const user=JSON.parse(localStorage.getItem("user"));
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const navigate=useNavigate()

  const handleNext = (data) => {
    setFormData({ ...formData, ...data });
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    formData.userId=user._id
    const response = await fetch('http://localhost:8000/api/customize-tour-bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    alert("Booking Successful!");
navigate('/thank-you')
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <Step1 onNext={handleNext} />;
      case 1:
        return <Step2 onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <Step3 onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <Step4 data={formData} onNext={handleNext} onBack={handleBack} />; 
      case 4:
        return <Step5 data={formData} onBack={handleBack} onNext={handleNext} />;
      case 5:
          return <PaymentForm data={formData} onBack={handleBack} onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  return (
    <Card className="p-4 max-w-3xl mx-auto mt-10 rounded-2xl shadow-xl">
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Customize Your Tour Package
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
        >
          {renderStep()}
        </motion.div>
      </CardContent>
    </Card>
  );
};

export default CustomizeTourForm;