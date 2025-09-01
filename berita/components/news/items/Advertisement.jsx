"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { base_api_url } from '@/config/config';

export default function Advertisement({ slot }) {
  const [ads, setAds] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${base_api_url}/api/ads/slot/${slot}`)
      .then((res) => {
        setAds(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          // Slot kosong → biarkan ads null tanpa error merah
          setAds(null);
        } else {
          console.error("Gagal mengambil iklan:", err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slot]);

  if (loading) {
    return (
      <div className="w-full h-40 flex items-center justify-center border border-gray-300 bg-gray-50 text-gray-400">
        Loading...
      </div>
    );
  }

  if (!ads || !ads.image) {
    return (
      <div className="w-full h-40 flex items-center justify-center border border-gray-300 bg-gray-50 text-gray-500">
        Advertisement
      </div>
    );
  }

  return (
    <div className="advertisement">
      <img
        src={ads.image}
        alt={`Iklan slot ${slot}`}
        className="w-full h-auto object-cover"
      />
    </div>
  );
}
