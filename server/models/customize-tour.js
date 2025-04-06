import mongoose  from'mongoose';

const customizeTourBookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tourDetails: {
    title: String,
    destination: String,
    startDate: Date,
    endDate: Date,
    activities: [String]
  },
  primaryGuests: [
    {
      name: String,
      age: String
    }
  ],
  managedGuest: {
    name: String,
    email: String,
    phone: String
  },
  transportDetails: {
    transportType: String,
    pickupLocation: String,
    dropLocation: String,
    preferredTime: String,
    localTransport: String,
    localPickup: String
  },
  accommodation: {
    roomType: String,
    sharingType: String,
    acType: String,
    membersCount: Number
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Completed', 'Failed'],
    default: 'Pending'
  },
  totalAmount: Number
}, {
  timestamps: true
});


const CustomizeTourBooking=mongoose.model('CustomizeTourBooking', customizeTourBookingSchema);

export default CustomizeTourBooking
