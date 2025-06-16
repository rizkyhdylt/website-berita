import React, { useState, useContext, useEffect } from 'react';
import { FaCloudUploadAlt, FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import toast from 'react-hot-toast';
import { base_url } from '../../config/config';

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
    formData.append('image', image); // `image` adalah file object, bukan URL

    try {
        setLoading(true);

        if (editId) {
            // 🔄 EDIT MODE
            await axios.put(`${base_url}/api/ads/${editId}`, formData, {
                headers: {
                    Authorization: `Bearer ${store.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Iklan berhasil diupdate!');
            setEditId(null);
        } else {
            // ➕ ADD MODE
            await axios.post(`${base_url}/api/ads/add`, formData, {
                headers: {
                    Authorization: `Bearer ${store.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('Iklan berhasil ditambahkan!');
        }

        // ✅ Setelah berhasil
        setLoading(false);
        setImage(null);
        setImgPreview(null);
        fetchAds();
    } catch (error) {
        setLoading(false);
        toast.error('Gagal menambah/mengedit iklan.');
        console.error('ERROR:', error?.response?.data || error.message);
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
        } catch (error) {
            toast.error('Gagal menghapus iklan.');
        }
    };

    const handleEdit = (ad) => {
        setEditId(ad._id);
        setImgPreview(ad.image);
        setImage(null); // User harus pilih gambar baru
    };

    return (
        <div className='bg-white rounded-md p-4'>
            <h2 className='text-xl font-medium mb-4'>Kelola Iklan</h2>
            <form onSubmit={added}>
                <div className='mb-4'>
                    <label htmlFor='img' className='w-full h-[240px] flex rounded text-[#404040] gap-2 justify-center items-center cursor-pointer border-2 border-dashed'>
                        {imgPreview ? (
                            <img src={imgPreview} className='w-full h-full object-cover' alt='Preview' />
                        ) : (
                            <div className='flex flex-col items-center gap-2'>
                                <span className='text-3xl'><FaCloudUploadAlt /></span>
                                <span>{editId ? 'Ganti Gambar Iklan' : 'Pilih Gambar Iklan'}</span>
                            </div>
                        )}
                    </label>
                    <input onChange={imageHandle} type='file' id='img' className='hidden' />
                </div>
                <div>
                    <button disabled={loading} className='mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                        {loading ? (editId ? 'Updating...' : 'Uploading...') : (editId ? 'Update Iklan' : 'Tambah Iklan')}
                    </button>
                    {editId && (
                        <button type="button" onClick={() => { setEditId(null); setImgPreview(null); setImage(null); }} className='ml-2 px-4 py-2 bg-gray-400 text-white rounded-md'>
                            Batal Edit
                        </button>
                    )}
                </div>
            </form>

            <div className='mt-8'>
                <h3 className='text-lg font-semibold mb-2'>Daftar Iklan</h3>
                {ads.length === 0 && <div className='text-gray-500'>Belum ada iklan.</div>}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {ads.map(ad => (
                        <div key={ad._id} className='border rounded p-2 flex flex-col items-center'>
                            <img src={ad.image} alt='Iklan' className='w-full h-32 object-cover rounded mb-2' />
                            <div className='flex gap-2'>
                                <button onClick={() => handleEdit(ad)} className='text-blue-500 flex items-center gap-1'><FaEdit />Edit</button>
                                <button onClick={() => handleDelete(ad._id)} className='text-red-500 flex items-center gap-1'><FaTrash />Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Iklan;
