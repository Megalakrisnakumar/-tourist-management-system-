import express from 'express'
import { createBooking, deleteBooking, getAllBooking, getBooking, updateStausBooking } from '../controllers/bookingController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'
import { StatusupdateBooking } from '../controllers/booking.controller.js';

const router=express.Router()
//verifyUser
router.post("/" ,verifyUser, createBooking);
router.get("/:id" ,verifyUser, getBooking);
router.get("/",verifyAdmin ,getAllBooking);             //verifyAdmin
router.delete("/:id", verifyAdmin, deleteBooking);//verifyAdmin
router.put("/:id", updateStausBooking);//verifyAdmin



export default router
