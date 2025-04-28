import React from 'react';
import './booking.css';
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

export default function BookingTable() {

  const { data, refetch } = useFetch(`${BASE_URL}/booking`);

  const deleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      fetch(`${BASE_URL}/booking/${id}`, {
        method: "delete",
        credentials: 'include'
      }).then(res => {
        if (res.ok) {
          alert('Booking Deleted Successfully');
          window.location.reload();
        }
      });
    }
  };

  const handleStatusChange = (id, newStatus) => {
    fetch(`${BASE_URL}/booking/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ status: newStatus })
    }).then(res => {
      if (res.ok) {
        alert('Booking status updated');
       // Assuming your useFetch supports refetch, otherwise use window.location.reload();
      }
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'table-warning';
      case 'confirmed':
        return 'table-success';
      case 'cancelled':
        return 'table-danger';
      default:
        return '';
    }
  };

  return (
    <div className="container mt-5">
      <div className="table-container shadow p-4 rounded bg-white">
        <h2 className="mb-4 text-center text-primary">Booking Details</h2>
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Email</th>
                <th>Tour Name</th>
                <th>From Place</th>
                <th>Distance</th>
                <th>Transport</th>
                <th>Accommodation</th>
                <th>Food</th>
                <th>Guide</th>
                <th>Local Transport</th>
                <th>Full Name</th>
                <th>Guests</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Booking Date</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ? (
                data.map((booking, index) => (
                  <tr key={booking._id} className={`fade-in ${getStatusColor(booking.status)}`}>
                    <td>{index + 1}</td>
                    <td>{"U12345" + index}</td>
                    <td>{booking.userEmail}</td>
                    <td>{booking.tourName}</td>
                    <td>{booking.fromplace}</td>
                    <td>{booking.distance}</td>
                    <td>{booking.transport}</td>
                    <td>{booking.accommodation}</td>
                    <td>{booking.food}</td>
                    <td>{booking.guide}</td>
                    <td>{booking.localtransport}</td>
                    <td>{booking.fullName}</td>
                    <td>{booking.guestSize}</td>
                    <td>{booking.phone}</td>
                    <td>
                      <select
                        value={booking.status}
                        className="form-select form-select-sm"
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td>{new Date(booking.bookAt).toLocaleDateString()}</td>
                    <td>{booking.TotalPrice ? `₹${booking.TotalPrice}` : '-'}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteBooking(booking._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="18" className="text-center p-4">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
