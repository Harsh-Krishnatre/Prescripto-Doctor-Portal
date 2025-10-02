import React, { useState, useContext } from "react";
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
      <hr className="my-2 border-gray-300"/>
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

  const Logout = () => {
    setUToken(false);
    navigate('/');
    localStorage.removeItem('uToken');
  };

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
        {/* Desktop User Actions */}
        <div className="hidden md:flex items-center">
          {uToken && userData ? (
            <div className="group relative">
              <div className="flex items-center gap-2 cursor-pointer">
                <img src={userData.image} alt="profile" className="w-8 h-8 object-cover rounded-full" />
                <img src={assets.dropdown_icon} alt="" className="w-2.5 transition-transform duration-300 group-hover:rotate-180" />
              </div>
              
              {/* ✅ FIX: Removed mt-3 from ul and added pt-3 to this container */}
              <div className="absolute top-full right-0 pt-3 hidden group-hover:block">
                <ul className="text-base font-medium text-gray-600 z-20 bg-white shadow-lg rounded-lg w-52 p-3">
                  <ProfileLinks onLinkClick={() => {}} Logout={Logout} />
                </ul>
              </div>

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

        {/* Mobile Hamburger Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu"
        />

        {/* Mobile Menu (Slide-out Panel) */}
        <div className={`
          md:hidden fixed top-0 right-0 h-full w-full max-w-xs bg-white z-40
          transition-transform duration-300 ease-in-out shadow-xl
          ${showMenu ? "translate-x-0" : "translate-x-full"}
        `}>
          <div className="flex items-center justify-between px-5 py-6 border-b">
            <img className="w-36" src={assets.logo} alt="logo" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="close"
            />
          </div>

          <div className="p-4">
            {/* Mobile User Actions */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              {uToken && userData ? (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <img src={userData.image} alt="profile" className="w-10 h-10 object-cover rounded-full" />
                    <p className="font-bold text-gray-700">{userData.name}</p>
                  </div>
                  <ul className="space-y-2 text-base text-gray-600">
                    <ProfileLinks onLinkClick={() => setShowMenu(false)} Logout={Logout} />
                  </ul>
                </div>
              ) : (
                <button
                  className="bg-primary w-full text-white py-3 rounded-full font-medium cursor-pointer hover:bg-primary/90 transition-colors"
                  type="button"
                  onClick={() => {
                    navigate("/login");
                    setShowMenu(false);
                  }}
                >
                  Login / SignUp
                </button>
              )}
            </div>
            
            {/* Mobile Navigation Links */}
            <ul className="flex flex-col gap-2 text-lg font-medium">
              <NavLink to="/" onClick={() => setShowMenu(false)} className={({ isActive }) => isActive ? "text-primary bg-primary/10 rounded-md" : ""}>
                <li className="p-3 rounded-md hover:bg-slate-100">HOME</li>
              </NavLink>
              <NavLink to="/doctors" onClick={() => setShowMenu(false)} className={({ isActive }) => isActive ? "text-primary bg-primary/10 rounded-md" : ""}>
                <li className="p-3 rounded-md hover:bg-slate-100">ALL DOCTORS</li>
              </NavLink>
              <NavLink to="/about" onClick={() => setShowMenu(false)} className={({ isActive }) => isActive ? "text-primary bg-primary/10 rounded-md" : ""}>
                <li className="p-3 rounded-md hover:bg-slate-100">ABOUT</li>
              </NavLink>
              <NavLink to="/contact" onClick={() => setShowMenu(false)} className={({ isActive }) => isActive ? "text-primary bg-primary/10 rounded-md" : ""}>
                <li className="p-3 rounded-md hover:bg-slate-100">CONTACT</li>
              </NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;