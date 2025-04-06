import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Fade,
  Backdrop,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const modalStyle = {
  position: "absolute",
  top: "10%", // Positioned near the top
  left: "40%",
  transform: "translateX(-50%)", // Only horizontal centering
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

export default function EnquiryFormModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    destination: "",
    date: "",
    message: "",
    phone: "",
  });

  useEffect(() => {
    let timer;
    if (open) {
      timer = setTimeout(() => {
        onClose();
      }, 180000); // Auto-close in 3 minutes
    }
    return () => clearTimeout(timer);
  }, [open, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send data to API or backend
    console.log("Form submitted", formData);
   axios.post("http://localhost:8000/api/enquiry", formData)
      .then((response) => {
        console.log("Enquiry submitted successfully", response.data);
        alert("Enquiry submitted successfully!");
        })
        .catch((error) => {
            console.log("Error submitting enquiry", error);
            alert("Error submitting enquiry. Please try again.");
        })
       // Close the modal after submission
    onClose();
  };

  // style={{width:"400px"}}

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={open}>
        <Box
          sx={modalStyle}
          component={motion.div}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h5" gutterBottom textAlign="center">
            Tour Enquiry
          </Typography>
          <form onSubmit={handleSubmit} >
            <TextField
              name="name"
              label="Your Name"
              fullWidth
              required
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              required
              margin="normal"
              onChange={handleChange}
            />
             <TextField
              name="phone"
              label="Mobile Number"
              type="tel"
             
              fullWidth
              required
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              name="destination"
              label="Preferred Destination"
              fullWidth
              required
              margin="normal"
              onChange={handleChange}
            />
            <TextField
              name="date"
              label="Travel Date"
              type="date"
              fullWidth
              required
              margin="normal"
              InputLabelProps={{ shrink: true }}
              onChange={handleChange}
            />
            <TextField
              name="message"
              label="Message"
              multiline
              rows={3}
              fullWidth
              margin="normal"
              onChange={handleChange}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ mt: 2, bgcolor: "primary.main", borderRadius: 2 }}
            >
              Submit Enquiry
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
}
