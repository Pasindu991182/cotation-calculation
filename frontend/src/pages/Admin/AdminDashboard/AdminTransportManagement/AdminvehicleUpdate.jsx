import { useState, useEffect } from "react";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // For accessing URL parameters and navigation
import { MdDelete } from "react-icons/md"; // For the delete icon

const API_URL = "http://localhost:3000/api/transport"; // Your backend API URL

export default function UpdateVehicleForm() {
  const { id } = useParams(); // Get the vehicle ID from the URL
  const navigate = useNavigate(); // Initialize the navigate function

  const [vehicle, setVehicle] = useState({
    vehicleNo: "",
    vehicletype: "",
    vehiclename: "",
    seat: "",
    PriceKm: "",
    drivername: "",
    photo: "", // Initialize with an empty string (URL or null)
  });
  
  // Add validation state
  const [errors, setErrors] = useState({});

  // Fetch vehicle data when the component mounts
  useEffect(() => {
    axios
      .get(`${API_URL}/${id}`)
      .then((response) => {
        setVehicle(response.data); // Populate the form with the fetched vehicle data
      })
      .catch((error) => {
        console.error("Error fetching vehicle data:", error);
      });
  }, [id]); // Run this effect when the component mounts or the ID changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ 
          ...prev, 
          photo: 'Please upload a valid image file (JPEG, PNG, JPG, WEBP)' 
        }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ 
          ...prev, 
          photo: 'Image size should be less than 5MB' 
        }));
        return;
      }
      
      setVehicle((prev) => ({ ...prev, photo: file })); // Save the file to state
      setErrors(prev => ({ ...prev, photo: '' }));
    }
  };

  const handleDeleteImage = () => {
    // Remove the photo (set it to null or an empty string)
    setVehicle((prev) => ({ ...prev, photo: null }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Vehicle Number validation
    if (!vehicle.vehicleNo.trim()) {
      newErrors.vehicleNo = 'Vehicle Number is required';
    } else if (!/^[A-Z0-9\s-]{5,15}$/i.test(vehicle.vehicleNo)) {
      newErrors.vehicleNo = 'Please enter a valid vehicle number (5-15 characters)';
    }
    
    // Vehicle Type validation
    if (!vehicle.vehicletype.trim()) {
      newErrors.vehicletype = 'Vehicle Type is required';
    }
    
    // Vehicle Name validation
    if (!vehicle.vehiclename.trim()) {
      newErrors.vehiclename = 'Vehicle Name is required';
    }
    
    // Seat validation
    if (!vehicle.seat) {
      newErrors.seat = 'Number of seats is required';
    } else if (isNaN(vehicle.seat) || parseInt(vehicle.seat) <= 0 || parseInt(vehicle.seat) > 100) {
      newErrors.seat = 'Please enter a valid number of seats (1-100)';
    }
    
    // Price per Km validation
    if (!vehicle.PriceKm) {
      newErrors.PriceKm = 'Price per Km is required';
    } else if (isNaN(vehicle.PriceKm) || parseFloat(vehicle.PriceKm) <= 0) {
      newErrors.PriceKm = 'Please enter a valid price';
    }
    
    // Driver Name validation
    if (!vehicle.drivername.trim()) {
      newErrors.drivername = 'Driver Name is required';
    } else if (!/^[A-Za-z\s]{2,50}$/.test(vehicle.drivername)) {
      newErrors.drivername = 'Please enter a valid name (2-50 characters, letters only)';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }
    
    const formData = new FormData();
    formData.append("vehicleNo", vehicle.vehicleNo);
    formData.append("vehicletype", vehicle.vehicletype);
    formData.append("vehiclename", vehicle.vehiclename);
    formData.append("seat", vehicle.seat);
    formData.append("PriceKm", vehicle.PriceKm);
    formData.append("drivername", vehicle.drivername);
    if (vehicle.photo) {
      formData.append("photo", vehicle.photo); // Append the new photo if a file is selected
    }

    // Send the updated data to the backend
    axios
      .put(`${API_URL}/${id}`, formData)
      .then(() => {
        alert("Vehicle changes saved successfully!");
        navigate("/adminTransportManagement"); // Redirect after successful update
      })
      .catch((error) => {
        console.error("Error updating vehicle:", error);
        alert("An error occurred while updating the vehicle.");
      });
  };


  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6">
              ✏️ Edit Vehicle
            </h2>

            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium">
                  Vehicle No: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehicleNo"
                  value={vehicle.vehicleNo}
                  onChange={handleInputChange}
                  placeholder="Enter Vehicle No"
                  className={`w-full p-3 border ${errors.vehicleNo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.vehicleNo && <p className="text-red-500 text-sm mt-1">{errors.vehicleNo}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Vehicle Type: <span className="text-red-500">*</span>
                </label>
                <select
                  name="vehicletype"
                  value={vehicle.vehicletype}
                  onChange={handleInputChange}
                  className={`w-full p-3 border ${errors.vehicletype ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="Car">Car</option>
                  <option value="Van">Van</option>
                  <option value="Bus">Bus</option>
                  <option value="Jeep">Jeep</option>
                  <option value="SUV">SUV</option>
                  <option value="Luxury">Luxury</option>
                </select>
                {errors.vehicletype && <p className="text-red-500 text-sm mt-1">{errors.vehicletype}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Vehicle Name: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="vehiclename"
                  value={vehicle.vehiclename}
                  onChange={handleInputChange}
                  placeholder="Enter Vehicle Name"
                  className={`w-full p-3 border ${errors.vehiclename ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.vehiclename && <p className="text-red-500 text-sm mt-1">{errors.vehiclename}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Seats: <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="seat"
                  value={vehicle.seat}
                  onChange={handleInputChange}
                  placeholder="Enter Seat Capacity"
                  className={`w-full p-3 border ${errors.seat ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  min="1"
                  max="100"
                  required
                />
                {errors.seat && <p className="text-red-500 text-sm mt-1">{errors.seat}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Price per Km: <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="PriceKm"
                  value={vehicle.PriceKm}
                  onChange={handleInputChange}
                  placeholder="Enter Price per Km"
                  className={`w-full p-3 border ${errors.PriceKm ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  min="0"
                  step="0.01"
                  required
                />
                {errors.PriceKm && <p className="text-red-500 text-sm mt-1">{errors.PriceKm}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Driver Name: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="drivername"
                  value={vehicle.drivername}
                  onChange={handleInputChange}
                  placeholder="Enter Driver Name"
                  className={`w-full p-3 border ${errors.drivername ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  required
                />
                {errors.drivername && <p className="text-red-500 text-sm mt-1">{errors.drivername}</p>}
              </div>

              <div>
                <label className="block text-gray-700 font-medium">
                  Upload Vehicle Photo:
                </label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className={`w-full p-3 border ${errors.photo ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  accept="image/jpeg,image/png,image/jpg,image/webp"
                />
                {errors.photo && <p className="text-red-500 text-sm mt-1">{errors.photo}</p>}
                
                {/* Show the existing photo (from the database) if available */}
                {vehicle.photo && typeof vehicle.photo === "string" && (
                  <div className="mt-2 relative">
                    <img
                      src={`http://localhost:3000/${vehicle.photo}`} // Make sure the image path is correct
                      alt="Vehicle Preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                    <button
                      onClick={handleDeleteImage}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <MdDelete size={18} />
                    </button>
                  </div>
                )}
                
                {/* Show the uploaded image (if any) */}
                {vehicle.photo && typeof vehicle.photo !== "string" && (
                  <div className="mt-2">
                    <img
                      src={URL.createObjectURL(vehicle.photo)} // Preview newly uploaded image
                      alt="Vehicle Preview"
                      className="w-32 h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
                  onClick={() => navigate("/adminTransportManagement")} // Cancel button
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
                >
                  Update Vehicle
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
