"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut, FiHome, FiCode, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdminSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    // Remove admin token
    localStorage.removeItem("adminToken");

    // Redirect to login page
    router.replace("/admin/login"); 
  };

  const navItems = [
    { href: "/admin/dashboard", icon: <FiHome size={20} />, label: "Dashboard" },
    { href: "/admin/projects", icon: <FiCode size={20} />, label: "Projects" },
    { href: "/admin/contacts", icon: <FiMail size={20} />, label: "Contacts" },
  ];

  return (
    <div className="w-64 bg-slate-950 text-slate-200 min-h-screen p-5 border-r border-slate-800 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-purple-900/20 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[300px] h-[300px] bg-indigo-900/20 rounded-full blur-[80px]" />
      </div>

      {/* Logo Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-2xl font-bold">
          <span className="text-white">Admin</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Panel</span>
        </h1>
      </motion.div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-3">
        {navItems.map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-200 group"
            >
              <span className="group-hover:scale-110 transition-transform">
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Logout Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-auto pt-6 border-t border-slate-800"
      >
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full group"
        >
          <FiLogOut size={20} className="group-hover:scale-110 transition-transform" />
          <span className="font-medium">Logout</span>
        </button>
      </motion.div>
    </div>
  );
}