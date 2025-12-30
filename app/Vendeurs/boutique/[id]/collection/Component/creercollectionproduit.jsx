'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function AssignationProduits() {
  const [produits, setProduits] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedCollectionId, setSelectedCollectionId] = useState('');
  const { id } = useParams();

  // Charger produits et collections au chargement
  useEffect(() => {
    if (!id) return;

    // Produits
    fetch(`http://localhost:8080/api/produits/boutique/${id}`)
      .then((res) => res.json())
      .then((data) => setProduits(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Erreur produits:", err);
        setProduits([]);
      });

    // Collections
    fetch(`http://localhost:8080/api/collections/boutique/${id}`)
      .then((res) => res.json())
      .then((data) => setCollections(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error("Erreur collections:", err);
        setCollections([]);
      });
  }, [id]);

  // Associer un produit à la collection sélectionnée
  const assignerProduit = async (produitId) => {
    if (!selectedCollectionId) return alert("Veuillez sélectionner une collection");

    try {
      const res = await fetch(
        `http://localhost:8080/api/produits/${produitId}/collection/${selectedCollectionId}`,
        { method: 'PUT' }
      );

      if (!res.ok) throw new Error("Échec de l'association");

      // Met à jour localement le produit pour refléter l'association
      setProduits((prev) =>
        prev.map((p) =>
          p.id === produitId
            ? { ...p, collectionId: Number(selectedCollectionId), collectionNom: collections.find(c => c.id === Number(selectedCollectionId))?.nom }
            : p
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
          const estAssocie = selectedCollectionId && Number(p.collectionId) === Number(selectedCollectionId);

          return (
            <div
              key={p.id}
              className="flex justify-between items-center p-3 border rounded mb-2"
            >
              <span className="font-medium">{p.nom}</span>

              {selectedCollectionId ? (
                estAssocie ? (
                  <span className="text-green-600 font-semibold">✅ Associé</span>
                ) : (
                  <button
                    onClick={() => assignerProduit(p.id)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Associer ❌
                  </button>
                )
              ) : (
                <span className="text-gray-400 text-sm">Choisir une collection</span>
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
