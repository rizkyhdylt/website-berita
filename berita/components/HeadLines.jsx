import React from 'react';
import LoadingSpinnerComponent from 'react-spinners-components';
import Marquee from 'react-fast-marquee';
import Link from 'next/link';

const HeadLines = ({ news }) => {
  return (
    <div className="bg-[#fbd0f5] shadow flex items-center">
      {/* TERPOPULER (Kiri) */}
      <div className="flex w-[50px] sm:w-[170px] bg-[#dddddd] relative after:absolute after:bg-[#dddddd] after:w-[20px] after:left-[40px] sm:after:left-[160px] after:skew-x-[20deg] after:top-0 after:bottom-0 after:z-30">
        <div className="pl-3 w-full flex items-center gap-x-2">
          <LoadingSpinnerComponent
            type="Ripple"
            colors={['#800000', '#c80000']}
            size="30px"
          />
          {/* Teks hanya muncul di layar >= sm */}
          <h2 className="text-[#333333] font-semibold text-lg hidden sm:block">
            TERPOPULER
          </h2>
        </div>
      </div>

      {/* HEADLINE MARQUEE */}
      <div className="flex-1 mx-4 overflow-hidden whitespace-nowrap">
        <Marquee>
          {Object.values(news)
            .flat()
            .map((n) => (
              <Link
                key={n.slug}
                href={`/news/${n.slug}`}
                className="block font-semibold hover:text-[#c80000] px-8 text-sm"
              >
                {n.title}
              </Link>
            ))}
        </Marquee>
      </div>

      {/* OPINI (Kanan) */}
      <div className="flex w-[70px] sm:w-[170px] bg-[#dddddd] relative before:absolute before:bg-[#dddddd] before:w-[20px] before:right-[60px] sm:before:right-[160px] before:skew-x-[-20deg] before:top-0 before:bottom-0 before:z-30">
        <div className="w-full flex justify-center items-center">
          <Link href="/opini">
            <button className="text-[#333333] font-semibold text-lg">
              OPINI
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeadLines;
