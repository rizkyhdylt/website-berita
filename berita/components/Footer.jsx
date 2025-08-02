import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import logo from '../assets/logojateng.png';
import smsi from '../assets/SMSI.png'
import {base_url} from '../config/config';

const Footer = () => {
  return (
    <footer className="bg-cyan-400 text-black py-8">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-6 gap-6">
       {/* Logo dan Judul */}
       <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
        {/* Logo Jateng Updates */}
        <div className="w-[150px] h-[80px] sm:w-[180px] sm:h-[90px] mb-4">
          <Image 
            src={logo} 
            alt="Jatengupdates Logo" 
            width={150} 
            height={80}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Logo SMSI di bawah dan agak ke kanan */}
        <div className="w-[100px] h-[50px] sm:w-[120px] sm:h-[60px] self-center">
          <Image 
            src={smsi} 
            alt="Logo SMSI" 
            width={100} 
            height={50}
            className="object-contain w-full h-full"
          />
        </div>
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
        <nav className="text-left">
          <h3 className="font-bold">About</h3>
          <ul>
            <li><Link href="/about/redaksi#top" passHref>Redaksi Kami</Link></li>
            <li><Link href="/about/kontak#top" passHref>Kontak Kami</Link></li>
            <li><Link href="/about/iklan#top" passHref>Info Iklan</Link></li>
            <li><Link href="/about/pedoman#top" passHref>Pedoman Media Siber</Link></li>
            <li><Link href="/about/disclaimer#top" passHref>Disclaimer</Link></li>
          </ul>
        </nav>

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
