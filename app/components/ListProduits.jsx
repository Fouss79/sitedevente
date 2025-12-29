"use client";
import React, { useState, useEffect } from "react";
import api from "../lib/api"; // ✅ axios centralisé
import ProductItem from "./ProductItems";

const ListProduits = ({ refreshKey }) => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === Supprimer un produit ===
  const deleteProduit = async (produitId) => {
    try {
      await api.delete(`/api/produits/${produitId}`);
      fetchProduits();
    } catch (error) {
      console.error("Erreur suppression produit :", error);
    }
  };

  // === Récupérer la liste des produits ===
  const fetchProduits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get("/api/produits");
      setProduits(response.data);
    } catch (err) {
      setError("Erreur lors de la récupération des produits");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // === Recharger les produits à chaque refreshKey ===
  useEffect(() => {
    fetchProduits();
  }, [refreshKey]);

  // === Affichage ===
  return (
    <div className="rounded-xl p-5 w-full">
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : produits.length === 0 ? (
        <p>Aucun produit disponible.</p>
      ) : (
        <>
          <h2 className="text-2xl text-white font-bold mb-4">
            Produits en vedette
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {produits.slice(0, 9).map((product) => (
              <ProductItem
                key={product.id}
                product={product}
                onDelete={deleteProduit}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListProduits;
