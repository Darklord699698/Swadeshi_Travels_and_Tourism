import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import BookNow from "./components/BookNow";
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/book" element={<BookNow />} />
        

      </Routes>
    </>
  );
};

export default App;
