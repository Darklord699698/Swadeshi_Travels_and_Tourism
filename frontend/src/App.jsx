import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Main from "./components/Main";
import Header from "./components/Header";
import Contact from "./components/Contact";
import Review from "./components/Review";
import Booking from "./components/Booking";
import BookingPage from "./components/BookingPage";
import YourTrip from "./components/YourTrip";
import About from "./components/About"; // 1. Import the new About component

const App = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const navigate = useNavigate();

  const handleBookNowClick = (pkg) => {
    setSelectedPackage(pkg);
    navigate("/booking-details");
  };

  return (
    <div className="relative">
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/review" element={<Review />} />
        <Route path="/yourtrip" element={<YourTrip />} />
        
        {/* 2. Add the About/Impact Route here */}
        <Route path="/about" element={<About />} />
        
        <Route 
          path="/book" 
          element={<Booking onOpenBookForm={handleBookNowClick} />} 
        />
        
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