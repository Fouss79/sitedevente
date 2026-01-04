'use client';

import { useEffect, useState } from 'react';
import ProductItem from './ProductItems copy';

export default function CollectionAccueil() {
  const [collection, setCollection] = useState(null);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!API_URL) return;

    fetch(`${API_URL}/api/collection-accueil`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.id) {
          setCollection(data);
        } else {
          console.warn('Aucune collection d’accueil trouvée.');
        }
      })
      .catch((err) =>
        console.error('Erreur chargement collection accueil:', err)
      );
  }, [API_URL]);

  if (!collection) return null;

  return (
    <div className="w-full px-2 sm:px-4 py-6 bg-[#15878f] text-white">
    
      <div className="border-b border-gray-500 pb-4">
        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Image de la collection */}
          {collection.image && (
            <img
              src={`${API_URL}/${collection.image}`}
              alt={collection.nom}
              className="w-full md:w-1/3 h-auto object-cover rounded"
            />
          )}

          {/* Description */}
          <div className="md:w-2/3 mt-6 md:mt-0 p-4 md:p-8">
            <h2 className="text-3xl font-bold mb-2">{collection.nom}</h2>
            <p className="text-gray-300 mb-4">
              {collection.description}
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold">
              Bienvenue sur notre boutique
            </h1>
          </div>
        </div>
      </div>

      {/* Grille des produits */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 px-2 mt-6">
        {collection.produits?.slice(0, 4).map((produit) => (
          <ProductItem key={produit.id} product={produit} />
        ))}
      </div>
    </div>
  );
}
