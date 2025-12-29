'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { icons } from './CategorieIcone';
import { Phone } from 'lucide-react';

const DefaultIcon = () => (
  <div className="w-10 h-10 bg-gray-200 rounded-full" />
);

const ListeCat = () => {
  const [categories, setCategories] = useState([]);
  const [categorieLoading, setCategorieLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setCategorieLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/categorie');
      setCategories(response.data);
      setError(null);
    } catch (error) {
      setError('Erreur lors de la récupération des catégories');
      console.error(error);
    } finally {
      setCategorieLoading(false);
    }
  };

  const deleteCategorie = async (categorieId) => {
    try {
      await axios.delete(`http://localhost:8080/api/${categorieId}`);
      fetchCategories();
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='bg-white rounded-xl p-5 w-full'>
      {categorieLoading ? (
        <p>Chargement...</p>
      ) : error ? (
        <p className='text-red-500'>{error}</p>
      ) : categories.length === 0 ? (
        <p>Aucune catégorie trouvée</p>
      ) : (
        <div className='grid grid-cols-3 md:grid-cols-6 gap-6'>
          {categories.map((cat, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 text-center relative">
              <div className="flex justify-center mb-2">
                {icons[cat.nom.toLowerCase()] || <Phone className="w-10 h-10 text-blue-600" />}
              </div>
              <h4 className='font-bold text-sm'>{cat.nom}</h4>
              <p className='text-xs text-gray-500'>{cat.description}</p>
              <button
                onClick={() => deleteCategorie(cat.id)}
                className='text-xs text-red-500 absolute top-2 right-2 hover:underline'
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListeCat;
