"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './produit.module.css';
import ProductItem from './component/ProductItems';

const ListProduits = ({ refreshKey }) => {
  const [produits, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === Supprimer un produit ===
  const deleteProduit = (produit_id) => {
    axios.delete(`http://localhost:8080/api/produitss/${produit_id}`)
      .then(() => fetchProduits())
      .catch((error) => console.error('Erreur suppression produit :', error));
  };

  // === Récupérer la liste des produits ===
  const fetchProduits = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:8080/api/produits');
      setProduits(response.data);
    } catch (err) {
      setError('Erreur lors de la récupération des produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // === Recharger les produits à chaque refreshKey ===
  useEffect(() => {
    fetchProduits();
  }, [refreshKey]);

  // === Affichage du contenu ===
  return (
    <div className="rounded-xl p-5 w-full">
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : produits.length === 0 ? (
        <p>Aucun produit disponible.</p>
      ) : (
        <div>
        <h2 className="text-2xl font-bold mb-4">Produits en vedette</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {produits.slice(0, 8).map((product) => (
    <div key={product.id} className="inline-block">
      <ProductItem product={product} />
    </div>
  ))}
</div>

        </div>
      )}
    </div>
  );
};

export default ListProduits;
