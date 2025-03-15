"use client"; // Tambahkan agar bisa menggunakan useEffect

import React, { useEffect, useState } from 'react';
import { base_api_url } from "@/config/config"; // Pastikan ini diimpor

const Advertisement = () => {
    const [adImage, setAdImage] = useState(null);

    useEffect(() => {
        const fetchAd = async () => {
            const imageUrl = await getLatestAd();
            setAdImage(imageUrl);
        };

        fetchAd();
    }, []);

    return (
        <div className="mt-8 bg-gray-300 h-48 flex items-center justify-center text-gray-700 text-lg">
            {adImage ? (
                <img src={adImage} alt="Advertisement" className="h-full object-cover" />
            ) : (
                'Loading iklan...'
            )}
        </div>
    );
};

export default Advertisement;

const getLatestAd = async () => {
    try {
        const response = await fetch(`${base_api_url}/api/ads/latest`, {  // base_api_url sudah diimpor
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.image_url;
    } catch (error) {
        console.error('Error fetching latest ad:', error);
        return null;
    }
};
