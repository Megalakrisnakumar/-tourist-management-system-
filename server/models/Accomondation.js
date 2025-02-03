
import mongoose from 'mongoose'

import { v4 as uuidv4 } from 'uuid';

const accommodationSchema = new mongoose.Schema({
  accommodationId: {
    type: String,
    default: function () {
      return uuidv4(); // Automatically generates a unique ID
    },
    unique:  true,
  },
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  pricePerNight: {
    type: Number,
    required: true,
    min: 0,
  },
  availableRooms: {
    type: Number,
    required: true,
    min: 0,
  },
  amenities: {
    type: [String],
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
}, { timestamps: true });

const Accommodation = mongoose.model('Accommodation', accommodationSchema);

export default Accommodation;

