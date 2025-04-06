import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  message: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Enquiry", enquirySchema);
