import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  orderId: String,
  tripName: String,
  fullName: String,
  email: String,
  phone: String,
  age: String,
  city: String,
  state: String,
  pincode: String,
  travelDate: String,
  bookedDate: String,
  userEmail: String,
  total: Number,
  breakdown: {
    homestay: String,
    guide: String,
    farmers: String,
    platform: String
  },
  additionalTravelers: Array,
  status: { type: String, default: 'In Progress' }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema, 'Bharat_Trails');