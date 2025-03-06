import React from 'react';
import './Navbar.css'; // Import the external CSS file for the navbar styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link " href="/ADMIN">Admin</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Tours</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Hotels</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Guide</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Transport</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
