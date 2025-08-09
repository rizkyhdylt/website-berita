"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { base_api_url } from '@/config/config';

const Advertisment = () => {
  const [ads, setAds] = useState([]); // default array

  useEffect(() => {
  axios
    .get(`${base_api_url}/api/ads/slot/3`)
    .then(res => setAds(res.data)) // ini langsung 1 object
    .catch(err => console.error('Gagal mengambil iklan:', err));
}, []);

return (
  <div>
    {ads?.image ? (
      <img src={ads.image} alt="Iklan Slot 3" width="300" height="200" />
    ) : (
      <p>Tidak ada iklan slot 3</p>
    )}
  </div>
);

};

export default Advertisment;
