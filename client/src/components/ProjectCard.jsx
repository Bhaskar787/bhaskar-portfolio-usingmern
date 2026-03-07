"use client";

import { FiGithub, FiExternalLink } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ProjectCard({ project }) {
  return (
    <motion.div
      className="group relative bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/30 to-pink-900/30">
            <FiGithub className="text-purple-400/50 text-6xl" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 relative z-10">
        <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
          {project.title}
        </h2>
        <p className="text-slate-400 mb-4">{project.description}</p>

        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <motion.span
                key={tag}
                whileHover={{ scale: 1.05 }}
                className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-xs font-medium border border-purple-500/30"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        )}

        {/* Links */}
        <div className="flex gap-4 pt-4 border-t border-slate-800">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-colors font-medium text-sm"
            >
              <FiGithub size={18} />
              <span>Code</span>
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-300 hover:text-purple-400 transition-colors font-medium text-sm"
            >
              <FiExternalLink size={18} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}