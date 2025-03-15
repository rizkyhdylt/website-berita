  "use client";

  import React, { useState } from "react";
  import NewsCard from "./items/NewsCard";
  import Title from "../Title";

  const Sorotan = ({ news }) => {
    const [page, setPage] = useState(1);
    const perPage = 10;
    const totalPages = Math.ceil(news.length / perPage);

    const startIndex = (page - 1) * perPage;
    const selectedNews = news.slice(startIndex, startIndex + perPage);

    // Fungsi untuk membuat array pagination
    const generatePagination = () => {
      let pages = [];
      if (totalPages <= 5) {
        pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      } else {
        if (page === 1) {
          pages = [1, 2, 3, "Next"];
        } else if (page === totalPages) {
          pages = [ totalPages - 2, totalPages - 1, totalPages];
        } else {
          pages = [page - 1, page, page + 1, "Next"];
        }
      }
      return pages;
    };

    return (
      <div className="bg-[#ffdcf5] p-4 rounded-lg">
        <Title title="Sorotan" />

        <div className="w-full min-h-[500px] relative">
          <div className="flex flex-col gap-y-2">
            {selectedNews.map((item, i) => (
              <NewsCard key={i} item={item} />
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-4 text-lg font-medium">
          {generatePagination().map((p, i) => (
            <button
              key={i}
              className={`px-3 py-1 border rounded ${
                p === page ? "bg-red-500 text-white" : "text-black hover:bg-gray-200"
              }`}
              onClick={() => {
                if (p === "Next") setPage((prev) => Math.min(prev + 1, totalPages));
                else if (typeof p === "number") setPage(p);
              }}
              disabled={p === "..."}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    );
  };

  export default Sorotan;
