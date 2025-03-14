import React, { useState, useEffect } from 'react';
import './TourPackagePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const TourPackagePage = () => {
  // State to store the fetched tour packages
  const [tourPackages, setTourPackages] = useState([]);

  // Fetch tour data when the component mounts
  useEffect(() => {
    // Make sure the backend API endpoint is correct (replace if needed)
    axios
      .get('http://localhost:3000/api/tours') // Replace with the correct URL if needed
      .then((response) => {
        setTourPackages(response.data); // Store the fetched data
      })
      .catch((error) => {
        console.error('There was an error fetching the tours:', error);
      });
  }, []); // Empty dependency array means it runs once when the component mounts

  return (
    <div className="tour-package-container">
      <div className="header">
        <h2>Tour Packages</h2>
        <Link to="/admin/addtour">
          <button className="add-tour-button">Add Tour</button>
        </Link>
      </div>

      <table className="tour-package-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Destination</th>
            <th>Days</th>
            <th>KM/RS</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tourPackages.length > 0 ? (
            tourPackages.map((tour) => (
              <tr key={tour.TourID}>
                <td>{tour.TourID}</td>
                <td>{tour.name}</td>
                <td>{tour.destination.join(', ')}</td> {/* Assuming destination is an array */}
                <td>{tour.days}</td>
                <td>{tour.Kmrs}</td>
                <td>
                  {tour.photo ? (
                    <img src={`http://localhost:3000/${tour.photo}`} alt={tour.name} width="50" height="50" />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td>
                  <button>DELETE</button>
                  <button>UPDATE</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No tour packages found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TourPackagePage;
