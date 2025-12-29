'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductItem from '../../components/ProductItems';

export default function CollectionAccueil() {
  const [collection, setCollection] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch('http://localhost:8080/api/collection-accueil')
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
  }, []);

  if (!collection) return null;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 border p-6 rounded shadow bg-[#2e4053]">
        
        {/* Bouton Admin */}
        

        {/* Image et description */}
        <div className="flex flex-col md:flex-row items-start gap-6 mt-6 mb-4">
          {collection.image && (
            <img
              src={`http://localhost:8080/${collection.image}`}
              alt={collection.nom}
              className="w-full md:w-1/3 rounded object-cover"
            />
          )}

          <div className="text-white md:w-2/3">
            <h2 className="text-3xl font-bold mb-2">{collection.nom}</h2>
            <p className="text-gray-300 mb-2">{collection.description}</p>
            <h1 className="text-5xl font-bold">
              Bienvenue sur notre boutique
            </h1>
          </div>
        </div>

        {/* Produits */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
          {collection.produits?.slice(0, 3).map((produit) => (
            <ProductItem key={produit.id} product={produit} />
          ))}
        </div>
      </div>
      <div className="flex justify-end mb-4">
          <button
            onClick={() => router.push('/Admin/collections/creerCollection')}
            className="bg-[#15878f] text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            + Changer la collection 
          </button>
        </div>
    </div>
  );
}
