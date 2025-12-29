"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
    Home,
    User,
    Box,
    Tag,
    ShoppingCart,
    MessageSquare,
    LogOut
  } from 'lucide-react';




export default function Header() {
  const { user, isAuthenticated, logout, panier } = useAuth();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [totalArticles, setTotalArticles] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const total = Array.isArray(panier)
      ? panier.reduce((acc, item) => acc + (item.quantite || 1), 0)
      : 0;

    // Animer le badge à chaque changement
    if (total !== totalArticles) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
     
    setTotalArticles(total);
  }, [panier]);
     
  const total = panier.reduce((acc, item) => {
    const qte = item.quantite || 1;
    return acc + item.prix * qte;
  }, 0);
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-30">
      <Link href="/" className="text-xl font-bold">
        🛍️ MaBoutique
      </Link>

      <nav className="flex gap-4 items-center">
        <Link href="/">Accueil</Link>
        <Link href="/home/commande">Commandes</Link>
        

        {isClient && isAuthenticated ? (
          <>
            {user?.role === "ADMIN" && (
              <>
                <Link href="/Admin" className="bg-blue-400 py-2 px-2 hover:bg-[green] font-bold rounded-full text-white"><User size={30} color='white' /></Link>
              </>
            )}

            {user?.role === "CLIENT" && (
              <Link href="/home/demandeRole">Vendre</Link>
            )}

            {user?.role === "VENDEUR" && (
              <Link href="/Vendeurs">Mon Compte</Link>
            )}
              <p className="text-[green]">{total} FCFA</p>
        {/* Panier visible tout le temps */}
        <Link href="/home/panier" className="relative">
          🛒
          {isClient && totalArticles > 0 && (
            <span
              className={`absolute -top-2 -right-4 bg-red-600 text-white text-xs rounded-full px-1.5 transition-transform duration-300 ${
                animate ? "scale-125" : "scale-100"
              }`}
            >
              {totalArticles}
            </span>
          )}
        </Link>
       
            <Link href={`/login`}>
            <button onClick={logout} className="text-red-500 flex"><LogOut size={18} />

            </button>
            </Link>
          </>
        ) : (
          isClient && <Link href="/login">Connexion</Link>
        )}
      </nav>
    </header>
  );
}
