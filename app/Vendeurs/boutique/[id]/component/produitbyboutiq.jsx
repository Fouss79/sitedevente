import React, { useState, useEffect } from 'react';
import axios from 'axios';

import BoutiqueCard from './boutiqueItem';


 // Vérifiez le chemin


const ProduitsByCat = ({ AjtePagne,id }) => {
  
  const [boutique, setBoutique] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // État d'erreur

  // Fonction pour supprimer un produit
 

  // Fonction pour récupérer les produits par catégorie
  const fetchProduits = async () => {
    setLoading(true); // Début du chargement
    try {
      const url = id
        ? `http://localhost:8080/api/boutique/${id}` // Si "categorieId" est présent dans l'URL
        : 'http://localhost:8080/api/boutique'; // Sinon, récupérer tous les produits

      const response = await axios.get(url);
      setBoutique(response.data);
    } catch (error) {
      setError('Erreur lors de la récupération des produits'); // Mettre à jour l'état d'erreur
      console.error('Error fetching produits:', error);
    } finally {
      setLoading(false); // Fin du chargement
    }
  };

  // Recharger les produits chaque fois que "categorieId" change
  useEffect(() => {
    fetchProduits(); // Appeler la fonction pour récupérer les produits dès que "categorieId" change
  }, [id]); // Le tableau de dépendances assure le rechargement quand "categorieId" change

  return (
    <div className="rounded-xl p-5 w-full">
      {loading ? (
        <p>Chargement...</p> // Afficher un message de chargement si les produits sont en cours de récupération
      ) : error ? (
        <p>{error}</p> // Afficher un message d'erreur si une erreur s'est produite
      ) : boutique.length === 0 ? (
        <p>Aucun produit disponible</p> // Afficher un message si aucun produit n'est trouvé
      ) : (
        <div>
          <div className="product-list gap-10">
        
              
           <BoutiqueCard key={boutique.id} boutique={boutique}/>
            
            
          </div>
        </div>
      )}
    </div>
  );
};

export default ProduitsByCat;
