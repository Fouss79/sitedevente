"use client";
import React, { useState, useEffect, useMemo } from "react";
import api from "../lib/api";
import ProductItem from "./ProductItems";

const ListProduits = ({ refreshKey }) => {
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [boutiques, setBoutiques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortOption, setSortOption] = useState("recent");
  const [selectedCategorie, setSelectedCategorie] = useState("all");
  const [selectedBoutique, setSelectedBoutique] = useState("all");

  // === Fetch produits ===
  const fetchProduits = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/api/produits");
      setProduits(res.data);
    } catch {
      setError("Erreur chargement produits");
    } finally {
      setLoading(false);
    }
  };

  // === Fetch catégories ===
  const fetchCategories = async () => {
    try {
      const res = await api.get("/api/categorie");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // === Fetch boutiques ===
  const fetchBoutiques = async () => {
    try {
      const res = await api.get("/api/boutique");
      setBoutiques(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduits();
    fetchCategories();
    fetchBoutiques();
  }, [refreshKey]);

  // === FILTRES + TRI ===
  const produitsFiltres = useMemo(() => {
    let result = [...produits];

    // 🔹 Filtre boutique
    if (selectedBoutique !== "all") {
      result = result.filter(
        (p) =>
          p.boutique?.id === Number(selectedBoutique) ||
          p.boutiqueId === Number(selectedBoutique)
      );
    }

    // 🔹 Filtre catégorie
    if (selectedCategorie !== "all") {
      result = result.filter(
        (p) =>
          p.categorie?.id === Number(selectedCategorie) ||
          p.categorieId === Number(selectedCategorie)
      );
    }

    // 🔹 Tri
    switch (sortOption) {
      case "prix-asc":
        result.sort((a, b) => a.prix - b.prix);
        break;
      case "prix-desc":
        result.sort((a, b) => b.prix - a.prix);
        break;
      case "nom":
        result.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      default:
        result.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    return result;
  }, [produits, sortOption, selectedCategorie, selectedBoutique]);

  // === UI ===
  return (
    <div className="rounded-xl p-5 w-full">
      {loading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          {/* Header + Filtres */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6 items-start lg:items-center lg:justify-between">
            <h2 className="text-2xl text-white font-bold">
              Produits en vedette
            </h2>

            <div className="flex flex-wrap gap-3">
              {/* Boutique */}
              <select
                value={selectedBoutique}
                onChange={(e) => setSelectedBoutique(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white shadow"
              >
                <option value="all">Toutes les boutiques</option>
                {boutiques.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.nom}
                  </option>
                ))}
              </select>

              {/* Catégorie */}
              <select
                value={selectedCategorie}
                onChange={(e) => setSelectedCategorie(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white shadow"
              >
                <option value="all">Toutes les catégories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nom}
                  </option>
                ))}
              </select>

              {/* Tri */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white shadow"
              >
                <option value="recent">Plus récents</option>
                <option value="prix-asc">Prix ↑</option>
                <option value="prix-desc">Prix ↓</option>
                <option value="nom">Nom A–Z</option>
              </select>
            </div>
          </div>

          {/* Produits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {produitsFiltres.slice(0, 9).map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ListProduits;
