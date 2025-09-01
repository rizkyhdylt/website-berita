import React from 'react'
import Footer from '@/components/Footer'

const Page = () => {
  return (
    <div id="top" className='min-h-screen flex flex-col bg-[#dfd3c3]'>
      <div className="flex-grow flex justify-center">
        <div className="bg-[#ffdcf5] max-w-4xl w-full p-6 shadow-lg rounded-md text-justify">
          <h1 className="text-3xl font-bold mb-4">Pedoman Media Siber</h1>
          <p className="mb-4">
            Kemerdekaan berpendapat, berekspresi, dan kebebasan pers merupakan
            hak asasi manusia yang dijamin oleh Pancasila, Undang-Undang Dasar 1945,
            serta Deklarasi Universal Hak Asasi Manusia PBB. Kehadiran media online
            di Indonesia adalah bagian dari kemerdekaan tersebut. Namun, karena memiliki
            karakteristik khusus, media online memerlukan pedoman agar pengelolaannya
            berjalan profesional, sesuai dengan fungsi, hak, dan kewajiban sebagaimana
            diatur dalam Undang-Undang Nomor 40 Tahun 1999 tentang Pers dan Kode Etik
            Jurnalistik.
          </p>

          <p className="mb-4">
            Atas dasar itu, Dewan Pers bersama organisasi pers, pengelola media online,
            dan masyarakat menyusun <strong>Pedoman Pemberitaan Media Siber</strong>.
            <br /><br />
            <strong>Ruang Lingkup Media Online</strong> mencakup seluruh bentuk media
            yang menggunakan internet dan melakukan kegiatan jurnalistik, dengan tetap
            memenuhi syarat Undang-Undang Pers serta Standar Perusahaan Pers yang
            ditetapkan oleh Dewan Pers.
          </p>

          <p className="mb-4">
            <strong>Isi Buatan Pengguna (User Generated Content)</strong> adalah
            seluruh konten yang dibuat dan/atau dipublikasikan pengguna, seperti
            artikel, komentar, gambar, suara, video, blog, forum, maupun unggahan lain.
            Dalam penerapannya, media online wajib menyediakan ketentuan yang jelas
            terkait isi buatan pengguna agar tidak bertentangan dengan Undang-Undang
            No. 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik. 
          </p>

          <p className="mb-4">
            Pengguna diwajibkan melakukan registrasi dan log-in sebelum mempublikasikan
            konten. Setiap pengguna juga wajib menyatakan persetujuan bahwa konten
            yang dipublikasikan tidak:
            <ul className="list-disc list-inside mt-2">
              <li>Memuat kebohongan, fitnah, sadisme, atau pornografi.</li>
              <li>Mengandung ujaran kebencian terkait SARA maupun ajakan kekerasan.</li>
              <li>Bersifat diskriminatif, merendahkan martabat, atau melecehkan kelompok rentan.</li>
            </ul>
          </p>

          <p className="mb-4">
            Media online berhak mengedit atau menghapus konten pengguna yang melanggar
            aturan tersebut, serta wajib menyediakan mekanisme pengaduan. Pengaduan yang
            valid harus ditindaklanjuti paling lambat 2 x 24 jam dengan tindakan koreksi,
            penghapusan, atau penyuntingan secara proporsional.
          </p>

          <p className="mb-4">
            <strong>Ralat, Koreksi, dan Hak Jawab</strong> wajib mengikuti Undang-Undang
            Pers, Kode Etik Jurnalistik, serta Pedoman Hak Jawab Dewan Pers. Setiap berita
            ralat atau koreksi wajib ditautkan dengan berita asli. Media online yang tidak
            melayani hak jawab dapat dikenakan sanksi hukum dengan denda maksimal Rp500.000.000.
          </p>

          <p className="mb-4">
            <strong>Pencabutan Berita</strong> hanya dapat dilakukan berdasarkan pertimbangan
            khusus, seperti isu SARA, kesusilaan, masa depan anak, pengalaman traumatik korban,
            atau keputusan Dewan Pers. Pencabutan berita wajib disertai alasan yang jelas dan
            diumumkan kepada publik.
          </p>

          <p className="mb-4">
            <strong>Iklan Media Online</strong> harus dibedakan dengan tegas dari berita.
            Setiap konten berbayar wajib mencantumkan keterangan yang jelas.
          </p>

          <p className="mb-4">
            <strong>Hak Cipta Media Siber</strong> wajib menghormati ketentuan hak cipta
            yang berlaku. <br />
            <strong>Pencantuman Pedoman Media Siber</strong> wajib ditampilkan secara terang
            dan jelas di setiap media. <br />
            <strong>Sengketa</strong> terkait pelaksanaan pedoman ini akan diselesaikan oleh Dewan Pers.
          </p>

          <p className="mt-6">
            Jakarta, 3 Februari 2012 <br />
            <em>(Pedoman ini ditandatangani oleh Dewan Pers dan komunitas pers di Jakarta)</em>
          </p>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default Page
