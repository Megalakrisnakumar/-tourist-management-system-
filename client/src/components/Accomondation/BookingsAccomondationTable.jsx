import React from 'react';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

const BookingsAccomondationTable = () => {
  // Sample booking data

  const { data:book } = useFetch(`${BASE_URL}/accomondation/booking/getAll`);
  console.log(book);

  // booking
  const bookings = [
    {
      bookingId: 'B001',
      userId: 'U001',
      accommodationId: 'A001',
      checkInDate: '2025-01-10',
      checkOutDate: '2025-01-15',
      totalPrice: 5000,
      status: 'confirmed',
    },
    {
      bookingId: 'B002',
      userId: 'U002',
      accommodationId: 'A002',
      checkInDate: '2025-02-01',
      checkOutDate: '2025-02-05',
      totalPrice: 3000,
      status: 'cancelled',
    },
    {
      bookingId: 'B003',
      userId: 'U003',
      accommodationId: 'A003',
      checkInDate: '2025-03-10',
      checkOutDate: '2025-03-15',
      totalPrice: 4500,
      status: 'confirmed',
    },
  ];

  // container 
  const container= {
    padding: "30px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "1200px",
    margin: "auto",
    marginTop: "20px"
}

  // Inline styles
  const tableStyle = {
    width: '90%',
    margin: '30px auto',
    borderCollapse: 'collapse',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif',
  };

  const thStyle = {
    backgroundColor: '#007BFF',
    color: '#fff',
    textAlign: 'center',
    padding: '15px',
    border: '1px solid #ddd',
    fontWeight: 'bold',
  };

  const tdStyle = {
    padding: '12px',
    border: '1px solid #ddd',
    textAlign: 'center',
    fontSize: '14px',
  };

  const rowStyle = {
    backgroundColor: '#f9f9f9',
  };

  const alternateRowStyle = {
    backgroundColor: '#e9ecef',
  };

  const hoverStyle = {
    transition: 'background-color 0.3s ease',
  };

 const  header= {
    textAlign: "center",
    color: "#333",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "32px",
    marginBottom: "20px",
}

  const statusStyle = (status) => ({
    color: status === 'confirmed' ? '#28a745' : '#dc3545',
    fontWeight: 'bold',
  });

  return (
     <div style={container}>
        <h1 style={header}>Accoomondation Booking List </h1>
          <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>Booking ID</th>
          <th style={thStyle}>User ID</th>
          <th style={thStyle}>Accommodation ID</th>
          <th style={thStyle}>Check-In Date</th>
          <th style={thStyle}>Check-Out Date</th>
          <th style={thStyle}>Total Price</th>
          <th style={thStyle}>Status</th>
        </tr>
      </thead>
      <tbody>
        {book?.map((booking, index) => (
          <tr
            key={booking.bookingId}
            style={{
              ...hoverStyle,
              ...(index % 2 === 0 ? rowStyle : alternateRowStyle),
            }}
          >
            <td style={tdStyle}>{booking.bookingId}</td>
            <td style={tdStyle}>{booking.userId}</td>
            <td style={tdStyle}>{booking.accommodationId}</td>
            <td style={tdStyle}>{booking.checkInDate}</td>
            <td style={tdStyle}>{booking.checkOutDate}</td>
            <td style={tdStyle}>${booking.totalPrice}</td>
            <td style={{ ...tdStyle, ...statusStyle(booking.status) }}>
              {booking.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
     </div>
  );
};

export default BookingsAccomondationTable;
