import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../config/config';

const Opini = () => {
    const { id } = useParams();
    const [opini, setOpini] = useState(null);
    const token = localStorage.getItem("newsToken");

    useEffect(() => {
        axios.get(`${base_url}/api/opini/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setOpini(res.data))
        .catch(err => console.error(err));
    }, [id, token]); 

    // 💡 FUNGSI UNTUK MENGANALISIS JENIS DAN NAMA FILE DARI URL CLOUDINARY
    const getFileInfo = (opiniData, url) => { // ⬅️ Terima opiniData sebagai argumen
        if (!url || !opiniData) return { type: null, name: '' };
        
        const urlParts = url.split('/');
        const fullName = urlParts.pop();
        
        const extensionMatch = fullName.match(/\.([0-9a-z]+)(?=[?#]|$)/i);
        const extension = extensionMatch ? extensionMatch[1].toLowerCase() : '';

        let type;
        if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
            type = 'image';
        } else if (extension === 'pdf') {
            type = 'pdf';
        } else if (['doc', 'docx', 'xls', 'xlsx'].includes(extension)) {
            type = 'document';
        } else {
            type = 'other';
        }
        
        // 3. Buat nama file yang lebih rapi untuk di-download
        // 💡 PERBAIKAN: Gunakan opiniData.judul yang diterima sebagai argumen
        const baseTitle = opiniData.judul.substring(0, 30).replace(/[^a-zA-Z0-9\s]/g, '').trim().replace(/\s+/g, '_');
        const cleanName = `${baseTitle}_lampiran.${extension}`;

        return { type, name: cleanName, extension };
    };

    if (!opini) return <p className="p-5 text-lg text-gray-600">Loading...</p>;

    // 💡 Perhatikan cara memanggil getFileInfo, harus diberikan opini
    const { type: fileType, name: fileName, extension: fileExtension } = getFileInfo(opini, opini.foto);
    const fileUrl = opini.foto; 
    
    // 🛠️ PERBAIKAN UTAMA: Modifikasi URL untuk memaksa download
    // 1. Ganti karakter ilegal pada fileName (hanya boleh huruf, angka, underscore, dash, dan titik)
    const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    
    // 2. Gunakan `fl_attachment` tanpa trailing slash `/` di akhir string pengganti
    const downloadUrl = fileUrl 
        ? fileUrl.replace(
              '/upload/', 
              `/upload/fl_attachment:${safeFileName}/` // Catatan: Slash di akhir sini mungkin juga menjadi sumber masalah.
          )
        : '';
        
    // 💡 Coba opsi yang lebih aman tanpa slash tambahan, karena Public ID sudah ada di akhir URL
    const saferDownloadUrl = fileUrl
        ? fileUrl.replace('/upload/', `/upload/fl_attachment:${safeFileName},`)
        : '';
        
    // Kita akan menggunakan yang lebih mendekati sintaks resmi Cloudinary untuk transformasi di sini:
    const finalDownloadUrl = fileUrl 
    ? fileUrl.replace('/upload/', '/upload/fl_attachment/')
    : '';

    return (
        <div className="p-5 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
            
            {/* ... (Detail Opini) ... */}
            
            <div className="border-b pb-4 mb-4">
                <h1 className="text-3xl font-extrabold text-gray-800 capitalize mb-1">{opini.judul}</h1>
                <p className="text-sm font-medium text-pink-600">Kategori: {opini.kategori}</p>
                <p className="text-gray-500 mt-2">
                    {opini.type === 'opini' ? 'Penulis Opini' : 'Pelapor'}: 
                    <span className="font-semibold text-gray-700"> {opini.nama} </span>
                    (<a href={`mailto:${opini.email}`} className="text-blue-500 hover:underline">{opini.email}</a>)
                </p>
                <p className="text-sm text-gray-500">No. HP: {opini.noHp}</p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-2 text-gray-800">Isi Pesan:</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{opini.isi}</p>
            </div>
            
            {/* ====== TAMPILAN FILE LAMPIRAN ====== */}
            {opini.foto && (
                <div className="border-t pt-4">
                    <h2 className="text-xl font-bold mb-3 text-gray-800">Lampiran File</h2>

                    {fileType === 'image' && (
                        <div className="mb-4">
                            <img src={fileUrl} alt="Lampiran Gambar Opini" className="max-w-full md:max-w-lg rounded-lg shadow-md border object-cover" />
                        </div>
                    )}

                    {/* 2. Tampilan untuk Dokumen (PDF, DOCX, dll) */}
                    {['pdf', 'document', 'other'].includes(fileType) && (
                         <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg mb-4 text-yellow-800 font-medium flex items-center justify-between">
                            <span>📎 File terlampir ({fileExtension.toUpperCase() || 'DOCUMENT'}): **{safeFileName}**</span>
                            <a 
                                href={finalDownloadUrl} // 💡 Menggunakan finalDownloadUrl yang dimodifikasi
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-green-600 hover:text-green-800 hover:underline ml-4 font-semibold"
                            >
                                {fileType === 'pdf' ? 'Lihat/Download' : 'Download File'}
                            </a>
                         </div>
                    )}
                </div>
            )}
            
        </div>
    );
};

export default Opini;