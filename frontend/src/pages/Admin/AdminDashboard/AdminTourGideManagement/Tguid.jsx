
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Form,
  Modal,
  Badge,
  Image,
  Container,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import GuideSummaryPDF from "./GuideSummaryPDF";

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

  // Fetch guides on component mount
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

  // Handle search input change
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

  // Generate Guide ID in the format TGXXX
  const generateGuideID = () => {
    const count = guides.length + 1;
    return `TG${String(count).padStart(3, "0")}`;
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Guide Name: Only letters and spaces allowed
    if (!newGuide.name) {
      newErrors.name = "Guide Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(newGuide.name)) {
      newErrors.name = "Guide Name must contain only letters and spaces";
    }

    // Contact No: Exactly 10 digits
    if (!newGuide.Contact) {
      newErrors.Contact = "Contact No is required";
    } else if (!/^\d{10}$/.test(newGuide.Contact)) {
      newErrors.Contact = "Contact No must be exactly 10 digits";
    }

    // Charges Per Tour: Must be a number
    if (!newGuide.charges) {
      newErrors.charges = "Charges Per Tour is required";
    } else if (!/^\d+(\.\d+)?$/.test(newGuide.charges)) {
      newErrors.charges = "Charges Per Tour must be a number";
    }

    // Language Proficiency: At least one language required
    if (newGuide.language.length === 0) {
      newErrors.language = "At least one language must be selected";
    }

    // Experience: Required
    if (!newGuide.experience) {
      newErrors.experience = "Experience is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGuide({ ...newGuide, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewGuide({ ...newGuide, photo: file });
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
    }
  };

  // Handle language checkbox changes
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

  // Delete image
  const handleDeleteImage = () => {
    setNewGuide({ ...newGuide, photo: null });
    setPreviewImage(null);
  };

  // Add new guide
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

  // Delete guide with confirmation
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

  // Update guide (open modal with pre-filled data)
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

  // Submit update
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

  // Language options
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
    <Container className="mt-4">
      <h2 className="mb-4">Tour Guides</h2>
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder="Search guides..."
          style={{ width: "200px" }}
          className="border rounded"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div>
          {guides.length > 0 ? (
            <GuideSummaryPDF guides={guides} />
          ) : (
            <Button variant="success" disabled>
              Generate PDF Summary
            </Button>
          )}
          <Button
            variant="primary"
            onClick={() => setShowModal(true)}
            className="ms-2"
          >
            + Add New Guide
          </Button>
        </div>
      </div>

      {/* Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>GUID ID</th>
            <th>GUIDE NAME</th>
            <th>LANGUAGE</th>
            <th>CONTACT NO</th>
            <th>EXPERIENCE</th>
            <th>PHOTO</th>
            <th>CHARGES PER TOUR</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuides.map((guide) => (
            <tr key={guide._id}>
              <td>{guide.tourGuideID}</td>
              <td>{guide.name}</td>
              <td>
                {guide.language.map((lang, index) => (
                  <Badge key={index} bg="primary" className="me-1">
                    {lang}
                  </Badge>
                ))}
              </td>
              <td>{guide.Contact}</td>
              <td>{guide.experience}</td>
              <td>
                {guide.photo ? (
                  <Image
                    src={`http://localhost:3000${guide.photo}`}
                    alt={guide.name}
                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                  />
                ) : (
                  "No Photo"
                )}
              </td>
              <td>{guide.charges}</td>
              <td>
                <Button variant="link" onClick={() => handleUpdate(guide)}>
                  <span role="img" aria-label="edit">
                    ✏️
                  </span>
                </Button>
                <Button variant="link" onClick={() => handleDelete(guide._id)}>
                  <span role="img" aria-label="delete">
                    🗑️
                  </span>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit Guide */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editGuide ? "Edit Guide" : "Add New Guide"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editGuide ? handleUpdateSubmit : handleAddGuide}>
            {/* Profile Picture */}
            <Form.Group className="mb-3 text-center">
              <Form.Label>Profile Picture</Form.Label>
              <div>
                <Image
                  src={
                    previewImage ||
                    "https://via.placeholder.com/100?text=Profile"
                  }
                  alt="Profile Preview"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              </div>
              <div className="mt-2">
                <Button
                  variant="primary"
                  as="label"
                  htmlFor="photo-upload"
                  className="me-2"
                >
                  Upload Image
                </Button>
                <Form.Control
                  id="photo-upload"
                  type="file"
                  name="photo"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
                <Button
                  variant="outline-primary"
                  onClick={handleDeleteImage}
                  disabled={!previewImage}
                >
                  Delete Image
                </Button>
              </div>
            </Form.Group>

            {/* Guide Name */}
            <Form.Group className="mb-3">
              <Form.Label>
                Guide Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newGuide.name}
                onChange={handleInputChange}
                placeholder="Guide Name"
                required
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Experience */}
            <Form.Group className="mb-3">
              <Form.Label>
                Experience <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="experience"
                value={newGuide.experience}
                onChange={handleInputChange}
                placeholder="Experience"
                required
                isInvalid={!!errors.experience}
              />
              <Form.Control.Feedback type="invalid">
                {errors.experience}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Contact No */}
            <Form.Group className="mb-3">
              <Form.Label>
                Contact No <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="Contact"
                value={newGuide.Contact}
                onChange={handleInputChange}
                placeholder="Contact No"
                required
                isInvalid={!!errors.Contact}
              />
              <Form.Control.Feedback type="invalid">
                {errors.Contact}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Charges Per Tour */}
            <Form.Group className="mb-3">
              <Form.Label>
                Charges Per Tour <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                name="charges"
                value={newGuide.charges}
                onChange={handleInputChange}
                placeholder="Charges Per Tour"
                required
                isInvalid={!!errors.charges}
              />
              <Form.Control.Feedback type="invalid">
                {errors.charges}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Language Proficiency */}
            <Form.Group className="mb-3">
              <Form.Label>
                Language Proficiency <span className="text-danger">*</span>
              </Form.Label>
              <div className="row">
                {languages.map((lang, index) => (
                  <div key={index} className="col-3">
                    <Form.Check
                      type="checkbox"
                      label={lang}
                      value={lang}
                      checked={newGuide.language.includes(lang)}
                      onChange={handleLanguageChange}
                    />
                  </div>
                ))}
              </div>
              {errors.language && (
                <div className="text-danger mt-2">{errors.language}</div>
              )}
            </Form.Group>

            {/* Submit and Cancel Buttons */}
            <div className="d-flex justify-content-between">
              <Button variant="success" type="submit">
                {editGuide ? "Update Guide" : "Add Guide"}
              </Button>
              <Button
                variant="secondary"
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
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <span>Showing 1 to {filteredGuides.length} of {guides.length} results</span>
        <div>
          <Button variant="outline-secondary" size="sm" disabled>
            ←
          </Button>
          <Button variant="outline-secondary" size="sm" disabled className="ms-2">
            →
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default GuideTable;