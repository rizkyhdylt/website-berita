import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-cyan-400 text-black py-8">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-6">
        {/* Logo */}
        <div className='col-span-2 md:col-span-1 text-center md:text-left'>
          <h2 className="text-lg font-bold">JATENG UPDATES</h2>
        </div>

        {/* Kanal */}
        <div className="text-left">
          <h3 className="font-bold">Kanal</h3>
          <ul>
            <li><Link href={`/news/category/Peristiwa`}>Peristiwa</Link></li>
            <li><Link href={`/news/category/Pemerintahan`}>Pemerintahan</Link></li>
            <li><Link href={`/news/category/Hukum%20&%20Kriminal`}>Hukum & Kriminal</Link></li>
            <li><Link href={`/news/category/Bisnis%20&%20Ekonomi`}>Bisnis & Ekonomi</Link></li>
            <li><Link href={`/news/category/Politik`}>Politik</Link></li>
            <li><Link href={`/news/category/Sosial%20Budaya`}>Sosial Budaya</Link></li>
          </ul>
        </div>

        {/* Network */}
        <div className="text-right md:text-left">
          <h3 className="font-bold">Network</h3>
          <ul>
            <li><Link href="#">Kudus</Link></li>
            <li><Link href="#">Pekalongan</Link></li>
            <li><Link href="#">Rembang</Link></li>
            <li><Link href="#">Semarang</Link></li>
          </ul>
        </div>

        {/* About */}
        <div className="text-left">
          <h3 className="font-bold">About</h3>
          <ul>
            <li><Link href="#">Redaksi Kami</Link></li>
            <li><Link href="#">Kontak Kami</Link></li>
            <li><Link href="#">Info Iklan</Link></li>
          </ul>
        </div>

        {/* Connect With Us - HP kanan, Laptop tetap di bawah About */}
        <div className="text-right md:text-left md:col-span-1">
          <h3 className="font-bold">Connect With Us</h3>
          <div className="flex gap-3 mt-2 justify-end md:justify-start">
            <Link href={`https://www.instagram.com/jatengupdates/`}><FaInstagram size={24} className="text-pink-600" /></Link>
            <Link href={`https://www.facebook.com/JatengUpdates/`}><FaFacebook size={24} className="text-blue-600" /></Link>
            <Link href={`https://www.tiktok.com/@jateng_updates`}><FaTiktok size={24} className="text-black" /></Link>
          </div>
        </div>
      </div>

      <div className="border-t border-black mt-6 py-4 text-center text-sm">
        PT. Blora Digital Media | Copyright &copy; 2024 | Jateng Updates tidak bertanggung jawab atas konten dari situs eksternal
      </div>
    </footer>
  );
};

export default Footer;
