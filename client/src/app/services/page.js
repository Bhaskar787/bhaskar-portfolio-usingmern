"use client";

import { FiMonitor, FiSmartphone, FiDatabase, FiGlobe, FiLayers, FiShoppingCart } from "react-icons/fi";
import { motion } from "framer-motion";

// Animation Variants (Reused for consistency)
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

export default function Services() {
  const services = [
    {
      icon: <FiMonitor size={40} />,
      title: "Web Development",
      description:
        "Custom websites and web applications built with modern technologies and best practices.",
    },
    {
      icon: <FiSmartphone size={40} />,
      title: "Responsive Design",
      description:
        "Mobile-first, responsive designs that work seamlessly across all devices and screen sizes.",
    },
    {
      icon: <FiDatabase size={40} />,
      title: "Backend Development",
      description:
        "Robust backend solutions with APIs, databases, and server-side logic.",
    },
    {
      icon: <FiGlobe size={40} />,
      title: "Web Applications",
      description:
        "Full-stack web applications with complex features and seamless user experiences.",
    },
    {
      icon: <FiLayers size={40} />,
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces designed with user experience in mind.",
    },
    {
      icon: <FiShoppingCart size={40} />,
      title: "E-Commerce Solutions",
      description:
        "Complete e-commerce platforms with payment integration and inventory management.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
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
              What I Do
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
          >
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Services</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Comprehensive web development solutions tailored to elevate your digital presence.
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-purple-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-purple-600 transition-colors duration-300 shadow-lg">
                  <div className="text-purple-300 group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24 p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-2xl relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
          
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need Something <span className="text-purple-400">Specific?</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Have a unique project in mind? Let's discuss how I can help bring your vision to life.
            </p>
            
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              Get In Touch
              <FiGlobe className="w-5 h-5" />
            </motion.a>
          </div>
        </motion.div>

      </div>
    </div>
  );
}