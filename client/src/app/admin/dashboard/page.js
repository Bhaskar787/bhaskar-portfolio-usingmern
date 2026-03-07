"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import API from "@/lib/axios";
import { FiBox, FiMessageSquare, FiTrendingUp, FiUsers, FiArrowRight, FiLogOut, FiGithub } from "react-icons/fi";

export default function Dashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    projects: 0,
    messages: 0,
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Dashboard Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Projects Count & Recent Projects
        const projectsRes = await API.get("/projects");
        const projectsData = projectsRes.data;
        
        // Fetch Contacts Count
        const contactsRes = await API.get("/contact");
        const contactsData = contactsRes.data;

        setStats({
          projects: projectsData.length,
          messages: contactsData.length,
        });

        // Set last 3 projects for recent activity
        setRecentProjects(projectsData.slice(0, 3));
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Navigation Handlers
  const handleNavigate = (path) => {
    router.push(path);
  };

  // Logout Handler
  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem("adminToken");
    
    // Use setTimeout to ensure state updates complete before navigation
    setTimeout(() => {
      router.replace("/admin/login");
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 relative overflow-hidden">
      
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
          className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Dashboard</span>
            </h1>
            <p className="text-slate-400 text-lg">
              Overview of your portfolio performance and content.
            </p>
          </div>
          
          <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-700 px-4 py-2 rounded-full backdrop-blur-sm">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-slate-300">System Online</span>
          </div>
        </motion.div>

        {/* Stats Grid (Updated to 2 columns) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {/* Project Stats Card */}
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(168, 85, 247, 0.3)" }}
            onClick={() => handleNavigate("/admin/projects")}
            className="bg-slate-900/50 border border-slate-700 p-6 rounded-2xl shadow-xl backdrop-blur-sm cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="p-3 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                <FiBox className="text-purple-400 text-2xl" />
              </div>
              <FiArrowRight className="text-slate-600 group-hover:text-purple-400 transition-colors" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1 relative z-10">Total Projects</h3>
            <p className="text-4xl font-bold text-white relative z-10">
              {loading ? <span className="animate-pulse">...</span> : stats.projects}
            </p>
          </motion.div>

          {/* Message Stats Card */}
          <motion.div 
            whileHover={{ y: -5, boxShadow: "0 10px 30px -10px rgba(99, 102, 241, 0.3)" }}
            onClick={() => handleNavigate("/admin/contacts")}
            className="bg-slate-900/50 border border-slate-700 p-6 rounded-2xl shadow-xl backdrop-blur-sm cursor-pointer group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="p-3 bg-indigo-500/10 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                <FiMessageSquare className="text-indigo-400 text-2xl" />
              </div>
              <FiArrowRight className="text-slate-600 group-hover:text-indigo-400 transition-colors" />
            </div>
            <h3 className="text-slate-400 text-sm font-medium mb-1 relative z-10">Messages</h3>
            <p className="text-4xl font-bold text-white relative z-10">
              {loading ? <span className="animate-pulse">...</span> : stats.messages}
            </p>
          </motion.div>
        </motion.div>

        {/* Recent Activity Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-slate-900/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Projects</h2>
            <button 
              onClick={() => handleNavigate("/admin/projects")}
              className="text-purple-400 hover:text-purple-300 text-sm font-medium flex items-center gap-1"
            >
              View All <FiArrowRight size={16} />
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : recentProjects.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              No projects found. Add your first project to see it here.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentProjects.map((project) => (
                <div key={project._id} className="bg-slate-950/50 border border-slate-800 rounded-xl p-4 hover:border-purple-500/50 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-slate-800 rounded-lg flex-shrink-0 overflow-hidden">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">
                          <FiBox />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate group-hover:text-purple-400 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                        {project.description}
                      </p>
                      {project.githubLink && (
                        <a 
                          href={project.githubLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-xs text-slate-400 hover:text-white transition-colors"
                        >
                          <FiGithub size={12} /> View Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm"
        >
          <p>© 2024 Portfolio Admin Panel. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-purple-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Terms of Service</a>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 hover:text-red-400 transition-colors"
            >
              <FiLogOut size={16} />
              Logout
            </button>
          </div>
        </motion.div>

      </div>
    </div>
  );
}