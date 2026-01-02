'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from "next/link";
import ProductItem from './ProductItems copy';


export default function AccueilCollections() {
  const [collections, setCollections] = useState([]);
  const { id } = useParams(); // 👈 ID boutique depuis l’URL
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!API_URL || !id) return;

    fetch(`${API_URL}/api/collections/boutique/${id}`)
      .then(res => res.json())
      .then(data => setCollections(data))
      .catch(err =>
        console.error('Erreur chargement collections boutique :', err)
      );
  }, [API_URL, id]);

  if (!collections.length) return null;

  const backgrounds = [
    "bg-[#1abc9c]",
    "bg-[#e74c3c]",
    "bg-[#f39c12]",
    "bg-[#8e44ad]",
  ];

  return (
    <div className="flex flex-col ">
      <div className='mt-20'>     {/* 🔹 Bouton NOS ARTICLES */}
    {id && (
      <Link href={`/home/prod/boutique/${id}`}>
        <button className="
          px-5 py-2 rounded-xl
          bg-black/30 text-white font-semibold
          border border-white/30
          backdrop-blur
          transition-all duration-300
          hover:bg-black/50 hover:scale-105
        ">
          NOS ARTICLES
        </button>
      </Link>
    )}</div>
   
      {collections.map((collection, index) => (
        <section
          key={collection.id}
          className={`text-white rounded-lg overflow-hidden ${
            backgrounds[index % backgrounds.length]
          }`}
        >
          {/* Header */}
         {/* Header */}
<div className="border-b border-gray-500 px-4 py-8">
  {/* Ligne titre + bouton */}
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-bold">
      {collection.nom}
    </h2>

   
  </div>

  <div className="flex flex-col md:flex-row items-start gap-6">
    {/* Image */}
    {collection.image && (
      <img
        src={`${API_URL}/${collection.image}`}
        alt={collection.nom}
        className="w-full md:w-1/3 object-cover rounded"
      />
    )}

    {/* Description */}
    <div className="md:w-2/3 mt-4 md:mt-20 p-4">
      <p className="text-gray-200 mb-4">
        {collection.description}
      </p>
      <h1 className="text-4xl sm:text-5xl font-bold">
        Bienvenue sur notre boutique
      </h1>
    </div>
     </div>
      </div>


          {/* Produits */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-6 bg-white/10">
            {collection.produits?.slice(0, 4).map((produit) => (
              <ProductItem key={produit.id} product={produit} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
