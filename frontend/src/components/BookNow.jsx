import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BookNow() {
  const navigate = useNavigate(); // Initialize the navigation hook
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [hotelType, setHotelType] = useState("Standard");

  const basePrice = 15000;
  const hotelUpgrade =
    hotelType === "Deluxe" ? 2000 : hotelType === "Premium" ? 4000 : 0;

  const totalPrice =
    adults * (basePrice + hotelUpgrade) +
    children * (basePrice * 0.5 + hotelUpgrade);

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the browser from reloading the page
    
    // Logic for what happens after booking (e.g., API call)
    console.log("Booking Details:", { adults, children, hotelType, totalPrice });

    // Redirect the user to the home page or a success page
    alert("Booking Confirmed!");
    navigate("/"); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-20 bg-gradient-to-br from-orange-50 to-orange-100">
      
      <div className="w-full max-w-3xl p-10 bg-white shadow-2xl rounded-3xl">

        {/* Heading */}
        <h1 className="mb-8 text-4xl font-bold text-center text-gray-800">
          Book Your Trip
        </h1>

        {/* Added onSubmit handler here */}
        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Name */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 transition border outline-none rounded-xl focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 transition border outline-none rounded-xl focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Travel Date */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Travel Date
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 transition border outline-none rounded-xl focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          {/* Guests Grid */}
          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Adults
              </label>
              <input
                type="number"
                value={adults}
                min="1"
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full px-4 py-3 border outline-none rounded-xl focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Children
              </label>
              <input
                type="number"
                value={children}
                min="0"
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full px-4 py-3 border outline-none rounded-xl focus:ring-2 focus:ring-orange-400"
              />
            </div>

          </div>

          {/* Hotel Type */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Hotel Type
            </label>
            <select
              value={hotelType}
              onChange={(e) => setHotelType(e.target.value)}
              className="w-full px-4 py-3 border outline-none rounded-xl focus:ring-2 focus:ring-orange-400"
            >
              <option value="Standard">Standard</option>
              <option value="Deluxe">Deluxe (+₹2000)</option>
              <option value="Premium">Premium (+₹4000)</option>
            </select>
          </div>

          {/* Price Box */}
          <div className="p-6 text-center border border-orange-200 bg-orange-50 rounded-xl">
            <h2 className="text-2xl font-bold text-orange-600">
              Total Price: ₹{totalPrice.toLocaleString()}
            </h2>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full py-3 text-lg font-semibold text-white transition duration-300 bg-orange-500 shadow-md hover:bg-orange-600 rounded-xl"
          >
            Confirm Booking
          </button>

        </form>
      </div>
    </div>
  );
}

export default BookNow;