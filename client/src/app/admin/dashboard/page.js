"use client";

import { useEffect, useState } from "react"; // ✅ Removed useCallback
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import API from "@/lib/axios";
import { toast } from "react-toastify";
import { FiBox, FiMessageSquare, FiTrendingUp, FiUsers, FiArrowRight, FiLogOut, FiGithub } from "react-icons/fi";

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ DIRECT fetch function - No useCallback needed
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch Projects
      const projectsRes = await API.get("/projects");
      const projectsData = Array.isArray(projectsRes.data) ? projectsRes.data : [];

      // Fetch Contacts
      const contactsRes = await API.get("/contact");
      const contactsData = Array.isArray(contactsRes.data) ? contactsRes.data : [];

      setStats({
        projects: projectsData.length,
        messages: contactsData.length,
      });

      // Recent projects (last 3)
      setRecentProjects(projectsData.slice(0, 3));
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      setError("Failed to load dashboard data");
      toast.error("Failed to load dashboard. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Initial data fetch - Empty deps = runs once
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // ✅ DIRECT navigation handler - No useCallback needed
  const handleNavigate = (path) => {
    router.push(path);
  };

  // ✅ DIRECT logout handler - No useCallback needed
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    setTimeout(() => {
      router.replace("/admin/login");
    }, 1500);
  };

  // Loading Skeleton Component
  const LoadingSkeleton = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-slate-900/50 border border-slate-700 p-4 sm:p-6 rounded-2xl animate-pulse">
            <div className="h-10 w-10 bg-slate-800 rounded-lg mb-4"></div>
            <div className="h-8 w-20 bg-slate-800 rounded mb-2"></div>
            <div className="h-12 w-24 bg-slate-800 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );

  // Error State
  if (error && !loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-6 md:p-8 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <FiTrendingUp className="text-red-400 text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Error</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <motion.button
            onClick={fetchDashboardData}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-purple-900/50 transition-all"
          >
            Retry
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-3 sm:p-4 md:p-8 relative overflow-x-hidden">
      
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Dashboard</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Overview of your portfolio performance and content.
            </p>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3 bg-slate-900/50 border border-slate-700 px-3 sm:px-4 py-2 rounded-full backdrop-blur-sm">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-slate-300">Live Data</span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12"
        >
          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {/* Project Stats Card */}
              <motion.div 
                whileHover={{ y: -3 }}
                className="bg-slate-900/50 border border-slate-700 p-4 sm:p-6 rounded-2xl shadow-xl backdrop-blur-sm cursor-pointer group relative overflow-hidden hover:border-purple-500/50 transition-all"
                onClick={() => handleNavigate("/admin/projects")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
                  <div className="p-2 sm:p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors duration-300">
                    <FiBox className="text-purple-400 text-xl sm:text-2xl" />
                  </div>
                  <FiArrowRight className="text-slate-600 group-hover:text-purple-400 transition-colors duration-300" />
                </div>
                <h3 className="text-slate-400 text-xs sm:text-sm font-medium mb-1 relative z-10">Total Projects</h3>
                <motion.p 
                  className="text-3xl sm:text-4xl font-bold text-white relative z-10"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {stats.projects.toLocaleString()}
                </motion.p>
              </motion.div>

              {/* Message Stats Card */}
              <motion.div 
                whileHover={{ y: -3 }}
                className="bg-slate-900/50 border border-slate-700 p-4 sm:p-6 rounded-2xl shadow-xl backdrop-blur-sm cursor-pointer group relative overflow-hidden hover:border-indigo-500/50 transition-all"
                onClick={() => handleNavigate("/admin/contacts")}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="flex items-center justify-between mb-3 sm:mb-4 relative z-10">
                  <div className="p-2 sm:p-3 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors duration-300">
                    <FiMessageSquare className="text-indigo-400 text-xl sm:text-2xl" />
                  </div>
                  <FiArrowRight className="text-slate-600 group-hover:text-indigo-400 transition-colors duration-300" />
                </div>
                <h3 className="text-slate-400 text-xs sm:text-sm font-medium mb-1 relative z-10">Messages</h3>
                <motion.p 
                  className="text-3xl sm:text-4xl font-bold text-white relative z-10"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {stats.messages.toLocaleString()}
                </motion.p>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-slate-900/50 border border-slate-700 rounded-2xl p-4 sm:p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-white">Recent Projects</h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigate("/admin/projects")}
              className="text-purple-400 hover:text-purple-300 text-xs sm:text-sm font-medium flex items-center gap-1 group"
            >
              View All 
              <FiArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
            </motion.button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2 border-purple-500 border-solid"></div>
            </div>
          ) : recentProjects.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <FiBox className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 text-slate-600" />
              <p className="text-sm sm:text-base">No projects found. Add your first project!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {recentProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-slate-950/50 border border-slate-800 rounded-xl p-3 sm:p-4 hover:border-purple-500/50 hover:bg-slate-950/70 transition-all duration-300 group cursor-pointer"
                  onClick={() => handleNavigate(`/admin/projects`)}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-800 rounded-lg flex-shrink-0 overflow-hidden relative">
                      {project.imageUrl ? (
                        <img 
                          src={project.imageUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextElementSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className="absolute inset-0 flex items-center justify-center text-slate-600 bg-slate-800/50 backdrop-blur-sm hidden group-hover:flex">
                        <FiBox className="text-lg" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate group-hover:text-purple-400 transition-colors duration-300 text-sm sm:text-base mb-1">
                        {project.title}
                      </h4>
                      <p className="text-slate-500 text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs text-slate-400 hover:text-white transition-colors duration-200"
                        >
                          <FiGithub size={12} />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-slate-500 text-xs sm:text-sm"
        >
          <p>© 2024 Portfolio Admin Panel. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <a href="#" className="hover:text-purple-400 transition-colors duration-200">Privacy</a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-purple-400 transition-colors duration-200">Terms</a>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="flex items-center gap-1 sm:gap-2 hover:text-red-400 transition-colors duration-200 font-medium"
            >
              <FiLogOut size={14} className="sm:text-lg" />
              Logout
            </motion.button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}