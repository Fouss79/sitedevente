'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function ListeCollections() {
  const [collections, setCollections] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:8080/api/collections/vendeur/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCollections(data);
        else setCollections([]);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des collections:", err);
        setCollections([]);
      });
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Mes collections</h2>

      {collections.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {collections.map((collection) => (
            <li key={collection.id} className="border rounded p-4 shadow bg-white">
              <h3 className="text-lg font-semibold mb-2">{collection.nom}</h3>
              {collection.description && (
                <p className="text-gray-700 text-sm">{collection.description}</p>
              )}
              {/* Tu peux ajouter ici une image, ou le nombre de produits */}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 italic">Aucune collection trouvée.</p>
      )}
    </div>
  );
}
