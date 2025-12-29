"use client";
import React from "react";

const produitsExemple = [
  { id: 1, nom: "Chaussures de sport", prix: 25000, image: "/images/p1.jpg" },
  { id: 2, nom: "Montre élégante", prix: 45000, image: "/images/p2.jpg" },
  { id: 3, nom: "Casque audio", prix: 32000, image: "/images/p3.jpg" },
];

export default function AccueilClient() {
  return (
    <div className="p-6 space-y-10">
      

      {/* Produits en vedette */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Produits en vedette</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {produitsExemple.map((produit) => (
            <div key={produit.id} className="bg-white shadow rounded-lg p-4">
              <img
                src={produit.image}
                alt={produit.nom}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{produit.nom}</h3>
              <p className="text-gray-600">{produit.prix.toLocaleString()} FCFA</p>
              <button className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Voir produit
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Catégories */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Nos catégories</h2>
        <div className="flex gap-4 flex-wrap">
          <span className="bg-gray-200 px-4 py-2 rounded-full">Électronique</span>
          <span className="bg-gray-200 px-4 py-2 rounded-full">Mode</span>
          <span className="bg-gray-200 px-4 py-2 rounded-full">Accessoires</span>
          <span className="bg-gray-200 px-4 py-2 rounded-full">Beauté</span>
        </div>
      </div>
    </div>
  );
}
