import React, { useState } from "react";
import { Heart } from "lucide-react";
import Link from "next/link";
import Etoiles from "./Etoiles";

const ProductItem = ({ product }) => {
  const [isFavori, setIsFavori] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const toggleFavori = () => {
    setIsFavori(!isFavori);
  };

  return (
    <div className="
  relative
  bg-white
  rounded-lg
  shadow
  p-3
  hover:shadow-lg
  transition
  duration-300
  max-w-[230px]
  mx-auto
">

      
      {/* ❤️ Favori */}
      <div
        onClick={toggleFavori}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100"
      >
        <Heart
          size={18}
          className={isFavori ? "text-red-500" : "text-gray-400"}
        />
      </div>

      <Link href={`/home/boutique/${product.boutiqueI}`}>
        <div className="cursor-pointer">
          <img
            src={`${API_URL}/${product.image}`}
            alt={product.nom}
            className="w-full h-72 object-cover rounded transition-transform duration-300 hover:scale-105"
          />

          <h3 className="font-semibold text-base mt-2">
            {product.nom}
          </h3>

          <Etoiles note={product.moyenne || 0} />

          <p className="text-sm text-gray-700">
            Prix :{" "}
            <span className="text-[#15878f] font-medium">
              {product.prix.toFixed(2)} FCFA
            </span>
          </p>

          <p className="text-xs text-gray-500">
            Boutique : {product.boutiqueNom}
          </p>
        </div>
      </Link>

      <Link
        href={`/home/produit/${product.id}`}
        className="
          block
          mt-3
          w-full
          text-center
          bg-[#15878f]
          text-white
          py-1.5
          rounded-md
          text-sm
          transition
          duration-300
          hover:bg-green-700
        "
      >
        Voir produit
      </Link>
    </div>
  );
};

export default ProductItem;
