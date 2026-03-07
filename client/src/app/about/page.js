"use client";

import { FiCode, FiZap, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function About() {
  // Update this path to match your actual file location
  const profileImage = "./images/image.png";

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Express.js",
    "Bootstrap",
    "Next.js",
    "HTML/CSS",
    "Tailwind CSS",
    "Git",
    "MongoDB",
    "Postgresql"
  ];

  const features = [
    {
      icon: <FiCode size={32} />,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and efficient code is my priority."
    },
    {
      icon: <FiZap size={32} />,
      title: "Fast Performance",
      description: "Optimizing applications for speed and performance is essential."
    },
    {
      icon: <FiHeart size={32} />,
      title: "User Focused",
      description: "Creating intuitive experiences that users love is what drives me."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        
        {/* Intro Section with Profile Picture */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-20"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            
            {/* Profile Image with Glowing Border */}
            <motion.div 
              variants={fadeInUp}
              className="relative group"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500" />
              
              {/* Image Container */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-slate-900 shadow-2xl">
                <img
                  src={profileImage}
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div 
              variants={fadeInUp}
              className="text-center md:text-left max-w-2xl"
            >
              <motion.div className="inline-block mb-4">
                <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium tracking-wide">
                  Who I Am
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
              >
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Me</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-slate-400 leading-relaxed"
              >
                I'm a full-stack developer with a passion for building modern web applications.
                I love solving problems, creating scalable applications, and writing clean, maintainable code.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl font-bold text-white mb-8 text-center"
          >
            My <span className="text-purple-400">Skills</span>
          </motion.h2>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-3"
          >
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-purple-500/10 text-purple-300 px-5 py-2.5 rounded-full text-sm font-medium border border-purple-500/20 hover:bg-purple-500/20 transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="group relative bg-slate-900/50 border border-slate-800 p-8 rounded-2xl text-center hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="inline-block p-4 bg-slate-800 rounded-full mb-6 group-hover:bg-purple-600 transition-colors duration-300 shadow-lg">
                  <div className="text-purple-300 group-hover:text-white transition-colors duration-300">
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}