'use client';

import { useEffect, useState } from 'react';
import ProductItem from './ProductItems copy';

export default function AccueilCollections() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/collections/accueil')
      .then(res => res.json())
      .then(data => setCollections(data))
      .catch(err => console.error('Erreur chargement collections accueil :', err));
  }, []);

  if (!collections.length) return null;

  const backgrounds = [
  "bg-[#1abc9c]", // turquoise clair
  "bg-[#e74c3c]", // rouge vif
  "bg-[#f39c12]"  // orange chaud
];


  return (
    <div className="flex flex-col gap-12 px-4 py-8">
      {collections.map((collection, index) => (
        <section key={collection.id} className={`text-white rounded-lg overflow-hidden ${backgrounds[index]}`}>
          
          <div className="border-b border-gray-500 pb-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              
              {/* Image */}
              {collection.image && (
                <img
                  src={`http://localhost:8080/${collection.image}`}
                  alt={collection.nom}
                  className="w-full md:w-1/3 object-cover rounded"
                />
              )}

              {/* Description */}
              <div className="md:w-2/3 mt-8 md:mt-28 p-6">
                <h2 className="text-3xl font-bold mb-2">{collection.nom}</h2>
                <p className="text-gray-200 mb-4">{collection.description}</p>
                <h1 className="text-5xl font-bold">Bienvenue sur notre boutique</h1>
              </div>
            </div>
          </div>

          {/* Grille de produits */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6 bg-white/10">
            {collection.produits?.slice(0, 4).map(produit => (
              <ProductItem key={produit.id} product={produit} />
            ))}
          </div>

        </section>
      ))}
    </div>
  );
}
