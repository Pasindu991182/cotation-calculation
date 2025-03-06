import React from 'react';
import './Footer.css'; // Import custom CSS for the footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">© {new Date().getFullYear()} Flamingo Tours Company. All rights reserved.</p>
        <ul className="footer-links">
          <li className="footer-item">
            <a href="#" className="footer-link">Privacy Policy</a>
          </li>
          <li className="footer-item">
            <a href="#" className="footer-link">Terms of Service</a>
          </li>
          <li className="footer-item">
            <a href="#" className="footer-link">Contact</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
