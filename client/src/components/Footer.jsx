"use client";

import Link from "next/link";
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Footer() {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact", path: "/contact" },
  ];

  const socialLinks = [
    { icon: <FiGithub size={24} />, href: "https://github.com/Bhaskar787", label: "GitHub" },
    { icon: <FiLinkedin size={24} />, href: "https://linkedin.com/", label: "LinkedIn" },
    { icon: <FiTwitter size={24} />, href: "https://twitter.com/", label: "Twitter" },
    { icon: <FiMail size={24} />, href: "mailto:budhabhaskar11@gmail.com?subject=Hello Bhaskar&body=I want to contact you", label: "Email" },
  ];

   

  return (
    <footer className="bg-slate-950 text-slate-200 pt-16 pb-8 border-t border-slate-800">
      {/* Background Ambient Glow */}
      <div className="fixed bottom-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute bottom-[-10%] left-[10%] w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo / Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-4">
              <span className="text-white">Bhaskar</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">.dev</span>
            </h2>
            <p className="text-slate-400 mb-4">
              Building modern web applications with passion and precision.
            </p>
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Bhaskar. All Rights Reserved.
            </p>
          </motion.div>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    href={link.path}
                    className="text-slate-400 hover:text-purple-400 transition-colors duration-200 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold text-white mb-4">Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-slate-400 hover:text-purple-400 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom border and copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-t border-slate-800 pt-6 text-center"
        >
          <p className="text-slate-500 text-sm">
            Built with <span className="text-purple-400">Next.js</span> & <span className="text-purple-400">Tailwind CSS</span>. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}