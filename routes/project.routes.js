const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const { isAuthenticated } = require("./../middleware/jwt.middleware.js");
const { isAdmin } = require("../middleware/admin.middleware");

const CodingProject = require("../models/CodingProject.model");
const DesignProject = require("../models/DesignProject.model");

// All CODING projects
router.get("/coding-projects", (req, res, next) => {
  CodingProject.find()
    .then((allProjects) => res.json(allProjects))
    .catch((err) => res.json(err));
});

// All DESIGN projects
router.get("/design-projects", (req, res, next) => {
  DesignProject.find()
    .then((allProjects) => res.json(allProjects))
    .catch((err) => res.json(err));
});

// Single CODING project
router.get("/coding-projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  CodingProject.findById(projectId)
    .then((project) => res.json(project))
    .catch((error) => res.json(error));
});

// Single DESIGN project
router.get("/design-projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  DesignProject.findById(projectId)
    .then((project) => res.json(project))
    .catch((error) => res.json(error));
});

// ------------------------------------------------------- //
//                      MOD ROUTES                         //
// ------------------------------------------------------- //

// Create CODING project
router.post("/coding-projects", isAuthenticated, isAdmin, (req, res, next) => {
  const { title, description, url, image } = req.body;

  CodingProject.create({ title, description, url, image })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// Create DESIGN project
router.post("/design-projects", isAuthenticated, isAdmin, (req, res, next) => {
  const { title, description, images } = req.body;

  DesignProject.create({ title, description, images })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

// Update CODING project
router.put(
  "/coding-projects/:projectId",
  isAuthenticated,
  isAdmin,
  (req, res, next) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    CodingProject.findByIdAndUpdate(projectId, req.body, { new: true })
      .then((updatedProject) => res.json(updatedProject))
      .catch((error) => res.json(error));
  }
);

// Update DESIGN project
router.put(
  "/design-projects/:projectId",
  isAuthenticated,
  isAdmin,
  (req, res, next) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    DesignProject.findByIdAndUpdate(projectId, req.body, { new: true })
      .then((updatedProject) => res.json(updatedProject))
      .catch((error) => res.json(error));
  }
);

// Delete CODING project
router.delete(
  "/coding-projects/:projectId",
  isAuthenticated,
  isAdmin,
  (req, res, next) => {
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
  }
);

// Delete DESIGN project
router.delete(
  "/design-projects/:projectId",
  isAuthenticated,
  isAdmin,
  (req, res, next) => {
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
  }
);

module.exports = router;
