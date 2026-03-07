"use client";

import { useForm } from "react-hook-form";
import API from "@/lib/axios";
import { toast } from "react-toastify";
import { FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await API.post("/contact", data);
      toast.success("Message sent successfully! I'll get back to you soon.");
      reset();
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto p-6 border border-slate-700 rounded-2xl shadow-xl bg-slate-900/50 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <label className="block mb-1 font-medium text-slate-300">Name *</label>
        <input
          {...register("name", { required: "Name is required" })}
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
          placeholder="your.email@example.com"
          type="email"
          className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-slate-300">Phone *</label>
        <input
          {...register("phone", { required: "Phone is required" })}
          placeholder="Your Phone Number"
          type="tel"
          className="w-full bg-slate-950/50 border border-slate-700 p-3 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
        />
        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-medium text-slate-300">Message *</label>
        <textarea
          {...register("message", { required: "Message is required" })}
          placeholder="Your Message"
          rows="4"
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
    </motion.form>
  );
}