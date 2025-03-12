import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import './AdminLayout.css'

const AdminLayout = () => {
  return (
    <div className='dashboard-container'>
      {/* Sidebar */}
      <div className='sidebar'>
        <Link to="/admin/tourpackage">
          <button className='sidebar-button'>Tour Package</button>
        </Link>
        <Link to="/admin/hotelmanagement">
          <button className='sidebar-button'>Hotel Management</button>
        </Link>
        <Link to="/admin/tourguide">
          <button className='sidebar-button'>Tour Guide</button>
        </Link>
        <Link to="/admin/transportmanager">
          <button className='sidebar-button'>Transport Manager</button>
        </Link>
      </div>

      {/* Main Content: Will change based on the route */}
      <div className='main-content'>
        <Outlet /> {/* This will render the active route's component */}
      </div>
    </div>
  );
};

export default AdminLayout;
