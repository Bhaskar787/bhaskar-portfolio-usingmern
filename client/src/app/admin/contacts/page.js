"use client";

import { useEffect, useState } from "react";
import API from "@/lib/axios";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiMail, FiPhone, FiMessageSquare, FiUser, FiRefreshCw } from "react-icons/fi";
import { motion } from "framer-motion";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/contact");
      setContacts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      toast.error("Failed to fetch contacts");
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const deleteContact = (id) => {
    setDeletingId(id);
    toast(
      ({ closeToast }) => (
        <div className="bg-slate-900 border border-slate-700 p-4 sm:p-5 rounded-xl shadow-2xl w-full max-w-sm mx-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-red-500/10 rounded-full flex-shrink-0">
              <FiTrash2 className="text-red-500 text-xl" />
            </div>
            <h3 className="text-lg font-bold text-white">Delete Message?</h3>
          </div>
          <p className="text-slate-400 mb-5 text-sm leading-relaxed">
            This action cannot be undone. Are you sure you want to permanently delete this message?
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={async () => {
                try {
                  await API.delete(`/contact/${id}`);
                  setContacts((prev) => prev.filter((c) => c._id !== id));
                  toast.success("Message deleted successfully");
                } catch (error) {
                  console.error("Delete error:", error);
                  toast.error("Failed to delete message");
                } finally {
                  setDeletingId(null);
                }
                closeToast();
              }}
              disabled={deletingId === id}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-700 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-all font-medium shadow-lg shadow-red-900/20 text-sm sm:text-base flex items-center gap-2"
            >
              {deletingId === id ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white border-solid" />
                  Deleting...
                </>
              ) : (
                "Yes, Delete"
              )}
            </button>
            <button
              onClick={() => {
                closeToast();
                setDeletingId(null);
              }}
              className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg transition-all font-medium text-sm sm:text-base"
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

  const handleRefresh = () => {
    fetchContacts();
    toast.info("Contacts refreshed");
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-slate-900/50 border border-slate-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl backdrop-blur-sm animate-pulse"
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="h-9 w-9 sm:h-10 sm:w-10 bg-slate-800 rounded-lg sm:rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 w-24 bg-slate-800 rounded"></div>
              <div className="h-4 w-32 bg-slate-800 rounded"></div>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-16 bg-slate-800 rounded-lg"></div>
          </div>
          <div className="h-10 bg-slate-800 rounded-lg"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-3 sm:p-4 md:p-8 relative overflow-x-hidden">
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
          className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-1 sm:mb-2">
              Contact Messages
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm">
              Manage incoming inquiries from your website visitors ({contacts.length})
            </p>
          </div>
          <motion.button
            onClick={handleRefresh}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-xl transition-all font-medium shadow-lg text-xs sm:text-sm whitespace-nowrap"
          >
            <FiRefreshCw size={16} />
            Refresh
          </motion.button>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20 gap-4">
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2 border-purple-500"></div>
            <p className="text-slate-400 text-sm">Loading messages...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && contacts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900/50 border border-slate-700 border-dashed rounded-2xl p-8 sm:p-12 text-center backdrop-blur-sm max-w-2xl mx-auto"
          >
            <div className="mx-auto h-16 w-16 sm:h-20 sm:w-20 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
              <FiMessageSquare className="text-slate-500 text-2xl sm:text-3xl" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">No messages yet</h3>
            <p className="text-slate-400 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              Messages from your contact form will appear here. Check back later or promote your contact page!
            </p>
          </motion.div>
        )}

        {/* Contacts Grid */}
        {!loading && contacts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6"
          >
            {contacts.map((contact, index) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group bg-slate-900/50 border border-slate-700 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 shadow-xl backdrop-blur-sm hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 overflow-hidden"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-slate-800/50">
                  <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white shadow-lg flex-shrink-0">
                      <FiUser className="text-lg sm:text-xl" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-purple-300 transition-colors truncate">
                        {contact.name || 'Anonymous'}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-1 truncate overflow-hidden">
                        <FiMail className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
                          {contact.email}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="mb-4 sm:mb-5 bg-slate-950/50 rounded-lg p-3 sm:p-4 border border-slate-800 hover:border-slate-700 transition-colors">
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed line-clamp-4">
                    {contact.message || 'No message provided'}
                  </p>
                </div>

                {/* Contact Details */}
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400 mb-4 sm:mb-5 pb-3 sm:pb-4 border-b border-slate-800/50">
                  {contact.phone && (
                    <div className="flex items-center gap-1 sm:gap-2 bg-slate-950/50 px-2 py-1 rounded-md border border-slate-800 hover:border-purple-500/30 transition-colors">
                      <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400 flex-shrink-0" />
                      <span className="truncate max-w-[150px]">{contact.phone}</span>
                    </div>
                  )}
                  {contact.createdAt && (
                    <div className="text-xs text-slate-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => deleteContact(contact._id)}
                  disabled={deletingId === contact._id}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-slate-800 to-slate-900 hover:from-red-600 hover:to-red-700 disabled:from-slate-900 disabled:to-slate-900 text-slate-300 disabled:text-slate-500 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-lg hover:shadow-red-900/30 text-xs sm:text-sm border border-slate-700 hover:border-red-500/50 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  {deletingId === contact._id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white border-solid" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <FiTrash2 size={16} className="sm:text-lg" />
                      Delete Message
                    </>
                  )}
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Summary Footer */}
        {!loading && contacts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-6 border-t border-slate-800 text-center text-sm text-slate-400"
          >
            Showing {contacts.length} message{contacts.length !== 1 ? 's' : ''} • Last updated{' '}
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </motion.div>
        )}
      </div>
    </div>
  );
}