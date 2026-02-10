import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#333] z-50 flex items-center justify-between px-[9%] py-8">
      
      {/* Left Section: Menu & Logo */}
      <div className="flex items-center">
        <div
          id="menu-bar"
          className={`fas fa-bars ${menuActive ? "fa-times" : ""} text-white text-3xl cursor-pointer md:hidden mr-4`}
          onClick={() => setMenuActive(!menuActive)}
        ></div>

        <Link to="/" className="logo">
          <span>B</span>harat <span>T</span>rails
        </Link>
      </div>

      {/* Right Section: Navbar and Icons grouped together */}
      <div className="flex items-center space-x-12">
        
        {/* Navbar */}
        <nav className={`navbar flex items-center space-x-8 ${menuActive ? "active" : ""}`}>
          <Link to="/" className="text-2xl text-white transition hover:text-orange-400">home</Link>
          <Link to="/book" className="text-2xl text-white transition hover:text-orange-400">book</Link>
          <a href="#packages" className="text-2xl text-white transition hover:text-orange-400">packages</a>
          <a href="#services" className="text-2xl text-white transition hover:text-orange-400">services</a>
          <a href="#gallery" className="text-2xl text-white transition hover:text-orange-400">gallery</a>
          <a href="#review" className="text-2xl text-white transition hover:text-orange-400">review</a>
          <a href="#contact" className="text-2xl text-white transition hover:text-orange-400">contact</a>
        </nav>

        {/* Login / User Icon */}
        <div className="flex items-center icons">
          <SignedOut>
            <SignInButton mode="modal">
              <i
                className="fas fa-user"
                style={{
                  cursor: "pointer",
                  color: "#fff",
                  fontSize: "2.5rem",
                }}
              ></i>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    width: "40px",
                    height: "40px",
                  },
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;