import React, { useEffect, useState } from "react";
import axios from "axios";
import { base_url } from "../../config/config";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const User = () => {
  const [users, setUsers] = useState([]);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus user ini?")) return;

    try {
      await axios.delete(`${base_url}/api/users/${id}`);
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } catch (err) {
      console.error("Gagal menghapus user:", err);
      alert("Terjadi kesalahan saat menghapus user.");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${base_url}/api/users`);
        const userData = Array.isArray(res.data)
          ? res.data
          : res.data.users || [];
        setUsers(userData);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setUsers([]);
      }
    };

    fetchUsers();
  }, []);

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <motion.div
        className="flex justify-between items-center p-4 border-b border-gray-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl font-semibold text-gray-700">User Profile</h2>
      </motion.div>

      {/* Table */}
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-white uppercase bg-gradient-to-r from-indigo-500 to-purple-500">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Registration Date</th>
              <th className="px-6 py-3">Favorite Category</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user._id || index}
                className="bg-white border-b hover:bg-indigo-50 transition"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }}
              >
                <td className="px-6 py-4 font-medium">{index + 1}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  {new Date(user.createdAt).toLocaleDateString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  {user.favoriteCategory ? (
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-600">
                      {user.favoriteCategory}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(user._id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 hover:shadow-lg transition"
                  >
                    <FaTrash size={14} />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
            {users.length === 0 && (
              <motion.tr
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td
                  colSpan="6"
                  className="px-6 py-8 text-center text-gray-500 italic"
                >
                  Tidak ada data user.
                </td>
              </motion.tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default User;
