import React from 'react';
import { Link } from 'react-router-dom';  // Import Link for navigation
import './AdminDashboard.css'; // Import custom CSS for styling

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
        
      {/* Sidebar */}
      <div className="sidebar">
        {/* Use Link component for navigation */}
        <Link to="/tourpackage">
          <button className="sidebar-button">Tour package</button>
        </Link>
        <button className="sidebar-button">Hotel Management</button>
        <button className="sidebar-button">Tour Guide</button>
        <button className="sidebar-button">Transport Management</button>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h1>Admin Dashboard</h1>
      </div>
    </div>
  );
};

export default AdminDashboard;
