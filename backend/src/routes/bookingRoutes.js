import express from 'express';
import { sendReceipt } from '../controllers/bookingController.js';

const router = express.Router();

// ONLY booking routes here
router.post('/send-receipt', sendReceipt);

export default router;