"use client";

import { useEffect, useState } from "react";

export default function SelectionCollectionAccueil() {
  const [boutiques, setBoutiques] = useState([]);
  const [collections, setCollections] = useState([]);
  const [selectedBoutique, setSelectedBoutique] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("");

  // Charger toutes les boutiques
  useEffect(() => {
    fetch("http://localhost:8080/api/boutique")
      .then((res) => res.json())
      .then((data) => setBoutiques(data))
      .catch((err) => console.error("Erreur chargement boutiques:", err));
  }, []);

  // Charger les collections de la boutique sélectionnée
  useEffect(() => {
    if (!selectedBoutique) return;
   fetch(`http://localhost:8080/api/collections/boutique/${selectedBoutique}`)
  .then((res) => res.json())
  .then((data) => {
    console.log("Données collections:", data); // 🐞 Ajoute ceci
    if (Array.isArray(data)) {
      setCollections(data);
    } else {
      console.warn("La réponse n'est pas un tableau :", data);
      setCollections([]); // pour éviter l’erreur map
    }
  })
  .catch((err) => console.error("Erreur chargement collections:", err));

  }, [selectedBoutique]);

  // Simuler l'action d'enregistrement de la collection à afficher à l'accueil
  const enregistrerChoix = async () => {
    if (!selectedCollection) return alert("Veuillez sélectionner une collection.");

    try {
    const res = await fetch(`http://localhost:8080/api/collection-accueil/${selectedCollection}`, {
  method: "POST"
});


      if (res.ok) {
        alert("Collection sélectionnée pour l'accueil avec succès !");
      } else {
        alert("Erreur lors de la sélection de la collection.");
      }
    } catch (err) {
      console.error("Erreur enregistrement:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Sélectionner une collection à afficher sur la page d'accueil</h2>

      <label className="block mb-2 font-medium">Boutique :</label>
      <select
        value={selectedBoutique}
        onChange={(e) => setSelectedBoutique(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">-- Choisir une boutique --</option>
        {boutiques.map((b) => (
          <option key={b.id} value={b.id}>{b.nom}</option>
        ))}
      </select>

      <label className="block mb-2 font-medium">Collection :</label>
      <select
        value={selectedCollection}
        onChange={(e) => setSelectedCollection(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">-- Choisir une collection --</option>
        {collections.map((c) => (
          <option key={c.id} value={c.id}>{c.nom}</option>
        ))}
      </select>

      <button
        onClick={enregistrerChoix}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Enregistrer
      </button>
    </div>
  );
}
