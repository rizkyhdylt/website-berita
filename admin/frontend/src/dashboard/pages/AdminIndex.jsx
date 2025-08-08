import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEye, FaNewspaper, FaClock, FaCheckCircle, FaTimesCircle, FaUserEdit } from 'react-icons/fa';
import storeContext from '../../context/storeContext';
import { base_url } from '../../config/config';
import { convert } from 'html-to-text';
import axios from 'axios';

const AdminIndex = () => {
  const { store } = useContext(storeContext);
  const [news, setNews] = useState([]);
  const [all_news, set_all_news] = useState([]);
  const [writers, setWriters] = useState([]);

  const [parPage, setParPage] = useState(5);
  const [page, setPage] = useState(1);

  const get_news = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news`, {
        headers: { Authorization: `Bearer ${store.token}` },
      });
      set_all_news(data.news);
      setNews(data.news);
    } catch (error) {
      console.log(error);
    }
  };

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

  useEffect(() => {
    get_news();
    get_writers();
  }, []);

  const statCards = [
    { label: 'Total News', value: all_news.length, color: 'bg-blue-500', icon: <FaNewspaper /> },
    { label: 'Pending News', value: all_news.filter(n => n.status === 'pending').length, color: 'bg-yellow-500', icon: <FaClock /> },
    { label: 'Active News', value: all_news.filter(n => n.status === 'active').length, color: 'bg-green-500', icon: <FaCheckCircle /> },
    { label: 'Deactive News', value: all_news.filter(n => n.status === 'deactive').length, color: 'bg-red-500', icon: <FaTimesCircle /> },
    { label: 'Writers', value: writers.length, color: 'bg-purple-500', icon: <FaUserEdit /> },
  ];

  return (
    <div className="mt-3">
      {/* Statistik */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
      >
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition"
          >
            <div className={`text-white p-3 rounded-full text-2xl mb-2 ${card.color}`}>
              {card.icon}
            </div>
            <span className="text-2xl font-bold">{card.value}</span>
            <span className="text-gray-500">{card.label}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent News */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.4, delay: 0.2 }}
        className="bg-white p-4 mt-6 rounded-lg shadow"
      >
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-lg font-semibold">Recent News</h2>
          <Link
            to="/dashboard/news"
            className="text-blue-500 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left text-slate-600">
            <thead className="text-xs text-white uppercase bg-gradient-to-r from-indigo-500 to-purple-500">
              <tr>
                <th className="px-6 py-3">No</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Image</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">City</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Active</th>
              </tr>
            </thead>
            <tbody>
              {news.length > 0 &&
                news
                  .slice((page - 1) * parPage, page * parPage)
                  .map((n, i) => (
                    <motion.tr
                      key={i}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      className="bg-white border-b"
                    >
                      <td className="px-6 py-4">{(page - 1) * parPage + (i + 1)}</td>
                      <td className="px-6 py-4">{n.title.slice(0, 15)}...</td>
                      <td className="px-6 py-4">
                        <img
                          className="w-[40px] h-[40px] rounded object-cover"
                          src={n.image}
                          alt="news"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <span className='px-2 py-1 rounded-full text-xs bg-indigo-100 text-indigo-600'>
                          {n.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">{n.city}</td>
                      <td className="px-6 py-4">
                        {convert(n.description).slice(0, 15)}...
                      </td>
                      <td className="px-6 py-4">{n.date}</td>
                      <td className="px-6 py-4">
                        {n.status === 'pending' && (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                            {n.status}
                          </span>
                        )}
                        {n.status === 'active' && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                            {n.status}
                          </span>
                        )}
                        {n.status === 'deactive' && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs">
                            {n.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-x-2">
                          <Link
                            to={`/dashboard/news/view/${n._id}`}
                            className="p-2 bg-green-500 text-white rounded hover:shadow-lg hover:shadow-green-500/50"
                          >
                            <FaEye />
                          </Link>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end mt-4 gap-2">
          {Array.from({ length: Math.ceil(news.length / parPage) }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AdminIndex;
