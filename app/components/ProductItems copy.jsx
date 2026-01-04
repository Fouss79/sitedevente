import React, { useState } from "react";
import { Heart, Eye } from "lucide-react";
import Link from "next/link";
import Etoiles from "./Etoiles";

const ProductItem = ({ product }) => {
  const [isFavori, setIsFavori] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="relative bg-white rounded-lg shadow p-4 hover:shadow-xl transition duration-300 flex flex-col">
      
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

      {/* Image + Infos */}
      <Link href={`/home/collect/boutique/${product.boutique.id}`}>
        <div className="cursor-pointer">
          <img
            src={`${API_URL}/${product.image}`}
            alt={product.nom}
            className="w-full h-100 object-cover rounded transition-transform duration-300 hover:scale-105"
          />

          <h3 className="font-semibold text-base mt-2 line-clamp-2">
            {product.nom}
          </h3>

          <Etoiles note={product.moyenne || 0} />

         <div className="flex items-center justify-between mt-2">
  {/* Prix + Boutique */}
  <div>
    <p className="text-gray-700">
      Prix :{" "}
      <span className="text-[#15878f]">
        {product.prix.toFixed(2)} FCFA
      </span>
    </p>
    <p className="text-sm text-gray-500">
      Boutique : {product.boutique.nom}
    </p>
  </div>

  {/* 👁️ Icône Voir produit */}
  <Link href={`/home/produit/${product.id}`}>
    <div
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
    </div>
  </Link>
</div>

        </div>
      </Link>

      {/* 👁️ Icône Voir produit à droite */}
    </div>
  );
};

export default ProductItem;
