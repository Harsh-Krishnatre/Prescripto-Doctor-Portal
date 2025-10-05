import React, { useState, useContext, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

// Reusable component for the profile action links
const ProfileLinks = ({ onLinkClick, Logout }) => {
  const navigate = useNavigate();
  return (
    <>
      <li onClick={() => { navigate("my-profile"); onLinkClick(); }} className="cursor-pointer p-2 hover:bg-slate-200 rounded-md">
        My Profile
      </li>
      <li onClick={() => { navigate("my-appointments"); onLinkClick(); }} className="cursor-pointer p-2 hover:bg-slate-200 rounded-md">
        My Appointments
      </li>
      <hr className="my-2 border-gray-300" />
      <li onClick={() => { Logout(); onLinkClick(); }} className="cursor-pointer p-2 hover:bg-slate-200 rounded-md">
        Logout
      </li>
    </>
  );
};

// Main Navbar Component
const Navbar = () => {
  const navigate = useNavigate();
  const { uToken, setUToken, userData } = useContext(AppContext);
  const [showMenu, setShowMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  const Logout = () => {
    setUToken("");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Prescripto"
        onClick={() => {
          navigate("/");
          window.scrollTo(0, 0);
        }}
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-center gap-5 font-medium">
        <NavLink to="/" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "border-b-2 border-transparent"}>
          <li className="py-1 cursor-pointer">HOME</li>
        </NavLink>
        <NavLink to="/doctors" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "border-b-2 border-transparent"}>
          <li className="py-1 cursor-pointer">ALL DOCTORS</li>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "border-b-2 border-transparent"}>
          <li className="py-1 cursor-pointer">ABOUT</li>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? "text-primary border-b-2 border-primary" : "border-b-2 border-transparent"}>
          <li className="py-1 cursor-pointer">CONTACT</li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center">
          {uToken && userData ? (
            <div className="relative" ref={dropdownRef}>
              <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="flex items-center gap-2 cursor-pointer">
                <img
                  src={userData.image}
                  alt="profile"
                  className="w-8 h-8 object-cover rounded-full"
                />
                <img
                  src={assets.dropdown_icon}
                  alt=""
                  className={`w-2.5 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
                />
              </div>

              <ul className={`absolute top-full right-0 mt-3 ${isMenuOpen ? 'block' : 'hidden'} text-base font-medium text-gray-600 z-50 bg-white shadow-lg rounded-lg w-52 p-3`}>
                <ProfileLinks onLinkClick={() => setIsMenuOpen(false)} Logout={Logout} />
              </ul>
            </div>
          ) : (
            <button
              className="bg-primary text-white px-8 py-2 rounded-full font-medium cursor-pointer hover:bg-primary/90 transition-colors"
              type="button"
              onClick={() => navigate("/login")}
            >
              Login / SignUp
            </button>
          )}
        </div>

        {/* --- Mobile Menu Code (No changes needed here) --- */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />
        <div className={`md:hidden fixed top-0 right-0 h-full w-full max-w-xs bg-white z-40 transition-transform duration-300 ease-in-out shadow-xl ${showMenu ? "translate-x-0" : "translate-x-full"}`}>
          {/* ...your existing mobile menu code... */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;