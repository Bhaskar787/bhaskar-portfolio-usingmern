"use client";

import Link from "next/link";
import { FiArrowRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
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
      staggerChildren: 0.2,
    },
  },
};

const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-4 inline-block">
              <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium tracking-wide">
                Full Stack Developer
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
            >
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Bhaskar</span> 👋
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-slate-400 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              I craft high-performance web applications using <span className="text-purple-300 font-semibold">Next.js</span>, 
              <span className="text-purple-300 font-semibold"> MongoDB</span>, and modern design principles.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link
                href="/projects"
                className="group relative px-8 py-3.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow-lg shadow-purple-900/50 hover:shadow-purple-600/50 transition-all hover:-translate-y-1"
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              
              <Link
                href="/contact"
                className="px-8 py-3.5 rounded-lg border border-slate-700 bg-slate-900/50 text-slate-200 hover:bg-slate-800 hover:border-purple-500/50 transition-all hover:-translate-y-1 backdrop-blur-sm"
              >
                Get In Touch
              </Link>
            </motion.div>
            
            {/* Social Links */}
            <motion.div 
              variants={fadeInUp}
              className="mt-12 flex justify-center gap-6 text-slate-400"
            >
              <a href="https://github.com/Bhaskar787" className="hover:text-purple-400 transition-colors text-2xl"><FiGithub /></a>
              <a href="https://www.linkedin.com/in/bhaskar-budha-1a58b83b6" className="hover:text-purple-400 transition-colors text-2xl"><FiLinkedin /></a>
            <a
  href="mailto:budhabhaskar11@gmail.com?subject=Hello Bhaskar&body=I want to contact you."
  className="hover:text-purple-400 transition-colors text-2xl"
>
  <FiMail />
</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { number: "50+", label: "Projects Completed" },
              { number: "30+", label: "Happy Clients" },
              { number: "5+", label: "Years Experience" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 backdrop-blur-sm hover:border-purple-500/30 transition-colors group"
              >
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-2 group-hover:from-purple-400 group-hover:to-indigo-400 transition-all">
                  {stat.number}
                </div>
                <div className="text-slate-400 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-purple-950/20 -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="p-12 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-2xl relative"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to build something <span className="text-purple-400">extraordinary?</span>
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
              Let's collaborate to turn your vision into a high-performance reality.
            </p>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              >
                Start a Project
                <FiArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}