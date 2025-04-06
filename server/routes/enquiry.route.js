import express from "express";
import { createEnquiry, deleteEnquiry, getAllEnquiries } from "../controllers/enquiry.controller.js";

const router = express.Router();

router.post("/enquiry", createEnquiry);
router.get("/enquiries", getAllEnquiries);
router.delete("/enquiry/:id", deleteEnquiry);

export default router;
