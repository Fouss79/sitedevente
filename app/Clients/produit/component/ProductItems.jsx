import React, { useState } from "react";
import { useParams } from "next/navigation";
import { Heart, ShoppingCart } from 'lucide-react';
import Link from "next/link";



const ProductItem = ({ product }) => {
  const { id } = useParams();
  
  const [isFavori, setIsFavori] = useState(false);

  const handleClick = () => {
    addToCart(product);
  };

  const toggleFavori = () => {
    setIsFavori(!isFavori);
  };

    

  return (
    <div className="relative max-w-sm p-4 shadow-lg rounded-lg bg-white" >
      {/* ❤️ Cœur favori */}
      <div
        onClick={toggleFavori}
        className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer hover:bg-gray-100"
      >
        <Heart size={30} className={isFavori ? "text-red-500" : "text-gray-400"} />
      </div>

      <div className="product-item overflow-hidden rounded-lg  font-bold">
        <Link href={`/produit/${product.id}`}>
          <div className="cursor-pointer">
            <img
              src={`http://localhost:8080/${product.image}`}
              alt={product.nom}
              className="mx-auto rounded object-cover h-76 w-64 mt-6 transition-transform duration-300 hover:scale-105"
            />
            <h3>{product.nom}</h3>
            <p>Prix:{product.prix.toFixed(2)} FCFA </p>
            <p>Chez:{product.boutiqueNom}</p>
          </div>
        </Link>

        <button className="mt-2 bg-yellow-700 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Voir produit
              </button>
      </div>
    </div>
  );
};

export default ProductItem;
