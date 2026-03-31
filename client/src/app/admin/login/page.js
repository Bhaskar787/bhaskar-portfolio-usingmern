"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react"; // ✅ Removed useCallback
import API from "@/lib/axios";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiLogIn, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: "onChange", // Real-time validation
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ DIRECT submit handler - No useCallback needed (react-hook-form handles it)
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await API.post("/auth/login", data);

      // Store token as 'adminToken' to match AdminLayout
      localStorage.setItem("adminToken", res.data.token);

      toast.success("Login Successful! Redirecting...", {
        autoClose: 1500,
      });

      // Slightly longer timeout for better UX
      setTimeout(() => {
        router.replace("/admin/dashboard");
      }, 1600);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Invalid credentials";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ DIRECT password toggle - No useCallback needed
  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-6 relative overflow-hidden flex items-center justify-center">
      
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-slate-900/50 border border-slate-700 p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-sm">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-900/50">
              <FiLogIn className="text-white text-3xl" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Login</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base">
              Sign in to manage your portfolio
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email Input */}
            <div>
              <label className="block mb-2 font-medium text-slate-300 text-sm sm:text-base">
                <FiMail className="inline mr-2" />
                Email Address *
              </label>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address"
                  }
                })}
                type="email"
                placeholder="admin@example.com"
                disabled={loading}
                className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <span>•</span> {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block mb-2 font-medium text-slate-300 text-sm sm:text-base">
                <FiLock className="inline mr-2" />
                Password *
              </label>
              <div className="relative">
                <input
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <button
                  type="button"
                  onClick={togglePassword}  // ✅ Direct function reference
                  disabled={loading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                  <span>•</span> {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3.5 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold shadow-lg shadow-purple-900/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white border-solid" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <FiLogIn size={20} />
                  <span>Sign In</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-700 text-center text-sm text-slate-500">
            <p>Protected by Admin Authentication</p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}