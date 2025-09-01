import React from 'react';
import Footer from '@/components/Footer';

const DisclaimerPage = () => {
  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#dfd3c3]">
      <div className="flex-grow flex justify-center">
        <div className="bg-[#ffdcf5] max-w-4xl w-full p-6 shadow-lg rounded-md text-justify">
          <h1 className="text-3xl font-bold mb-4">Disclaimer</h1>
          
          <p className="mb-4">
            Dengan mengakses dan menggunakan Jatengupdates.com, Anda dianggap telah membaca, memahami, dan menyetujui hal-hal berikut:
          </p>

          <p className="mb-4">
            Semua konten yang disediakan di situs ini, termasuk teks, gambar, suara, video, dan bentuk grafis lainnya, bertujuan untuk memberikan informasi umum dan tidak dimaksudkan sebagai dasar untuk transaksi keuangan, perdagangan, saham, atau aktivitas lainnya yang bersifat komersial.
          </p>

          <p className="mb-4">
            Jatengupdates.com berusaha menampilkan informasi seakurat mungkin. Namun, kami dan seluruh mitra penyedia konten, termasuk pihak ketiga, tidak bertanggung jawab atas kesalahan, keterlambatan pembaruan, atau kerugian yang mungkin timbul akibat penggunaan informasi di situs ini.
          </p>

          <p className="mb-4">
            Kami tidak bertanggung jawab atas konsekuensi langsung maupun tidak langsung dari konten yang dikirimkan oleh pengguna dalam rubrik publik seperti Publika, Komunitas, Komentar Pembaca, Forum, Polling, Pro Kontra, dan lainnya.
          </p>

          <p className="mb-4">
            Namun demikian, Jatengupdates.com berhak untuk menyunting atau menghapus konten pengguna yang dianggap merugikan pihak lain, mengandung unsur pornografi, atau menyebarkan sentimen negatif terhadap suku, agama, ras, dan antargolongan (SARA).
          </p>

          <p className="mb-4">
            Seluruh konten yang dikirimkan oleh pengguna, dalam bentuk apa pun, sepenuhnya menjadi tanggung jawab masing-masing individu dan bukan tanggung jawab Jatengupdates.com.
          </p>

          <p className="mb-4">
            Situs ini dapat memuat tautan ke situs eksternal. Keberadaan tautan tersebut tidak berarti bahwa kami mendukung isi dari situs pihak ketiga tersebut. Anda menyetujui bahwa Jatengupdates.com tidak bertanggung jawab atas konten atau kebijakan situs lain yang ditautkan.
          </p>

          <p className="mb-4">
            Setiap bentuk interaksi atau transaksi antara Anda dan pengiklan di situs ini sepenuhnya merupakan urusan antara Anda dan pihak pengiklan. Kami tidak bertanggung jawab atas segala klaim, kerugian, atau permasalahan yang timbul dari hubungan tersebut.
          </p>

          <p className="mb-4">
            Seluruh karya yang ditampilkan di Jatengupdates.com, baik berupa teks, gambar, suara, video, maupun bentuk grafis lainnya, merupakan hak cipta milik Jatengupdates.com dan dilindungi oleh hukum yang berlaku.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DisclaimerPage;
