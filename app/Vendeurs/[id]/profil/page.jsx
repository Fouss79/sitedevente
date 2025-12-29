"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProfilPage() {
  const { id } = useParams(); // récupère l'ID de l'URL
  const [utilisateur, setUtilisateur] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchUtilisateur = async () => {
      const res = await fetch(`http://localhost:8080/api/utilisateur/${id}`);
      const data = await res.json();
      setUtilisateur(data);
    };

    if (id) fetchUtilisateur();
  }, [id]);

  const handleChange = (e) => {
    setUtilisateur({ ...utilisateur, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(utilisateur).forEach(([key, value]) => {
      if (key !== "image") formData.append(key, value);
    });

    if (imageFile) {
      formData.append("image", imageFile);
    }

    await fetch(`http://localhost:8080/api/utilisateur/${id}`, {
      method: "PUT",
      body: formData,
    });

    alert("Profil mis à jour !");
  };

  if (!utilisateur) return <div>Chargement...</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Modifier le profil</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="prenom"
          type="text"
          value={utilisateur.prenom}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          placeholder="Prénom"
        />

        <input
          name="nom"
          type="text"
          value={utilisateur.nom}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          placeholder="Nom"
        />

        <input
          name="adresse"
          type="text"
          value={utilisateur.adresse}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          placeholder="Adresse"
        />

        <input
          name="telephone"
          type="text"
          value={utilisateur.telephone}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          placeholder="Téléphone"
        />

        {/* Montre l'image si le rôle est VENDEUR ou ADMIN */}
        {(utilisateur.role === "VENDEUR" || utilisateur.role === "ADMIN") && (
          <>
            <p>Image actuelle :</p>
            {utilisateur.image ? (
             <img src={`http://localhost:8080/${utilisateur.image}`} alt="Photo de profil" className="w-32 h-32 rounded-full object-cover" />
             ) : (  <p className="text-gray-500 italic">Aucune photo</p>)}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-3 border rounded"
            />
          </>
        )}

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
