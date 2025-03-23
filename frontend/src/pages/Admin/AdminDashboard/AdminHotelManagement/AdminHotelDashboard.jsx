import React, { useState } from "react";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { MdEdit, MdDelete } from 'react-icons/md';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HotelsManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const topHotels = [
    { name: "Colombo Hotel", revenue: 45320, bookings: 234, occupancy: "85%", reviews: 220, rating: 4.7 },
    { name: "Mirissa Hotel", revenue: 38450, bookings: 206, occupancy: "82%", reviews: 180, rating: 4.6 },
    { name: "Matara Hotel", revenue: 32780, bookings: 194, occupancy: "80%", reviews: 160, rating: 4.5 }
  ];

  const [allHotels, setAllHotels] = useState([
    { id: 101, name: "Matara Hotel", type: "Deluxe", mobile: "0771231236", capacity: 10, available: false, price: 30000 },
    { id: 102, name: "Mirissa Hotel", type: "Deluxe", mobile: "0771242736", capacity: 20, available: true, price: 30000 },
    { id: 103, name: "Colombo Hotel", type: "Presidential", mobile: "0761231326", capacity: 20, available: true, price: 30000 },
    { id: 104, name: "Chilaw Hotel", type: "Suite", mobile: "0771247816", capacity: 20, available: true, price: 30000 }
  ]);

  const availableHotels = allHotels.filter((h) => h.available);
  const bookedHotels = allHotels.filter((h) => !h.available);

  const getTabData = () => {
    let data = [];
    if (activeTab === "all") data = allHotels;
    if (activeTab === "available") data = availableHotels;
    if (activeTab === "booked") data = bookedHotels;
    return data.filter((hotel) =>
      hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const handleAddHotel = () => {
    const newId = allHotels.length ? Math.max(...allHotels.map((h) => h.id)) + 1 : 101;
    const newHotel = { id: newId, name: "New Hotel", type: "Deluxe", mobile: "0000000000", capacity: 15, available: true, price: 25000 };
    setAllHotels([...allHotels, newHotel]);
    setActiveTab("all");
    setSearchQuery("");
  };

  const bookingData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [{ label: "Bookings", data: [200, 250, 300, 150, 280, 320], backgroundColor: "rgba(54, 162, 235, 0.6)" }]
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Hotels Management</h2>
            <div className="flex items-center space-x-4">
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
                <DatePicker selected={selectedMonth} onChange={(date) => setSelectedMonth(date)} dateFormat="MMMM yyyy" showMonthYearPicker />
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500">Generate Report</button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="bg-white p-5 shadow rounded-lg">
              <h3 className="text-gray-600">Monthly Revenue</h3>
              <p className="text-2xl font-bold">$124,563</p>
            </div>
            <div className="bg-white p-5 shadow rounded-lg">
              <h3 className="text-gray-600">Total Bookings</h3>
              <p className="text-2xl font-bold">1,248</p>
            </div>
            <div className="bg-white p-5 shadow rounded-lg">
              <h3 className="text-gray-600">Occupancy Rate</h3>
              <p className="text-2xl font-bold">84%</p>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Booking Distribution</h3>
            <div className="space-x-4">
              <label className="text-gray-700">
                <input type="radio" name="dist" defaultChecked className="mr-1" /> OTA
              </label>
              <label className="text-gray-700">
                <input type="radio" name="dist" className="mr-1" /> Corporate
              </label>
            </div>
          </div>

          <div className="bg-white p-5 shadow rounded-lg mb-6">
            <h4 className="text-gray-600 mb-2">Monthly Booking Distribution Chart</h4>
            <div className="w-full h-64">
              <Bar data={bookingData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" }, title: { display: false } }, scales: { y: { beginAtZero: true } } }} />
            </div>
          </div>

          <div className="bg-white p-5 shadow rounded-lg mb-6">
            <h3 className="text-lg font-semibold mb-4">Top Performing Hotels</h3>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="p-2 border">Hotel Name</th>
                  <th className="p-2 border">Revenue</th>
                  <th className="p-2 border">Bookings</th>
                  <th className="p-2 border">Occupancy</th>
                  <th className="p-2 border">Reviews</th>
                  <th className="p-2 border">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topHotels.map((hotel, idx) => (
                  <tr key={idx} className="text-center">
                    <td className="p-2 border">{hotel.name}</td>
                    <td className="p-2 border">${hotel.revenue.toLocaleString()}</td>
                    <td className="p-2 border">{hotel.bookings}</td>
                    <td className="p-2 border">{hotel.occupancy}</td>
                    <td className="p-2 border">{hotel.reviews}</td>
                    <td className="p-2 border">{hotel.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex space-x-4 mb-4">
            <button onClick={() => setActiveTab("all")} className={`px-4 py-2 rounded-lg ${activeTab === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}>All Hotels</button>
            <button onClick={() => setActiveTab("available")} className={`px-4 py-2 rounded-lg ${activeTab === "available" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}>Available Hotels</button>
            <button onClick={() => setActiveTab("booked")} className={`px-4 py-2 rounded-lg ${activeTab === "booked" ? "bg-blue-600 text-white" : "bg-white text-gray-700 border border-gray-300"}`}>Booked Hotels</button>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="search" className="text-gray-700 font-medium">Search Hotel:</label>
              <input id="search" type="text" placeholder="Type a hotel name..." className="border border-gray-300 rounded-lg px-3 py-2" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
            <button onClick={handleAddHotel} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500">
              <MdEdit className="inline mr-2" /> Add Hotel
            </button>
          </div>

          <div className="hotel-table-container bg-white p-5 shadow rounded-lg">
            <h3 className="text-lg font-semibold mb-4">{activeTab === "all" ? "All Hotels" : activeTab === "available" ? "Available Hotels" : "Booked Hotels"}</h3>
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="p-2 border">Hotel ID</th>
                  <th className="p-2 border">Hotel Name</th>
                  <th className="p-2 border">Hotel Type</th>
                  <th className="p-2 border">Mobile No</th>
                  <th className="p-2 border">Capacity</th>
                  <th className="p-2 border">Availability</th>
                  <th className="p-2 border">Price (Rs)</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getTabData().map((hotel) => (
                  <tr key={hotel.id} className="text-center">
                    <td className="p-2 border">{hotel.id}</td>
                    <td className="p-2 border">{hotel.name}</td>
                    <td className="p-2 border">{hotel.type}</td>
                    <td className="p-2 border">{hotel.mobile}</td>
                    <td className="p-2 border">{hotel.capacity}</td>
                    <td className={`p-2 border ${hotel.available ? "text-green-500" : "text-red-500"}`}>{hotel.available ? "Available" : "Unavailable"}</td>
                    <td className="p-2 border">{hotel.price.toLocaleString()}</td>
                    <td className="p-2 border">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600">
                        <MdEdit className="inline mr-2" /> Update
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                        <MdDelete className="inline mr-2" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {getTabData().length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-4 text-center text-gray-500">No hotels found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HotelsManagement;
