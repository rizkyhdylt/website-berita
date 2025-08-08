import React, { useState, useRef, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCloudUploadAlt } from "react-icons/fa";
import JoditEditor from 'jodit-react';
import Gallery from '../components/Gallery';
import { base_url } from '../../config/config';
import axios from 'axios';
import storeContext from '../../context/storeContext';
import toast from 'react-hot-toast';

const CreateNews = () => {
  const { store } = useContext(storeContext);
  const [show, setShow] = useState(false);
  const editor = useRef(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const [image, setImage] = useState('');
  const [img, setImg] = useState('');
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [description, setDescription] = useState('');

  const isAdmin = store?.userInfo?.role === 'admin';
  const [newCategory, setNewCategory] = useState('');
  const [newCity, setNewCity] = useState('');

  const addCategory = async () => {
    try {
      if (!newCategory.trim()) return toast.error('Masukkan nama kategori');
      await axios.post(`${base_url}/api/category`, { name: newCategory });
      toast.success('Kategori ditambahkan!');
      setNewCategory('');
      const res = await axios.get(`${base_url}/api/category`);
      setCategories(res.data);
    } catch {
      toast.error('Gagal tambah kategori');
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${base_url}/api/category/${id}`);
      toast.success('Kategori dihapus');
      const res = await axios.get(`${base_url}/api/category`);
      setCategories(res.data);
    } catch {
      toast.error('Gagal hapus kategori');
    }
  };

  const addCity = async () => {
    try {
      if (!newCity.trim()) return toast.error('Masukkan nama kota');
      await axios.post(`${base_url}/api/city`, { name: newCity });
      toast.success('Kota ditambahkan!');
      setNewCity('');
      const res = await axios.get(`${base_url}/api/city`);
      setCities(res.data);
    } catch {
      toast.error('Gagal tambah kota');
    }
  };

  const deleteCity = async (id) => {
    try {
      await axios.delete(`${base_url}/api/city/${id}`);
      toast.success('Kota dihapus');
      const res = await axios.get(`${base_url}/api/city`);
      setCities(res.data);
    } catch {
      toast.error('Gagal hapus kota');
    }
  };

  const imageHandle = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setImg(URL.createObjectURL(files[0]));
      setImage(files[0]);
    }
  };

  const [loader, setLoader] = useState(false);

  const added = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('city', city);
    formData.append('description', description);
    formData.append('image', image);

    try {
      setLoader(true);
      const { data } = await axios.post(`${base_url}/api/news/add`, formData, {
        headers: { Authorization: `Bearer ${store.token}` }
      });
      setLoader(false);
      toast.success(data.message);
    } catch (error) {
      setLoader(false);
      toast.error(error.response?.data?.message || 'Gagal menambahkan berita');
    }
  };

  const [images, setImages] = useState([]);

  const get_images = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/images`, {
        headers: { Authorization: `Bearer ${store.token}` }
      });
      setImages(data.images);
    } catch (error) {
      console.log(error);
    }
  };

  const imageHandler = async (e) => {
    const files = e.target.files;
    try {
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
      const { data } = await axios.post(`${base_url}/api/images/add`, formData, {
        headers: { Authorization: `Bearer ${store.token}` }
      });
      setImages([...images, data.images]);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal upload gambar');
    }
  };

  useEffect(() => {
    const fetchCategoryAndCity = async () => {
      try {
        const [categoryRes, cityRes] = await Promise.all([
          axios.get(`${base_url}/api/category`),
          axios.get(`${base_url}/api/city`)
        ]);
        setCategories(categoryRes.data);
        setCities(cityRes.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategoryAndCity();
    get_images();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center p-5 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Tambah Berita</h2>
        <Link
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-indigo-600 text-white shadow hover:from-indigo-600 hover:to-indigo-700 transition"
          to="/dashboard/news"
        >
          Kembali ke News
        </Link>
      </div>

      {/* Form */}
      <div className="p-5">
        <form onSubmit={added} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Judul
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Masukkan judul berita"
              name="title"
              id="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Kategori
            </label>
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
              name="category"
              id="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
            >
              <option value="">--- Pilih kategori ---</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            {isAdmin && (
              <div className="mt-3 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Tambah kategori baru"
                    className="flex-1 border px-3 py-1 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={addCategory}
                    className="bg-green-500 text-white px-4 rounded-lg hover:bg-green-600"
                  >
                    Tambah
                  </button>
                </div>
                <ul className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
                  {categories.map((cat) => (
                    <li
                      key={cat._id}
                      className="flex justify-between items-center py-1 border-b last:border-0"
                    >
                      <span>{cat.name}</span>
                      <button
                        onClick={() => deleteCategory(cat._id)}
                        type="button"
                        className="text-red-500 text-xs hover:underline"
                      >
                        Hapus
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              Kota
            </label>
            <select
              onChange={(e) => setCity(e.target.value)}
              value={city}
              required
              name="city"
              id="city"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 outline-none transition"
            >
              <option value="">--- Pilih kota ---</option>
              {cities.map((cty) => (
                <option key={cty._id} value={cty.name}>
                  {cty.name}
                </option>
              ))}
            </select>

            {isAdmin && (
              <div className="mt-3 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    placeholder="Tambah kota baru"
                    className="flex-1 border px-3 py-1 rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={addCity}
                    className="bg-green-500 text-white px-4 rounded-lg hover:bg-green-600"
                  >
                    Tambah
                  </button>
                </div>
                <ul className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-sm">
                  {cities.map((cty) => (
                    <li
                      key={cty._id}
                      className="flex justify-between items-center py-1 border-b last:border-0"
                    >
                      <span>{cty.name}</span>
                      <button
                        onClick={() => deleteCity(cty._id)}
                        type="button"
                        className="text-red-500 text-xs hover:underline"
                      >
                        Hapus
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Image */}
          <div>
            <label
              htmlFor="img"
              className="w-full h-56 flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 cursor-pointer hover:border-indigo-400 transition"
            >
              {img ? (
                <img src={img} alt="preview" className="w-full h-full object-cover rounded-lg" />
              ) : (
                <>
                  <FaCloudUploadAlt className="text-4xl text-gray-400" />
                  <span className="text-gray-500">Pilih gambar utama</span>
                </>
              )}
            </label>
            <input required onChange={imageHandle} className="hidden" type="file" id="img" />
          </div>

          {/* Description */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <span
                onClick={() => setShow(true)}
                className="text-indigo-500 cursor-pointer hover:underline text-sm"
              >
                Pilih dari galeri
              </span>
            </div>
            <div className="border rounded-lg overflow-hidden">
              <JoditEditor
                ref={editor}
                value={description}
                tabIndex={1}
                onBlur={(value) => setDescription(value)}
                onChange={() => {}}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              disabled={loader}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg font-medium shadow hover:from-indigo-600 hover:to-indigo-700 transition disabled:opacity-50"
            >
              {loader ? 'Loading...' : 'Tambah Berita'}
            </button>
          </div>
        </form>
      </div>

      <input onChange={imageHandler} type="file" multiple id="images" className="hidden" />
      {show && <Gallery setShow={setShow} images={images} />}
    </div>
  );
};

export default CreateNews;
