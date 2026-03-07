const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// GET all projects
router.get("/", getProjects);

// CREATE project
router.post("/", createProject);

// UPDATE project
router.put("/:id", updateProject);

// DELETE project
router.delete("/:id", deleteProject);

module.exports = router;