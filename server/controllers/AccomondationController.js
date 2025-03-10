import { sendAccomondationEmail } from "../Middleware/email.js";
import Accommodation from "../models/Accomondation.js";

import AccBooking from "../models/AccomondationBooking.js";
import User from "../models/User.js";

export const CreateAccommodation = async (req, res) => {

 


  const accommodationData = {
    name: req.body.name,
    location: req.body.location,
    pricePerNight: req.body.pricePerNight,
    availableRooms: req.body.availableRooms,
    amenities: req.body.amenities.split(','), // Convert string to array
    images: req.file.filename, // Save file names in the database
  };

  try {
    const newAccommodation = new Accommodation(accommodationData);
    await newAccommodation.save();
    res.status(201).json({
      success: true,
      message: "Accommodation Added Succesfully",
      data: newAccommodation
    });
  } catch (err) {
  
    res.status(400).send(err);

  }
}



export const DeleteAccommodation = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the accommodation by its ID and delete it
    const deletedAccommodation = await Accommodation.findByIdAndDelete(id);

    if (!deletedAccommodation) {
      return res.status(404).json({
        success: false,
        message: "Accommodation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Accommodation deleted successfully",
      data: deletedAccommodation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete accommodation",
      error: err.message,
    });
  }
};


export const GetAllAccommodations = async (req, res) => {
  try {
    const accommodations = await Accommodation.find();
    res.status(200).json({
      success: true,
      message: "Accommodations retrieved successfully",
      data: accommodations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve accommodations",
      error: err.message,
    });
  }
};

export const GetAccommodationById = async (req, res) => {
  try {
    const { id } = req.params;

    const accommodation = await Accommodation.findById(id);

    if (!accommodation) {
      return res.status(404).json({
        success: false,
        message: "Accommodation not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Accommodation retrieved successfully",
      data: accommodation,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve accommodation",
      error: err.message,
    });
  }
};

// accomondation Booking controllers 

export const CreateAccomondationBooking = async (req, res) => {
  try {
    // Extract booking details from the request body
    const { userId, accommodationId, checkInDate, checkOutDate, totalPrice } = req.body;


    // Auto-generate bookingId (if required, handled in schema middleware)
    const newBooking = new AccBooking({
      userId,
      accommodationId,
      checkInDate,
      checkOutDate,
      totalPrice,
    });

    // Save the booking to the database
    await newBooking.save();

    const user=await User.findById(userId)

       await sendAccomondationEmail(user.email,newBooking)

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: newBooking,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Error creating booking',
      error: err.message,
    });
  }
};

export const GetAllAccommodationsbookings = async (req, res) => {


  try {
    const accommodations = await AccBooking.find();
    res.status(200).json({
      success: true,
      message: "Accommodations bookings successfully",
      data: accommodations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve accommodations bookings",
      error: err.message,
    });
  }
};

export const GetbookingSpecificUser = async (req, res) => {

  const id = req.params.id

  try {
    const accommodations = await AccBooking.find({ userId: id });
    res.status(200).json({
      success: true,
      message: "Accommodations bookings successfully",
      data: accommodations,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve accommodations bookings",
      error: err.message,
    });
  }
};



export const CancebookingSpecificUser = async (req, res) => {

  const id = req.params.id
  const bid = req.body.id

  try {
    const accommodations = await AccBooking.findOne({ userId: id, _id: bid });

    accommodations.status = "cancelled";
    await accommodations.save()

    res.status(200).json({
      success: true,
      message: "Accommodations canceled successfully",
      data: accommodations,
    });
  } catch (err) {

    console.log(err);


    res.status(500).json({
      success: false,
      message: "Failed to retrieve accommodations bookings",
      error: err.message,
    });
  }
};









