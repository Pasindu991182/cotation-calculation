import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import profile from "../../.././assets/Profile.png";
import { useParams } from "react-router-dom";
import {
  FaHotel,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTwitter,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
} from "react-icons/fa";

const HotelRoomPage = () => {
  const { id } = useParams();
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  // Default images in case API doesn't return any
  const defaultImages = [
    "/images/hotel7.jpg",
    "/images/hotel3.jpg",
    "/images/hotel4.jpg",
    "/images/hotel5.jpg",
    "/images/hotel8.jpg",
  ];

  // Fetch hotel data from API
  useEffect(() => {

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    

    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/api/hotels/${id}`
        );
        setHotel(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching hotel details:", err);
        setError("Failed to load hotel details");
        setLoading(false);
      }
    };

    fetchHotelDetails();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [id]);

  // Get room images from API or use defaults
  const roomImages =
    hotel && hotel.images && hotel.images.length > 0
      ? hotel.images.map((img) => `http://localhost:3000${img}`)
      : defaultImages;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === roomImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      resetTimeout();
    };
  }, [currentIndex, roomImages.length]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? roomImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === roomImages.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleLogout = () => {
    // Clear user data and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/Login");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <header className="bg-orange-600 text-white py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-4xl font-bold">Flamingo Tours</div>
          <nav className="flex space-x-6 text-lg">
            <a href="/TourPackage" className="hover:text-gray-200">
              Package
            </a>
            <a href="/Transport" className="hover:text-gray-200">
              Transport
            </a>
            <a href="/TourGide" className="hover:text-gray-200">
              Tour Guide
            </a>
            <a href="/userHotel" className="hover:text-gray-200">
              Hotels
            </a>
            <a href="/TourCotationCaculation" className="hover:text-gray-200">
              Quotation
            </a>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img
                    src={profile}
                    alt="Profile"
                    className="h-10 w-10 rounded-full hover:shadow-md hover:shadow-white hover:duration-500"
                  />
                </div>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-65 bg-white rounded-md shadow-lg py-1 z-20 border border-gray-200">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      Current user:
                      <span className="font-bold">
                        {" "}
                        {user.fullName || "Guest"}
                      </span>
                      <br />
                      Signed in as:
                      <span className="font-bold">
                        {" "}
                        {user.email || "Guest"}
                      </span>
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
            ) : (
              <>
                <a href="/Login" className="hover:text-gray-200">
                  Login
                </a>
                <a href="#" className="hover:text-gray-200">
                  Sign Up
                </a>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Banner with Blue Mountains Background */}
      <div className="relative bg-blue-600 h-48 md:h-64">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/hotel10.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-blue-800/50"></div>
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10">
          <h1 className="text-6xl font-bold text-orange-400 mb-2">
            {hotel?.hotelName || "MATARA VILA"}
          </h1>
          <div className="flex items-center text-white text-sm">
            <a href="/" className="hover:text-orange-200">
              Home
            </a>
            <span className="mx-2">/</span>
            <a href="/rooms" className="hover:text-orange-200">
              Rooms & Suites
            </a>
            <span className="mx-2">/</span>
            <span>Room</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <h2 className="font-bold text-4xl text-blue-800">
            {hotel?.hotelCategory || "Standard"} Hotel
          </h2>
          <div className="text-4xl mt-2 md:mt-0">
            Price :{" "}
            <span className="text-blue-800 font-bold">
              {hotel?.roomPrice || 799}$
            </span>
            <span className="text-orange-500 text-base"> night</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Main Image Carousel */}
            <div className="relative overflow-hidden border border-gray-200 rounded-md mb-4">
              {/* Main Image */}
              <div
                className="w-full h-130 bg-center bg-no-repeat bg-cover transition-all duration-500"
                style={{ backgroundImage: `url(${roomImages[currentIndex]})` }}
              ></div>

              {/* Left Arrow */}
              <button
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full cursor-pointer transition-all"
                onClick={goToPrevious}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Right Arrow */}
              <button
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/50 p-2 rounded-full cursor-pointer transition-all"
                onClick={goToNext}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2 mb-8 overflow-x">
              {roomImages.map((img, index) => (
                <div
                  key={index}
                  className={`
                    border-2 rounded-md overflow-hidden cursor-pointer flex-shrink-0
                    transition-transform duration-300 hover:scale-105
                    ${
                      currentIndex === index
                        ? "border-blue-500"
                        : "border-gray-200"
                    }
                  `}
                  onClick={() => goToSlide(index)}
                >
                  <div
                    className="w-30 h-30 bg-center bg-no-repeat bg-cover"
                    style={{ backgroundImage: `url(${img})` }}
                  ></div>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Description</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-1">
                  <FaHotel className="flex-shrink-0" />
                  <span className="font-bold">Room Size:</span> 50ft
                </p>
                <p className="flex items-center gap-1">
                  <FaMapMarkerAlt className="flex-shrink-0" />
                  <span className="font-bold">Location:</span>{" "}
                  {hotel?.hotelAddress || "5th floor"}
                </p>
                <p className="flex items-center gap-1">
                  <FaHotel className="flex-shrink-0" />
                  <span className="font-bold">Room Capacity:</span>{" "}
                  {hotel?.hotelCapacity} rooms
                </p>
                <p className="flex items-center gap-1">
                  <FaHotel className="flex-shrink-0" />
                  <span className="font-bold">Tour Area:</span>{" "}
                  {hotel?.tourArea || "Panama Sea view"}
                </p>
                <p className="flex items-center gap-1">
                  <FaHotel className="flex-shrink-0" />
                  <span className="font-bold">Hotel Type:</span>{" "}
                  {hotel?.hotelType}
                </p>

                <p className="flex items-center gap-1 font-bold text-orange-400">
                  <FaPhone className="flex-shrink-0 text-black" />
                  <span className="font-bold text-black">
                    Contact Number:
                  </span>{" "}
                  {hotel?.hotelTelNo}
                </p>
              </div>

              <p className="mt-4 text-gray-600">
                {hotel?.roomDescription ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla velit, molestie sollicitudin sit ultricies arcu vitae nam tellus. Lacus justo, ut ut id turpis. Arcu vitae eget dignissim etiam nunc felis purus ut. Pellentesque aenean quis ipsum, tellus nam condimentum cras. Arcu dolor morbi mauris malesuada elit a. Nunc, commodo eu at amet euismod vulputate a dictum. Placerat sagittis, laoreet odio ipsum hendrerit. Sed pharetra eu maecenas elit neque nullam."}
              </p>

              <blockquote className="border-l-4 border-gray-300 pl-4 italic my-6 text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                velit, molestie sollicitudin sit ultricies arcu vitae nam
                tellus. Lacus justo, ut ut id turpis. Arcu vitae eget dignissim
                etiam nunc felis purus ut. Pellentesque aenean quis ipsum,
                tellus nam condimentum cras.
              </blockquote>
            </div>
          </div>

          {/* Amenities Section */}
          <div className="bg-blue-500 text-white p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-4">Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {hotel?.amenities ? (
                Object.entries(hotel.amenities).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-white rounded p-2 flex items-center"
                  >
                    <input
                      type="checkbox"
                      checked={value}
                      className="mr-2"
                      readOnly
                    />
                    <span className="text-gray-800">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  </div>
                ))
              ) : (
                <>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" checked className="mr-2" readOnly />
                    <span className="text-gray-800">Pet-friendly</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" checked className="mr-2" readOnly />
                    <span className="text-gray-800">Smoking</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" className="mr-2" readOnly />
                    <span className="text-gray-800">Coffee maker</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" className="mr-2" readOnly />
                    <span className="text-gray-800">City view</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" className="mr-2" readOnly />
                    <span className="text-gray-800">TV Cable</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" checked className="mr-2" readOnly />
                    <span className="text-gray-800">Sea view</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" checked className="mr-2" readOnly />
                    <span className="text-gray-800">Wi-Fi</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" checked className="mr-2" readOnly />
                    <span className="text-gray-800">Shower</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" className="mr-2" readOnly />
                    <span className="text-gray-800">Refrigerator</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" checked className="mr-2" readOnly />
                    <span className="text-gray-800">Air conditioner</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" checked className="mr-2" readOnly />
                    <span className="text-gray-800">Mini-bar</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" className="mr-2" readOnly />
                    <span className="text-gray-800">Sofa box</span>
                  </div>
                </>
              )}
            </div>

            <h3 className="text-xl font-bold mt-6 mb-4">
              Accessibility Features
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {hotel?.accessibility ? (
                Object.entries(hotel.accessibility).map(
                  ([key, value]) =>
                    value && (
                      <div
                        key={key}
                        className="bg-white rounded p-2 flex items-center"
                      >
                        <input
                          type="checkbox"
                          checked
                          className="mr-2"
                          readOnly
                        />
                        <span className="text-gray-800">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                      </div>
                    )
                )
              ) : (
                <>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" checked className="mr-2" readOnly />
                    <span className="text-gray-800">Wheelchair accessible</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" checked className="mr-2" readOnly />
                    <span className="text-gray-800">Shower grab bars</span>
                  </div>
                  <div className="bg-white rounded p-2 flex items-center">
                    <input type="checkbox" checked className="mr-2" readOnly />
                    <span className="text-gray-800">
                      Hearing aid compatible
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Hotel Info */}
          <div>
            <div className="flex items-center mb-4">
              <div className="text-orange-500 mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-orange-500">Hotel</h3>
            </div>
            <p className="text-gray-400 mb-4">
              Experience luxury and comfort in our premium accommodations with
              world-class amenities.
            </p>
            <div className="flex space-x-3">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition-colors"
              >
                <FaTwitter />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400 mb-2">
                Subscribe to our newsletter
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 text-white p-2 w-full rounded-l focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 rounded-r transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gallery
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blogs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Rooms
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Amenities
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Restaurant
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Coffee Shop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Spa & Wellness
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Gym & Fitness
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Swimming Pool
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Conference Rooms
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Reach Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                <span>
                  6391 Elgin St. Celina, Delaware 10299, United States
                </span>
              </li>
              <li className="flex items-start">
                <FaPhone className="text-blue-500 mr-2 mt-1 flex-shrink-0" />
                <span>(239) 555-0108</span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-500 mr-2 mt-1 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>contact@hotelname.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 pt-8 mt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              © 2025 Hotel Name. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HotelRoomPage;
