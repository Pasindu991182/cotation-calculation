import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/ADMIN">Admin</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tourpackage">Tours</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Hotels</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="#">Guide</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/transport">Transport</Link> {/* ✅ Link to Transport Page */}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
