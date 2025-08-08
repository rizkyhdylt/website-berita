import React, { useState, useContext, useEffect } from 'react';
import { FaCloudUploadAlt, FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import toast from 'react-hot-toast';
import { base_url } from '../../config/config';
import { motion, AnimatePresence } from 'framer-motion';

const Iklan = () => {
  const { store } = useContext(storeContext);
  const [image, setImage] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);
  const [editId, setEditId] = useState(null);

  const imageHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`${base_url}/ads`, {
        headers: { Authorization: `Bearer ${store.token}` }
      });
      setAds(data.ads);
    } catch (error) {
      toast.error('Gagal mengambil data iklan');
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const added = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error('Pilih gambar terlebih dahulu!');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);

      if (editId) {
        await axios.put(`${base_url}/api/ads/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${store.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Iklan berhasil diupdate!');
        setEditId(null);
      } else {
        await axios.post(`${base_url}/api/ads/add`, formData, {
          headers: {
            Authorization: `Bearer ${store.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success('Iklan berhasil ditambahkan!');
      }

      setLoading(false);
      setImage(null);
      setImgPreview(null);
      fetchAds();
    } catch (error) {
      setLoading(false);
      toast.error('Gagal menambah/mengedit iklan.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Yakin ingin menghapus iklan ini?')) return;
    try {
      await axios.delete(`${base_url}/api/ads/${id}`, {
        headers: { Authorization: `Bearer ${store.token}` }
      });
      toast.success('Iklan berhasil dihapus!');
      fetchAds();
    } catch {
      toast.error('Gagal menghapus iklan.');
    }
  };

  const handleEdit = (ad) => {
    setEditId(ad._id);
    setImgPreview(ad.image);
    setImage(null);
  };

  return (
    <div className="bg-white rounded-md p-6 shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Kelola Iklan</h2>

      {/* Upload Form */}
      <form onSubmit={added}>
        <label
          htmlFor="img"
          className="w-full h-[240px] flex rounded-lg border-2 border-dashed justify-center items-center cursor-pointer transition hover:border-blue-400 hover:bg-blue-50 overflow-hidden"
        >
          {imgPreview ? (
            <img src={imgPreview} className="w-full h-full object-cover" alt="Preview" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <FaCloudUploadAlt className="text-4xl" />
              <span className="font-medium">{editId ? 'Ganti Gambar Iklan' : 'Pilih Gambar Iklan'}</span>
            </div>
          )}
        </label>
        <input onChange={imageHandle} type="file" id="img" className="hidden" />

        <div className="mt-4 flex gap-2">
          <button
            disabled={loading}
            className={`px-5 py-2 rounded-md text-white font-medium transition ${
              loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {loading ? (editId ? 'Updating...' : 'Uploading...') : (editId ? 'Update Iklan' : 'Tambah Iklan')}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => { setEditId(null); setImgPreview(null); setImage(null); }}
              className="px-5 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition"
            >
              Batal Edit
            </button>
          )}
        </div>
      </form>

      {/* Ads List */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Daftar Iklan</h3>
        {ads.length === 0 && <div className="text-gray-500">Belum ada iklan.</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {ads.map(ad => (
              <motion.div
                key={ad._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col items-center bg-white"
              >
                <img src={ad.image} alt="Iklan" className="w-full h-32 object-cover rounded mb-3" />
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(ad)} className="text-blue-500 flex items-center gap-1 hover:text-blue-700">
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDelete(ad._id)} className="text-red-500 flex items-center gap-1 hover:text-red-700">
                    <FaTrash /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Iklan;
