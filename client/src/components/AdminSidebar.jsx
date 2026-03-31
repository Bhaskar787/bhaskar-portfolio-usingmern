"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiLogOut, FiHome, FiCode, FiMail, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";

export default function AdminSidebar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMenuButton, setShowMenuButton] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const sidebarRef = useRef(null);

  // ✅ Memoized nav items
  const navItems = useMemo(() => [
    { href: "/admin/dashboard", icon: <FiHome size={20} />, label: "Dashboard" },
    { href: "/admin/projects", icon: <FiCode size={20} />, label: "Projects" },
    { href: "/admin/contacts", icon: <FiMail size={20} />, label: "Contacts" },
  ], []);

  // ✅ Memoized event handlers
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleLogoutClick = useCallback(() => {
    handleLogout();
    setIsMobileMenuOpen(false);
  }, []);

  // Scroll detection for mobile menu button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowMenuButton(false);
      } else {
        setShowMenuButton(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Scroll to top when menu opens
  useEffect(() => {
    if (isMobileMenuOpen && sidebarRef.current) {
      sidebarRef.current.scrollTop = 0;
    }
  }, [isMobileMenuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.replace("/admin/login"); 
  };

  return (
    <>
      {/* Mobile Menu Toggle Button - Only on mobile */}
      <AnimatePresence>
        {showMenuButton && (
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={toggleMobileMenu}
            className="fixed top-4 left-4 z-50 p-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-300 md:hidden hover:text-white hover:bg-slate-800 transition-all"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop: Always visible, Mobile: Toggleable */}
      <motion.div
        ref={sidebarRef}
        className={`bg-slate-950 text-slate-200 min-h-screen p-5 border-r border-slate-800 relative z-50 flex flex-col ${
          isMobileMenuOpen ? "fixed top-0 left-0 w-64" : "hidden md:block md:w-64 md:static"
        }`}
      >
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
          className="mb-10 flex-shrink-0"
        >
          <h1 className="text-xl sm:text-2xl font-bold">
            <span className="text-white">Admin</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> Panel</span>
          </h1>
        </motion.div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2 sm:gap-3">
          {navItems.map((item, index) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                onClick={closeMobileMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-purple-400 hover:bg-purple-500/10 transition-all duration-200 group"
              >
                <span className="group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <span className="font-medium text-sm sm:text-base">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-slate-800" />

        {/* Logout Button - Right Below Contacts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full group"
          >
            <FiLogOut size={20} className="group-hover:scale-110 transition-transform" />
            <span className="font-medium text-sm sm:text-base">Logout</span>
          </button>
        </motion.div>
      </motion.div>
    </>
  );
}