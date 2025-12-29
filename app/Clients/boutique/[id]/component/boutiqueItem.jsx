import React from 'react';
import Link from 'next/link';
const BoutiqueCard = ({ boutique }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6 p-6 w-full max-w-4xl mx-auto">
      <div className="flex items-center space-x-6">
        <img
          src={`http://localhost:8080/${boutique.image}`}

          alt={boutique.nom}
          className="w-24 h-24 rounded-full object-cover border shadow"
        />
        <div>
          <h2 className="text-2xl font-bold">{boutique.nom}</h2>
          <p className="text-gray-600 mt-2">{boutique.description}</p>
        </div>
        <div className="flex justify-end mb-4">
        <Link
          href={`/produits/ajouter?boutiqueId=${boutique.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Ajouter un produit
        </Link>
      </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Produits disponibles</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {boutique.produits && boutique.produits.map((produit) => (
            <div key={produit.id} className="bg-gray-100 rounded-lg p-4 shadow">
              <img
                src={`http://localhost:8080/${produit.image}`}
                alt={produit.nom}
                className="w-full h-72 object-cover rounded"
              />
              <h4 className="mt-2 font-medium">{produit.nom}</h4>
              <p className="text-sm text-gray-600">{produit.prix} FCFA</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BoutiqueCard;
