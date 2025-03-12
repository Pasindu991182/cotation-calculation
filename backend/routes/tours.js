const express = require("express");
const multer = require("multer");
const path = require("path");
const Tours = require("../models/tours");

const router = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // You can change the folder as per your requirement
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        // Save the file with the current timestamp and its original extension
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Multer file filter to allow only image files
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Error: Only image files are allowed");
    }
};

// Multer upload middleware
const upload = multer({
    storage,
    fileFilter,
});

// POST route to add a new tour (with image upload)
router.post("/", upload.single('photo'), (req, res) => {
    // If a file is uploaded, save its URL to the database
    const photoUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Create a new tour with the uploaded file's URL
    Tours.create({
        ...req.body,
        photo: photoUrl, // Save the uploaded photo URL in the database
    })
    .then(() => res.json({ msg: "Tour Added Successfully" }))
    .catch(() => res.status(400).json({ msg: "Tour adding failed" }));
});

// GET route to fetch all tours
router.get("/", (req, res) => {
    Tours.find()
        .then((tours) => res.json(tours))
        .catch(() => res.status(400).json({ msg: "Failed to fetch tours" }));
});

// PUT route to update a tour by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedTour = await Tours.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTour) {
            return res.status(404).json({ msg: "Tour not found" });
        }
        res.json({ msg: "Updated successfully", updatedTour });
    } catch (error) {
        res.status(400).json({ msg: "Update failed", error: error.message });
    }
});

module.exports = router;
