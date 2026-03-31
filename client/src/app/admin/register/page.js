"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react"; // ✅ Removed useCallback
import API from "@/lib/axios";
import { toast } from "react-toastify";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdminRegister() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ✅ DIRECT FUNCTIONS - No useCallback needed (simpler & faster!)
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await API.post("/auth/register", data);

      toast.success("Admin registered successfully");
      reset();
      
      // Use setTimeout to ensure state updates complete before navigation
      setTimeout(() => {
        router.replace("/admin/login");
      }, 100);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ INLINE HANDLER - No useCallback needed
  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 relative overflow-hidden flex items-center justify-center">
      
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
        <div className="bg-slate-900/50 border border-slate-700 p-8 rounded-2xl shadow-xl backdrop-blur-sm">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-purple-900/50">
              <FiUserPlus className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Register</span>
            </h1>
            <p className="text-slate-400">
              Create your admin account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Name Input */}
            <div>
              <label className="block mb-2 font-medium text-slate-300">
                <FiUser className="inline mr-2" />
                Full Name
              </label>
              <input
                {...register("name", { 
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters"
                  }
                })}
                type="text"
                placeholder="John Doe"
                className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <label className="block mb-2 font-medium text-slate-300">
                <FiMail className="inline mr-2" />
                Email Address
              </label>
              <input
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email"
                placeholder="admin@example.com"
                className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label className="block mb-2 font-medium text-slate-300">
                <FiLock className="inline mr-2" />
                Password
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
                  className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={togglePassword}  // ✅ Now direct function
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3.5 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold shadow-lg shadow-purple-900/50 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <FiUserPlus size={20} />
                  <span>Register</span>
                </>
              )}
            </motion.button>

          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-slate-500">
            <p>Already have an account?</p>
            <button
              onClick={() => router.replace("/admin/login")}
              className="text-purple-400 hover:text-purple-300 font-medium mt-2 transition-colors"
            >
              Sign In
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}