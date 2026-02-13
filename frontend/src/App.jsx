import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Main from "./components/Main";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Review from "./components/Review";
import Booking from "./components/Booking";
import BookingPage from "./components/BookingPage"; // Import your new full-page component

const App = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  // Function to handle redirection to the full booking page
  const handleBookNowClick = (pkg) => {
    setSelectedPackage(pkg);
    navigate("/booking-details"); // Navigate to the new whole-page route
  };

  return (
    <div className="relative">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/review" element={<Review />} />
        
        {/* Pass the redirection function to the Booking list component */}
        <Route 
          path="/book" 
          element={<Booking onOpenBookForm={handleBookNowClick} />} 
        />
        
        {/* New Route for the dedicated Booking Page */}
        <Route 
          path="/booking-details" 
          element={<BookingPage packageData={selectedPackage} />} 
        />
        
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default App;