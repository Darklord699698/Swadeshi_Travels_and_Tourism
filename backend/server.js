import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookingRoutes from './src/routes/bookingRoutes.js';
import contactRoutes from "./src/routes/contactRoutes.js";

dotenv.config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

const app = express();

if (!process.env.RESEND_API_KEY) {
  console.error("❌ Missing required environment variables");
  process.exit(1);
}

app.use(cors({
  origin: [
    'https://swadeshi-travels-frontend.onrender.com',
    'http://localhost:5173'
  ],
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.use('/api', bookingRoutes);
app.use('/api', contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 API Server running on port ${PORT}`);
});