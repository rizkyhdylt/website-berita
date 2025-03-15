import React from 'react';

const InformasiCard = () => {
  return (
    <div className="md:flex justify-center">
      <div className="bg-white max-w-4xl w-full p-6 shadow-lg rounded-md text-left">
        <p className="text-sm text-gray-500">Homepage / Peristiwa</p>
        <h1 className="text-2xl font-bold mt-2">
          Abrasi di Pantai Caruban, Warga Bergotong Royong Membuat Tanggul Darurat
        </h1>
        <p className="text-xs text-gray-400 mt-1">Jumat, 27 Des 2023 14:58 WIB</p>
        <p className="text-sm text-gray-600">Oleh: Akun Tim Wartawan</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-gray-600">Bagikan:</span>
        </div>
        <div className="flex gap-3 mt-2 justify-end md:justify-start">
            <Link href="#"><FaInstagram size={24} className="text-pink-600" /></Link>
            <Link href="#"><FaFacebook size={24} className="text-blue-600" /></Link>
            <Link href="#"><FaTiktok size={24} className="text-black" /></Link>
          </div>
        
        <img 
          src="/path-to-your-image.jpg" 
          alt="Illustration" 
          className="w-full mt-4 rounded-md"
        />
        
        <p className="mt-4 text-gray-700 text-sm leading-normal text-left">
          JATENG UPDATES – Rembang | Abrasi yang terus menggerus kawasan Pantai Caruban...
        </p>
        
        <div className="mt-6 text-blue-600 font-bold text-sm cursor-pointer text-left">
          Baca Juga: Bupati Blora, SKK Migas Beri Apresiasi Positif Gelaran Pra UKW Oleh PWI Blora
        </div>
      </div>
      
      <div className="hidden md:block w-64 ml-6 bg-gray-200 text-center p-4 h-full shadow-md">
        Advertisement
      </div>
    </div>
  );
};

export default InformasiCard;
