import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      required: true,
    },
    fromplace: {
      type: String,
    },
    distance: {
      type: String,
    },
    transport: {
      type: String,

    },
    accommodation: {
      type: String,
    },
    food: {
      type: String,
    }
    ,
    guide: {
      type: String,
    },
    localtransport: {
      type: String,

    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    TotalPrice: {
      type: Number,
    },
    bookAt: {
      type: Date,
      required: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
