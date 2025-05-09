import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    packageDetails: {
      type: mongoose.ObjectId,
      ref: "Package",
      required: true,
    },
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    persons: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Booking = mongoose.model("PackageBooking", bookingSchema);

export default Booking;
