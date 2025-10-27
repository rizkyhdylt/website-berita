"use client";
import React, { useState, useEffect, useCallback} from "react";
import axios from "axios";
import { base_api_url } from "@/config/config"; 

// ==========================================================
// ✅ LANGKAH 1: PISAHKAN InputField DAN GUNAKAN React.memo
// ==========================================================
const InputField = React.memo(({ label, name, type = "text", placeholder, required = true, value, onChange }) => (
  <div>
    <label className="block font-semibold text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      // Menerima nilai langsung sebagai prop
      value={value} 
      // Menerima handler langsung sebagai prop
      onChange={onChange} 
      required={required}
      className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
    />
  </div>
));
// ==========================================================


const Opini = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("opini");

  // Pastikan Anda menggunakan functional update di sini juga jika belum
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    noHp: "",
    judul: "",
    isi: "",
    kategori: "Lainnya",
    foto: "",
    fileType: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("newsToken");
    setToken(token);

    const stored = localStorage.getItem("userInfo");
    if (stored) {
      setUserInfo(JSON.parse(stored));
    }
  }, []);

  // Mereset field yang tidak relevan saat tab berubah
  useEffect(() => {
    // Gunakan functional update di sini untuk keamanan
    setFormData((prevData) => ({
      ...prevData,
      judul: "",
      isi: "",
      kategori: activeTab === "opini" ? "" : "Lainnya", 
      foto: "",
      fileType: "",
    }));
  }, [activeTab]);

  // ✅ LANGKAH 2: Pastikan functional update untuk input non-file
  // Gunakan useCallback untuk memastikan handleChange stabil, meskipun ini opsional
  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;

    if (name === "foto" && files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prevData) => ({ 
          ...prevData, 
          foto: reader.result,
          fileType: file.type
        }));
      };

      reader.readAsDataURL(file);
      
    } else {
      // Functional update yang benar untuk mencegah masalah stale state
      setFormData((prevData) => ({ 
        ...prevData, 
        [name]: value 
      }));
    }
  }, []); // Dependensi kosong karena menggunakan functional update

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ... (Logika handleSubmit yang lain tidak perlu diubah) ...
    // ... (Logika handleSubmit Anda) ...

    // Bagian ini menggunakan logika pengiriman data yang sama

    // Validasi Khusus untuk tab Opini (file wajib)
    if (activeTab === "opini" && !formData.foto) {
        alert("Untuk Opini, Anda wajib menyertakan File Pendukung (Gambar/Dokumen).");
        return;
    }

    // Siapkan data yang akan dikirim berdasarkan tab
    const dataToSend =
        activeTab === "opini"
        ? {
            nama: formData.nama,
            email: formData.email,
            noHp: formData.noHp,
            judul: `Opini File (${formData.fileType || 'Dokumen'})`, 
            isi: "Pengiriman opini berupa file/dokumen terlampir.",
            kategori: "File Opini", 
            foto: formData.foto,
            }
        : formData;

    try {
        const url =
        activeTab === "opini"
            ? `${base_api_url}/api/opini` 
            : `${base_api_url}/api/laporan`; 

        const res = await axios.post(url, dataToSend, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });

        alert(res.data.message);
        // Reset form data setelah sukses
        setFormData({
        nama: "",
        email: "",
        noHp: "",
        judul: "",
        isi: "",
        kategori: "Lainnya",
        foto: "",
        fileType: "",
        });
    } catch (err) {
        alert("Gagal mengirim data");
        console.error(err);
    }
  };


  return (
    <div className="min-h-screen bg-zinc-800 py-10">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        
        {/* ... (Tabs tidak diubah) ... */}
        <div className="flex justify-center mb-8">
            <button
                onClick={() => setActiveTab("opini")}
                className={`px-6 py-2 rounded-l-lg font-semibold transition ${
                activeTab === "opini"
                    ? "bg-pink-600 text-white shadow"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
            >
                📄 Kirim Opini (File)
            </button>
            <button
                onClick={() => setActiveTab("laporan")}
                className={`px-6 py-2 rounded-r-lg font-semibold transition ${
                activeTab === "laporan"
                    ? "bg-pink-600 text-white shadow"
                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                }`}
            >
                📢 Laporan Masyarakat
            </button>
        </div>

        <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">
            {activeTab === "opini" ? "Kirim Opini Berupa File/Dokumen" : "Laporan Masyarakat"}
        </h2>
        <p className="text-gray-500 text-center mb-6">
            {activeTab === "opini"
                ? "Kirimkan opini Anda dalam bentuk file/dokumen (Gambar, PDF, Word Document) yang terlampir."
                : "Laporkan keluhan, saran, atau informasi penting kepada kami dengan detail."}
        </p>
        

        {/* ====== Form ====== */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Data Diri (Selalu Ada) */}
          <InputField 
            label="Nama" 
            name="nama" 
            placeholder="Masukkan nama" 
            value={formData.nama} // Prop value
            onChange={handleChange} // Prop onChange
          />
          <InputField 
            label="Email" 
            name="email" 
            type="email" 
            placeholder="Masukkan email" 
            value={formData.email} // Prop value
            onChange={handleChange} // Prop onChange
          />
          <InputField 
            label="Nomor HP" 
            name="noHp" 
            placeholder="Nomor HP" 
            value={formData.noHp} // Prop value
            onChange={handleChange} // Prop onChange
          />

          {/* Bagian Khusus Laporan Masyarakat */}
          {activeTab === "laporan" && (
            <>
              <InputField
                label="Judul Laporan"
                name="judul"
                placeholder="Masukkan judul laporan"
                value={formData.judul} // Prop value
                onChange={handleChange} // Prop onChange
              />
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Isi Laporan</label>
                <textarea
                  name="isi"
                  placeholder="Tulis laporan Anda..."
                  value={formData.isi}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
                />
              </div>
              {/* ... (Select Kategori tidak diubah) ... */}
              <div>
                 <label className="block font-semibold text-gray-700 mb-1">Kategori</label>
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
            </>
          )}

          {/* Bagian File Pendukung (Wajib untuk Opini, Opsional untuk Laporan) */}
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              {activeTab === "opini"
                ? "File Opini (DOCX, PDF, Gambar) (Wajib)" // Teks untuk tab Opini
                : "File Pendukung Laporan (Wajib)" // Teks untuk tab Laporan
              }
            </label>
            <input
              type="file"
              name="foto"
              accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
              onChange={handleChange}
              required={activeTab === "opini"} 
              className="w-full text-gray-600"
            />
            
            {/* Logika Pratinjau Kondisional */}
            {formData.foto && (
              <div className="mt-3">
                {formData.fileType.startsWith("image/") ? (
                  <img
                    src={formData.foto}
                    alt="Preview"
                    className="rounded-lg shadow max-h-48 object-cover"
                  />
                ) : (
                  <p className="p-3 bg-blue-100 text-blue-800 border border-blue-300 rounded-lg font-medium">
                    📁 File **{formData.fileType.split('/').pop() || 'Dokumen'}** berhasil dimuat. Siap dikirim!
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-200"
          >
            {activeTab === "opini" ? "Kirim Opini File" : "Kirim Laporan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Opini;