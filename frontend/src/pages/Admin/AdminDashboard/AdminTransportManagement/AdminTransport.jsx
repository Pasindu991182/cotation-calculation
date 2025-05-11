import React, { useState, useEffect } from "react";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import { MdAdd, MdCancel, MdSearch, MdEdit, MdDelete } from "react-icons/md";
import axios from 'axios';

// Add Axios base URL
const API_URL = 'http://localhost:3000/api/transport'; // Change this to your backend URL

export function TransportManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [vehicles, setVehicles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  // Fetch vehicles from the backend
  useEffect(() => {
    axios.get(API_URL)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the vehicles:", error);
      });
  }, []);

  const handleAddNewVehicle = () => {
    setCurrentVehicle({ vehicleNo: "", vehicletype: "", vehiclename: "", seat: "", PriceKm: "", drivername: "", photo: "" });
    setIsModalOpen(true);
  };

  const handleSaveChanges = () => {
    if (currentVehicle._id) {
      // Update existing vehicle
      axios.put(`${API_URL}/${currentVehicle._id}`, currentVehicle)
        .then(() => {
          // Update state with modified vehicle list
          setVehicles(vehicles.map(v => v._id === currentVehicle._id ? currentVehicle : v));
          setIsModalOpen(false);
        })
        .catch((error) => console.error('Update failed:', error));
    } else {
      // Add new vehicle
      axios.post(API_URL, currentVehicle)
        .then((response) => {
          setVehicles([...vehicles, response.data]);
          setIsModalOpen(false);
        })
        .catch((error) => console.error('Failed to add vehicle:', error));
    }
  };

  const handleUpdateVehicle = (vehicle) => {
    setCurrentVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleDeleteVehicle = (vehicleId) => {
    axios.delete(`${API_URL}/${vehicleId}`)
      .then(() => {
        setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));
        setIsDeleteConfirmOpen(false);
      })
      .catch(() => {
        console.error("Delete failed");
      });
  };

  const getTabData = () => {
    let data = vehicles;
    if (activeTab === "available") data = vehicles.filter((v) => v.availability === "Available");
    if (activeTab === "booked") data = vehicles.filter((v) => v.availability === "Unavailable");
    return data.filter((vehicle) => vehicle.vehiclename.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Transport Management</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg" onClick={handleAddNewVehicle}>
              + Add New Vehicle
            </button>
          </div>

          {/* Filter and Search */}
          <div className="flex space-x-4 mb-4">
            <button
              className={`px-4 py-2 rounded ${activeTab === "all" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
              onClick={() => setActiveTab("all")}
            >
              All Vehicles
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === "available" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
              onClick={() => setActiveTab("available")}
            >
              Available Vehicles
            </button>
            <button
              className={`px-4 py-2 rounded ${activeTab === "booked" ? "bg-blue-600 text-white" : "bg-gray-300"}`}
              onClick={() => setActiveTab("booked")}
            >
              Booked Vehicles
            </button>
          </div>

          <input
            type="text"
            placeholder="Search vehicle..."
            className="border px-3 py-2 rounded-lg mb-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {/* Vehicles Table */}
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-center">
                <th className="p-2 border">Vehicle No</th>
                <th className="p-2 border">Vehicle Name</th>
                <th className="p-2 border">Vehicle Type</th>
                <th className="p-2 border">Seat</th>
                <th className="p-2 border">Availability</th>
                <th className="p-2 border">Price (Km)</th>
                <th className="p-2 border">Photo</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {getTabData().map((vehicle, idx) => (
                <tr key={idx} className="text-center">
                  <td className="p-2 border">{vehicle.vehicleNo}</td>
                  <td className="p-2 border">{vehicle.vehiclename}</td>
                  <td className="p-2 border">{vehicle.vehicletype}</td>
                  <td className="p-2 border">{vehicle.seat}</td>
                  <td className={`p-2 border ${vehicle.availability === "Available" ? "text-green-500" : "text-red-500"}`}>{vehicle.availability}</td>
                  <td className="p-2 border">{vehicle.PriceKm}</td>
                  <td className="p-2 border">
                    <img src={vehicle.photo} alt="Vehicle" className="w-16 h-16 object-cover rounded-md mx-auto" />
                  </td>
                  <td className="p-2 border">
                    <button onClick={() => handleUpdateVehicle(vehicle)} className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                      <MdEdit size={16} /> Update
                    </button>
                    <button onClick={() => handleDeleteVehicle(vehicle._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      <MdDelete size={16} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal for updating vehicle */}
          {isModalOpen && currentVehicle && (
            <div className="fixed inset-0 bg-gray-100 bg-opacity-30 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-2xl font-semibold mb-4">Update Vehicle</h3>
                {/* Vehicle form goes here */}
                <div className="flex justify-end space-x-2">
                  <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded-lg">Cancel</button>
                  <button onClick={handleSaveChanges} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Save Changes</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default TransportManagement;
