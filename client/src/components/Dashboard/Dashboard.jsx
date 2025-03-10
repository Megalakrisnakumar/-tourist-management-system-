import React, { useState } from 'react'
import './dashboard.css'
import BookingTable from '../Booking/bookingTable'
import TourTable from '../Featured-tours/TourTable'
import AddTour from '../pages/AddTour'
import AccommodationTable from '../Accomondation/AccomondatinTable'
import BookingsAccomondationTable from '../Accomondation/BookingsAccomondationTable'
import AddAccommodation from '../Accomondation/AddAccomondation'
import Accommodations from '../Accomondation/Accomondations'
import AdminDashboard from './adminDashboard'

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
          
         <AdminDashboard/>
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
