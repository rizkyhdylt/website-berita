
import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa';
import Link from 'next/link'
import { base_api_url } from '@/config/config';
import parse from 'html-react-parser';


const Details = async ({ params }) => {
   
    const resolvedParams = await params; // ✅ Tunggu params agar bisa digunakan
    const { slug } = resolvedParams; // ✅ Ambil slug setelah params selesai di-load
    
    const res = await fetch(`${base_api_url}/api/news/details/${slug}`);
    const { news } = await res.json()

    
    return (
        <div  id="top" className="min-h-screen flex flex-col bg-[#dfd3c3]">
            {/* Wrapper Konten */}
            <div className="flex-grow flex justify-center">
                <div className="bg-[#ffdcf5] max-w-4xl w-full p-6 shadow-lg rounded-md text-left">
                    <Breadcrumb one={news.category} two={news.title} />

                    {/* Kategori */}
                    <h1 className="text-sm font-bold mt-4">
                    {news.city}
                    </h1>

                    <h1 className="text-3xl font-bold mt-3">
                        {news.title}
                    </h1>
                    <p className="text-xs text-gray-400 mt-1">{news.date}</p>
                    <p className="text-sm text-gray-600">
                        {news ? `Oleh: ${news.WriterName}` : 'Penulis tidak tersedia'}
                    </p>

                    {/* Bagikan ke Sosial Media */}
                    <div className="flex items-center gap-2 mt-3">
                        <span className="text-gray-600">Bagikan:</span>
                        <div className="flex gap-3"> 
                            <Link href="#" aria-label="Instagram">
                                <FaInstagram size={24} className="text-pink-600 hover:opacity-80 transition" />
                            </Link>
                            <Link href="#" aria-label="Facebook">
                                <FaFacebook size={24} className="text-blue-600 hover:opacity-80 transition" />
                            </Link>
                            <Link href="#" aria-label="TikTok">
                                <FaTiktok size={24} className="text-black hover:opacity-80 transition" />
                            </Link>
                        </div>
                    </div>

                    {/* Gambar Berita */}
                    <img 
                        src={news.image}
                        alt="Illustration" 
                        className="w-full mt-4 rounded-md"
                    />

                   {/* Isi Berita */}
                    <div className="mt-4 text-gray-700 text-sm leading-normal text-justify">
                        {parse(news.description)}
                    </div>


                    {/* Baca Juga */}
                    <div className="mt-6 text-blue-600 font-bold text-sm cursor-pointer text-left">
                        Baca Juga: Bupati Blora, SKK Migas Beri Apresiasi Positif Gelaran Pra UKW Oleh PWI Blora
                    </div>
                </div>

                {/* Sidebar Advertisement */}
                <div className="hidden md:block w-64 ml-6 bg-gray-200 text-center p-4 h-full shadow-md">
                    Advertisement
                </div>
            </div>

            {/* Footer di bawah */}
            <Footer />
        </div>
    );
}

export default Details;
