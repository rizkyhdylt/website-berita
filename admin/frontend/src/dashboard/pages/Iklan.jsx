import React, { useState, useContext, useEffect } from 'react';
import { FaCloudUploadAlt, FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import toast from 'react-hot-toast';
import { base_url } from '../../config/config';
import { motion } from 'framer-motion';

const Iklan = () => {
  const { store } = useContext(storeContext);
  const [image, setImage] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState([]);
  const [editSlot, setEditSlot] = useState('');

  const slots = [1, 2, 3, 4, 5, 6];

  const imageHandle = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
      setImage(file);
    }
  };

  const fetchAds = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/ads`, {
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

    if (!editSlot) {
      toast.error('Pilih slot iklan!');
      return;
    }

    if (!image) {
      toast.error('Pilih gambar terlebih dahulu!');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('slotNumber', Number(editSlot)); // ✅ selalu number

    try {
      setLoading(true);

      const existingAd = ads.find(ad => ad.slotNumber === Number(editSlot));
      if (existingAd) {
        await axios.put(`${base_url}/api/ads/${existingAd._id}`, formData, {
          headers: {
            Authorization: `Bearer ${store.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success(`Iklan slot ${editSlot} berhasil diupdate!`);
      } else {
        await axios.post(`${base_url}/api/ads/add`, formData, {
          headers: {
            Authorization: `Bearer ${store.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        toast.success(`Iklan slot ${editSlot} berhasil ditambahkan!`);
      }

      setLoading(false);
      setImage(null);
      setImgPreview(null);
      setEditSlot('');
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

  return (
    <div className="bg-white rounded-md p-6 shadow">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Kelola Iklan</h2>

      {/* Upload Form */}
      <form onSubmit={added} className="mb-6">
        <div className="mb-3">
          <label className="block font-medium text-gray-700 mb-1">Pilih Slot Iklan</label>
          <select
            value={editSlot}
            onChange={(e) => setEditSlot(Number(e.target.value))}
            className="border rounded px-3 py-2 w-full"
          >
            <option value="">-- Pilih Slot --</option>
            {slots.map(num => (
              <option key={num} value={num}>Iklan {num}</option>
            ))}
          </select>
        </div>

        <label
          htmlFor="img"
          className="w-full h-[240px] flex rounded-lg border-2 border-dashed justify-center items-center cursor-pointer transition hover:border-blue-400 hover:bg-blue-50 overflow-hidden"
        >
          {imgPreview ? (
            <img src={imgPreview} className="w-full h-full object-cover" alt="Preview" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <FaCloudUploadAlt className="text-4xl" />
              <span className="font-medium">Pilih Gambar Iklan</span>
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
            {loading ? 'Menyimpan...' : 'Simpan Iklan'}
          </button>
        </div>
      </form>

      {/* Ads List */}
      <h3 className="text-lg font-semibold mb-3 text-gray-700">Daftar Slot Iklan</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {slots.map(num => {
          const ad = ads.find(item => item.slotNumber === num);
          return (
            <motion.div
              key={num}
              className="border rounded-lg shadow p-3 flex flex-col items-center bg-white"
            >
              <h4 className="font-semibold mb-2">Iklan {num}</h4>
              {ad ? (
                <>
                  <img src={ad.image} alt={`Iklan ${num}`} className="w-full h-32 object-cover rounded mb-3" />
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setEditSlot(num);
                        setImgPreview(ad.image);
                      }}
                      className="text-blue-500 flex items-center gap-1 hover:text-blue-700"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(ad._id)}
                      className="text-red-500 flex items-center gap-1 hover:text-red-700"
                    >
                      <FaTrash /> Hapus
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <FaCloudUploadAlt className="text-4xl mb-2" />
                  <span>Kosong</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Iklan;
