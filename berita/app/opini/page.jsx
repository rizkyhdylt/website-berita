"use client";
import React, { useState } from 'react';

const page = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    judul: '',
    isi: '',
    kategori: '',
    setuju: false,
    foto: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simpan ke server di sini (bisa pakai fetch/axios)
    console.log('Form submitted:', formData);
    alert("Opini berhasil dikirim!");
  };

  return (
    <div id="top" className='min-h-screen flex flex-col bg-[#dfd3c3]'>
      <div className="flex-grow flex justify-center">
        <div className="bg-[#ffdcf5] max-w-4xl w-full p-6 shadow-lg rounded-md text-justify">
          <h2 className="text-3xl text-center font-bold mb-4">OPINI MASYARAKAT</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-semibold">Nama Lengkap</label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Email / No HP (opsional)</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded border"
              />
            </div>

            <div>
              <label className="block font-semibold">Judul Opini</label>
              <input
                type="text"
                name="judul"
                value={formData.judul}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              />
            </div>

            <div>
              <label className="block font-semibold">Isi Opini</label>
              <textarea
                name="isi"
                value={formData.isi}
                onChange={handleChange}
                rows="6"
                className="w-full p-2 rounded border"
                required
              ></textarea>
            </div>

            <div>
              <label className="block font-semibold">Kategori</label>
              <select
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                className="w-full p-2 rounded border"
                required
              >
                <option value="">-- Pilih Kategori --</option>
                <option value="Pemerintahan">Pemerintahan</option>
                <option value="Pendidikan">Pendidikan</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Infrastruktur">Infrastruktur</option>
                <option value="Sosial">Sosial</option>
                <option value="Budaya">Budaya</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold">Foto Pendukung (opsional)</label>
              <input
                type="file"
                name="foto"
                accept="image/*"
                onChange={handleChange}
                className="w-full"
              />
            </div>

            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="setuju"
                checked={formData.setuju}
                onChange={handleChange}
                required
              />
              <label className="text-sm">
                Saya menyatakan opini ini adalah hasil pemikiran pribadi dan siap dipublikasikan oleh Jatengupdates dengan penyuntingan seperlunya.
              </label>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-[#bf9270] hover:bg-[#a97155] text-white px-6 py-2 rounded font-semibold"
              >
                Kirim Opini
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
