import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import BookNow from "./components/BookNow";
import Header from "./components/Header";
import Contact from "./components/Contact"; // 1. Import your new Contact component

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/book" element={<BookNow />} />
        
        {/* 2. Add the route for the contact page */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;