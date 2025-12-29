'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const STATUTS = {
  EN_ATTENTE: "🕒 En attente",
  EN_LIVRAISON: "🚚 En livraison",
  LIVRÉE: "✅ Livrée",
  ANNULÉE: "❌ Annulée",
};

export default function ListeCommandesAdmin() {
  const { user, isAuthenticated } = useAuth();
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || user.role !== "ADMIN") return;
    axios.get(`http://localhost:8080/api/commande/all`)
      .then(res => setCommandes(res.data))
      .catch(() => setErreur("Erreur récupération des commandes."))
      .finally(() => setLoading(false));
  }, [user, isAuthenticated]);

  const changerStatut = async (commandeId, nouveauStatut) => {
    try {
      await axios.put(`http://localhost:8080/api/commande/${commandeId}/statut`, null, {
        params: { statut: nouveauStatut }
      });
      setCommandes(prev => prev.map(c =>
        c.id === commandeId ? { ...c, statut: nouveauStatut } : c
      ));
    } catch {
      alert("Erreur modification du statut");
    }
  };

  const supprimerCommande = async (commandeId) => {
    if (!confirm("Supprimer cette commande ?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/commande/${commandeId}`);
      setCommandes(prev => prev.filter(c => c.id !== commandeId));
    } catch {
      alert("Erreur suppression de la commande");
    }
  };

  if (!isAuthenticated || user.role !== "ADMIN") {
    return <div className="p-10 text-center text-red-600">Accès refusé.</div>;
  }
  if (loading) return <div className="p-10 text-center">Chargement...</div>;
  if (erreur) return <div className="p-10 text-red-600 text-center">{erreur}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">📋 Toutes les commandes</h1>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Client</th>
            <th className="border px-2 py-1">Adresse</th>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Statut</th>
            <th className="border px-2 py-1">Produits</th>
            <th className="border px-2 py-1">Total (FCFA)</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>

        <tbody>
          {commandes.map(cmd => (
            <tr key={cmd.id} className="even:bg-gray-50">
              <td className="border px-2 py-1">{cmd.id}</td>
              <td className="border px-2 py-1">
                {cmd.client.prenom} {cmd.client.nom}
              </td>
              <td className="border px-2 py-1">{cmd.client.adresse}</td>
              <td className="border px-2 py-1">
                {new Date(cmd.dateCommande).toLocaleString()}
              </td>
              <td className="border px-2 py-1">
                <select
                  className="border rounded p-1 text-sm w-full"
                  value={cmd.statut}
                  onChange={e => changerStatut(cmd.id, e.target.value)}
                >
                  {Object.entries(STATUTS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </td>
              <td className="border px-2 py-1">
                <ul className="list-disc ml-4 text-sm">
                  {cmd.lignes?.map((l, i) => (
                    <li key={i}>
                      {l.produit.nom} × {l.quantite} = {l.prix * l.quantite}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="border px-2 py-1 font-semibold text-right">
                {cmd.total}
              </td>
              <td className="border px-2 py-1 text-center">
                <button
                  onClick={() => supprimerCommande(cmd.id)}
                  className="text-sm text-red-600 underline"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
