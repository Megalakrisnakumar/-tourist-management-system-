import express from 'express'
const router=express.Router()
import  { createBooking, deleteBooking, getAllBookings, getBookingById, updateBooking }  from '../controllers/customizeTourBookingController.js'

router.post('/', createBooking);
router.get('/', getAllBookings);
router.get('/:id',getBookingById);
router.put('/:id', updateBooking);
router.delete('/:id', deleteBooking);

export default router;    
