"use client";

import { useForm } from "react-hook-form";
import API from "@/lib/axios";
import { toast } from "react-toastify";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
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

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await API.post("/contact", data);
      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-32 pb-20">
        
        {/* Page Header */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="inline-block mb-4">
            <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 text-sm font-medium tracking-wide">
              Get In Touch
            </span>
          </motion.div>
          
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
          >
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Me</span>
          </motion.h1>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            Have a project in mind? Let's work together to create something amazing.
          </motion.p>
        </motion.div>

        {/* Info Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
        >
          {[
            { icon: <FiMail size={32} />, title: "Email", value: "budhabhaskar11@gmail.com" },
            { icon: <FiPhone size={32} />, title: "Phone", value: "+977 9825630086" },
            { icon: <FiMapPin size={32} />, title: "Location", value: "Shantinagar, Kathmandu" }
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl text-center hover:border-purple-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="inline-block p-4 bg-purple-500/10 rounded-full mb-4 group-hover:bg-purple-500/20 transition-colors">
                <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                  {item.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400">{item.value}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="bg-slate-900/50 border border-slate-800 p-8 rounded-2xl shadow-xl backdrop-blur-sm space-y-6">
            <div>
              <label className="block mb-1 font-medium text-slate-300">Name *</label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Your Full Name"
                className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium text-slate-300">Email *</label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                type="email"
                placeholder="your.email@example.com"
                className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium text-slate-300">Phone *</label>
              <input
                {...register("phone", { required: "Phone is required" })}
                type="tel"
                placeholder="Your Phone Number"
                className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
              {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label className="block mb-1 font-medium text-slate-300">Message *</label>
              <textarea
                {...register("message", { required: "Message is required" })}
                rows={5}
                placeholder="Your Message"
                className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              />
              {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3.5 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold shadow-lg shadow-purple-900/50 flex items-center justify-center gap-2"
            >
              <FiSend size={20} />
              Send Message
            </motion.button>
          </form>
        </motion.div>

      </div>
    </div>
  );
}