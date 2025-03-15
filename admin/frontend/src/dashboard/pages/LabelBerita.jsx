import React, { useEffect, useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const LabelBerita = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [parPage, setParPage] = useState(5);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/all/news")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data dari API:", data);
        const allNews = Object.values(data.news).flat();

        // Sorting berdasarkan date terbaru ke terlama
        allNews.sort((a, b) => new Date(b.date) - new Date(a.date));

        setNews(allNews);
        setPages(Math.ceil(allNews.length / parPage));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, [parPage]);

  return (
    <div className="bg-white rounded-md">
      {/* Filter & Search */}
      <div className="px-4 py-3 flex gap-x-3">
        <select className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10">
          <option value="">---select type---</option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="deactive">Deactive</option>
        </select>
        <input
          type="text"
          placeholder="search news"
          className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
        />
      </div>

      {/* Tabel Berita */}
      <div className="relative overflow-x-auto p-4">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-7 py-3">No</th>
              <th className="px-7 py-3">Title</th>
              <th className="px-7 py-3">Image</th>
              <th className="px-7 py-3">Category</th>
              <th className="px-7 py-3">Description</th>
              <th className="px-7 py-3">Date</th>
              <th className="px-7 py-3">Label</th>
              <th className="px-7 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : news.length > 0 ? (
              news.slice((page - 1) * parPage, page * parPage).map((n, i) => (
                <tr key={n._id} className="bg-white border-b">
                  <td className="px-6 py-4">{(page - 1) * parPage + i + 1}</td>
                  <td className="px-6 py-4">{n.title.slice(0, 15)}...</td>
                  <td className="px-6 py-4">
                    <img
                      className="w-[40px] h-[40px] object-cover"
                      src={n.image}
                      alt={n.title}
                    />
                  </td>
                  <td className="px-6 py-4">{n.category}</td>
                  <td className="px-6 py-4">{n.description?.slice(0, 15)}...</td>
                  <td className="px-6 py-4">{n.date}</td>
                  <td className="px-6 py-4">{n.status}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-start items-center gap-x-4 text-white">
                      <Link className="p-[6px] bg-green-500 rounded hover:shadow-lg hover:shadow-green-500/50">
                        <FaEye />
                      </Link>
                      
                      
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  Tidak ada berita aktif.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end px-10 gap-x-3 text-slate-600">
        <div className="flex gap-x-3 justify-center items-center">
          <p className="px-4 font-semibold text-sm">News per page</p>
          <select
            value={parPage}
            onChange={(e) => {
              setParPage(parseInt(e.target.value));
              setPage(1);
            }}
            className="px-3 py-2 rounded-md outline-0 border border-gray-300 focus:border-green-500 h-10"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <p className="px-6 font-semibold text-sm">
          {news.length > 0
            ? `${(page - 1) * parPage + 1}-${Math.min(page * parPage, news.length)} of ${news.length}`
            : "0 of 0"}
        </p>
        <div className="flex items-center gap-x-3">
          <IoIosArrowBack
            onClick={() => {
              if (page > 1) setPage(page - 1);
            }}
            className={`w-5 h-5 cursor-pointer ${
              page === 1 ? "text-gray-400 cursor-not-allowed" : ""
            }`}
          />
          <IoIosArrowForward
            onClick={() => {
              if (page < pages) setPage(page + 1);
            }}
            className={`w-5 h-5 cursor-pointer ${
              page === pages ? "text-gray-400 cursor-not-allowed" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default LabelBerita;
