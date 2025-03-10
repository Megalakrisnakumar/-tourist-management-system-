import express from "express";
import  {CancebookingSpecificUser, CreateAccommodation, CreateAccomondationBooking, DeleteAccommodation, GetAccommodationById, GetAllAccommodations, GetAllAccommodationsbookings, GetbookingSpecificUser } from "../controllers/AccomondationController.js";
import multer from 'multer';
import upload from "../Middleware/fileupload.js";

// file upload 


const router=express.Router();

router.post('/create',upload.single("image"),CreateAccommodation);
router.delete("/:id",DeleteAccommodation)
router.get("/getAll",GetAllAccommodations)
router.get("/:id",GetAccommodationById)


// Accomondation boooking  


router.post('/booking/create',CreateAccomondationBooking);
router.get('/booking/getAll',GetAllAccommodationsbookings)
router.get('/booking/:id',GetbookingSpecificUser)
router.put('/booking/:id',CancebookingSpecificUser)


export default router
