"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useParams } from "next/navigation";

export default function AccueilVendeur() {
  const [boutiques, setBoutiques] = useState([]);
  const params = useParams();
  const vendeurId = params.id;

  useEffect(() => {
    if (!vendeurId) return;
    axios
      .get(`http://localhost:8080/api/boutique/utilisateur/${vendeurId}`)
      .then((res) => {
        setBoutiques(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [vendeurId]);

  if (boutiques.length === 0)
    return <p className="text-center mt-10">Aucune boutique trouvée.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {boutiques.map((boutique) => (
        <div key={boutique.id}>
          <div className="flex items-center gap-6 mb-4">
            <img
              src={`http://localhost:8080/${boutique.image}`}
              alt={boutique.nom}
              className="w-24 h-24 rounded-full object-cover border"
            />
            <div>
              <h1 className="text-2xl font-bold">{boutique.nom}</h1>
              <p className="text-gray-600">{boutique.description}</p>
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <Link
              href={`/produits/ajouter?boutiqueId=${boutique.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              + Ajouter un produit
            </Link>
          </div>

          <h2 className="text-xl font-semibold mb-2">Mes Produits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {boutique.produits && boutique.produits.length > 0 ? (
              boutique.produits.map((produit) => (
                <div
                  key={produit.id}
                  className="bg-white p-4 rounded-lg shadow"
                >
                  <img
                    src={`http://localhost:8080/${produit.image}`}
                    alt={produit.nom}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h3 className="mt-2 font-semibold">{produit.nom}</h3>
                  <p className="text-gray-600">{produit.prix} FCFA</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">
                Aucun produit disponible.
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
