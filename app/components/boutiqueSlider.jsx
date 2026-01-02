'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BoutiqueSlider = () => {
  const [boutiques, setBoutiques] = useState([]);
  const sliderRef = useRef(null);
  const router = useRouter();

   const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/api/boutique`)

      .then(res => setBoutiques(res.data))
      .catch(err => console.error(err));
  }, []);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const width = sliderRef.current.clientWidth;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -width : width,
      behavior: 'smooth',
    });
  };

  return (
    <div className="relative mb-14">
      <h2 className="text-2xl font-bold mb-6">Nos boutiques</h2>

      {/* Flèche gauche */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20
                   bg-white shadow-xl rounded-full w-11 h-11
                   flex items-center justify-center
                   hover:scale-110 transition"
      >
        ‹
      </button>

      {/* Carousel (sans scrollbar) */}
      <div
        ref={sliderRef}
        className="overflow-hidden"
      >
        <div className="flex gap-6">
          {boutiques.map((btq) => (
            <div
              key={btq.id}
              onClick={() => router.push(`/Clients/boutique/${btq.id}`)}
              className="min-w-[240px] cursor-pointer
                         bg-white rounded-2xl shadow-md
                         hover:shadow-2xl transition-all"
            >
              <img
                src={`${API_URL}/${btq.image}`}
                alt={btq.nom}
                className="w-full h-40 object-cover rounded-t-2xl"
              />

              <div className="p-4 text-center text-lg font-semibold">
                {btq.nom}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Flèche droite */}
      <button
        onClick={() => scroll('right')}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20
                   bg-white shadow-xl rounded-full w-11 h-11
                   flex items-center justify-center
                   hover:scale-110 transition"
      >
        ›
      </button>
    </div>
  );
};

export default BoutiqueSlider;
