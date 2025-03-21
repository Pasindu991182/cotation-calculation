const express = require("express");
const router = express.Router();
const guide = require("../models/guide");

/*
router.post("/", (req, res) => {
    guide.create(req.body)
        .then(() => res.json({ msg: "ADD una HUTTOOOOOOO" }))
        .catch((err) => {
            console.error("error adding tour guide details:", err);  
            res.status(400).json({ msg: "EWWWWW mODAYA", error: err.message });
        });
});
*/

router.post("/",(req, res)=> {
    guide.create(res.body)
    .then(()=>res.json({msg:"Tour Guide added Succesfully"}))
    .catch((err)=> {
        console.error("error adding tour guide details:",err);  
        res.status(400).json({msg:"Tour Guide adding Failed",error:err.message });
    });
});


router.get("/", (req, res) => {
    guide.find()
        .then((guide) => res.json(guide))
        .catch(() => res.status(400).json({ msg: "No guide found" }));
});

router.get("/:id", (req, res) => {
    guide
        .findById(req.params.id)
        .then((foundGuide) => res.json(foundGuide))
        .catch(() => res.status(400).json({ msg: "Cannot find this Guide" }));
});

router.put("/:id", (req, res) => {
    guide.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(() => res.json({ msg: "Update Successfully" }))
        .catch(() => res.status(400).json({ msg: "Update Failed" }));
});

router.delete("/:id", (req, res) => {
    guide.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "Deleted Succesfully" }))
        .catch(() => res.status(400).json({ msg: "Cannot bo Deleted" }));
});

module.exports = router;
