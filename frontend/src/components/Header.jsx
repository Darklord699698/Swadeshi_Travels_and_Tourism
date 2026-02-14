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
    <header className="fixed top-0 left-0 right-0 bg-[#020617]/90 backdrop-blur-md z-[1000] flex items-center justify-between px-[7%] py-8 border-b border-white/10">
      
      {/* Left Section: Menu & Logo */}
      <div className="flex items-center">
        <div
          id="menu-bar"
          className={`fas ${menuActive ? "fa-times" : "fa-bars"} text-white text-3xl cursor-pointer lg:hidden mr-6 transition-all duration-300`}
          onClick={() => setMenuActive(!menuActive)}
        ></div>

        <Link to="/" className="flex items-baseline gap-1 text-4xl font-black tracking-tighter uppercase">
          <span className="text-[#FF9933]">BHA</span>
          <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">RAT</span>
          <span className="text-[#138808]">TRAILS</span>
        </Link>
      </div>

      {/* Right Section: Navbar and Icons */}
      <div className="flex items-center space-x-10">
        
        {/* Navbar */}
        <nav className={`
  absolute top-full left-0 right-0 bg-[#020617] border-b border-white/10 flex flex-col p-8 space-y-6 transition-all duration-300 origin-top
  lg:static lg:bg-transparent lg:border-none lg:flex-row lg:space-y-0 lg:p-0 lg:space-x-8 lg:scale-y-100
  ${menuActive ? "scale-y-100" : "scale-y-0 lg:scale-y-100"}
`}>
  {/* Change inside the map function in Header.jsx */}
{['home', 'bookings', 'yourtrip', 'review','gallery','contact', 'About Us'].map((item) => (
  <Link 
    key={item}
    to={item === 'home' ? '/' :
    item === 'bookings' ? '/book' :
     `/${item}`} 
    onClick={() => setMenuActive(false)}
    className="text-2xl font-medium text-white capitalize transition-all hover:text-orange-500 hover:scale-105"
  >
    {item === 'yourtrip' ? 'Your Trips' : item} {/* Makes the menu look cleaner */}
  </Link>
))}
</nav>
        {/* Login / User Icon */}
        <div className="flex items-center">
          <SignedOut>
            <SignInButton mode="modal">
              <div className="flex items-center justify-center transition-all border shadow-lg cursor-pointer w-14 h-14 rounded-xl bg-white/5 border-white/10 hover:bg-orange-600 hover:border-orange-600 group">
                <i className="text-3xl text-white transition-transform fas fa-user group-hover:scale-110"></i>
              </div>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            {/* Removed the wrapping div and orange border classes */}
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: {
                    width: "36px",
                    height: "36px",
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