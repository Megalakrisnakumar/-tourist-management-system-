
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid';

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    default: function () {
      return uuidv4(); 
    },
    unique:  true,
  },
  userId: {
    type: String,
    required: true,
  },
  accommodationId: {
    type: String,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    required: true,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed',
  },
}, { timestamps: true });

const AccBooking = mongoose.model('AccBooking', bookingSchema);

export default AccBooking;


