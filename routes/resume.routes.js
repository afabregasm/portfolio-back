const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Resume = require("../models/Resume.model");

router.get("/about", (req, res, next) => {
  Resume.find()
    .then((resume) => res.json(resume))
    .catch((err) => res.json(err));
});

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

  CodingProject.create({
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
    .then((resume) => res.json(resume))
    .catch((err) => res.json(err));
});

// Update CODING project
router.put("/coding-projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  CodingProject.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((updatedProject) => res.json(updatedProject))
    .catch((error) => res.json(error));
});

// Update DESIGN project
router.put("/design-projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  DesignProject.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((updatedProject) => res.json(updatedProject))
    .catch((error) => res.json(error));
});

// Delete CODING project
router.delete("/coding-projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  CodingProject.findByIdAndRemove(projectId)
    .then(() =>
      res.json({
        message: `Project with ${projectId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

// Delete DESIGN project
router.delete("/design-projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  DesignProject.findByIdAndRemove(projectId)
    .then(() =>
      res.json({
        message: `Project with ${projectId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
