import React from 'react'
import Footer from '@/components/Footer'

const page = () => {
  return (
    <div id="top" className='min-h-screen flex flex-col bg-[#dfd3c3]'>
      <div className="flex-grow flex justify-center">
        <div className="bg-[#ffdcf5] max-w-4xl w-full p-6 shadow-lg rounded-md text-justify">
          <h1 className="text-3xl font-bold mb-4">Disclaimer</h1>
          <p className="mb-4">
            Dengan mengakses dan menggunakan Jatengupdates.com, Anda telah memahami dan setuju bahwa: Semua isi berupa teks, gambar, suara, video dan segala bentuk grafis di Jatengupdates.com hanya sebagai informasi dan tidak diharapkan untuk tujuan transaksi seperti saham/perdagangan dan lain-lain. Jatengupdates.com berupaya keras menampilkan isi seakurat mungkin, namun Jatengupdates.com dan semua mitra penyedia isi, termasuk pengelola konsultasi dan pengembang isi dari pihak lain di situs ini, tidak bertanggung jawab atas segala kesalahan dan keterlambatan memperbarui data atau informasi, atau segala kerugian yang timbul karena tindakan berkaitan penggunaan informasi yang disajikan.
          </p>
          <p className="mb-4">
            Kami tidak bertanggung jawab atas akibat langsung ataupun tidak langsung dari semua teks, gambar, suara, video dan segala bentuk grafis yang dihasilkan dan disampaikan pembaca atau pengguna di berbagai rubrik publik seperti Publika, Komunitas, Komentar Pembaca, Forum, Polling, Pro Kontra dan lainnya.
          </p>
          <p className="mb-4">
            Namun demikian, Jatengupdates.com berhak menyunting atau menghapus isi dari pembaca atau pengguna agar tidak merugikan orang lain, lembaga, ataupun badan tertentu serta menjauhi isi berbau pornografi dan sentimen suku, agama dan ras.
          </p>
          <p className="mb-4">
            Segala isi baik berupa teks, gambar, video, suara dan segala bentuk grafis yang disampaikan pembaca ataupun pengguna adalah tanggung jawab setiap individu, dan bukan tanggung jawab Jatengupdates.com.
          </p>
          <p className="mb-4">
            Jatengupdates.com menyediakan link ke situs lain, link tersebut tidak menunjukan bahwa Jatengupdates.com menyetujui situs pihak lain tersebut. Anda mengetahui dan menyetujui bahwa Jatengupdates.com tidak bertanggung jawab atas isi atau materi lainnya yang ada pada situs pihak lain tersebut.
          </p>
          <p className="mb-4">
            Setiap perjanjian dan transaksi antara Anda dan pengiklan yang ada di Jatengupdates.com adalah antara Anda dan pengiklan. Anda mengetahui dan setuju bahwa Jatengupdates.com tidak bertanggung jawab atas segala bentuk kehilangan atau klaim yang mungkin timbul dari perjanjian atau transaksi antara Anda dengan pengiklan.
          </p>
          <p className="mb-4">
            Semua hasil karya yang dimuat di Jatengupdates.com baik berupa teks, gambar, suara dan video serta segala bentuk grafis adalah menjadi hak cipta Jatengupdates.com.
          </p>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  )
}

export default page
