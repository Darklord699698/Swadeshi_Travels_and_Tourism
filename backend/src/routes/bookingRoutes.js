import express from 'express';
import { sendReceipt } from '../controllers/bookingController.js';
import { handleContactForm } from '../controllers/contactController.js'; // Import new controller

const router = express.Router();

// Existing Booking Route
router.post('/send-receipt', sendReceipt);

// NEW Contact Route (Matches your frontend fetch call)
router.post('/enquiry', handleContactForm); 

export default router;