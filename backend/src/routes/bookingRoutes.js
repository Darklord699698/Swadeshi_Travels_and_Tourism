import express from 'express';
import { sendReceipt, cancelBooking, updateBooking } from '../controllers/bookingController.js';

const router = express.Router();

// ONLY booking routes here
router.post('/send-receipt', sendReceipt);
router.post('/cancel-booking', cancelBooking);
router.post('/update-booking', updateBooking);
export default router;