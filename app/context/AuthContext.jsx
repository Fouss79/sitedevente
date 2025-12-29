'use client';

import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [panier, setPanier] = useState([]);
  const [loading, setLoading] = useState(true);

  // Chargement initial
  useEffect(() => {
    const userInStorage = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cart");

    if (userInStorage && userInStorage !== "undefined") {
      setUser(JSON.parse(userInStorage));
    }

    if (storedCart) {
      setPanier(JSON.parse(storedCart));
    }

    setLoading(false);
  }, []);
  
  

  // Connexion
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Déconnexion
  const logout = () => {
    setUser(null);
    setPanier([]);
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
  };

  // Ajouter au panier
  // Ajouter au panier avec gestion de quantité personnalisée
const ajouterAuPanier = (produitAvecQuantite) => {
  const index = panier.findIndex(p => p.id === produitAvecQuantite.id);
  let updatedCart;

  if (index !== -1) {
    updatedCart = panier.map((p, i) =>
      i === index
        ? { ...p, quantite: (p.quantite || 1) + (produitAvecQuantite.quantite || 1) }
        : p
    );
  } else {
    updatedCart = [...panier, { ...produitAvecQuantite }];
  }

  setPanier(updatedCart);
  localStorage.setItem("cart", JSON.stringify(updatedCart));
};


  // Retirer 1 du panier
  const retirerDuPanier = (produitId) => {
    const index = panier.findIndex((item) => item.id === produitId);
    if (index === -1) return;

    const item = panier[index];
    let updatedCart;

    if ((item.quantite || 1) > 1) {
      updatedCart = panier.map((p, i) =>
        i === index ? { ...p, quantite: p.quantite - 1 } : p
      );
    } else {
      updatedCart = panier.filter((_, i) => i !== index);
    }

    setPanier(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Vider le panier
  const viderPanier = () => {
    setPanier([]);
    localStorage.removeItem("cart");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        loading,
        panier,
        setPanier,
        ajouterAuPanier,
        retirerDuPanier,
        viderPanier
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
