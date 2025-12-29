"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Heart } from "lucide-react";
import Link from "next/link";
import Etoiles from "./Etoiles";

const ProductItem = ({ product }) => {
  const { id } = useParams();
  const [isFavori, setIsFavori] = useState(false);

  // ✅ API URL depuis .env.local
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const toggleFavori = () => {
    setIsFavori(!isFavori);
  };

  return (
    <div className="relative max-w-sm p-2 shadow-lg rounded-lg bg-white">
      {/* ❤️ Cœur favori */}
      <div
        onClick={toggleFavori}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100"
      >
        <Heart
          size={30}
          className={isFavori ? "text-red-500" : "text-gray-400"}
        />
      </div>

      <div className="product-item overflow-hidden rounded-lg font-bold">
        <Link href={`/home/produit/${product.id}`}>
          <div className="cursor-pointer">
            {/* ✅ Image dynamique */}
            <img
              src={`${API_URL}/${product.image}`}
              alt={product.nom}
              className="mx-auto rounded object-cover h-80 w-64 mt-6 transition-transform duration-300 hover:scale-105"
            />

            {/* Texte à gauche / étoiles à droite */}
            <div className="flex justify-between items-center mt-2 px-2">
              <div>
                <h3 className="text-[#036c94]">{product.nom}</h3>
                <p>
                  Prix :{" "}
                  <span className="text-[#036c94]">
                    {product.prix.toFixed(2)} FCFA
                  </span>
                </p>
                <p>
                  Chez :{" "}
                  <span className="text-[#036c94]">
                    {product.boutiqueNom}
                  </span>
                </p>
              </div>

              <Etoiles note={product.moyenne || 0} />
            </div>
          </div>
        </Link>

        <button className="mt-2 bg-[#036c94] hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
          Voir produit
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
