import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import { base_url } from '../../config/config';
import { convert } from 'html-to-text';
import { motion } from 'framer-motion';

const ViewWriter = () => {
  const { store } = useContext(storeContext);
  const { writer_id } = useParams();
  const [writer, setWriter] = useState(null);
  const [newsList, setNewsList] = useState([]);
  const [allNews, setAllNews] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  // Filter dan search
  useEffect(() => {
    let filtered = allNews;

    if (statusFilter) {
      filtered = filtered.filter(news => news.status === statusFilter);
    }
    if (search) {
      filtered = filtered.filter(news =>
        news.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setNewsList(filtered);
  }, [statusFilter, search, allNews]);

  const search_news = (e) => {
        const searchValue = e.target.value.toLowerCase(); // Ambil input dari user
        const tempNews = all_news.filter(n => n.title.toLowerCase().includes(searchValue));
        setNewsList(tempNews); 
    }

  const getWriterAndNews = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/writers/${writer_id}/news`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setWriter(data.writer);
      setAllNews(data.news); // simpan semua berita
      setNewsList(data.news); // tampilkan semua berita awal
    } catch (error) {
      console.error('Failed to fetch writer and news:', error);
    }
  };

  useEffect(() => {
    getWriterAndNews();
    // eslint-disable-next-line
  }, [writer_id]);

  if (!writer) return <div className="p-4">Loading writer data...</div>;

return (
    <motion.div
      className="p-4 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Profil Penulis */}
      <motion.div
        className="flex justify-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-6 p-4 rounded shadow-sm border">
          <img
            src={writer.image || '/assets/profile.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full border-2 border-gray-300 object-cover"
          />
          <div>
            <p><strong>Nama:</strong> {writer.name}</p>
            <p><strong>Email:</strong> {writer.email}</p>
            <p><strong>Role:</strong> {writer.role}</p>
          </div>
        </div>
      </motion.div>

      {/* Judul & Filter */}
      <div className="mt-8">
        <motion.p
          className="mb-4 font-semibold text-lg"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          Berita yang ditulis oleh {writer.name}
        </motion.p>

        <motion.div
          className="px-4 py-3 flex gap-x-3"
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
          >
            <option value="">---select type---</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="deactive">Deactive</option>
          </select>
          <input
            type="text"
            placeholder="search news"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
          />
        </motion.div>

        {/* Tabel Berita */}
        {newsList.length === 0 ? (
          <motion.p
            className="px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Tidak ada berita yang ditulis.
          </motion.p>
        ) : (
          <motion.div
            className="relative px-4 pb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="overflow-y-auto max-h-[400px] border border-gray-200 rounded-lg">
              <table className="w-full text-sm text-left text-slate-600">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-7 py-3">TITLE</th>
                    <th className="px-7 py-3">IMAGE</th>
                    <th className="px-7 py-3">CATEGORY</th>
                    <th className="px-7 py-3">DESCRIPTION</th>
                    <th className="px-7 py-3">DATE</th>
                    <th className="px-7 py-3">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {newsList.map((news, i) => (
                    <motion.tr
                      key={news._id}
                      className="hover:bg-gray-50 cursor-pointer"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <td className="px-6 py-3">{news.title}</td>
                      <td className="px-6 py-3">
                        <img
                          src={news.image}
                          alt={news.title}
                          className="w-16 h-10 object-cover rounded"
                        />
                      </td>
                      <td className="px-6 py-3">{news.category}</td>
                      <td className="px-6 py-3">
                        {convert(news.description).slice(0, 15)}...
                      </td>
                      <td className="px-6 py-3">{news.date}</td>
                      <td className="px-6 py-3">
                        {news.status === 'pending' && (
                          <span className="px-2 py-[2px] bg-blue-100 text-blue-800 rounded-lg text-xs">
                            {news.status}
                          </span>
                        )}
                        {news.status === 'active' && (
                          <span className="px-2 py-[2px] bg-green-100 text-green-800 rounded-lg text-xs">
                            {news.status}
                          </span>
                        )}
                        {news.status === 'deactive' && (
                          <span className="px-2 py-[2px] bg-red-100 text-red-800 rounded-lg text-xs">
                            {news.status}
                          </span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};


export default ViewWriter;