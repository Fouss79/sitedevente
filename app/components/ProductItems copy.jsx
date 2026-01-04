'use client';

import React, { useState } from "react";
import { Heart, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Etoiles from "./Etoiles";

const ProductItem = ({ product }) => {
  const [isFavori, setIsFavori] = useState(false);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="relative bg-white rounded-lg shadow p-4 hover:shadow-xl transition duration-300">

      {/* ❤️ Favori */}
      <button
        onClick={() => setIsFavori(!isFavori)}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-100 z-10"
      >
        <Heart
          size={22}
          className={isFavori ? "text-red-500" : "text-gray-400"}
        />
      </button>

      {/* ✅ Lien principal → PRODUIT */}
      <Link href={`/home/produit/${product.id}`} className="block">
        <div className="cursor-pointer">
          <img
            src={`${API_URL}/${product.image}`}
            alt={product.nom}
            className="w-full h-95 object-cover rounded hover:scale-105 transition"
          />

          <h3 className="font-semibold text-base mt-2 line-clamp-2">
            {product.nom}
          </h3>

          <Etoiles note={product.moyenne || 0} />

          <div className="flex items-center justify-between mt-2">
            {/* Prix + Boutique */}
            <div>
              <p className="text-gray-700">
                Prix :
                <span className="text-[#15878f] ml-1">
                  {product.prix.toFixed(0)} FCFA
                </span>
              </p>

              {/* 🏪 Boutique */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/home/collect/boutique/${product.boutique.id}`);
                }}
                className="text-sm text-gray-500 hover:text-[#15878f]"
              >
                Boutique : {product.boutique.nom}
              </button>
            </div>

            {/* 👁️ Voir produit */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/home/produit/${product.id}`);
              }}
              className="
                bg-[#15878f]/10
                text-[#15878f]
                p-3
                rounded-full
                hover:bg-[#15878f]
                hover:text-white
                transition
              "
            >
              <Eye size={22} />
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
