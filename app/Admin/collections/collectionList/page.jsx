'use client';

import { useEffect, useState } from 'react';

export default function AdminAccueilCollections() {
  const [collections, setCollections] = useState([]);
  const [selected, setSelected] = useState([]); // {id, ordre}

  // Charger toutes les collections
  useEffect(() => {
    fetch('http://localhost:8080/api/collections')
      .then((res) => res.json())
      .then((data) => setCollections(data))
      .catch(console.error);
  }, []);

  // Toggle sélection
  const toggleCollection = (collection) => {
    setSelected((prev) => {
      const exists = prev.find((c) => c.id === collection.id);
      if (exists) return prev.filter((c) => c.id !== collection.id); // retirer
      if (prev.length >= 3) {
        alert('Vous ne pouvez sélectionner que 3 collections');
        return prev;
      }
      return [...prev, { id: collection.id, ordre: prev.length + 1 }];
    });
  };

  // Changer l’ordre
  const changeOrdre = (id, ordre) => {
    setSelected((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ordre: Number(ordre) } : c))
    );
  };

  // Soumettre au backend
  const handleSubmit = () => {
    if (selected.length !== 3) {
      alert('Il faut sélectionner exactement 3 collections');
      return;
    }

    fetch('http://localhost:8080/api/collections/accueil', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(selected),
    })
      .then((res) => {
        if (res.ok) alert('Accueil configuré avec succès !');
        else alert('Erreur lors de la configuration');
      })
      .catch(console.error);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sélection des 3 collections pour l’accueil</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {collections.map((collection) => {
          const isSelected = selected.find((c) => c.id === collection.id);
          return (
            <div
              key={collection.id}
              onClick={() => toggleCollection(collection)}
              className={`cursor-pointer p-4 border rounded-lg transition
                ${isSelected ? 'border-green-600 bg-green-50' : 'border-gray-300'}
              `}
            >
              <h3 className="font-semibold">{collection.nom}</h3>
              <p className="text-sm text-gray-600">{collection.description}</p>

              {isSelected && (
                <div className="mt-2">
                  <span className="text-green-600 font-medium mr-2">✔ Sélectionnée</span>
                  <input
                    type="number"
                    min="1"
                    max="3"
                    value={isSelected.ordre}
                    onChange={(e) => changeOrdre(collection.id, e.target.value)}
                    className="w-12 p-1 border rounded"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Enregistrer l’accueil
      </button>
    </div>
  );
}
