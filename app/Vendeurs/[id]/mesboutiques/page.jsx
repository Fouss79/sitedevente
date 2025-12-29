"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import BoutiqueCard from './component/boutiqueItem';

const BoutiquesParUtilisateur = () => {
  const params = useParams();
  const vendeurId = params.id;

  const [boutiques, setBoutiques] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!vendeurId) return;
    axios.get(`http://localhost:8080/api/boutique/utilisateur/${vendeurId}`)
      .then((res) => {
        setBoutiques(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [vendeurId]);

  if (loading) return <p>Chargement...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Boutiques de l'utilisateur {vendeurId}</h1>
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
