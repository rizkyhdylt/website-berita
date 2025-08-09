import React, { useEffect, useState } from 'react';
import { FaImage } from "react-icons/fa6";
import { motion } from "framer-motion";
import { base_url } from '../../config/config';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('newsToken');
      try {
        const res = await axios.get(`${base_url}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem('newsToken');
    try {
      const res = await axios.put(`${base_url}/api/user/change-password`, {
        old_password: oldPassword,
        new_password: newPassword
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert(res.data.message || 'Password berhasil diubah!');
      setOldPassword('');
      setNewPassword('');
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengubah password.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedImage(URL.createObjectURL(file));
    setUploading(true);

    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('newsToken');

    try {
      const res = await axios.post(`${base_url}/api/uploadImage`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Upload berhasil!');
      setUser({ ...user, image: res.data.image });
    } catch (err) {
      alert('Gagal upload gambar.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
      {/* Card Profile */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
        className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
      >
        <div className="flex items-center gap-4">
          <label 
            htmlFor="img" 
            className="w-[150px] h-[150px] rounded-full border-4 border-indigo-500 flex justify-center items-center overflow-hidden cursor-pointer hover:scale-105 transition"
          >
            {selectedImage || user?.image ? (
              <img
                src={selectedImage || user.image}
                alt="Profile"
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <FaImage size={30} />
                <span className="text-sm mt-1">Select Image</span>
              </div>
            )}
          </label>
          <input type="file" id="img" className="hidden" onChange={handleImageUpload} />
          <div className="flex flex-col text-gray-700">
            {user ? (
              <>
                <span className="font-semibold text-lg">{user.name}</span>
                <span className="text-sm">{user.email}</span>
                <span className="text-xs capitalize">{user.role}</span>
              </>
            ) : (
              <span>Loading profile...</span>
            )}
            {uploading && <span className="text-xs text-indigo-500 mt-1">Uploading...</span>}
          </div>
        </div>
      </motion.div>

      {/* Card Change Password */}
<motion.div 
  initial={{ opacity: 0, y: 20 }} 
  animate={{ opacity: 1, y: 0 }} 
  transition={{ duration: 0.4, delay: 0.1 }}
  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
>
  <h2 className="text-lg font-semibold text-center mb-4">Change Password</h2>
  
  {user?.provider === 'google' ? (
    <p className="text-center text-gray-500">
      Akun login Google tidak dapat mengubah password di sini.
    </p>
  ) : (
    <form onSubmit={handleChangePassword} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Old Password</label>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded-md text-white font-semibold transition ${
          loading ? "bg-gray-400" : "bg-indigo-500 hover:bg-indigo-600"
        }`}
      >
        {loading ? "Changing..." : "Change Password"}
      </button>
    </form>
  )}
</motion.div>
    </div>
  );
};

export default Profile;
