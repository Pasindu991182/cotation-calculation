import React, { useState, useEffect } from "react";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // <-- Import useNavigate

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminMain = () => {
  const navigate = useNavigate();  // <-- Use useNavigate
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTours, setTotalTours] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  // Fetch data from API (example API calls)
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/users') // Replace with actual API endpoint
      .then((response) => {
        setTotalUsers(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios
      .get('http://localhost:3000/api/tours') // Replace with actual API endpoint
      .then((response) => {
        setTotalTours(response.data.length);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    axios
      .get('http://localhost:3000/api/revenue') // Replace with actual API endpoint
      .then((response) => {
        setMonthlyRevenue(response.data.monthlyRevenue);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const bookingData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      { label: "Bookings", data: [200, 250, 300, 150, 280, 320], backgroundColor: "rgba(54, 162, 235, 0.6)" }
    ]
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div className="bg-white p-5 shadow rounded-lg">
              <h3 className="text-gray-600">Total Users</h3>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
            <div className="bg-white p-5 shadow rounded-lg">
              <h3 className="text-gray-600">Total Tours</h3>
              <p className="text-2xl font-bold">{totalTours}</p>
            </div>
            <div className="bg-white p-5 shadow rounded-lg">
              <h3 className="text-gray-600">Monthly Revenue</h3>
              <p className="text-2xl font-bold">${monthlyRevenue}</p>
            </div>
          </div>

          <div className="bg-white p-5 shadow rounded-lg mb-6">
            <h4 className="text-gray-600 mb-2">Monthly Booking Distribution Chart</h4>
            <div className="w-full h-64">
              <Bar data={bookingData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: "top" }, title: { display: false } }, scales: { y: { beginAtZero: true } } }} />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-x-4">
              <button
                onClick={() => navigate("/adminTourPackageManagement")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
              >
                Manage Tours
              </button>
              <button
                onClick={() => navigate("/adminUserManagement")}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
              >
                Manage Users
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminMain;
