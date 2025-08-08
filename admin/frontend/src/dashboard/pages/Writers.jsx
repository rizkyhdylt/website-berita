import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { base_url } from '../../config/config';
import storeContext from '../../context/storeContext';
import { motion } from 'framer-motion';

const Writers = () => {
  const { store } = useContext(storeContext);
  const [writers, setWriters] = useState([]);

  const get_writers = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news/writers`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      setWriters(data.writers);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus writer ini?')) {
      try {
        await axios.delete(`${base_url}/api/writers/delete/${id}`, {
          headers: { Authorization: `Bearer ${store.token}` },
        });
        alert('Berhasil dihapus');
        get_writers();
      } catch (err) {
        alert('Gagal menghapus');
        console.error(err);
      }
    }
  };

  useEffect(() => {
    get_writers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-xl shadow-md overflow-hidden"
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Writers</h2>
        <Link
          to="/dashboard/writer/add"
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
        >
          + Add Writer
        </Link>
      </div>

      <div className="relative overflow-x-auto p-4">
        {writers.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-10 text-gray-500"
          >
            <p>Belum ada writer yang terdaftar</p>
          </motion.div>
        ) : (
          <motion.table
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-full text-sm text-left text-slate-600"
          >
            <thead className="text-xs text-white uppercase bg-gradient-to-r from-indigo-500 to-purple-500">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {writers.map((r, i) => (
                <motion.tr
                  key={r._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.01, backgroundColor: '#f9fafb' }}
                  className="border-b"
                >
                  <td className="px-6 py-4">{i + 1}</td>
                  <td className="px-6 py-4 font-medium">{r.name}</td>
                  <td className="px-6 py-4">{r.role}</td>
                  <td className="px-6 py-4">
                    {r.image && r.image !== 'null' && r.image !== '' ? (
                      <img
                        className="w-[40px] h-[40px] rounded-full object-cover"
                        src={r.image}
                        alt={r.name}
                      />
                    ) : (
                      <div className="w-[40px] h-[40px] rounded-full bg-gray-400 text-white flex items-center justify-center font-bold">
                        {r.name
                          .split(' ')
                          .map((word) => word[0])
                          .join('')
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">{r.email}</td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <Link
                      to={`/dashboard/writer/${r._id}`}
                      className="p-2 bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50 transition"
                      title="View"
                    >
                      <FaEye className="text-white" />
                    </Link>
                    <button
                      onClick={() => handleDelete(r._id)}
                      className="p-2 bg-red-500 rounded hover:shadow-lg hover:shadow-red-500/50 transition"
                      title="Delete"
                    >
                      <FaTrash className="text-white" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        )}
      </div>
    </motion.div>
  );
};

export default Writers;
