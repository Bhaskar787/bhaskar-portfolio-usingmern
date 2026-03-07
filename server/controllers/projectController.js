const Project = require("../models/Project");

// =========================
// GET ALL PROJECTS
// =========================
exports.getProjects = async (req, res) => {
  try {

    const projects = await Project.find().sort({ createdAt: -1 });

    res.json(projects);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// =========================
// CREATE PROJECT
// =========================
exports.createProject = async (req, res) => {
  try {

    const { title, description, imageUrl, githubLink } = req.body;

    const newProject = new Project({
      title,
      description,
      imageUrl,
      githubLink,
    });

    const savedProject = await newProject.save();

    res.status(201).json(savedProject);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// =========================
// UPDATE PROJECT
// =========================
exports.updateProject = async (req, res) => {
  try {

    const { id } = req.params;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};


// =========================
// DELETE PROJECT
// =========================
exports.deleteProject = async (req, res) => {
  try {

    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }
};