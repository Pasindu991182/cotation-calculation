import React, { useState } from "react";
import { MdAdd, MdCancel } from "react-icons/md"; // Importing icons
import SideNavbar from "./../../../../components/AdminDashboard/Navbar";
import Header from "./../../../../components/AdminDashboard/Header";

const EditHotel = () => {
  // Sample data for the hotel to pre-fill the form (this would come from an API or backend in a real app)
  const initialHotelData = {
    hotelName: "Matara Vila",
    hotelAddress: "Matara,Vila,pollhena",
    hotelTelNo: "077-3454567",
    hotelType: "Deluxe",
    hotelCategory: "Luxury",
    tourArea: "Down south",
    roomCapacity: 34,
    roomPrice: 299,
    roomDescription: "Presidential, Jacuzzi, Shower, Mini-Bar",
    amenities: {
      petFriendly: true,
      smoking: false,
      wifi: true,
      miniBar: true,
      coffeeMaker: false,
      cityView: true,
      shower: true,
      sofaBox: false,
      refrigerator: true,
      airConditioner: true,
      tvCable: false,
      seaView: false
    },
    accessibility: {
      wheelchairAccessible: true,
      showerGrabBars: false,
      hearingAidCompatible: false
    },
    images: [] // You can pre-fill images here if needed
  };

  // States to manage hotel data and image uploads
  const [hotelName, setHotelName] = useState(initialHotelData.hotelName);
  const [hotelAddress, setHotelAddress] = useState(initialHotelData.hotelAddress);
  const [hotelTelNo, setHotelTelNo] = useState(initialHotelData.hotelTelNo);
  const [hotelType, setHotelType] = useState(initialHotelData.hotelType);
  const [hotelCategory, setHotelCategory] = useState(initialHotelData.hotelCategory);
  const [tourArea, setTourArea] = useState(initialHotelData.tourArea);
  const [roomCapacity, setRoomCapacity] = useState(initialHotelData.roomCapacity);
  const [roomPrice, setRoomPrice] = useState(initialHotelData.roomPrice);
  const [roomDescription, setRoomDescription] = useState(initialHotelData.roomDescription);
  const [images, setImages] = useState(initialHotelData.images);
  const [amenities, setAmenities] = useState(initialHotelData.amenities);
  const [accessibility, setAccessibility] = useState(initialHotelData.accessibility);

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  // Handle image removal
  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle amenities change
  const handleAmenityChange = (event) => {
    const { name, checked } = event.target;
    setAmenities((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  // Handle accessibility change
  const handleAccessibilityChange = (event) => {
    const { name, checked } = event.target;
    setAccessibility((prevState) => ({
      ...prevState,
      [name]: checked
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Hotel changes saved successfully!");
  };

  return (
    <div className="flex h-screen bg-gray-100">
              <SideNavbar />
              <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-6 overflow-auto">
    <div className="container mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-6">Edit Hotel #{9281}</h2>

      <form onSubmit={handleSubmit}>
        {/* Room Picture Section */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">Room Picture</label>
          <div className="flex overflow-x-auto py-2 space-x-4">
            {/* Display uploaded images */}
            {images.length > 0 ? (
              images.map((image, index) => (
                <div key={index} className="relative w-40 h-40">
                  <img
                    src={URL.createObjectURL(image)}
                    
                    className="object-cover w-full h-full rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    <MdCancel />
                  </button>
                </div>
              ))
            ) : (
              <div className="w-40 h-40 border-2 border-dashed border-gray-400 flex justify-center items-center rounded-lg">
                <span className="text-gray-500">No images</span>
              </div>
            )}

            {/* "Add Image" button */}
            <label
              htmlFor="image-upload"
              className="w-40 h-40 border-2 border-dashed border-gray-400 flex justify-center items-center rounded-lg cursor-pointer"
            >
              <MdAdd size={24} className="text-gray-500" />
            </label>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* Hotel Details Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">Hotel Name *</label>
            <input
              type="text"
              value={hotelName}
              onChange={(e) => setHotelName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Hotel Address *</label>
            <input
              type="text"
              value={hotelAddress}
              onChange={(e) => setHotelAddress(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Hotel Contact *</label>
            <input
              type="text"
              value={hotelTelNo}
              onChange={(e) => setHotelTelNo(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Hotel Type *</label>
            <select
              value={hotelType}
              onChange={(e) => setHotelType(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Deluxe">Deluxe</option>
              <option value="Suite">Suite</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Hotel Category *</label>
            <select
              value={hotelCategory}
              onChange={(e) => setHotelCategory(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Luxury">Luxury</option>
              <option value="Budget">Budget</option>
              <option value="Standard">Standard</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Tour Area *</label>
            <select
              value={tourArea}
              onChange={(e) => setTourArea(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Down south">Down south</option>
              <option value="North">North</option>
              <option value="East">East</option>
            </select>
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Room Capacity *</label>
            <input
              type="number"
              value={roomCapacity}
              onChange={(e) => setRoomCapacity(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block mb-2 font-medium text-gray-700">Room Price *</label>
            <input
              type="number"
              value={roomPrice}
              onChange={(e) => setRoomPrice(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="col-span-2">
            <label className="block mb-2 font-medium text-gray-700">Room Description *</label>
            <textarea
              value={roomDescription}
              onChange={(e) => setRoomDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {/* Amenities Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Amenities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              'Pet-friendly', 'Smoking', 'Wi-Fi', 'Mini-bar', 'Coffee maker',
              'City view', 'Shower', 'Sofa box', 'Refrigerator', 'Air conditioner',
              'TV Cable', 'Sea view'
            ].map((amenity, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={amenity.toLowerCase().replace(' ', '')}
                  checked={amenities[amenity.toLowerCase().replace(' ', '')]}
                  onChange={handleAmenityChange}
                  className="form-checkbox"
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Accessibility Features Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Accessibility Features</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {['Wheelchair accessible', 'Shower grab bars', 'Hearing aid compatible'].map((feature, index) => (
              <label key={index} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={feature.toLowerCase().replace(' ', '')}
                  checked={accessibility[feature.toLowerCase().replace(' ', '')]}
                  onChange={handleAccessibilityChange}
                  className="form-checkbox"
                />
                <span>{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-between">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500">
            Save Changes
          </button>
          <button type="button" className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400">
            Cancel
          </button>
        </div>
      </form>
    </div>
    </main>
    </div>
    </div>
  );
};

export default EditHotel;