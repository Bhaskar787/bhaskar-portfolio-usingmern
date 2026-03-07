"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiMail, FiPhone, FiMessageSquare, FiUser } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch contacts
  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/contact");
      setContacts(res.data);
    } catch (err) {
      toast.error("Failed to fetch contacts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Delete contact
  const deleteContact = (id) => {
    toast(
      ({ closeToast }) => (
        <div className="bg-slate-900 border border-slate-700 p-5 rounded-xl shadow-2xl">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-500/10 rounded-full">
              <FiTrash2 className="text-red-500" />
            </div>
            <h3 className="text-lg font-bold text-white">Delete Message?</h3>
          </div>
          <p className="text-slate-400 mb-5 text-sm">
            Are you sure you want to permanently delete this message? This action cannot be undone.
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={async () => {
                try {
                  await API.delete(`/contact/${id}`);
                  setContacts((prev) => prev.filter((c) => c._id !== id));
                  toast.success("Message deleted successfully");
                } catch (error) {
                  console.error(error);
                  toast.error("Failed to delete message");
                }
                closeToast();
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all font-medium shadow-lg shadow-red-900/20"
            >
              Yes, Delete
            </button>
            <button
              onClick={closeToast}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-all font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 relative overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-900/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Contact Messages
          </h1>
          <p className="text-slate-400">
            Manage incoming inquiries from your website visitors.
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {/* Empty State */}
        {!loading && contacts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/50 border border-slate-700 border-dashed rounded-2xl p-12 text-center backdrop-blur-sm"
          >
            <div className="mx-auto h-16 w-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <FiMessageSquare className="text-slate-500 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No messages yet</h3>
            <p className="text-slate-400 max-w-md mx-auto">
              Messages from your contact form will appear here. Check back later!
            </p>
          </motion.div>
        )}

        {/* Contacts Grid */}
        {!loading && contacts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((c, index) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group bg-slate-900/50 border border-slate-700 rounded-2xl p-6 shadow-xl backdrop-blur-sm hover:border-purple-500/30 hover:shadow-purple-500/10 transition-all duration-300"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg">
                      <FiUser className="text-xl" />
                    </div>
                    <div>
                      
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        <span>{c.name}</span>
                      </h3>
                      <p className="text-sm text-slate-400 flex items-center gap-1">
                        <FiMail className="w-3 h-3" />
                        <span>{c.email}</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="mb-6 bg-slate-950/50 rounded-lg p-4 border border-slate-800">
                  <p className="text-slate-300 text-sm leading-relaxed line-clamp-4">
                    {c.message}
                  </p>
                </div>

                {/* Contact Details */}
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-6 pb-4 border-b border-slate-800">
                  {c.phone && (
                    <div className="flex items-center gap-2">
                      <FiPhone className="w-4 h-4 text-purple-400" />
                      <span>{c.phone}</span>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => deleteContact(c._id)}
                  className="w-full flex items-center justify-center gap-2 bg-slate-800 text-slate-300 px-4 py-3 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-200 font-medium group-hover:shadow-lg group-hover:shadow-red-900/20"
                >
                  <FiTrash2 size={18} />
                  Delete Message
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}