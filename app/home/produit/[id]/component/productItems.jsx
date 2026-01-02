'use client';

import React, { useState } from "react";
import { Heart, ShoppingCart } from 'lucide-react';
import Link from "next/link";
import Etoiles from "./Etoiles";

const ProductItem = ({ product, handleClick }) => {
  const [isFavori, setIsFavori] = useState(false);

  const toggleFavori = () => {
    setIsFavori(!isFavori);
  };

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="relative max-w-sm p-4 shadow-lg rounded-lg bg-white">
      {/* ❤️ Cœur favori */}
      <div
        onClick={toggleFavori}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100"
      >
        <Heart size={30} className={isFavori ? "text-red-500" : "text-gray-400"} />
      </div>

      <div className="product-item overflow-hidden rounded-lg text-[#036c94] font-bold">
        <Link href={`/home/produit/${product.id}`}>
          <div className="cursor-pointer">
            <img
              src={`${API_URL}/${product.image}`}
              alt={product.nom}
              className="mx-auto rounded object-cover h-60 w-36 mt-6 transition-transform duration-300 hover:scale-105"
            />
            <h3>{product.nom}</h3>

            {/* ⭐️ Les étoiles */}
            <Etoiles note={product.moyenne || 0} />

            <p>{product.prix.toFixed(2)} FCFA</p>
          </div>
        </Link>

        <button
          style={{ backgroundColor: '#036c94' }}
          className="mt-4 px-6 py-2 text-white flex gap-2 items-center justify-center rounded-lg transition duration-300 hover:bg-green-700"
          onClick={handleClick}
        >
          <ShoppingCart size={20} />
          Ajouter au panier
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
