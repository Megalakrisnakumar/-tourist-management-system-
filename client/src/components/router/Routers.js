import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './../pages/Home'
import Tours from './../pages/Tours'
import TourDetails from './../pages/TourDetails'
import Login from './../pages/Login'
import Register from './../pages/Register'
import SearchResultList from './../pages/SearchResultList'
import ThankYou from '../pages/ThankYou'
import AddTour from '../pages/AddTour'
import Dashboard from '../Dashboard/Dashboard'
import AccBookingPage from '../Accomondation/Accomondationdetails'
import { AuthContext } from '../../context/AuthContext'
import AdminRegister from '../pages/adminregister'
import UnauthorizedPage from '../pages/unauthorized'
import AddPackages from '../Admin/AddPackages'
import PackageAdminDashboard from '../Admin/AdminDashboard'
import UpdatePackage from '../Admin/UpdatePackage'
import Package from '../packages/Package'
import PackageBooking from '../packages/Booking'
import Profile from '../pages/Profile'
import AllPackages from '../Admin/AllPackages'
import Packages from '../pages/Packeges'
import Search from '../pages/search'
import MyBookingPage from '../Booking/mybooking'
import Accommodations from '../Accomondation/Accomondations'
// import { Search } from '@mui/icons-material'



const Routers = () => {

  const { user, dispatch } = useContext(AuthContext)

  console.log(user);



  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/profile/user' element={<Profile />} />
      <Route path='/tours' element={<Tours />} />
      <Route path='/tours/:id' element={<TourDetails />} />
      <Route path='/book/:id' element={<AccBookingPage />} />
      <Route path='/mytourbookings' element={<MyBookingPage/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/thank-you' element={<ThankYou />} />
      <Route path='/tours/search' element={<SearchResultList />} />
      <Route path='/packages' element={<Packages />} />
      <Route path='/accommodations' element={ <Accommodations />} />
      
      <Route path="/search" element={<Search />} />


      {/* admin routes */}
      <Route path='/admin/register' element={<AdminRegister />} />
      {
        user?.role === "admin" ? <Route path='/dashboard' element={<Dashboard />} /> : null
      }
      <Route path="admin/update-package/:id" element={<UpdatePackage />} />
      <Route path="/package/:id" element={<Package />} />
      <Route path="/booking/:id" element={<PackageBooking />} />
      
    
      {/* PackageAdminDashboard */}
      <Route path='/*' element={<UnauthorizedPage />} />

    </Routes>
  )
}

export default Routers
