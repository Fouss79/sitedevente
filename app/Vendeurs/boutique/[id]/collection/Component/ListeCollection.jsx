'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
export default function ListeCollections() {
  const [collections, setCollections] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:8080/api/collections/boutique/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCollections(data);
        else setCollections([]);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des collections:", err);
        setCollections([]);
      });
  }, [id]);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Mes collections</h2>

      {collections.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <li key={collection.id} className="border rounded overflow-hidden shadow bg-white">
              {collection.image && (
                <img
                  src={`http://localhost:8080/${collection.image}`}
                  alt={collection.nom}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{collection.nom}</h3>
                {collection.description && (
                  <p className="text-gray-700 text-sm mb-2">{collection.description}</p>
                )}
                <p className="text-blue-600 text-sm font-medium">
                  {collection.produits?.length || 0} produit(s)
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 italic">Aucune collection trouvée.</p>
      )}
    </div>
  );
}
