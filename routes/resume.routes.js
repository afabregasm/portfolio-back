const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Resume = require("../models/Resume.model");

// View resume
router.get("/about", (req, res, next) => {
  Resume.find()
    .then((resume) => res.json(resume))
    .catch((err) => res.json(err));
});

// Create resume
router.post("/about", (req, res, next) => {
  const {
    image,
    fullName,
    position,
    contact,
    about,
    education,
    experience,
    hardSkills,
    softSkills,
    languages,
  } = req.body;

  Resume.create({
    image,
    fullName,
    position,
    contact,
    about,
    education,
    experience,
    hardSkills,
    softSkills,
    languages,
  })
    .then((newResume) => res.json(newResume))
    .catch((err) => res.json(err));
});

// Edit resume
router.put("/about/:resumeId", (req, res, next) => {
  const { resumeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(resumeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Resume.findByIdAndUpdate(resumeId, req.body, { new: true })
    .then((updatedResume) => res.json(updatedResume))
    .catch((error) => res.json(error));
});

// Delete resume
router.delete("/about/:resumeId", (req, res, next) => {
  const { resumeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(resumeId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Resume.findByIdAndRemove(resumeId)
    .then(() =>
      res.json({
        message: "Resume was removed successfully.",
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
