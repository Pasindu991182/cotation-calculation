import React, { useState } from 'react'
import './TourPackagePage.css';
import { Link } from 'react-router-dom';

const TourPackagePage = () => {

  return (


    <div className="tour-package-container">
    <div className="header">
      <h2>Tour Packages</h2>
        <Link to="/addtour">
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
        <tr>
          <td>1</td>
          <td>Package A</td>
          <td>Paris</td>
          <td>5</td>
          <td>1000</td>
          <td>Image</td>
          <td>
            <button>DELETE</button>
            <button>UPDATE</button>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Package B</td>
          <td>London</td>
          <td>7</td>
          <td>1500</td>
          <td>Image</td>
          <td>
            <button>DELETE</button>
            <button>UPDATE</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  )
}

export default TourPackagePage
