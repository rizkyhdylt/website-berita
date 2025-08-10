"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { base_api_url } from "@/config/config";

export default function FixedAd({ slot, position, width = 200, height = "auto" }) {
  const [ad, setAd] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    axios
      .get(`${base_api_url}/api/ads/slot/${slot}`)
      .then((res) => setAd(res.data))
      .catch(() => setAd(null));
  }, [slot]);

  if (!isVisible || !ad) return null;

  const positionStyles = {
    "bottom-right": { bottom: "20px", right: "0px" },
    "bottom-left": { bottom: "20px", left: "0px" },
    "top-right": { top: "20px", right: "20px" },
    "top-left": { top: "20px", left: "20px" },
    "center": { bottom: "0%", left: "20%"},
  };

  const appliedPosition = positionStyles[position] || positionStyles["bottom-right"];

  return (
    <div
      className="fixed z-50 bg-white shadow-lg rounded"
      style={appliedPosition}
    >
      {/* Tombol Close */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-1 text-gray-500 hover:text-red-500 text-sm"
      >
        ✕
      </button>

      {/* Iklan */}
      <a href={ad.link} target="_blank" rel="noopener noreferrer">
        <img
          src={ad.image}
          alt={ad.title || "Advertisement"}
          style={{ width, height }}
        />
      </a>
    </div>
  );
}
