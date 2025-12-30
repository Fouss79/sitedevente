'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function AssignationProduits() {
  const [produits, setProduits] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // 1. Charger les produits du vendeur
    fetch(`http://localhost:8080/api/produits/vendeur/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProduits(data);
        else {
          console.warn("Données produits inattendues:", data);
          setProduits([]);
        }
      })
      .catch((err) => {
        console.error("Erreur produits:", err);
        setProduits([]);
      });

    // 2. Charger les collections du vendeur
    fetch(`http://localhost:8080/api/collections/vendeur/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCollections(data);
        else {
          console.warn("Données collections inattendues:", data);
          setCollections([]);
        }
      })
      .catch((err) => {
        console.error("Erreur collections:", err);
        setCollections([]);
      });
  }, [user]);

  const assignerProduit = async (produitId) => {
    if (!selectedCollectionId) return alert("Veuillez sélectionner une collection");

    try {
      const res = await fetch(
        `http://localhost:8080/api/produits/${produitId}/collection/${selectedCollectionId}`,
        { method: 'PUT' }
      );

      if (!res.ok) throw new Error("Échec de l'association");

      setProduits((prev) =>
        prev.map((p) =>
          p.id === produitId ? { ...p, collection: { id: selectedCollectionId } } : p
        )
      );
      alert("Produit associé avec succès !");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'association.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Associer des produits à une collection</h2>

      <label className="block mb-2 font-medium">Collection :</label>
      <select
        onChange={(e) => setSelectedCollectionId(e.target.value)}
        className="border p-2 mb-6 w-full rounded"
        value={selectedCollectionId}
      >
        <option value="">-- Choisir une collection --</option>
        {collections.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nom}
          </option>
        ))}
      </select>

      {produits.length > 0 ? (
  produits.map((p) => {
    const isAssociatedToSelected =
      p.collection && p.collection.id == selectedCollectionId;

    const isAssociatedToOther =
      p.collection && p.collection.id != selectedCollectionId;

    return (
      <div
        key={p.id}
        className="flex justify-between items-center p-3 border rounded mb-2"
      >
        <span className="flex flex-col">
          <span className="font-medium">{p.nom}</span>

          {selectedCollectionId && isAssociatedToSelected && (
            <span className="text-green-600 text-sm">
              ✅ Déjà associé à cette collection
            </span>
          )}

          {selectedCollectionId && isAssociatedToOther && (
            <span className="text-orange-500 text-sm">
              ⚠️ Associé à une autre collection
            </span>
          )}
        </span>

        {!p.collection && selectedCollectionId && (
          <button
            onClick={() => assignerProduit(p.id)}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Associer
          </button>
        )}
      </div>
    );
  })
) : (
  <p className="text-gray-500 italic">Aucun produit trouvé.</p>
)}

    </div>
  );
}
