'use client';
import { useEffect } from "react";

export default function TokenListener() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const logout = params.get("logout");

    if (token) {
      console.log("✅ Menerima token dari query string:", token);
      localStorage.setItem("newsToken", token);
      // Bersihkan URL
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url.toString());
    }

    if (logout === "true") {
      console.log("🚪 Menerima sinyal logout dari query string");
      localStorage.removeItem("newsToken");
      // Bersihkan URL & redirect ke halaman login
      const url = new URL(window.location.href);
      url.searchParams.delete("logout");
      window.history.replaceState({}, document.title, url.toString());
      // window.location.href = "/login";
    }

    // Tambahan: jika tidak ada token saat load, redirect ke login
    // const existing = localStorage.getItem("newsToken");
    // if (!existing && !token) {
    //   window.location.href = "/login";
    // }
  }, []);

  return null;
}
