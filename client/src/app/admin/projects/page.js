"use client";

import { useEffect, useState, useRef } from "react"; // ✅ Removed useCallback, useMemo
import { useForm } from "react-hook-form";
import API from "@/lib/axios";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiPlus, FiImage, FiLink, FiCode, FiGithub } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  const { register, handleSubmit, reset, setValue } = useForm();
  const formRef = useRef(null);

  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  // ✅ Responsive detection (stable)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // ✅ DIRECT fetch function - No useCallback needed
  const fetchProjects = async () => {
    try {
      setProjectsLoading(true);
      const res = await API.get("/projects");
      setProjects(res.data || []);
    } catch (error) {
      toast.error("Failed to fetch projects");
      setProjects([]);
    } finally {
      setProjectsLoading(false);
    }
  };

  // ✅ Initial fetch
  useEffect(() => {
    fetchProjects();
  }, []); // ✅ Empty deps - runs once

  // ✅ DIRECT submit handler - No useCallback needed
  const onSubmit = async (data) => {
    try {
      setFormLoading(true);
      if (editingId) {
        await API.put(`/projects/${editingId}`, data);
        toast.success("Project Updated Successfully");
      } else {
        await API.post("/projects", data);
        toast.success("Project Added Successfully");
      }

      reset();
      setEditingId(null);
      fetchProjects();
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to save project";
      toast.error(errorMessage);
    } finally {
      setFormLoading(false);
    }
  };

  // ✅ DIRECT delete handler - No useCallback needed
  const confirmDelete = (id) => {
    toast(
      ({ closeToast }) => (
        <div className="bg-slate-900 border border-slate-700 p-4 sm:p-5 rounded-xl shadow-xl w-full max-w-sm mx-4">
          <p className="text-white mb-4">Delete this project?</p>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                try {
                  await API.delete(`/projects/${id}`);
                  toast.success("Project deleted successfully");
                  fetchProjects();
                } catch (error) {
                  toast.error("Failed to delete project");
                }
                closeToast();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base flex-1"
            >
              Yes, Delete
            </button>
            <button
              onClick={closeToast}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-colors text-sm sm:text-base flex-1"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  // ✅ DIRECT edit handler - No useCallback needed
  const editProject = (project) => {
    setEditingId(project._id);
    setValue("title", project.title);
    setValue("description", project.description);
    setValue("imageUrl", project.imageUrl);
    setValue("githubLink", project.githubLink);
    
    // Smooth scroll to form
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // ✅ DIRECT projects list - No useMemo needed
  const projectsList = projects;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-3 sm:p-4 md:p-6 lg:p-8 relative overflow-x-hidden">
      
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
            Manage Projects
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">Add, edit, or delete your portfolio projects</p>
        </motion.div>

        {/* Add Project Form */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-slate-900/50 border border-slate-700 p-4 sm:p-6 rounded-2xl shadow-xl backdrop-blur-sm mb-8 sm:mb-10 mt-8 sm:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FiPlus className="text-purple-400 text-xl sm:text-2xl" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium text-slate-300 text-sm sm:text-base">
                <FiCode className="inline mr-2" />
                Title *
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                placeholder="Project Title"
                className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                disabled={formLoading}
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-300 text-sm sm:text-base">
                <FiImage className="inline mr-2" />
                Image URL
              </label>
              <input
                {...register("imageUrl")}
                placeholder="https://example.com/image.jpg"
                className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                disabled={formLoading}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 font-medium text-slate-300 text-sm sm:text-base">
                <FiLink className="inline mr-2" />
                GitHub Link
              </label>
              <input
                {...register("githubLink")}
                placeholder="https://github.com/username/project"
                className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm sm:text-base"
                disabled={formLoading}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block mb-2 font-medium text-slate-300 text-sm sm:text-base">
                Description *
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                placeholder="Project description"
                rows="3"
                className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none text-sm sm:text-base"
                disabled={formLoading}
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={formLoading}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 sm:py-3.5 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold shadow-lg shadow-purple-900/50 flex items-center justify-center gap-2 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <FiPlus size={18} />
                {editingId ? "Update Project" : "Add Project"}
              </>
            )}
          </motion.button>

          {editingId && (
            <motion.button
              type="button"
              onClick={() => {
                reset();
                setEditingId(null);
              }}
              className="w-full mt-3 bg-slate-700 hover:bg-slate-600 text-white py-2.5 rounded-lg transition-all text-sm sm:text-base"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancel Edit
            </motion.button>
          )}
        </motion.form>

        {/* Projects List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-slate-900/50 border border-slate-700 rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden"
        >
          <div className="p-4 sm:p-6 border-b border-slate-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl sm:text-2xl font-bold text-white">Projects List</h2>
              <span className="text-sm text-slate-400">
                {projectsList.length} project{projectsList.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Loading Skeleton */}
          {projectsLoading && (
            <div className="p-8">
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-24 bg-slate-800/50 rounded-lg" />
                ))}
              </div>
            </div>
          )}

          {/* Mobile Card View */}
          {isMobile && !projectsLoading && (
            <div className="divide-y divide-slate-700">
              {projectsList.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  No projects found. Add your first project above!
                </div>
              ) : (
                projectsList.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 sm:p-6"
                  >
                    <div className="flex gap-4">
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-20 h-20 object-cover rounded-lg border border-slate-700 flex-shrink-0"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-20 h-20 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FiImage className="text-slate-500 text-2xl" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-white text-lg mb-1 truncate">{project.title}</h3>
                        <p className="text-slate-400 text-sm mb-2 line-clamp-2">{project.description}</p>
                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors text-sm"
                          >
                            <FiGithub size={16} />
                            View on GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => editProject(project)}
                        className="flex-1 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 border border-yellow-500/30"
                      >
                        <FiEdit2 size={16} />
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(project._id)}
                        className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 px-3 py-2 rounded-lg transition-colors text-sm flex items-center justify-center gap-2 border border-red-500/30"
                      >
                        <FiTrash2 size={16} />
                        Delete
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* Desktop Table View */}
          {!isMobile && !projectsLoading && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="p-4 text-left text-sm font-semibold text-slate-300">Title</th>
                    <th className="p-4 text-left text-sm font-semibold text-slate-300">Description</th>
                    <th className="p-4 text-center text-sm font-semibold text-slate-300">Image</th>
                    <th className="p-4 text-left text-sm font-semibold text-slate-300">GitHub</th>
                    <th className="p-4 text-center text-sm font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsList.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-slate-400">
                        No projects found. Add your first project above!
                      </td>
                    </tr>
                  ) : (
                    projectsList.map((project, index) => (
                      <motion.tr
                        key={project._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="border-t border-slate-700 hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="p-4">
                          <span className="font-medium text-white">{project.title}</span>
                        </td>
                        <td className="p-4">
                          <span className="text-slate-400 text-sm line-clamp-2 max-w-xs">{project.description}</span>
                        </td>
                        <td className="p-4 text-center">
                          {project.imageUrl ? (
                            <>
                              <img
                                src={project.imageUrl}
                                alt={project.title}
                                className="w-16 h-16 object-cover rounded-lg border border-slate-700 mx-auto"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                              <div 
                                className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center mx-auto hidden"
                                style={{display: project.imageUrl ? 'none' : 'flex'}}
                              >
                                <FiImage className="text-slate-500 text-2xl" />
                              </div>
                            </>
                          ) : (
                            <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center mx-auto">
                              <FiImage className="text-slate-500 text-2xl" />
                            </div>
                          )}
                        </td>
                        <td className="p-4">
                          {project.githubLink ? (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors font-medium text-sm"
                            >
                              <FiGithub size={18} />
                              View
                            </a>
                          ) : (
                            <span className="text-slate-500">-</span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2 justify-center">
                            <button
                              onClick={() => editProject(project)}
                              className="bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm border border-yellow-500/30"
                            >
                              <FiEdit2 size={16} />
                              Edit
                            </button>
                                                       <button
                              onClick={() => confirmDelete(project._id)}
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg transition-colors flex items-center gap-2 text-sm border border-red-500/30"
                            >
                              <FiTrash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}