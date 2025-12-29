"use client";
import { useEffect, useState } from "react";

export default function ListeUtilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/utilisateur")
      .then((res) => res.json())
      .then((data) => setUtilisateurs(data));
  }, []);

  const updateRole = async (id, role) => {
    const res = await fetch(`http://localhost:8080/api/utilisateur/${id}/role?role=${role}`, {
      method: "PUT",
    });

    if (res.ok) {
      alert("Rôle mis à jour !");
      // Recharger la liste
      const data = await fetch("http://localhost:8080/api/utilisateur").then((r) => r.json());
      setUtilisateurs(data);
    } else {
      const err = await res.text();
      alert("Erreur : " + err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Liste des utilisateurs</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nom</th>
            <th className="p-2">Prénom</th>
            <th className="p-2">Email</th>
            <th className="p-2">Rôle</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {utilisateurs.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{user.nom}</td>
              <td className="p-2">{user.prenom}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2">
                <select
                  value={user.role}
                  onChange={(e) => updateRole(user.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="CLIENT">Client</option>
                  <option value="VENDEUR">Vendeur</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
