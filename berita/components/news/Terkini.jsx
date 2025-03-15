import React from 'react'
import Title from '../Title';

const Terkini = ({ news }) => {
  return (
    <div>
      <Title title='Terkini' />
      <ul className="mt-4 bg-[#ffdcf5] p-2 shadow-md rounded-lg">
        {news.map((item, index) => (
          <li key={item._id} className="border-b py-2 last:border-none flex items-start">
            {/* Nomor Urut */}
            <span className="font-bold text-base text-black mr-2">{index + 1}.</span> 
            <div>
              <a href="#" className="text-sm text-black hover:underline">{item.title}</a>
              <p className="text-sm text-red-500">{item.category}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Terkini;
