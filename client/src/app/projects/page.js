"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { FiGithub, FiExternalLink, FiCode } from "react-icons/fi";
import { motion } from "framer-motion";

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await API.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
<div className="min-h-screen pt-24 bg-slate-950 text-slate-200 selection:bg-purple-500 selection:text-white overflow-x-hidden">
       {/* Background Ambient Glow */}
           <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
             <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
             <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
           </div>
     
           <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
             
             {/* Header */}
             <motion.div
               initial="hidden"
               animate="visible"
               variants={staggerContainer}
               className="text-center mb-20"
             >
               <motion.div variants={fadeInUp} className="inline-block mb-4">
                 <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium tracking-wide">
                   Portfolio
                 </span>
               </motion.div>
               
               <motion.h1 
                 variants={fadeInUp}
                 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
               >
                 My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Projects</span>
               </motion.h1>
               
               <motion.p 
                 variants={fadeInUp}
                 className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
               >
                 A showcase of my recent work and personal projects built with passion and creativity.
               </motion.p>
             </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center col-span-full py-20"
            >
              <div className="mx-auto w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <FiCode className="text-slate-500 text-3xl" />
              </div>
              <p className="text-slate-400">Loading projects...</p>
            </motion.div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center col-span-full py-20"
            >
              <div className="mx-auto w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <FiCode className="text-slate-500 text-3xl" />
              </div>
              <p className="text-slate-400">
                No projects found. Add your first project!
              </p>
            </motion.div>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project._id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="group relative bg-slate-900/50 border border-slate-700 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm hover:border-purple-500/50 hover:shadow-purple-500/20 transition-all duration-300"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  {project.imageUrl ? (
                    <>
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-800/40 to-slate-900/40">
                      <FiCode className="text-slate-500/50 text-6xl" />
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Links */}
                  <div className="flex gap-4 pt-4 border-t border-slate-700">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors font-medium text-sm"
                      >
                        <FiGithub size={18} /> Code
                      </a>
                    )}

                    {project.liveLink && (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors font-medium text-sm"
                      >
                        <FiExternalLink size={18} /> Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

      </div>
    </div>
  );
}