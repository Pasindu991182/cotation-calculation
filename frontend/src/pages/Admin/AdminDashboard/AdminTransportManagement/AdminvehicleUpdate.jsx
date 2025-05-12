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
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVehicle((prev) => ({ ...prev, photo: file })); // Save the new file to state
    }
  };

  const handleDeleteImage = () => {
    // Remove the photo (set it to null or an empty string)
    setVehicle((prev) => ({ ...prev, photo: null }));
  };

  const handleUpdate = () => {
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
