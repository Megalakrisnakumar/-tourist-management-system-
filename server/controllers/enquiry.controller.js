import Enquiry from "../models/enquiry.model.js";

export const createEnquiry = async (req, res) => {
  try {
    const enquiry = new Enquiry(req.body);
    await enquiry.save();
    res.status(201).json({ message: "Enquiry submitted successfully", enquiry });
  } catch (error) {
    console.error("Enquiry submission error:", error);
    res.status(500).json({ message: "Error submitting enquiry", error });
  }
};


// Get all enquiries
export const getAllEnquiries = async (req, res) => {
    try {
      const enquiries = await Enquiry.find().sort({ createdAt: -1 });
      res.status(200).json(enquiries);
    } catch (error) {
      res.status(500).json({ message: "Error fetching enquiries", error });
    }
  };
  
  // Delete enquiry by ID
  export const deleteEnquiry = async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Enquiry.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Enquiry not found" });
      }
      res.status(200).json({ message: "Enquiry deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting enquiry", error });
    }
  };
  