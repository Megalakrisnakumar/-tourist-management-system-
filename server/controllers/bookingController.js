import { sendAccomondationEmail } from "../Middleware/email.js";
import Booking from "../models/Booking.js";
import Tour from "../models/Tour.js";


export const createBooking = async (req, res) => {




    const tourCount = await Tour.findOne({ title: req.body.tourName })


    if (tourCount.maxGroupSize < req.body.guestSize) {
        return res.status(400).json({ message: ` only  ${tourCount.maxGroupSize} members allowed ` })
    }


    const newBooking = new Booking(req.body)



    try {

        const savedBooking = await newBooking.save();

        // const tourCount = await Tour.findOne({title:newBooking.tourName})

        console.log(tourCount);

        tourCount.maxGroupSize -= req.body.guestSize

        await tourCount.save()




        sendAccomondationEmail(newBooking.userEmail, newBooking)
        res.status(200).json({
            success: true, message: 'Your tour is booked',
            data: savedBooking
        })


    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'internal server error' })
    }
}

//get single booking
export const getBooking = async (req, res) => {

    const id = req.params.id

    try {
        const book = await Booking.findById(id)
        res.status(200).json({
            success: true, message: 'successful',
            data: book
        });
    } catch (err) {
        console.log(err);
        res.status(404).json({ success: false, message: 'not found' })
    }
};


//get all booking
export const getAllBooking = async (req, res) => {

    try {
        const books = await Booking.find();
        res.status(200).json({
            success: true, message: 'successful',
            data: books
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'internal server error' })
    }
}

export const deleteBooking = async (req, res) => {

    const id = req.params.id
    try {
        await Booking.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'deleted successfully' })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: 'internal server error' })
    }


}

