"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { base_api_url } from "@/config/config";

const Opini = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    noHp: "",
    judul: "",
    isi: "",
    kategori: "Lainnya",
    foto: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("newsToken");
    setToken(token);

    const stored = localStorage.getItem("userInfo");
    if (stored) {
      setUserInfo(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, foto: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base_api_url}/api/opini`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(res.data.message);
    } catch (err) {
      alert("Gagal mengirim opini");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">
          Kirim Opini / Laporan Masyarakat
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Sampaikan keluhan, saran, atau informasi Anda secara langsung.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Nama
            </label>
            <input
              type="text"
              name="nama"
              placeholder="Masukkan nama"
              value={formData.nama}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>
          
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Nomor HP
            </label>
            <input
              type="text"
              name="noHp"
              placeholder="Nomor HP"
              value={formData.noHp}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Judul Laporan
            </label>
            <input
              type="text"
              name="judul"
              placeholder="Masukkan judul laporan"
              value={formData.judul}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Isi Laporan
            </label>
            <textarea
              name="isi"
              placeholder="Tulis isi laporan Anda..."
              value={formData.isi}
              onChange={handleChange}
              required
              rows="5"
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Kategori
            </label>
            <select
              name="kategori"
              value={formData.kategori}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            >
              <option>Berita</option>
              <option>Keluhan</option>
              <option>Saran</option>
              <option>Lainnya</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Foto Pendukung (Opsional)
            </label>
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-600"
            />
            {formData.foto && (
              <img
                src={formData.foto}
                alt="Preview"
                className="mt-3 rounded-lg shadow max-h-48 object-cover"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
          >
            Kirim Laporan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Opini;
