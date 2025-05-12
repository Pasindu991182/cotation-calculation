import { useState } from "react";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // Use navigate in v6

const API_URL = 'http://localhost:3000/api/transport'; // Your backend API URL

export default function AddVehicleForm() {
  const navigate = useNavigate(); // Initialize the navigate function
  const [vehicle, setVehicle] = useState({
    vehicleNo: "",
    vehicletype: "",
    vehiclename: "",
    seat: "",
    PriceKm: "",
    drivername: "",
    photo: null, // Initialize photo as null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVehicle((prev) => ({ ...prev, photo: file })); // Save the file to state
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('vehicleNo', vehicle.vehicleNo);
    formData.append('vehicletype', vehicle.vehicletype);
    formData.append('vehiclename', vehicle.vehiclename);
    formData.append('seat', vehicle.seat);
    formData.append('PriceKm', vehicle.PriceKm);
    formData.append('drivername', vehicle.drivername);
    formData.append('photo', vehicle.photo); // Attach the photo file to the form data

    // Send the form data using Axios
    axios.post(API_URL, formData)
      .then(() => {
        navigate('/adminTransportManagement'); // Redirect after successful add
      })
      .catch((error) => {
        console.error("Error adding vehicle:", error);
        alert("An error occurred while adding the vehicle.");
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6">➕ Add New Vehicle</h2>

            <div className="grid grid-cols-1 gap-4 mb-6">
              <div>
                <label className="block text-gray-700 font-medium">Vehicle No:</label>
                <input
                  type="text"
                  name="vehicleNo"
                  value={vehicle.vehicleNo}
                  onChange={handleInputChange}
                  placeholder="Enter Vehicle No"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Vehicle Type:</label>
                <input
                  type="text"
                  name="vehicletype"
                  value={vehicle.vehicletype}
                  onChange={handleInputChange}
                  placeholder="Enter Vehicle Type"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Vehicle Name:</label>
                <input
                  type="text"
                  name="vehiclename"
                  value={vehicle.vehiclename}
                  onChange={handleInputChange}
                  placeholder="Enter Vehicle Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Seats:</label>
                <input
                  type="number"
                  name="seat"
                  value={vehicle.seat}
                  onChange={handleInputChange}
                  placeholder="Enter Seat Capacity"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Price per Km:</label>
                <input
                  type="number"
                  name="PriceKm"
                  value={vehicle.PriceKm}
                  onChange={handleInputChange}
                  placeholder="Enter Price per Km"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Driver Name:</label>
                <input
                  type="text"
                  name="drivername"
                  value={vehicle.drivername}
                  onChange={handleInputChange}
                  placeholder="Enter Driver Name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium">Upload Vehicle Photo:</label>
                <input
                  type="file"
                  onChange={handleImageUpload}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {vehicle.photo && (
                  <div className="mt-2">
                    <img src={URL.createObjectURL(vehicle.photo)} alt="Vehicle Preview" className="w-32 h-32 object-cover rounded-md" />
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  className="bg-gray-500 text-white py-2 px-6 rounded-lg hover:bg-gray-600"
                  onClick={() => navigate('/adminTransportManagement')} // Cancel button
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                >
                  Add Vehicle
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
