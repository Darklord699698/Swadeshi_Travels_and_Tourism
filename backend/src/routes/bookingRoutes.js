import express from 'express';
import { sendReceipt } from '../controllers/bookingController.js';

const router = express.Router();

// Define the endpoint
router.post('/send-receipt', sendReceipt);

export default router;