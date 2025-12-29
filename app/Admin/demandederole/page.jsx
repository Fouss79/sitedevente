"use client";

import { useEffect, useState } from "react";

export default function DemandesRolePage() {
  const [demandes, setDemandes] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDemandes = async () => {
      const res = await fetch("http://localhost:8080/api/utilisateur/demandes-role");
      const data = await res.json();
      setDemandes(data);
    };

    fetchDemandes();
  }, []);

  const handleValider = async (id) => {
    const res = await fetch(`http://localhost:8080/api/utilisateur/${id}/valider-role`, {
      method: "PUT",
    });

    const msg = await res.text();
    setMessage(msg);

    setDemandes(demandes.filter((d) => d.id !== id));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Demandes de rôles</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}

      {demandes.length === 0 ? (
        <p>Aucune demande en attente</p>
      ) : (
        <ul>
          {demandes.map((u) => (
            <li key={u.id} className="flex justify-between items-center border-b py-3">
              <div>
                <p className="font-bold">{u.nom}</p>
                <p className="text-sm text-gray-600">Email : {u.email}</p>
                <p className="text-sm text-gray-600">Rôle demandé : {u.roleDemande}</p>
              </div>
              <button
                onClick={() => handleValider(u.id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Valider
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
