import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmailVerificationSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md text-center">
        <CheckCircle className="text-green-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Email Berhasil Diverifikasi!</h1>
        <p className="text-gray-600 mb-6">
          Kamu bisa login sekarang menggunakan email yang sudah diverifikasi.
        </p>
        <Link
          to="/login"
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-full transition"
        >
          Login Sekarang
        </Link>
      </div>
    </div>
  );
};

export default EmailVerificationSuccess;
