import React, { useState, useEffect } from "react";
import axios from "axios";

const GuideTable = () => {
  const [guides, setGuides] = useState([]);
  const [filteredGuides, setFilteredGuides] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newGuide, setNewGuide] = useState({
    tourGuideID: "",
    name: "",
    Contact: "",
    language: [],
    experience: "",
    charges: "",
    photo: null,
  });
  const [editGuide, setEditGuide] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/guide");
      setGuides(response.data);
      setFilteredGuides(response.data);
    } catch (error) {
      console.error("Error fetching guides:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = guides.filter(
      (guide) =>
        guide.tourGuideID.toLowerCase().includes(query) ||
        guide.name.toLowerCase().includes(query)
    );
    setFilteredGuides(filtered);
  };

  const generateGuideID = () => {
    const count = guides.length + 1;
    return `TG${String(count).padStart(3, "0")}`;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!newGuide.name) {
      newErrors.name = "Guide Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(newGuide.name)) {
      newErrors.name = "Guide Name must contain only letters and spaces";
    }

    if (!newGuide.Contact) {
      newErrors.Contact = "Contact No is required";
    } else if (!/^\d{10}$/.test(newGuide.Contact)) {
      newErrors.Contact = "Contact No must be exactly 10 digits";
    }

    if (!newGuide.charges) {
      newErrors.charges = "Charges Per Tour is required";
    } else if (!/^\d+(\.\d+)?$/.test(newGuide.charges)) {
      newErrors.charges = "Charges Per Tour must be a number";
    }

    if (newGuide.language.length === 0) {
      newErrors.language = "At least one language must be selected";
    }

    if (!newGuide.experience) {
      newErrors.experience = "Experience is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGuide({ ...newGuide, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewGuide({ ...newGuide, photo: file });
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  const handleLanguageChange = (e) => {
    const { value, checked } = e.target;
    let updatedLanguages = [...newGuide.language];
    if (checked) {
      updatedLanguages.push(value);
    } else {
      updatedLanguages = updatedLanguages.filter((lang) => lang !== value);
    }
    setNewGuide({ ...newGuide, language: updatedLanguages });
    if (updatedLanguages.length > 0) {
      setErrors({ ...errors, language: "" });
    }
  };

  const handleDeleteImage = () => {
    setNewGuide({ ...newGuide, photo: null });
    setPreviewImage(null);
  };

  const handleAddGuide = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    const generatedGuideID = generateGuideID();
    formData.append("tourGuideID", generatedGuideID);
    formData.append("name", newGuide.name);
    formData.append("Contact", newGuide.Contact);
    formData.append("language", newGuide.language.join(","));
    formData.append("experience", newGuide.experience);
    formData.append("charges", newGuide.charges);
    if (newGuide.photo) {
      formData.append("photo", newGuide.photo);
    }

    try {
      await axios.post("http://localhost:3000/api/guide", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchGuides();
      setShowModal(false);
      setNewGuide({
        tourGuideID: "",
        name: "",
        Contact: "",
        language: [],
        experience: "",
        charges: "",
        photo: null,
      });
      setPreviewImage(null);
      setErrors({});
    } catch (error) {
      console.error("Error adding guide:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this guide?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:3000/api/guide/${id}`);
        fetchGuides();
      } catch (error) {
        console.error("Error deleting guide:", error);
      }
    }
  };

  const handleUpdate = (guide) => {
    setEditGuide(guide);
    setNewGuide({
      tourGuideID: guide.tourGuideID,
      name: guide.name,
      Contact: guide.Contact,
      language: guide.language,
      experience: guide.experience,
      charges: guide.charges,
      photo: null,
    });
    setPreviewImage(guide.photo ? `http://localhost:3000${guide.photo}` : null);
    setShowModal(true);
    setErrors({});
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("tourGuideID", newGuide.tourGuideID);
    formData.append("name", newGuide.name);
    formData.append("Contact", newGuide.Contact);
    formData.append("language", newGuide.language.join(","));
    formData.append("experience", newGuide.experience);
    formData.append("charges", newGuide.charges);
    if (newGuide.photo) {
      formData.append("photo", newGuide.photo);
    }

    try {
      await axios.put(
        `http://localhost:3000/api/guide/${editGuide._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      fetchGuides();
      setShowModal(false);
      setEditGuide(null);
      setNewGuide({
        tourGuideID: "",
        name: "",
        Contact: "",
        language: [],
        experience: "",
        charges: "",
        photo: null,
      });
      setPreviewImage(null);
      setErrors({});
    } catch (error) {
      console.error("Error updating guide:", error);
    }
  };

  const languages = [
    "Sinhala",
    "English",
    "French",
    "Spanish",
    "Arabic",
    "Portuguese",
    "Japanese",
    "Chinese",
    "Russian",
    "Hindi",
    "Urdu",
    "Bengali",
  ];

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-6">Tour Guides</h2>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search guides..."
          className="border rounded py-2 px-4 w-1/4"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className="flex items-center">
          {guides.length > 0 ? (
            <GuideSummaryPDF guides={guides} />
          ) : (
            <button className="bg-green-500 text-white px-4 py-2 rounded-md disabled cursor-not-allowed">
              Generate PDF Summary
            </button>
          )}
          <button
            onClick={() => setShowModal(true)}
            className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            + Add New Guide
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">GUID ID</th>
            <th className="border px-4 py-2">GUIDE NAME</th>
            <th className="border px-4 py-2">LANGUAGE</th>
            <th className="border px-4 py-2">CONTACT NO</th>
            <th className="border px-4 py-2">EXPERIENCE</th>
            <th className="border px-4 py-2">PHOTO</th>
            <th className="border px-4 py-2">CHARGES PER TOUR</th>
            <th className="border px-4 py-2">ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuides.map((guide) => (
            <tr key={guide._id}>
              <td className="border px-4 py-2">{guide.tourGuideID}</td>
              <td className="border px-4 py-2">{guide.name}</td>
              <td className="border px-4 py-2">
                {guide.language.map((lang, index) => (
                  <span
                    key={index}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm mr-1"
                  >
                    {lang}
                  </span>
                ))}
              </td>
              <td className="border px-4 py-2">{guide.Contact}</td>
              <td className="border px-4 py-2">{guide.experience}</td>
              <td className="border px-4 py-2">
                {guide.photo ? (
                  <img
                    src={`http://localhost:3000${guide.photo}`}
                    alt={guide.name}
                    className="w-12 h-12 rounded-full"
                  />
                ) : (
                  "No Photo"
                )}
              </td>
              <td className="border px-4 py-2">{guide.charges}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleUpdate(guide)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  ✏
                </button>
                <button
                  onClick={() => handleDelete(guide._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Add/Edit Guide */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{editGuide ? "Edit Guide" : "Add New Guide"}</h2>
            <form onSubmit={editGuide ? handleUpdateSubmit : handleAddGuide}>
              {/* Profile Picture */}
              <div className="text-center mb-4">
                <label className="block text-sm font-medium mb-2">Profile Picture</label>
                <div className="mb-2">
                  <img
                    src={previewImage || "https://via.placeholder.com/100?text=Profile"}
                    alt="Profile Preview"
                    className="w-24 h-24 rounded-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  className="mb-2"
                />
                {previewImage && (
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete Image
                  </button>
                )}
              </div>

              {/* Guide Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Guide Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="name"
                  value={newGuide.name}
                  onChange={handleInputChange}
                  placeholder="Guide Name"
                  required
                  className="border w-full p-2 rounded-md"
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name}</span>}
              </div>

              {/* Experience */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Experience <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="experience"
                  value={newGuide.experience}
                  onChange={handleInputChange}
                  placeholder="Experience"
                  required
                  className="border w-full p-2 rounded-md"
                />
                {errors.experience && <span className="text-red-500 text-sm">{errors.experience}</span>}
              </div>

              {/* Contact No */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Contact No <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="Contact"
                  value={newGuide.Contact}
                  onChange={handleInputChange}
                  placeholder="Contact No"
                  required
                  className="border w-full p-2 rounded-md"
                />
                {errors.Contact && <span className="text-red-500 text-sm">{errors.Contact}</span>}
              </div>

              {/* Charges Per Tour */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Charges Per Tour <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="charges"
                  value={newGuide.charges}
                  onChange={handleInputChange}
                  placeholder="Charges Per Tour"
                  required
                  className="border w-full p-2 rounded-md"
                />
                {errors.charges && <span className="text-red-500 text-sm">{errors.charges}</span>}
              </div>

              {/* Language Proficiency */}
              <div className="mb-4">
                <label className="block text-sm font-medium">Language Proficiency <span className="text-red-500">*</span></label>
                <div className="grid grid-cols-2 gap-4">
                  {languages.map((lang, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        value={lang}
                        checked={newGuide.language.includes(lang)}
                        onChange={handleLanguageChange}
                        className="mr-2"
                      />
                      <span>{lang}</span>
                    </div>
                  ))}
                </div>
                {errors.language && <span className="text-red-500 text-sm">{errors.language}</span>}
              </div>

              {/* Submit and Cancel */}
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  {editGuide ? "Update Guide" : "Add Guide"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setNewGuide({
                      tourGuideID: "",
                      name: "",
                      Contact: "",
                      language: [],
                      experience: "",
                      charges: "",
                      photo: null,
                    });
                    setPreviewImage(null);
                    setErrors({});
                  }}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuideTable;
