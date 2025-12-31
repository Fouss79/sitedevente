"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";


export default function HeaderClient({toggleSidebar}) {
  const { user, isAuthenticated, logout, panier } = useAuth();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const totalArticles = Array.isArray(panier)
    ? panier.reduce((acc, item) => acc + (item.quantite || 1), 0)
    : 0;

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fixed top-0 left-0 w-full z-30">
      <Link href="/home" className="text-xl font-bold">
        🛍️ MaBoutique
      </Link>
       
       <div className='flex justify-center items-center md:hidden'>
               <button onClick={toggleSidebar}>
                 <IoMdMenu className='text-2xl' />
               </button>
             </div>
      <nav className="flex gap-4 items-center">
        <Link href="/home">Accueil</Link>
        <Link href="/commande">Commandes</Link>

        {/* Panier visible tout le temps, mais compteur uniquement côté client */}
        <Link href="/home/panier" className="relative">
          🛒
          {isClient && totalArticles > 0 && (
            <span className="absolute -top-2 -right-4 bg-red-600 text-white text-xs rounded-full px-1.5">
              {totalArticles}
            </span>
          )}
        </Link>

        {isClient && isAuthenticated ? (
          <>
            {user?.role === "ADMIN" && (
              <>
                <Link href="/admin/dashboard">Dashboard Admin</Link>
                <Link href="/admin/utilisateurs">Utilisateurs</Link>
                <Link href="/Admin">ADMIN</Link>
              </>
            )}

            {user?.role === "CLIENT" && (
              <Link href="/home/demandeRole">Vendre</Link>
            )}

            {user?.role === "VENDEUR" && (
              <Link href="/Vendeurs">Mon Compte</Link>
            )}

            <button onClick={logout} className="text-red-500">
              Déconnexion
            </button>
          </>
        ) : (
          isClient && <Link href="/login">Connexion</Link>
    
          
        )}
      </nav>
    </header>
  );
}
