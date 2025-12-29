"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CreateStoreForm() {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const params = useParams(); // récupère l'id depuis l'URL
  const utilisateurId = params.id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("utilisateurId", utilisateurId); // très important
    if (logo) {
      formData.append("logoUrl", logo); // ce nom DOIT être exactement comme dans @RequestParam("logoUrl")
    }

    // (debug facultatif)
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const res = await fetch("http://localhost:8080/api/boutique", {
        method: "POST",
        body: formData, // NE PAS ajouter headers ici
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Boutique créée :", data);
        router.push(`/Vendeurs/${utilisateurId}/mesboutiques`);
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Erreur lors de la création.");
      }
    } catch (err) {
      setError("Erreur réseau.");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Créer votre boutique
      </h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nom de la boutique"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          className="w-full p-3 border rounded-md"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-md"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
          required
          className="w-full p-3 border rounded-md"
        />

        <button
          type="submit"
          className="w-full bg-[white] hover:bg-blue-700 text-white p-3 rounded-md"
        >
          Créer ma boutique
        </button>
      </form>
    </div>
  );
}
