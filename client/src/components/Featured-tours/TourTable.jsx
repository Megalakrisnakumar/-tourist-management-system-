import React, { useEffect, useState } from 'react'
import './tour.css'
import useFetch from '../../hooks/useFetch';
import { BASE_URL } from '../../utils/config';
import EditTour from './EditTour';
export default function TourTable() {

    const [page, setPage] = useState(0);

  const {data:tours,loading,error}=useFetch(`${BASE_URL}/tours?page=${page}`)

  const [editisOpen, setEditIsOpen] = useState(false);
  const [tourData, setTourData] = useState(null);
  const [tourid, setTourid] = useState(null);

  const close = ()=>{
    setEditIsOpen(false)
  }

  const tourDelete = async (e) => {
    console.log("click delete btn");
    
    const response = await fetch(`${BASE_URL}/tours/${e.target.value}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = response.json()

    if (response.ok) {
      window.location.reload();
      console.log(data);
      
    }
    else{
      console.log("Can'nt deleted");
      
    }

  }

  useEffect(()=>{

  },[tours])
 



  return (
    <>
     <div class="container mt-5">
    <div class="table-container">
      <h2 class="mb-4">Tour Details</h2>
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>City</th>
            <th>Address</th>
            <th>Distance (km)</th>
            <th>Photo</th>
            <th>Description</th>
            <th>Price ($)</th>
            <th>Max Group Size</th>
            <th>Featured</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* <!-- Example row data --> */}
         {
            tours?.map((tour, index) => (
                <tr key={tour._id}>
                    <td>{index + 1}</td>
                    <td>{tour.title}</td>
                    <td>{tour.city}</td>
                    <td>{tour.address}</td>
                    <td>{tour.distance}</td>
                    <td><img src={tour.photo} alt="tour" style={{width: "50px", height: "50px"}} /></td>
                    <td>{tour.description}</td>
                    <td>{tour.price}</td>
                    <td>{tour.maxGroupSize}</td>
                    <td>{tour.featured ? "Yes" : "No"}</td>
                    <td style={{display: "flex",gap: "10px"}}>
                    <button class="btn btn-warning" onClick={()=>{
                        
                        setTourData(tour);
                        setTourid(tour._id);
                        setEditIsOpen(true);
                    }} >Edit</button>
                    <button class="btn btn-danger" value={tour._id} onClick={tourDelete} >Delete</button>
                    </td>
                </tr>
            ))
         }

          {/* <!-- Repeat rows for more data --> */}
        </tbody>
      </table>
    </div>
  </div>

  {
    editisOpen?<EditTour id={tourid} data={tourData} close={close} />:null
  }
    </>
  )
}
