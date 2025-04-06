import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Button,
    Grid,
    Box,
    Chip,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import jsPDF from "jspdf";
const statusColors = {
    Pending: "warning",
    Confirmed: "success",
    Cancelled: "error",
};



const BookingCard = ({ booking, onUpdateStatus }) => {

    const generatePDF = () => {
        const doc = new jsPDF();
      
        const statusColorMap = {
          Pending: "#FFA726",
          Confirmed: "#66BB6A",
          Cancelled: "#EF5350",
        };
      
        const statusColor = statusColorMap[booking.status] || "#000000";
      
        doc.setFontSize(18);
        doc.setTextColor(statusColor);
        doc.text("Tour Booking Details", 20, 20);
      
        doc.setFontSize(12);
        doc.setTextColor("#333");
      
        doc.text(`Tour Title: ${booking.tourDetails.title}`, 20, 40);
        doc.text(`Destination: ${booking.tourDetails.destination}`, 20, 50);
        doc.text(
          `Dates: ${new Date(booking.tourDetails.startDate).toLocaleDateString()} - ${new Date(
            booking.tourDetails.endDate
          ).toLocaleDateString()}`,
          20,
          60
        );
        doc.text(`Members Count: ${booking.accommodation.membersCount}`, 20, 70);
        doc.setTextColor(statusColor);
        doc.text(`Status: ${booking.status}`, 20, 80);
      
        doc.setTextColor("#1976d2");
        doc.text("Activities:", 20, 95);
      
        booking.tourDetails.activities.forEach((act, idx) => {
          doc.setTextColor("#555");
          doc.text(`- ${act}`, 25, 105 + idx * 10);
        });
      
        doc.save(`Booking_${booking._id}.pdf`);
      };
      

    const handleCancel = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/customize-tour-bookings/${booking._id}`,
                { status: "Cancelled" }
            );
            onUpdateStatus(booking._id, "Cancelled");
        } catch (error) {
            console.error("Cancel failed", error);
        }
    };

    const handleConfirm = async () => {
        try {
            const response = await axios.put(
                `http://localhost:8000/api/customize-tour-bookings/${booking._id}`,
                { status: "Confirmed" }
            );
            onUpdateStatus(booking._id, "Confirmed");

            const emailRes = await fetch("http://localhost:8000/api/send-confirm-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ bookingId: booking._id }),
            });

            const data = await emailRes.json();
            alert(data.message || "Confirmation email sent!");
        } catch (error) {
            console.error("Confirmation failed", error);
            alert("Failed to confirm and send email.");
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card sx={{ mb: 3, borderRadius: 4, boxShadow: 4 }}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6">{booking.tourDetails.title}</Typography>
                            <Typography color="text.secondary">
                                {booking.tourDetails.destination}
                            </Typography>
                            <Typography variant="body2" mt={1}>
                                {new Date(booking.tourDetails.startDate).toLocaleDateString()} -{" "}
                                {new Date(booking.tourDetails.endDate).toLocaleDateString()}
                            </Typography>
                            <Box mt={1}>
                                {booking.tourDetails.activities.map((act, idx) => (
                                    <Chip
                                        key={idx}
                                        label={act}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                        sx={{ mr: 1, mb: 1 }}
                                    />
                                ))}
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Typography>
                                <strong>Status:</strong>{" "}
                                <Chip label={booking.status} color={statusColors[booking.status]} />
                            </Typography>
                            <Typography>
                                <strong>Members:</strong> {booking.accommodation.membersCount}
                            </Typography>
                            <Box mt={2} display="flex" gap={1}>
                                {booking.status !== "Cancelled" && (
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                )}
                                {booking.status === "Pending" && (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        onClick={handleConfirm}
                                    >
                                        Confirm
                                    </Button>
                                )}

                                <Button variant="contained" color="primary" onClick={generatePDF}>
                                    Download Tickets
                                </Button>

                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </motion.div>
    );
};

const MyCustomizeBookings = () => {
    const [bookings, setBookings] = useState([]);

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user._id;

    useEffect(() => {
        axios
            .get("http://localhost:8000/api/customize-tour-bookings/" + userId)
            .then((res) => setBookings(res.data))
            .catch((err) => console.error("Failed to fetch bookings", err));
    }, []);

    const updateBookingStatus = (id, newStatus) => {
        setBookings((prev) =>
            prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
        );
    };

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                My Tour Bookings
            </Typography>
            <div style={{ display: "flex", gap: 20, marginBottom: 10, alignItems: "center", flexWrap: "wrap", }}>
                {bookings.map((booking) => (
                    <BookingCard
                        key={booking._id}
                        booking={booking}
                        onUpdateStatus={updateBookingStatus}
                    />
                ))}
            </div>

        </Box>
    );
};

export default MyCustomizeBookings;
