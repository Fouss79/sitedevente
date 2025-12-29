"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/app/context/AuthContext";
import { useParams } from "next/navigation";

export default function CreerProduitForm() {
  const { user } = useAuth();
  const vendeurId = user?.id;

  const params = useParams();
  const boutiqueIdParam = params?.id;

  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState(null);
  const [categorieId, setCategorieId] = useState("");
  const [marqueId, setMarqueId] = useState("");
  const [boutiqueId, setBoutiqueId] = useState("");

  const [categories, setCategories] = useState([]);
  const [marques, setMarques] = useState([]);
  const [boutiques, setBoutiques] = useState([]);

  /** Pré-remplir boutiqueId si présent dans l’URL */
  useEffect(() => {
    if (boutiqueIdParam) {
      setBoutiqueId(boutiqueIdParam);
    }
  }, [boutiqueIdParam]);

  /** Chargement des données */
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/categorie`)
      .then(res => setCategories(res.data))
      .catch(console.error);

    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/marque`)
      .then(res => setMarques(res.data))
      .catch(console.error);

    if (vendeurId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/api/boutique/utilisateur/${vendeurId}`)
        .then(res => setBoutiques(res.data))
        .catch(console.error);
    }
  }, [vendeurId]);

  /** Création produit */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!boutiqueId) {
      alert("Veuillez sélectionner une boutique.");
      return;
    }

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("prix", prix);
    formData.append("stock", stock);
    formData.append("categorieId", categorieId);
    formData.append("marqueId", marqueId);
    formData.append("boutiqueId", boutiqueId);
    formData.append("image", image);

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/produits/${boutiqueId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Produit créé avec succès !");
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la création du produit.");
    }
  };

  if (!vendeurId) {
    return (
      <p className="text-red-600 text-center">
        Vous devez être connecté pour ajouter un produit.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold">Ajouter un Produit</h2>

      <input
        type="text"
        placeholder="Nom du produit"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Prix"
        value={prix}
        onChange={(e) => setPrix(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <input
        type="number"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <select
        value={categorieId}
        onChange={(e) => setCategorieId(e.target.value)}
        required
        className="border p-2 rounded"
      >
        <option value="">Sélectionner une catégorie</option>
        {categories.map(c => (
          <option key={c.id} value={c.id}>{c.nom}</option>
        ))}
      </select>

      <select
        value={marqueId}
        onChange={(e) => setMarqueId(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Sélectionner une marque</option>
        {marques.map(m => (
          <option key={m.id} value={m.id}>{m.nom}</option>
        ))}
      </select>

      {/* Affiché seulement si pas d'id dans l’URL */}
      {!boutiqueIdParam && (
        <select
          value={boutiqueId}
          onChange={(e) => setBoutiqueId(e.target.value)}
          required
          className="border p-2 rounded"
        >
          <option value="">Sélectionner une boutique</option>
          {boutiques.map(b => (
            <option key={b.id} value={b.id}>{b.nom}</option>
          ))}
        </select>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
        className="border p-2 rounded"
      />

      <button className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Créer Produit
      </button>
    </form>
  );
}
