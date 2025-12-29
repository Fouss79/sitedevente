'use client';

import { useAuth } from '../../../context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';

const PanierPage = () => {
  const { panier, setPanier, viderPanier } = useAuth();

  const handleQuantiteChange = (index, value) => {
    const qte = Math.max(1, parseInt(value) || 1);
    const nouveauPanier = panier.map((item, i) =>
      i === index ? { ...item, quantite: qte } : item
    );
    setPanier(nouveauPanier);
    localStorage.setItem('cart', JSON.stringify(nouveauPanier));
  };

  const supprimerProduit = (index) => {
    const nouveauPanier = panier.filter((_, i) => i !== index);
    setPanier(nouveauPanier);
    localStorage.setItem('cart', JSON.stringify(nouveauPanier));
  };

  const total = panier.reduce((acc, item) => {
    const qte = item.quantite || 1;
    return acc + item.prix * qte;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">🛒 Mon Panier</h1>

      {panier.length === 0 ? (
        <p className="text-gray-500">Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {panier.map((item, index) => (
              <li key={index} className="flex gap-4 items-center border p-3 rounded shadow-sm">
                <div className="w-20 h-20 overflow-hidden rounded">
                  <Image
                    src={`http://localhost:8080/${item.image}`}
                    alt={item.nom}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{item.nom}</p>
                  <p className="text-yellow-700 font-bold">{item.prix} FCFA</p>
                  <div className="mt-1 flex items-center gap-2">
                    <label htmlFor={`quantite-${index}`}>Qté:</label>
                    <input
                      type="number"
                      id={`quantite-${index}`}
                      min="1"
                      value={item.quantite || 1}
                      onChange={(e) => handleQuantiteChange(index, e.target.value)}
                      className="w-16 border px-1 py-0.5 rounded"
                    />
                  </div>
                </div>

                <div className="flex flex-col items-end justify-between h-full">
                  <Link
                    href={`/produit/${item.id}`}
                    className="text-sm text-blue-600 underline"
                  >
                    Voir
                  </Link>
                  <button
                    onClick={() => supprimerProduit(index)}
                    className="text-sm text-red-600 underline"
                  >
                    Supprimer
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-6 text-right">
            <p className="text-lg font-bold">Total : {total} FCFA</p>
            <button
              onClick={viderPanier}
              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
            >
              Vider le panier
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PanierPage;
