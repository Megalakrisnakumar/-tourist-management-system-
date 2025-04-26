import React, { useEffect, useState } from "react";
import { Container, Card, Typography, Grid, Chip, Box, Button } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { jsPDF } from "jspdf";

const MyBookingPage = () => {
  const [bookings, setBookings] = useState(null);
  const user=localStorage.getItem("user")
  const userId = JSON.parse(user)._id

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/booking/${userId}`,{ withCredentials: true})
      .then((response) => setBookings(response.data.data))
      .catch((error) => console.error("Error fetching booking:", error));
  }, []);

  const generatePDF = (booking) => {
    const doc = new jsPDF();
    doc.text("Booking Details", 20, 20);
    doc.text(`Tour Name: ${booking.tourName}`, 20, 30);
    doc.text(`Distance: ${booking.distance} km`, 20, 40);
    doc.text(`Transport: ${booking.transport}`, 20, 50);
    // doc.text(`Accommodation: ${booking.accommodation}`, 20, 60);
    // doc.text(`Food: ${booking.food}`, 20, 70);
    doc.text(`Local Transport: ${booking.localtransport}`, 20, 80);
    // doc.text(`Guide Included: ${booking.guide === "true" ? "Yes" : "No"}`, 20, 90);
    doc.text(`Guest Size: ${booking.guestSize}`, 20, 100);
    doc.text(`Phone: ${booking.phone}`, 20, 110);
    doc.text(`Total Price: ₹${booking.TotalPrice}`, 20, 120);
    doc.text(`Booking Date: ${new Date(booking.bookAt).toLocaleDateString()}`, 20, 130);
    doc.save("Booking_Details.pdf");
  };

  if (!bookings) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>

{
    bookings.map(booking=>{
        return<>
 <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Card sx={{ p: 3, borderRadius: 4, boxShadow: 5, background: "#fff" }}>
          <Typography variant="h5" fontWeight={700} color="primary" gutterBottom>
            Booking Details
          </Typography>



          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}><Detail title="Tour Name" value={booking.tourName} /></Grid>
            <Grid item xs={12} sm={6}><Detail title="Distance" value={`${booking.distance} km`} /></Grid>
            <Grid item xs={12} sm={6}><Detail title="Transport" value={booking.transport} /></Grid>
            {/* <Grid item xs={12} sm={6}><Detail title="Accommodation" value={booking.accommodation} /></Grid> */}
            {/* <Grid item xs={12} sm={6}><Detail title="Food" value={booking.food} /></Grid> */}
            <Grid item xs={12} sm={6}><Detail title="Local Transport" value={booking.localtransport} /></Grid>
            {/* <Grid item xs={12} sm={6}><Detail title="Guide Included" value={booking.guide === "true" ? "Yes" : "No"} /></Grid> */}
            <Grid item xs={12} sm={6}><Detail title="Guest Size" value={booking.guestSize} /></Grid>
            <Grid item xs={12} sm={6}><Detail title="Phone" value={booking.phone} /></Grid>
            <Grid item xs={12} sm={6}><Detail title="Total Price" value={`₹${booking.TotalPrice}`} /></Grid>
            <Grid item xs={12} sm={6}><Detail title="Booking Date" value={new Date(booking.bookAt).toLocaleDateString()} /></Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="center">
            <Button variant="contained" color="primary" onClick={()=>generatePDF(booking)}>
              Get PDF
            </Button>
          </Box>
        </Card>
      </motion.div>
      <br />
        </>
    })
}

     
    </Container>
  );
};

const Detail = ({ title, value }) => (
  <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
    <Box display="flex" justifyContent="space-between" p={2} bgcolor="#f5f5f5" borderRadius={2}>
      <Typography variant="subtitle1" fontWeight={600}>{title}</Typography>
      <Chip label={value} color="primary" variant="outlined" />
    </Box>
  </motion.div>
);

export default MyBookingPage;