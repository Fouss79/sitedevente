"use client";

import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LogOut,
  ShoppingCart,
} from 'lucide-react';
import Image from "next/image";

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
    <header className="bg-white shadow-md p-4 flex justify-between items-center  top-0 left-0 w-full z-30">
      <Link href="/home" className="text-xl font-bold text-[#036c94]">
        🛍️ MaBoutique
      </Link>

      <nav className="flex gap-4 items-center">
      
        <Link href="/home/commande" className="text-[#036c94]  hover:text-blue-700">Commandes</Link>

        {isClient && isAuthenticated ? (
          <>
            {user?.role === "CLIENT" && (
              <Link href="/home/demandeRole" className="hover:text-[#036c94]">Vendre</Link>
            )}

            {user?.role === "VENDEUR" && (
                  <Link
                href="/Vendeurs"
                className="bg-[#036c94] py-1 px-2 hover:bg-blue-600 font-bold rounded-full text-white"
              >
                Vendeur
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <Link
                href="/Admin"
                className="bg-[#036c94] py-1 px-2 hover:bg-blue-600 font-bold rounded-full text-white"
              >
                Admin
              </Link>
            )}

            <p className="text-[#15878f] font-semibold">{total} FCFA</p>

            <Link href="/home/panier" className="relative text-2xl">
              <ShoppingCart className="text-[#036c94]" />
              {totalArticles > 0 && (
                <span
                  className={`absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-1.5 transition-transform duration-300 ${
                    animate ? "scale-125" : "scale-100"
                  }`}
                >
                  {totalArticles}
                </span>
              )}
            </Link>

            {/* Avatar + déconnexion */}
            <div className="flex items-center gap-3">
              {user?.image && (
                <Link href="/profil">
                  <Image
                    src={`http://localhost:8080/${user.image}`}
                    alt="avatar"
                    width={35}
                    height={35}
                    className="rounded-full border object-cover"
                    unoptimized
                  />
                </Link>
              )}
              <button
                onClick={logout}
                title="Déconnexion"
                className="text-red-600 hover:text-red-800 transition"
              >
                <LogOut size={22} />
              </button>
            </div>
          </>
        ) : (
          <Link href="/login" className="text-[#036c94] font-semibold hover:underline">Connexion</Link>
        )}
      </nav>
    </header>
  );
}
