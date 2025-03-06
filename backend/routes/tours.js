const express = require("express");

const router = express.Router();

const Tours = require("../models/tours");
 
router.post("/",(req,res)=>{
    Tours.create(req.body).then(()=>res.json({msg:"Tour Added succesfully"}))
    .catch(()=>res.status(400).json({msg:"Tour adding faild"}))
});
router.get("/",(req,res)=>{
    Tours.find()
    .then((tours)=>res.json(tours))
    .catch(()=>res.status(400).json({msg:"kdjsfh"}));
})
router.put("/:id", async (req, res) => {
    try {
        const updateTour = await Tours.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateTour) {
            return res.status(404).json({ msg: "Employee not found" });
        }
        res.json({ msg: "Updated successfully", updateTour });
    } catch (error) {
        res.status(400).json({ msg: "Update failed", error: error.message });
    }
});

module.exports = router;