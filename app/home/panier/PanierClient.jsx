"use client";

import { useAuth } from "@/app/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

const PanierClient = () => {
  const { panier, setPanier, viderPanier, user } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleQuantiteChange = (index, value) => {
    const qte = Math.max(1, parseInt(value) || 1);
    const nouveauPanier = panier.map((item, i) =>
      i === index ? { ...item, quantite: qte } : item
    );
    setPanier(nouveauPanier);
    localStorage.setItem("cart", JSON.stringify(nouveauPanier));
  };

  const supprimerProduit = (index) => {
    const nouveauPanier = panier.filter((_, i) => i !== index);
    setPanier(nouveauPanier);
    localStorage.setItem("cart", JSON.stringify(nouveauPanier));
  };

  const total = panier.reduce((acc, item) => {
    const qte = item.quantite || 1;
    return acc + item.prix * qte;
  }, 0);

  const handleCommander = async () => {
    if (!user?.id) {
      setError("Veuillez vous connecter pour commander.");
      return;
    }

    const produits = panier.map((item) => ({
      produitId: item.id,
      quantite: item.quantite || 1,
    }));

    try {
      await axios.post(`${API_URL}/api/commande/${user.id}`, produits);
      setMessage("Commande passée avec succès !");
      viderPanier();
    } catch (err) {
      console.error(err);
      setError("Erreur lors de la commande.");
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto px-4 py-10 min-h-screen"
      style={{
        backgroundImage:
          'url("/WhatsApp Image 2025-06-23 at 19.09.28.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-2xl font-bold mb-6">🛒 Mon Panier</h1>

      {message && (
        <p className="bg-green-100 text-green-700 p-2 rounded mb-4">
          {message}
        </p>
      )}
      {error && (
        <p className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</p>
      )}

      {panier.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {panier.map((item, index) => (
              <li
                key={index}
                className="flex gap-4 items-center border p-3 rounded shadow-sm bg-white"
              >
                <div className="w-20 h-20 overflow-hidden rounded">
                  <Image
                    src={`${API_URL}/${item.image}`}
                    alt={item.nom}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold">{item.nom}</p>
                  <p className="text-yellow-700 font-bold">
                    {item.prix} FCFA
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <label>Qté:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantite || 1}
                      onChange={(e) =>
                        handleQuantiteChange(index, e.target.value)
                      }
                      className="w-16 border px-1 py-0.5 rounded"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Link
                    href={`/home/produit/${item.id}`}
                    className="text-sm text-blue-600 underline"
                  >
                    Voir
                  </Link>
                  <button
                    onClick={() => supprimerProduit(index)}
                    className="text-sm text-red-600 underline"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right space-y-3">
            <p className="text-lg font-bold">Total : {total} FCFA</p>

            <button
              onClick={handleCommander}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
            >
              Commander
            </button>

            <button
              onClick={viderPanier}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 ml-4"
            >
              Vider le panier
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PanierClient;
