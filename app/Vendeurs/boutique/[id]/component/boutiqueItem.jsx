'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const BoutiqueCard = ({ boutique }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 p-6 w-full max-w-4xl mx-auto">
      <div className="flex items-center space-x-6">
        
        <img
          src={`http://localhost:8080/${boutique.image}`}
          alt={boutique.nom}
          className="w-24 h-24 rounded-full object-cover border shadow"
        />

        <div className="flex-1">
          <h2 className="text-2xl font-bold">{boutique.nom}</h2>
          <p className="text-gray-600 mt-2">{boutique.description}</p>
        </div>

        {/* 🔥 Boutons superposés */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() =>
              router.push(`/Vendeurs/boutique/${boutique.id}/AjoutdeProduit`)
            }
            className="bg-[#15878f] text-white px-5 py-2 rounded hover:bg-[#116d73] transition"
          >
            + Ajouter un produit
          </button>

          <button
            onClick={() =>
              router.push(`/Vendeurs/boutique/${boutique.id}/collection`)
            }
            className="bg-[#15878f] text-white px-5 py-2 rounded hover:bg-[#116d73] transition"
          >
            + Creer la collection
          </button>
        </div>
      </div>

      {/* Produits */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Produits disponibles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {boutique.produits?.map((produit) => (
            <div key={produit.id} className="bg-gray-100 rounded-lg p-4 shadow">
              <img
                src={`http://localhost:8080/${produit.image}`}
                alt={produit.nom}
                className="w-full h-72 object-cover rounded"
              />
              <h4 className="mt-2 font-medium">{produit.nom}</h4>
              <p className="text-sm text-gray-600">{produit.prix} FCFA</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoutiqueCard;
