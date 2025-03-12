import React, { useState, useEffect } from 'react';
import './TourForm.css';  // Make sure this CSS file is scoped as per previous instructions
import axios from 'axios';

const AddTourForm = () => {
  const [tourData, setTourData] = useState({
    TourID: '',
    name: '',
    destination: [''],
    days: '',
    Kmrs: '',
    photo: null, // Change photo from string to file (null initially)
  });

  useEffect(() => {
    console.log("Current Tour Data:", tourData);
  }, [tourData]);

  // Handle input changes for all fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle changes for destination fields
  const handleDestinationChange = (index, value) => {
    const newDestinations = [...tourData.destination];
    newDestinations[index] = value;
    setTourData((prevData) => ({
      ...prevData,
      destination: newDestinations,
    }));
  };

  // Add a new destination input
  const handleAddDestination = () => {
    setTourData((prevData) => ({
      ...prevData,
      destination: [...prevData.destination, ''],
    }));
  };

  // Remove a destination input
  const handleRemoveDestination = (index) => {
    const newDestinations = tourData.destination.filter((_, i) => i !== index);
    setTourData((prevData) => ({
      ...prevData,
      destination: newDestinations,
    }));
  };

  // Handle photo file change
  const handleFileChange = (e) => {
    setTourData((prevData) => ({
      ...prevData,
      photo: e.target.files[0], // Save the file object
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submit action (page reload)
    
    // Log the data before submitting
    console.log("Form Data on Submit:", tourData);
  
    const formData = new FormData();
    formData.append('TourID', tourData.TourID);
    formData.append('name', tourData.name);
    formData.append('destination', JSON.stringify(tourData.destination));
    formData.append('days', tourData.days);
    formData.append('Kmrs', tourData.Kmrs);
    if (tourData.photo) {
      formData.append('photo', tourData.photo); // Add photo file to FormData
    }

    // Send data to the backend API
    axios
      .post("http://localhost:3000/api/tours", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        // Reset the form fields
        setTourData({
          TourID: '',
          name: '',
          destination: [''],
          days: '',
          Kmrs: '',
          photo: null,
        });
        alert("Tour added successfully");
      })
      .catch((error) => {
        console.error("There was an error submitting the tour data:", error);
        alert("Error registering tour.");
      });
  };

  return (
    <div className="tour-form">
      <div className="form-container">
        <form id="employeeForm" onSubmit={handleSubmit}>
          <h2>Add Tour Package</h2>

          <div className="form-group">
            <label htmlFor="TourID">Tour ID</label>
            <input
              type="text"
              id="TourID"
              name="TourID"
              placeholder="Enter Tour ID"
              value={tourData.TourID}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Tour Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Tour Name"
              value={tourData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tour Destinations</label>
            {tourData.destination.map((destination, index) => (
              <div key={index} className="destination-input">
                <input
                  type="text"
                  placeholder="Enter Tour Destination"
                  value={destination}
                  onChange={(e) => handleDestinationChange(index, e.target.value)}
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="remove-destination"
                    onClick={() => handleRemoveDestination(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              id='Dbutton'
              type="button"
              className="add-destination"
              onClick={handleAddDestination}>
              Add Destination
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="days">Tour Duration (Days)</label>
            <input
              type="number"
              id="days"
              name="days"
              placeholder="Enter Tour Duration (Days)"
              value={tourData.days}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="Kmrs">Price per KM (or RS)</label>
            <input
              type="number"
              id="Kmrs"
              name="Kmrs"
              placeholder="Enter price per km (or RS)"
              value={tourData.Kmrs}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo">Tour Card Photo</label>
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handleFileChange}
              accept="image/*" // Only accept image files
              required
            />
          </div>

          <button id ='subbutton' type="submit">Register Tour Package</button>
        </form>
      </div>
    </div>
  );
};

export default AddTourForm;
