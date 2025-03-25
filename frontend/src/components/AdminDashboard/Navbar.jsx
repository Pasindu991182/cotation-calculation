import React from "react";
import logo from "../../assets/Logo.png";
import SideNavLinks from "../SideNavLinks/SideNavLinks";

export default function RecoverySideNavBar() {
  return (
    <aside className="h-full w-64 bg-gray-900 text-white hidden md:block">
      {/* Logo Section */}
      <div className="p-4 flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-32 w-auto mt-5 mx-auto rounded-full"
        />
      </div>

      {/* Navigation Links */}
      <nav className="mt-8">
        <ul className="space-y-5 font-bold text-xl text-center">
          <li className="px-4 py-3 hover:bg-gray-700 transition duration-300">
            <SideNavLinks linkName="DASHBOARD" url="/" />
          </li>
          <li className="px-4 py-3 hover:bg-gray-700 transition duration-300">
            <SideNavLinks
              linkName="TOUR PACKAGE"
              url="/adminTourPackageManagement"
            />
          </li>
          <li className="px-4 py-3 hover:bg-gray-700 transition duration-300">
            <SideNavLinks linkName="HOTELS" url="/adminHotelManagement" />
          </li>
          <li className="px-4 py-3 hover:bg-gray-700 transition duration-300">
            <SideNavLinks linkName="TOUR GUIDE" url="/" />
          </li>
          <li className="px-4 py-3 hover:bg-gray-700 transition duration-300">
            <SideNavLinks linkName="TRANSPORT" url="/" />
          </li>
        </ul>
      </nav>
    </aside>
  );
}
