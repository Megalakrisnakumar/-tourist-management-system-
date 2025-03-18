import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TextField, Card, Typography, Button, Box, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";

const MyHistory = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"))
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const getAllBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(        
        `http://localhost:8000/api/package/booking/get-allUserBookings/${currentUser?._id}?searchTerm=${search}`
      );
      const data = await res.json();
      if (data?.success) {
        setAllBookings(data?.bookings);
        setLoading(false);
        setError(false);
      } else {
        setLoading(false);
        setError(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllBookings();
  }, [search]);

  const handleHistoryDelete = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/booking/delete-booking-history/${id}/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data?.success) {
        setLoading(false);
        alert(data?.message);
        getAllBookings();
      } else {
        setLoading(false);
        alert(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" width="100%" p={3}>
      <Card sx={{ width: "95%", boxShadow: 10, borderRadius: 4, p: 3 }}>
        <Typography variant="h4" align="center" fontWeight={600} gutterBottom>
          History
        </Typography>
        {loading && <Typography variant="h5" align="center">Loading...</Typography>}
        {error && <Typography variant="h5" align="center" color="error">{error}</Typography>}
        
        <Box mb={2}>
          <TextField
            fullWidth
            label="Search"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        
        {!loading && allBookings &&
          allBookings.map((booking, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Card
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  mb: 2,
                  boxShadow: 5,
                }}
              >
                <Box display="flex" alignItems="center" gap={2}>
                  <Link to={`/package/${booking?.packageDetails?._id}`}>
                    <Avatar
                      src={booking?.packageDetails?.packageImages[0]}
                      sx={{ width: 56, height: 56, border: "2px solid #1976D2" }}
                    />
                  </Link>
                  <Box>
                    <Link to={`/package/${booking?.packageDetails?._id}`}>
                      <Typography variant="h6" sx={{ '&:hover': { textDecoration: "underline" } }}>
                        {booking?.packageDetails?.packageName}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="textSecondary">
                      {booking?.buyer?.username} ({booking?.buyer?.email})
                    </Typography>
                  </Box>
                </Box>
                <Typography variant="body1" fontWeight={500}>{booking?.date}</Typography>
                {(new Date(booking?.date).getTime() < new Date().getTime() || booking?.status === "Cancelled") && (
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleHistoryDelete(booking._id)}
                  >
                    Delete
                  </Button>
                )}
              </Card>
            </motion.div>
          ))}
      </Card>
    </Box>
  );
};

export default MyHistory;
