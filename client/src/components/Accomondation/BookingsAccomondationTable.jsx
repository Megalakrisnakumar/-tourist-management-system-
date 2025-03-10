import React from 'react';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';
import { green, red } from '@mui/material/colors';
import axios from 'axios';

const BookingsAccomondationTable = () => {
  const { data: book } = useFetch(`${BASE_URL}/accomondation/booking/getAll`);
  console.log(book);

  const handleCancel = async (Booking) => {
    console.log(`Booking ${Booking._id} cancelled.`); // Add cancel logic here

    try {

    const {data} = await axios.put(`http://localhost:8000/api/v1/accomondation/booking/${Booking.userId}`, {id: Booking._id})
    
    console.log(data);
    

      alert(`Booking ${Booking._id} has been cancelled.`);

    } catch (error) {

    }


  };

  return (
    <Paper sx={{ p: 4, maxWidth: 1200, margin: '20px auto', boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#007BFF', fontWeight: 'bold' }}>
        Accommodation Booking List
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: '#007BFF' }}>
            <TableRow>
              {['Booking ID', 'User ID', 'Accommodation ID', 'Check-In Date', 'Check-Out Date', 'Total Price', 'Status', 'Action'].map((head) => (
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
                <TableCell align="center" sx={{ color: booking.status === 'confirmed' ? green[500] : red[500], fontWeight: 'bold' }}>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default BookingsAccomondationTable;
