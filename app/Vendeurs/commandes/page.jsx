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

export default function ListeCommandesVendeur() {
  const { user, isAuthenticated } = useAuth();
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    if (!user?.id) return;
    axios.get(`http://localhost:8080/api/commande/vendeur/${user.id}`)
      .then(res => setCommandes(res.data))
      .catch(() => setErreur("Erreur récupération commandes."))
      .finally(() => setLoading(false));
  }, [user]);

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

  if (!isAuthenticated) return (
    <div className="p-10 text-center text-red-600">
      Vous devez être connecté pour voir les commandes.
    </div>
  );
  if (loading) return <div className="p-10 text-center">Chargement...</div>;
  if (erreur) return <div className="p-10 text-center text-red-600">{erreur}</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">📦 Commandes reçues</h1>
      {commandes.length === 0 ? (
        <p className="text-gray-500">Aucune commande pour le moment.</p>
      ) : (
        <div className="space-y-6">
          {commandes.map(cmd => (
            <div key={cmd.id} className="border p-4 rounded shadow-sm">
              {/* Client Info */}
              <p className="text-md">
                <strong>Client :</strong> {cmd.client.prenom} {cmd.client.nom} — {cmd.client.email}
              </p>
              <p className="text-sm text-gray-600">
                Adresse : {cmd.client.adresse} • Téléphone : {cmd.client.telephone}
              </p>

              {/* Date */}
              <p className="font-semibold mt-2">
                Date de la commande : { new Date(cmd.dateCommande).toLocaleString() }
              </p>

              {/* Statut */}
              <div className="mt-2">
                <label className="text-sm mr-2 font-semibold">Statut :</label>
                <select
                  className="border rounded p-1 text-sm"
                  value={cmd.statut}
                  onChange={e => changerStatut(cmd.id, e.target.value)}
                >
                  {Object.entries(STATUTS).map(([val, label]) => (
                    <option key={val} value={val}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Lignes de commande */}
              <ul className="mt-3">
                {cmd.lignes?.map((l, i) => (
                  <li key={i} className="text-sm text-gray-700">
                    • {l.produit.nom} &times; {l.quantite} = {l.prix * l.quantite} FCFA
                  </li>
                ))}
              </ul>

              {/* Total */}
              <p className="mt-2 font-semibold text-right text-green-700">
                Total de la commande : {cmd.total} FCFA
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
