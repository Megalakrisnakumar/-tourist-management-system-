import React, { useState } from 'react'
import './dashboard.css'
import BookingTable from '../Booking/bookingTable'
import TourTable from '../Featured-tours/TourTable'
import AddTour from '../pages/AddTour'
import AccommodationTable from '../Accomondation/AccomondatinTable'
import BookingsAccomondationTable from '../Accomondation/BookingsAccomondationTable'
import AddAccommodation from '../Accomondation/AddAccomondation'
import Accommodations from '../Accomondation/Accomondations'

export default function Dashboard() {

  const [options, setOptions] = useState("dashboard")

  return (
    <>
  <div class="container-fluid">
    <div class="row">
      {/* <!-- Sidebar --> */}
      <div class="col-md-2 sidebar">
        <h4>HORIZON FREE</h4>
        <a href="#" class="active"><i class="fas fa-home"></i> Main Dashboard</a>
        <a href="#" onClick={()=>setOptions("Addtour")}>Add Tour</a>
        <a href="#" onClick={()=>setOptions("Bookings")}> Bookings</a>
        <a href="#" onClick={()=>setOptions("Tour")}> Tours</a>
        <a href="#" onClick={()=>setOptions("AccommodationTable")}> AccommodationList </a>
        <a href="#" onClick={()=>setOptions("BookingsAccomondationlist")}>AccommodationBookings</a>
        <a href="#" onClick={()=>setOptions("AddAccommodation")}>Add Accommodation</a>

        
        
        <div class="mt-5">
          <button class="btn btn-pro w-100">BackToHome</button>
        </div>
      </div>

      {/* <!-- Main Content --> */}
      <div class="col-md-10">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            </form>
            <div>
              <i class="fas fa-bell me-3"></i>
              <i class="fas fa-cog me-3"></i>
              <div class="btn btn-secondary rounded-circle">AP</div>
            </div>
          </div>
        </nav>

        <div class="container mt-4">
          <h4>Main Dashboard</h4>
    {
      options === "dashboard" ? (
        <>
          
          {/* <!-- Top Cards --> */}
          <div class="row my-4">
            <div class="col-md-3">
              <div class="card p-3">
                <h6>Total Booking</h6>
                <p>0</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card p-3">
                <h6>Total Tourist Places</h6>
                <p>$642.39</p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card p-3">
                <h6>Sales</h6>
                <p>$574.34 <span class="text-success">+23%</span></p>
              </div>
            </div>
            <div class="col-md-3">
              <div class="card p-3">
                <h6>Your Balance</h6>
                <p>$1,000</p>
              </div>
            </div>
          </div>

          {/* <!-- Middle Cards --> */}
          <div class="row my-4">
            <div class="col-md-6">
              <div class="card p-3">
                <h6>Total Spent</h6>
                <p>$37.5K <span class="text-success">+2.45%</span></p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card p-3">
                <h6>Weekly Revenue</h6>
                <div class="chart bg-light"></div>
              </div>
            </div>
          </div>
        </>
      ):null
    }

   {
      options === "Bookings" ? (
        <>
        <BookingTable/>
        </>
      ):null
    }


{
      options === "Tour" ? (
        <>
        <TourTable/>
        </>
      ):null
    }

    {
      options === "Addtour" ? (
        <>
        <AddTour/>
        </>
      ):null
    }

   {
      options === "AccommodationTable" ? (
        <>
          <AccommodationTable/>
        </>
      ):null
    }

   {
      options === "BookingsAccomondationlist" ? (
        <>
          <BookingsAccomondationTable/>
        </>
      ):null
    }
{
      options === "AddAccommodation" ? (
        <>
          <AddAccommodation/>
        </>
      ):null
    }

        </div>
      </div>
    </div>
  </div>
  
    </>
  )
}
