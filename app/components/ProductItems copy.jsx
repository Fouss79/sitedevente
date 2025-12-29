import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Heart } from 'lucide-react';
import Link from "next/link";
import Etoiles from "./Etoiles"; // ✅ Import ajouté

const ProductItem = ({ product }) => {
  const { id } = useParams();
  const [isFavori, setIsFavori] = useState(false);

  const toggleFavori = () => {
    setIsFavori(!isFavori);
  };

  return (
    <div className="relative bg-white rounded-lg shadow p-4 hover:shadow-xl transition duration-300">
      {/* Bouton Favori */}
      <div
        onClick={toggleFavori}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100"
      >
        <Heart size={24} className={isFavori ? "text-red-500" : "text-gray-400"} />
      </div>

      <Link href={`/home/produit/${product.id}`}>
        <div className="cursor-pointer">
          <img
            src={`http://localhost:8080/${product.image}`}
            alt={product.nom}
            className="w-full h-56 object-cover rounded transition-transform duration-300 hover:scale-105"
          />
          <h3 className="font-semibold text-lg mt-2">{product.nom}</h3>

          {/* ⭐️ Étoiles de note */}
          <Etoiles note={product.moyenne || 0} />

          <p className="text-gray-700">
            Prix : <span className="text-[#15878f]">{product.prix.toFixed(2)} FCFA</span>
          </p>
          <p className="text-sm text-gray-500">Boutique : {product.boutique.nom}</p>
        </div>
      </Link>

      <Link
        href={`/home/produit/${product.id}`}
        className="block mt-4 w-full text-center bg-[#15878f] text-white py-2 rounded-lg transition duration-300 hover:bg-green-700"
      >
        Voir produit
      </Link>
    </div>
  );
};

export default ProductItem;
