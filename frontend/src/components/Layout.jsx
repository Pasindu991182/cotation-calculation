import React from 'react'
import RecoverySideNavBar from './AdminDashboard/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="flex h-screen">
    {/* Sidebar */}
    <RecoverySideNavBar />

    {/* Main Content */}
    <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
      <Outlet />
    </div>
  </div>
  )
}

export default Layout
