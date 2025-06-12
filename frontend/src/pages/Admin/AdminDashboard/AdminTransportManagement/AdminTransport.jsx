import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";
import { MdAdd, MdCancel, MdSearch, MdEdit, MdDelete } from "react-icons/md";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { jsPDF } from "jspdf";
import axios from "axios";
import autoTable from "jspdf-autotable";
import { FaFilePdf } from "react-icons/fa";

const API_URL = "http://localhost:3000/api/transport"; // Your backend API URL

// Register necessary chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function TransportManagement() {
  const topVehicles = [
    {
      name: "Bus 001",
      revenue: "$12,340",
      trips: 156,
      occupancy: "90%",
      rating: 4.9,
    },
    {
      name: "Van 023",
      revenue: "$8,750",
      trips: 120,
      occupancy: "85%",
      rating: 4.7,
    },
    {
      name: "Car 108",
      revenue: "$6,250",
      trips: 100,
      occupancy: "80%",
      rating: 4.6,
    },
  ];

  // Example data for Monthly Booking Distribution (hypothetical data)
  const monthlyBookingData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Trips",
        data: [120, 150, 180, 130, 170, 160, 200, 190, 210, 240, 220, 230], // Replace with actual data
        backgroundColor: "rgba(43, 151, 252, 0.5)",
        borderColor: "rgba(43, 151, 252, 0.5)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Monthly Booking Distribution",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const [vehicles, setVehicles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [seatFilter, setSeatFilter] = useState("");

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setVehicles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vehicles:", error);
      });
  }, []);

  const filteredVehicles = vehicles.filter((vehicle) => {
    const matchesSearchQuery = vehicle.vehiclename
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSeatFilter = seatFilter
      ? parseInt(vehicle.seat) >= parseInt(seatFilter)
      : true;
    return matchesSearchQuery && matchesSeatFilter;
  });

  const handleDeleteVehicle = async (vehicleId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this Vehicle?");
      if (confirmDelete) {
        await axios.delete(`${API_URL}/${vehicleId}`);
        setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));
        alert("Vehicle deleted successfully.");
        window.location.href = "/adminTransportManagement";
      }
    } catch (err) {
      console.error("Error deleting vehicle:", err);
      alert("Failed to delete vehicle.");
    }
  };
  

  const generatePDF = () => {
    try {
      const doc = new jsPDF();

      // Title
      doc.setFontSize(18);
      doc.text("Transport Vehicle Summary", 14, 20);

      // Total vehicles
      doc.setFontSize(12);
      doc.text(`Total Vehicles: ${vehicles.length}`, 14, 30);

      // Column headers
      const tableColumn = [
        "Vehicle No",
        "Vehicle Name",
        "Vehicle Type",
        "Seats",
        "Price per Km",
        "Images",
      ];

      // Prepare row data (we’ll ignore the “Image” text cell)
      const tableRows = vehicles.map((v) => [
        v.vehicleNo || "N/A",
        v.vehiclename || "N/A",
        v.vehicletype || "N/A",
        v.seat || "N/A",
        v.PriceKm || "N/A",
        "", // leave blank; image will go here
      ]);

      // Generate table
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 40,
        styles: {
          halign: "center", // Center align all cell content
          cellPadding: { top: 8, bottom: 8 },
        },
        theme: "striped",
        headStyles: { fillColor: [22, 160, 133], halign: "center" }, // Also center align headers
        margin: { top: 50, left: 10, right: 10 },
        columnStyles: {
          5: { cellWidth: 30, halign: "center", valign: "middle" }, // Image column
        },
        didDrawCell: (data) => {
          if (data.section === "body" && data.column.index === 5) {
            const vehicle = vehicles[data.row.index];
            if (vehicle.photo) {
              const imgUrl = `http://localhost:3000/${vehicle.photo}`;
              const imgWidth = 15;
              const imgHeight = 15;
              const x = data.cell.x + (data.cell.width - imgWidth) / 2;
              const y = data.cell.y + (data.cell.height - imgHeight) / 2;

              try {
                doc.addImage(imgUrl, "JPEG", x, y, imgWidth, imgHeight);
              } catch (e) {
                console.warn("Couldn't load image for row", data.row.index, e);
              }
            }
          }
        },
      });

      doc.save("transport-vehicle-summary.pdf");
      alert("PDF generated successfully!");
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Check console for details.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNavbar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {/* Main Content */}
          <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Transport Management</h2>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-gray-200 rounded">
                  Select Month
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  Generate Report
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-white rounded shadow">
                <h3 className="text-gray-500">Monthly Revenue</h3>
                <p className="text-2xl font-semibold">
                  $124,563 <span className="text-green-500 text-sm">+2.5%</span>
                </p>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <h3 className="text-gray-500">Total Trips</h3>
                <p className="text-2xl font-semibold">
                  1,248 <span className="text-green-500 text-sm">+3.2%</span>
                </p>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <h3 className="text-gray-500">Occupancy Rate</h3>
                <p className="text-2xl font-semibold">
                  84% <span className="text-red-500 text-sm">-2%</span>
                </p>
              </div>
            </div>

            {/* Booking Overview Chart */}
            <div className="mb-6 bg-white p-5 shadow rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Booking Overview</h3>{" "}
              {/* Updated Label Name */}
              <div className="space-x-4 mb-4">
                <label className="text-gray-700">
                  <input
                    type="radio"
                    name="dist"
                    defaultChecked
                    className="mr-1"
                  />{" "}
                  OTA
                </label>
                <label className="text-gray-700">
                  <input type="radio" name="dist" className="mr-1" /> Corporate
                </label>
              </div>
              {/* Booking Overview Chart */}
              <div className="w-full h-64">
                <Bar
                  data={{
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
                    datasets: monthlyBookingData.datasets,
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { position: "top" },
                      title: { display: false },
                    },
                    scales: { y: { beginAtZero: true } },
                  }}
                />
              </div>
            </div>

            {/* Top Performance Vehicles Table */}
            <div className="mb-6">
              <h3 className="text-2xl font-semibold mb-4">
                Top Performance Vehicles
              </h3>
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-200 text-center">
                    <th className="p-2 border">Vehicle Name</th>
                    <th className="p-2 border">Revenue</th>
                    <th className="p-2 border">Total Trips</th>
                    <th className="p-2 border">Occupancy Rate</th>
                    <th className="p-2 border">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {topVehicles.map((vehicle, idx) => (
                    <tr key={idx} className="text-center">
                      <td className="p-2 border">{vehicle.name}</td>
                      <td className="p-2 border">{vehicle.revenue}</td>
                      <td className="p-2 border">{vehicle.trips}</td>
                      <td className="p-2 border">{vehicle.occupancy}</td>
                      <td className="p-2 border">{vehicle.rating} ⭐</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Search and Filter Inputs */}
            <div className="flex items-center justify-between mb-4 mt-17">
              <div className="flex space-x-4 mb-6">
                <div
                  className="flex-1"
                  style={{ maxWidth: "500px", minWidth: "400px" }}
                >
                  <input
                    type="text"
                    placeholder="Search by Vehicle Name"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="flex-1" style={{ maxWidth: "200px" }}>
                  <input
                    type="number"
                    placeholder="Filter by Seat Capacity"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={seatFilter}
                    onChange={(e) => setSeatFilter(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <Link to="/adminTransportManagement/addvehicle">
                  <button className="bg-green-600  text-white px-4 py-2 hover:bg-emerald-700 rounded-lg self-start">
                    + Add New Vehicle
                  </button>
                </Link>
                <button
                  onClick={generatePDF}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <FaFilePdf /> Generate PDF Summary
                </button>
              </div>
            </div>
            {/*All vehicle*/}
            <h2 className="text-2xl font-semibold text-left mb-6 ms-4">
              All Vehicles
            </h2>

            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-center">
                  <th className="p-2 border">Vehicle No</th>
                  <th className="p-2 border">Vehicle Name</th>
                  <th className="p-2 border">Vehicle Type</th>
                  <th className="p-2 border">Seat</th>
                  <th className="p-2 border">Price (Km)</th>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVehicles.map((vehicle) => (
                  <tr key={vehicle._id} className="text-center">
                    <td className="p-2 border">{vehicle.vehicleNo}</td>
                    <td className="p-2 border">{vehicle.vehiclename}</td>
                    <td className="p-2 border">{vehicle.vehicletype}</td>
                    <td className="p-2 border">{vehicle.seat}</td>
                    <td className="p-2 border">{vehicle.PriceKm}</td>
                    <td className="p-2 border">
                      {vehicle.photo ? (
                        <img
                          src={`http://localhost:3000/${vehicle.photo}`}
                          alt="Vehicle"
                          className="w-16 h-16 object-cover rounded-md mx-auto"
                        />
                      ) : (
                        <span>No Image</span>
                      )}
                    </td>

                    <td className="p-2 border">
                      <Link
                        to={`/adminTransportManagement/updatevehicle/${vehicle._id}`}
                      >
                        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                          Edit
                        </button>
                      </Link>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 ml-2"
                        onClick={() => handleDeleteVehicle(vehicle._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}

export default TransportManagement;
