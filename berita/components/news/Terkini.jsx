import React from 'react'
import Title from '../Title';
import Link from 'next/link';

const Terkini = ({ news }) => {
  return (
    <div>
      <Title title='Terkini' />
      <ul className="mt-4 bg-[#fce7f3] p-2 shadow-md ">
        {news.map((item, index) => (
          <li key={item._id} className="border-b py-2 last:border-none flex items-start">
            {/* Nomor Urut */}
            <span className="font-bold text-base text-black mr-2">{index + 1}.</span> 
            <div className="flex flex-col">
              <Link href={`/news/${item.slug}`} className="text-base text-black hover:text-red-500">
                {item.title}
              </Link>
              <Link href={`/news/category/${item?.category}`} className="text-xs text-red-500 hover:underline">
                {item.category}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Terkini;
