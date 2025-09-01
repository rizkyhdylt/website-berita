import React, { useState, useRef, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaCloudUploadAlt } from "react-icons/fa";
import JoditEditor from "jodit-react";
import Gallery from "../components/Gallery";
import { base_url } from "../../config/config";
import axios from "axios";
import storeContext from "../../context/storeContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Edit_news = () => {
  const { news_id } = useParams();
  const { store } = useContext(storeContext);

  const [show, setShow] = useState(false);
  const editor = useRef(null);

  const [old_image, set_old_image] = useState("");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");
  const [img, setImg] = useState("");
  const [description, setDescription] = useState("");

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);

  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);
  const [imagesLoader, setImagesLoader] = useState(false);

  const imageHandle = (e) => {
    const { files } = e.target;
    if (files.length > 0) {
      setImg(URL.createObjectURL(files[0]));
      setImage(files[0]);
    }
  };

  const added = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("city", city);
    formData.append("description", description);
    formData.append("new_image", image);
    formData.append("old_image", old_image);

    try {
      setLoader(true);
      const { data } = await axios.put(
        `${base_url}/api/news/update/${news_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setLoader(false);
      toast.success(data.message);
    } catch (error) {
      setLoader(false);
      toast.error(error.response?.data?.message || "Gagal update berita");
    }
  };

  const get_images = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/images`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
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
        formData.append("images", files[i]);
      }
      setImagesLoader(true);
      const { data } = await axios.post(
        `${base_url}/api/images/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
        }
      );
      setImagesLoader(false);
      setImages([...images, data.images]);
      toast.success(data.message);
    } catch (error) {
      setImagesLoader(false);
      toast.error(error.response?.data?.message || "Gagal upload gambar");
    }
  };

  const get_news = async () => {
    try {
      const { data } = await axios.get(`${base_url}/api/news/${news_id}`, {
        headers: {
          Authorization: `Bearer ${store.token}`,
        },
      });
      setTitle(data?.news?.title);
      setCategory(data?.news?.category);
      setCity(data?.news?.city);
      setDescription(data?.news?.description);
      setImg(data?.news?.image);
      set_old_image(data?.news?.image);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchCategoryAndCity = async () => {
      try {
        const [categoryRes, cityRes] = await Promise.all([
          axios.get(`${base_url}/api/category`),
          axios.get(`${base_url}/api/city`),
        ]);
        setCategories(categoryRes.data);
        setCities(cityRes.data);
      } catch (err) {
        console.log("Gagal mengambil kategori atau kota:", err);
      }
    };

    fetchCategoryAndCity();
    get_news();
    get_images();
  }, [news_id]);

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-4"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-xl font-semibold text-indigo-700">
          ✏️ Edit News
        </h2>
        <Link
          className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg shadow transition"
          to="/dashboard/news"
        >
          📄 News List
        </Link>
      </div>

      {/* Form */}
      <form onSubmit={added} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Judul
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Masukkan judul berita"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="">--- Pilih kategori ---</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            Kota
          </label>
          <select
            onChange={(e) => setCity(e.target.value)}
            value={city}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="">--- Pilih kota ---</option>
            {cities.map((cty) => (
              <option key={cty._id} value={cty.name}>
                {cty.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image */}
        <div>
          <label
            htmlFor="img"
            className="block mb-2 font-medium text-gray-700"
          >
            Gambar
          </label>
          <label
            htmlFor="img"
            className="w-full h-[240px] flex flex-col justify-center items-center border-2 border-dashed border-indigo-300 rounded-lg cursor-pointer hover:bg-indigo-50 transition"
          >
            {img ? (
              <img
                src={img}
                className="w-full h-full object-cover rounded-lg"
                alt="news"
              />
            ) : (
              <div className="flex flex-col items-center text-indigo-500">
                <FaCloudUploadAlt className="text-4xl mb-2" />
                <span>Pilih Gambar</span>
              </div>
            )}
          </label>
          <input
            onChange={imageHandle}
            className="hidden"
            type="file"
            id="img"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium text-gray-700 mb-2">
            Deskripsi
          </label>
          <span
                onClick={() => setShow(true)}
                className="text-indigo-500 cursor-pointer hover:underline text-sm"
              >
                Pilih dari galeri
          </span>
          <JoditEditor
            ref={editor}
            value={description}
            tabIndex={1}
            onBlur={(value) => setDescription(value)}
            onChange={() => {}}
          />
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={loader}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
        >
          {loader ? "⏳ Updating..." : "💾 Update News"}
        </motion.button>
      </form>

      {/* Hidden multiple upload */}
      <input
        onChange={imageHandler}
        type="file"
        multiple
        id="images"
        className="hidden"
      />

      {/* Gallery */}
      {show && <Gallery setShow={setShow} images={images} />}
    </motion.div>
  );
};

export default Edit_news;
