"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react"; // Add useMemo
import AdminSidebar from "@/components/AdminSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Memoize derived state
  const isLoginPage = useMemo(() => pathname === "/admin/login", [pathname]);
  const isRegisterPage = useMemo(() => pathname === "/admin/register", [pathname]);
  const showSidebar = useMemo(() => !isLoginPage && !isRegisterPage, [isLoginPage, isRegisterPage]);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      setIsLoggedIn(true);
      setAuthChecked(true);

      if (isLoginPage || isRegisterPage) {
        router.replace("/admin/dashboard");
      }
    } else {
      setIsLoggedIn(false);
      setAuthChecked(true);

      if (!isLoginPage && !isRegisterPage) {
        router.replace("/admin/login");
      }
    }
  }, [router, isLoginPage, isRegisterPage]); // ✅ Now stable dependencies

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-200">
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      {/* Sidebar */}
      {showSidebar && <AdminSidebar />}
      
      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className={`flex-1 p-3 sm:p-4 md:p-6 lg:p-8 pt-12 md:pt-0 relative ${
          showSidebar ? "md:ml-64" : ""
        }`}
      >
        <ToastContainer 
          position="top-right" 
          autoClose={3000}
          theme="dark"
          style={{ zIndex: 9999 }}
          className="w-full max-w-sm"
        />
        {children}
      </motion.main>
    </div>
  );
}