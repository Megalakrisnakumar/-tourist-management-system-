import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TextField, Box, Typography, Button, Paper, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";

const History = () => {
  const currentUser=JSON.parse(localStorage.getItem("user"))
  
  const [allBookings, setAllBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const getAllBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/package/booking/get-allBookings?searchTerm=${search}`
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
        `http://localhost:8000/api/package/booking/delete-booking-history/${id}/${currentUser._id}`,
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
    <Box display="flex" justifyContent="center" width="100%">
      <Paper elevation={6} sx={{ width: "95%", p: 3, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          History
        </Typography>
        {loading && <CircularProgress sx={{ display: "block", mx: "auto" }} />}
        {error && (
          <Typography variant="h6" color="error" align="center">
            {error}
          </Typography>
        )}
        <Box borderBottom={2} pb={2} mb={2}>
          <TextField
            fullWidth
            label="Search Username or Email"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
        {!loading &&
          allBookings &&
          allBookings.map((booking, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px",
                borderBottom: "2px solid #ddd",
              }}
            >
              <Link to={`/package/${booking?.packageDetails?._id}`}>
                <img
                  src={booking?.packageDetails?.packageImages[0]}
                  alt="Package"
                  style={{ width: 50, height: 50, borderRadius: "8px" }}
                />
              </Link>
              <Link to={`/package/${booking?.packageDetails?._id}`}>
                <Typography
                  variant="body1"
                  sx={{ textDecoration: "none", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                >
                  {booking?.packageDetails?.packageName}
                </Typography>
              </Link>
              <Typography variant="body1">{booking?.buyer?.username}</Typography>
              <Typography variant="body1">{booking?.buyer?.email}</Typography>
              <Typography variant="body1">{booking?.date}</Typography>
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
            </motion.div>
          ))}
      </Paper>
    </Box>
  );
};

export default History;
