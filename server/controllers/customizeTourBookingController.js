import { sendConfirmEmailCustomized } from '../Middleware/email.js';
import CustomizeTourBooking  from '../models/customize-tour.js';
import User from '../models/User.js';

// Create a new customized tour booking
export const createBooking = async (req, res) => {
  try {
    const booking = new CustomizeTourBooking(req.body);
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating customized tour booking', error });
  }
};

// Get all customized tour bookings
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await CustomizeTourBooking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

// Get a booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await CustomizeTourBooking.find({userId:req.params.id});
  
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error });
  }
};

// Update a booking
export const updateBooking = async (req, res) => {
  try {
    const updated = await CustomizeTourBooking.findByIdAndUpdate(req.params.id);

    const { status } = req.body;
     updated.status=status
    await updated.save();
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: 'Error updating booking', error });
  }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
  try {
    await CustomizeTourBooking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
};



// Create a new customized tour booking
export const sendConfirmMail = async (req, res) => {
  try {
   
    const { bookingId } = req.body;
    const booking = await CustomizeTourBooking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // Send confirmation email logic here (e.g., using nodemailer)
    // await sendEmail(booking.userEmail, 'Booking Confirmation', 'Your booking is confirmed!');

    const user=await User.findById(booking.userId)

    if (!user) return res.status(404).json({ message: 'User not found' });

await sendConfirmEmailCustomized(user.email, booking);

    res.status(200).json({ message: 'Confirmation email sent successfully' });
  
  } catch (error) {
    res.status(500).json({ message: 'Error creating customized tour booking', error });
  }
};



// value first input console

