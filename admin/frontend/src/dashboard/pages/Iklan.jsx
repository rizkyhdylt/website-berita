import React, { useState, useContext } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import toast from 'react-hot-toast';
import { base_url } from '../../config/config';

const Iklan = () => {
    const { store } = useContext(storeContext);
    const [image, setImage] = useState(null);
    const [imgPreview, setImgPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const imageHandle = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImgPreview(URL.createObjectURL(file));
            setImage(file);
        }
    };

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
            const { data } = await axios.post(`${base_url}/api/ads/add`, formData, {
                headers: {
                    "Authorization": `Bearer ${store.token}`
                }
            });
            setLoading(false);
            toast.success('Iklan berhasil ditambahkan!');
            console.log(data);
        } catch (error) {
            setLoading(false);
            toast.error('Gagal menambahkan iklan.');
            console.error(error);
        }
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
                                <span>Pilih Gambar Iklan</span>
                            </div>
                        )}
                    </label>
                    <input required onChange={imageHandle} type='file' id='img' className='hidden' />
                </div>
                <div>
                    <button disabled={loading} className='mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
                        {loading ? 'Uploading...' : 'Tambah Iklan'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Iklan;
