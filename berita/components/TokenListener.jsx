
'use client';
import { useEffect } from "react";

export default function TokenListener() {
  useEffect(() => {
    function handleMessage(event) {
      console.log("📩 Menerima pesan dari:", event.origin);
      console.log("📦 Data yang diterima:", event.data);

      // Ubah origin sesuai port sumber pengirim
      if (event.origin !== "http://localhost:5173") return;

      const { token, logout } = event.data;

      if (token) {
        console.log("✅ Token diterima dan disimpan:", token);
        localStorage.setItem("newsToken", token);
      }

      if (logout) {
        console.log("🚪 Logout diterima, menghapus token.");
        localStorage.removeItem("newsToken");
      }
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return null;
}
