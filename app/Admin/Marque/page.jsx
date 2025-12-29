"use client";

import { useState } from "react";
import axios from "axios";

export default function CreerMarqueForm() {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Veuillez sélectionner une image");
      return;
    }

    const formData = new FormData();
    formData.append("nom", nom);
    formData.append("description", description);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:8080/api/marque", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccessMessage("Marque créée avec succès !");
      setNom("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Erreur lors de la création de la marque", error);
      alert("Erreur lors de la création de la marque");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow flex flex-col gap-4"
    >
      <h2 className="text-xl font-bold mb-4">Créer une Marque</h2>

      {successMessage && (
        <div className="bg-green-100 text-green-700 p-3 rounded">{successMessage}</div>
      )}

      <input
        type="text"
        placeholder="Nom de la marque"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border p-2 rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
        className="border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Créer Marque
      </button>
    </form>
  );
}
