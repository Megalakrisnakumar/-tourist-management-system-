import React, { useState } from 'react'; // <-- Added useState
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, Menu, MenuItem } from '@mui/material'; // <-- Added Menu and MenuItem
import { green, red, orange } from '@mui/material/colors'; // <-- Added orange for pending
import axios from 'axios';

const BookingsAccomondationTable = () => {
  const { data: book } = useFetch(`${BASE_URL}/accomondation/booking/getAll`);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleCancel = async (Booking) => {
    try {
      const { data } = await axios.put(`http://localhost:8000/api/v1/accomondation/booking/${Booking.userId}`, { id: Booking._id });
      alert(`Booking ${Booking._id} has been cancelled.`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusClick = (event, booking) => {
    setAnchorEl(event.currentTarget);
    setSelectedBooking(booking);
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const { data } = await axios.put(`${BASE_URL}/accomondation/booking/status/${selectedBooking.userId}`, { id:selectedBooking._id,status: newStatus });
      alert(`Status updated to ${newStatus}`);
      window.location.reload(); // or you can update locally without reload for better UX
    } catch (error) {
      console.error(error);
    }
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedBooking(null);
  };

  return (
    <Paper sx={{ p: 1, maxWidth: 1200, margin: '20px auto', boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#007BFF', fontWeight: 'bold' }}>
        Accommodation Booking List
      </Typography>

      <TableContainer component={Paper} >
        <Table>
          <TableHead sx={{ backgroundColor: '#007BFF' }}>
            <TableRow>
              {['Booking ID', 'User ID', 'Accommodation ID', 'Check-In Date', 'Check-Out Date', 'Total Price', 'Status', 'Action', 'Update Status'].map((head) => (
                <TableCell key={head} sx={{ color: '#fff', fontWeight: 'bold', textAlign: 'center' }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {book?.map((booking, index) => (
              <TableRow key={booking.bookingId} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#e9ecef' }}>
                <TableCell align="center">{booking.bookingId}</TableCell>
                <TableCell align="center">{booking.userId}</TableCell>
                <TableCell align="center">{booking.accommodationId}</TableCell>
                <TableCell align="center">{booking.checkInDate}</TableCell>
                <TableCell align="center">{booking.checkOutDate}</TableCell>
                <TableCell align="center">${booking.totalPrice}</TableCell>
                <TableCell align="center" sx={{
                  color: booking.status === 'confirmed' ? green[500] :
                         booking.status === 'pending' ? orange[500] :
                         red[500],
                  fontWeight: 'bold'
                }}>
                  {booking.status}
                </TableCell>
                <TableCell align="center">
                  {booking.status === 'confirmed' && (
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => handleCancel(booking)}
                    >
                      Cancel
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => handleStatusClick(e, booking)}
                  >
                    Update Status
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {['confirmed', 'cancelled', 'pending'].map((statusOption) => (
          <MenuItem key={statusOption} onClick={() => handleStatusChange(statusOption)}>
            {statusOption}
          </MenuItem>
        ))}
      </Menu>
    </Paper>
  );
};

export default BookingsAccomondationTable;
