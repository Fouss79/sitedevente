'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProductItem from '../../../../components/ProductItems';

export default function CollectionsParBoutique() {
  const { id } = useParams();
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/collections/boutique/${id}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCollections(data);
        } else {
          console.warn("Données inattendues :", data);
        }
      })
      .catch(err => {
        console.error("Erreur lors du chargement des collections :", err);
      });
  }, [id]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      {collections.length === 0 ? (
        <p className="text-gray-600 italic">Aucune collection trouvée.</p>
      ) : (
        collections.map((collection) => (
          <div key={collection.id} className="mb-8 border p-4 rounded  shadow  bg-[#2e4053]">
            {/* Image et description côte à côte */}
            <div className="flex flex-col md:flex-row items-start gap-6 mt-6 mb-4">
              {/* Image */}
              {collection.image && (
                <img
                  src={`http://localhost:8080/${collection.image}`}
                  alt={collection.nom}
                  className="w-full md:w-1/3 rounded object-cover"
                />
              )}

              {/* Description */}
              <div className='text-white p-30'>
                
              <div className='text-white md:w-2/3'>
  <h2 className="text-3xl font-bold mb-2">{collection.nom}</h2>
  <p className="text-gray-300">{collection.description}</p>
</div>
               <h1 className="text-5xl font-bold mb-2">Bienvenue sur notre boutique </h1>
      </div>
            </div>

            {/* Grille des produits */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4">
              {collection.produits?.slice(0, 3).map((produit) => (
                <ProductItem  key={produit.id} product={produit}/>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
