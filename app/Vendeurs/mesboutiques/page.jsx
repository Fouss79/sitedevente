'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import BoutiqueCard from './component/boutiqueItem';
import { useAuth } from '../../context/AuthContext'; // ajuste le chemin si besoin

const BoutiquesParUtilisateur = () => {
  const { user } = useAuth();
  const vendeurId = user?.id;

  const [boutiques, setBoutiques] = useState([]);
  const [loading, setLoading] = useState(true);

  // URL de base depuis .env
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!vendeurId) return;

    axios
      .get(`${API_URL}/api/boutique/utilisateur/${vendeurId}`)
      .then((res) => {
        setBoutiques(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur chargement boutiques:", err);
        setLoading(false);
      });
  }, [vendeurId, API_URL]);

  if (!user) return <p className="text-center text-red-500">Vous devez être connecté.</p>;
  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mes Boutiques</h1>
      {boutiques.length === 0 ? (
        <p>Aucune boutique trouvée.</p>
      ) : (
        <ul className="space-y-4">
          {boutiques.map((boutique) => (
            <li key={boutique.id}>
              <BoutiqueCard boutique={boutique} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BoutiquesParUtilisateur;
