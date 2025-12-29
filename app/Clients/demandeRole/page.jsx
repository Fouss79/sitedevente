"use client";

import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export default function DemandeRolePage() {
  const { user, token, isAuthenticated, loading } = useAuth();
  const [roleSouhaite, setRoleSouhaite] = useState("VENDEUR");
  const [message, setMessage] = useState("");

  const handleDemande = async () => {
    if (!isAuthenticated || !user?.id) {
      setMessage("Vous devez être connecté pour faire cette demande.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/utilisateur/${user.id}/demande-role?roleSouhaite=${roleSouhaite}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`, // si JWT
          },
        }
      );

      const data = await res.text();
      setMessage(data);
    } catch (error) {
      setMessage("Erreur lors de la requête.");
    }
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-xl font-semibold mb-4">Demander un rôle</h1>

      <select
        value={roleSouhaite}
        onChange={(e) => setRoleSouhaite(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      >
        <option value="VENDEUR">Vendeur</option>
        <option value="ADMIN">Administrateur</option>
      </select>

      <button
        onClick={handleDemande}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Envoyer la demande
      </button>

      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
