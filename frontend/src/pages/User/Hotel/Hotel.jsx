import React, { useState, useEffect, useRef } from "react";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import home from "../../.././assets/Background.jpg";
import profile from "../../.././assets/Profile.png";
import hotel1 from "../../.././assets/hotel1.jpg";
import hotel2 from "../../.././assets/hotel2.webp";
import hotel3 from "../../.././assets/hotel3.jpg";
import hotel4 from "../../.././assets/hotel4.jpg";
import hotel5 from "../../.././assets/hotel5.jpg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HotelPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Fetch all hotels when component mounts
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
    

    const fetchHotels = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/hotels");
        // Filter only available hotels from the API response
        const availableHotels = response.data.filter(hotel => hotel.available === true);
        setHotels(availableHotels);
        setFilteredHotels(availableHotels);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    

    fetchHotels();

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle search and filter changes
  useEffect(() => {
    let results = hotels;

    // Filter by search query (hotel name)
    if (searchQuery) {
      results = results.filter(hotel => 
        hotel.hotelName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by tour area
    if (selectedArea !== "all") {
      results = results.filter(hotel => hotel.tourArea === selectedArea);
    }

    setFilteredHotels(results);
  }, [searchQuery, selectedArea, hotels]);

  // Navigate to hotel details page
  const handleViewDetails = (hotelId) => {
    navigate(`/userHoteldetails/${hotelId}`);
  };
  const handleLogout = () => {
    // Clear user data and token from localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/Login");
  };

  return (
    <div className="font-sans">
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

      {/* Booking Section */}
      <section
        className="bg-cover bg-center h-96 relative"
        style={{ backgroundImage: `url(${hotel4})` }}
      >
        {/* Gradient Overlay with higher opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200 via-pink-300 to-orange-500 opacity-70"></div>
        
        <div className="container mx-auto text-center py-24 relative z-10">
          <h2 className="text-4xl font-extrabold bg-clip-text bg-gradient-to-r from-yellow-400 via-red-300 to-pink-200 mb-6 animate__animated animate__fadeIn text-blue-400">
            Welcome to FlamingGO's Tour Quotation Calculator,
          </h2>
          <p className="text-2xl font-semibold text-gray-100 opacity-90 mb-6 leading-relaxed">
            Where planning your dream vacation is just a click away. Get instant, accurate
            quotes for customized tours tailored to your needs and budget.
          </p>
        </div>
      </section>

      <section className="container mx-auto my-8 text-center" id="booking">
        <div className="bg-white shadow-lg p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-6">SELECT HOTELS</h2>

          {/* Hotel Search Area */}
          <div className="mb-6">
            <label className="block text-lg mb-2">Search Hotels</label>
            <div className="flex justify-center space-x-4">
              <input
                type="text"
                placeholder="Enter hotel name"
                className="p-2 rounded-md border border-gray-300 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              {/* Tour Area Filter */}
              <select
                className="p-2 rounded-md border border-gray-300"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
              >
                <option value="all">All Areas</option>
                <option value="Down south">Down south</option>
                <option value="North">North</option>
                <option value="East">East</option>
              </select>

              <button 
                className="bg-orange-500 text-white px-6 py-2 rounded-lg"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedArea("all");
                }}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Hotels Section */}
      <section id="rooms" className="container mx-auto py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Available Hotels</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHotels.length > 0 ? (
            filteredHotels.map((hotel) => (
              <div key={hotel._id} className="bg-white shadow-md rounded-lg">
                <img
                  src={hotel.images && hotel.images.length > 0 
                    ? `http://localhost:3000${hotel.images[0]}` 
                    : hotel1}
                  alt={hotel.hotelName}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{hotel.hotelName}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-lg text-gray-600">
                      Starting from ${hotel.roomPrice} per night
                    </p>
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Available
                    </span>
                  </div>
                  {/* <p className="text-sm text-gray-500 mt-2">
                    {hotel.hotelAddress}
                  </p>
                  <p className="text-sm text-gray-500">
                    {hotel.tourArea} • Hotel ID: {hotel.hotelId}
                  </p> */}
                  <button 
                    className="bg-orange-500 text-white py-2 px-4 rounded-md mt-4 w-full hover:bg-orange-600 transition-colors"
                    onClick={() => handleViewDetails(hotel._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8">
              <p className="text-xl text-gray-500">No hotels found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Our Services Section */}
      <section id="services" className="bg-gray-100 py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Our Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto text-center">
          {[
            "Restaurant",
            "Transport Facility",
            "Free Wi-Fi",
            "Spa & Salon",
            "Swimming Pool",
            "Mini Bar",
            "Conference Room",
            "Game Room",
          ].map((service, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <MdSearch className="text-4xl text-orange-500 mx-auto" />
              </div>
              <h4 className="font-semibold text-lg">{service}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Our Gallery Section */}
      <section id="gallery" className="py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 container mx-auto">
          {["image1", "image2", "image3", "image4", "image5", "image6"].map(
            (img, idx) => (
              <div key={idx} className="bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={hotel2}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            )
          )}
        </div>
      </section>

      {/* What People Say Section */}
      <section id="reviews" className="bg-blue-600 text-white py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          What People Say
        </h2>
        <div className="flex justify-center space-x-8">
          {["John Doe", "Esther Howard", "Kathryn Murphy"].map((name, idx) => (
            <div key={idx} className="text-center">
              <img
                src={hotel3}
                alt={`Review ${idx + 1}`}
                className="rounded-full mx-auto mb-4 w-24 h-24 object-cover"
              />
              <p className="text-lg font-semibold">{name}</p>
              <p className="text-sm">
                "Great experience, had an amazing stay!"
              </p>
              <div className="mt-2">
                <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto flex justify-between">
          <div>
            <p>&copy; 2025 Hotel. All rights reserved.</p>
          </div>
          <div>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="hover:text-gray-400">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HotelPage;
