import React from 'react'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div id="top" className="min-h-screen flex flex-col bg-zinc-800">
      <div className="flex-grow flex justify-center">
        <div className="bg-white max-w-4xl w-full p-6 shadow-lg rounded-md text-justify space-y-6">
          <h1 className="text-3xl font-bold mb-2 text-center">Tentang Kami</h1>
          
          <div className="space-y-2">
            <p><strong>Tim Kerja:</strong><br />Jateng Updates</p>
            <p><strong>Penanggung Jawab / Pemimpin Redaksi:</strong><br />Richard De Mas Nre</p>
            <p><strong>Redaksi:</strong><br />Firmansyah</p>
            <p><strong>Editor:</strong><br />Aflah Afrianto</p>

            <div>
              <p><strong>Jurnalis:</strong></p>
              <ul className="list-disc list-inside ml-4">
                <li>Ipung</li>
                <li>Dewi Astuti</li>
                <li>Muhammad Hamzah</li>
                <li>Enggar Kumoro</li>
                <li>Ayu Nita</li>
                <li>Aji Tyo Dessaptian</li>
                <li>Aji Vandika Ezra</li>
                <li>Gunawan</li>
                <li>Sunaryo</li>
                <li>Sahal</li>
                <li>Ihza</li>
              </ul>
            </div>

            <p><strong>Web Design & Programmer:</strong><br />Rizky Hidayatullah</p>
            <p><strong>Marketing:</strong><br />Syaiful Anas</p>
            <p><strong>Sekretaris & HRD:</strong><br />Muntiyas Syilfanny</p>
            <p><strong>Divisi Legal & Ombudsman:</strong><br />Herman Raharja, SH.</p>
            <p><strong>Penerbit:</strong><br />PT. Blora Digital Media</p>
            <p><strong>Nomor Induk Berusaha (NIB):</strong><br />1710 23 00 34 593</p>
            <p><strong>SK Menkumham:</strong><br />AHU 0017. AH. 02. 01 / 2018<br />PT. Blora Digital Media</p>
            <p><strong>Alamat Redaksi:</strong><br />Jalan Sudarman No 6, Mlangsen, Blora Kota, 58215</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default page
