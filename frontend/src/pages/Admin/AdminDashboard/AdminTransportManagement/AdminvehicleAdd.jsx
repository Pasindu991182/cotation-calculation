import { useState } from "react";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import axios from 'axios';

// Add Axios base URL
const API_URL = 'http://localhost:3000/api/transport'; // Change this to your backend URL

export default function AddVehicleForm() {
  const [vehicle, setVehicle] = useState({
    vehicleNo: "ABC1234",
    vehicletype: "Bus",
    vehiclename: "Luxury Bus",
    seat: "40",
    PriceKm: "50.00",
    drivername: "John Doe",
    photo: "",  // Assuming a URL or base64 string
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVehicle((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVehicle((prev) => ({ ...prev, photo: reader.result }));  // Save base64 image string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // Send POST request to backend to add new vehicle
    axios.post(API_URL, vehicle)
      .then((response) => {
        console.log("Vehicle added successfully:", response.data);
        // Optionally, reset form or redirect
      })
      .catch((error) => {
        console.error("Error adding vehicle:", error);
      });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-3xl mx-auto p-6 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-semibold mb-4">➕ Add New Vehicle</h2>

            {/* Vehicle Details */}
            <div className="grid grid-cols-1 gap-4">
              <label>Vehicle No:</label>
              <input
                type="text"
                name="vehicleNo"
                placeholder="Vehicle No"
                value={vehicle.vehicleNo}
                onChange={handleInputChange}
                className="border p-2 rounded bg-white"
              />

              <label>Vehicle Name:</label>
              <input
                type="text"
                name="vehiclename"
                placeholder="Vehicle Name"
                value={vehicle.vehiclename}
                onChange={handleInputChange}
                className="border p-2 rounded bg-white"
              />

              <label>Vehicle Type:</label>
              <input
                type="text"
                name="vehicletype"
                placeholder="Vehicle Type"
                value={vehicle.vehicletype}
                onChange={handleInputChange}
                className="border p-2 rounded bg-white"
              />

              <label>Seat Capacity:</label>
              <input
                type="number"
                name="seat"
                placeholder="Seat"
                value={vehicle.seat}
                onChange={handleInputChange}
                className="border p-2 rounded bg-white"
              />

              <label>Price (Per Km):</label>
              <input
                type="number"
                name="PriceKm"
                placeholder="Price per km"
                value={vehicle.PriceKm}
                onChange={handleInputChange}
                className="border p-2 rounded bg-white"
              />

              <label>Driver's Name:</label>
              <input
                type="text"
                name="drivername"
                placeholder="Driver Name"
                value={vehicle.drivername}
                onChange={handleInputChange}
                className="border p-2 rounded bg-white"
              />

              {/* Image Upload */}
              <label>Upload Vehicle Photo:</label>
              <input
                type="file"
                onChange={handleImageUpload}
                className="border p-2 rounded bg-white"
              />
              {vehicle.photo && (
                <div className="mt-2">
                  <img src={vehicle.photo} alt="Vehicle Preview" className="w-20 h-20 object-cover rounded-md" />
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 mt-6"
              >
                Add Vehicle
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
