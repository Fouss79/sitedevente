'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ListeCategorie = () => {
  const [categories, setCategories] = useState([]);
  const [categorieLoading, setCategorieLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setCategorieLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/categorie');
      setCategories(response.data);
      alert(response.data.nom);
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
      fetchCategories(); // correction ici
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
            <div
              key={i}
              className='bg-white p-4 rounded shadow hover:shadow-lg relative'
            >
              

              {cat.image && (
  <img
    src={`http://localhost:8080/${cat.image}`}
    alt={cat.nom}
    className='w-50 h-full object-cover rounded'
  />
)}

              
              <h4 className='font-bold text-lg'>{cat.nom}</h4>
              <h4 className='font-bold text-lg'>{cat.description}</h4>
              <button
                onClick={() => deleteCategorie(cat.id)}
                className='text-sm text-red-500 absolute top-2 right-2 hover:underline'
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

export default ListeCategorie;
