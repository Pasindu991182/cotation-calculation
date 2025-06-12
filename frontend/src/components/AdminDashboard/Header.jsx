import React, { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import profile from '../../assets/Profile.png';
import axios from 'axios';

export default function Header({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    // If user is passed as prop, use it
    if (user) {
      setCurrentUser(user);
    } else {
      // Otherwise check localStorage
      const userData = localStorage.getItem('user');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [user]);

  const handleLogout = async () => {
    // If onLogout is provided as prop, use it
    if (onLogout) {
      onLogout();
    } else {
      // Otherwise implement logout here
      try {
        // Clear user data and token from localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setCurrentUser(null);
        // Navigate to the login page after successful logout
        navigate('/login');
      } catch (err) {
        console.error('Logout failed:', err.response?.data.message || err.message);
      }
    }
  };

  return (
    <header className="bg-white shadow px-4 py-3 flex items-center justify-end">
      <div className="flex items-center space-x-4 h-full bg-white relative z-10">
        <span className="h-10 w-10 rounded-full hover:shadow-md hover:shadow-black hover:duration-500">
          <FaBell className="ms-2.5 mt-2.5 h-5 w-5" />
        </span>
        <span className="h-10 w-10 rounded-full hover:shadow-md hover:shadow-black hover:duration-500">
          <IoMdMail className="ms-2 mt-2 h-6 w-6" />
        </span>
        
        {/* User profile dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <img
              src={profile}
              alt="Profile"
              className="h-10 w-10 rounded-full hover:shadow-md hover:shadow-black hover:duration-500"
            />
            {/* <span className="text-gray-700 font-bold">
              {currentUser?.fullName || currentUser?.email || "Guest"}
            </span> */}
          </div>
          
          {/* Dropdown menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-65 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                Current user :
                <span className="font-bold">{currentUser?.fullName || "Guest"}</span><br />
                Signed in as :
                <span className="font-bold">{currentUser?.email || "Guest"}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
