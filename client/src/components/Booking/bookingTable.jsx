import React from 'react'
import './booking.css'
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';

export default function BookingTable() {


    const {data} = useFetch(`${BASE_URL}/booking`);

    console.log(data);

    const deleteBooking =  (id) => {
        console.log(id);

        fetch(`${BASE_URL}/booking/${id}`, {
            method:"delete",
            credentials:'include'
        }).then(res => {
            if(res.ok){
                alert('Booking Deleted Successfully');
                window.location.reload();
            }
        })

    }
    


  return (
    <>
      <div class="container mt-5">
    <div class="table-container">
      <h2 class="mb-4">Booking Details</h2>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>User ID</th>
            <th>Email</th>
            <th>Tour Name</th>
            <th>Full Name</th>
            <th>Guests</th>
            <th>Phone</th>
            <th>Booking Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- Example row data --> */}
          {
            data?.map((booking, index) => (
              <tr key={booking._id}>
                <td>{index + 1}</td>
                <td>{"U12345"+index}</td>
                <td>{booking.userEmail}</td>
                <td>{booking.tourName}</td>
                <td>{booking.fullName}</td>
                <td>{booking.guestSize}</td>
                <td>{booking.phone}</td>
                <td>{booking.bookAt}</td>
                <td>
                  <button class="btn btn-sm btn-danger" onClick={()=>deleteBooking(booking._id)} >Delete</button>
                </td>
              </tr>
            ))
          }
          {/* <!-- Repeat rows for more data --> */}
        </tbody>
      </table>
    </div>
        </div>
    </>
  )
}
