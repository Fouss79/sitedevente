"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext"; // ajuste le chemin si nécessaire

export default function ProfilPage() {
  const { user } = useAuth();
  const [utilisateur, setUtilisateur] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (!user?.id) return;

    const fetchUtilisateur = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/utilisateur/${user.id}`);
        const data = await res.json();
        setUtilisateur(data);
      } catch (error) {
        console.error("Erreur lors du chargement du profil:", error);
      }
    };

    fetchUtilisateur();
  }, [user?.id]);

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

    try {
      await fetch(`http://localhost:8080/api/utilisateur/${user.id}`, {
        method: "PUT",
        body: formData,
      });
      alert("Profil mis à jour !");
    } catch (err) {
      console.error("Erreur lors de la mise à jour:", err);
      alert("Une erreur est survenue.");
    }
  };

  if (!utilisateur) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Modifier le profil</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {(utilisateur.role === "VENDEUR" || utilisateur.role === "ADMIN") && (
          <>
            <p>Image actuelle :</p>
            {utilisateur.image ? (
              <img
                src={`http://localhost:8080/${utilisateur.image}`}
                alt="Photo de profil"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <p className="text-gray-500 italic">Aucune photo</p>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full p-3 border rounded"
            />
          </>
        )}
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

        

        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Enregistrer
        </button>
      </form>
    </div>
  );
}
