'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { MdDashboard, MdCollections } from "react-icons/md";
import { useParams } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [utilisateur, setUtilisateur] = useState(null);
  const { id } = useParams();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!user?.id) return;

    const fetchUtilisateur = async () => {
      try {
        const res = await fetch(`${API_URL}/api/utilisateur/${user.id}`);
        const data = await res.json();
        setUtilisateur(data);
      } catch (error) {
        console.error("Erreur lors du chargement du profil:", error);
      }
    };

    fetchUtilisateur();
  }, [user?.id, API_URL]);

  const menuList = [
    { nom: "Dashboard", link: `/Vendeurs`, icon: <MdDashboard /> },
    { nom: "Modifier mon profil", link: "/Vendeurs/profil", icon: <FaUser /> },
    { nom: "Mes boutiques", link: "/Vendeurs/mesboutiques", icon: <MdDashboard /> },
    { nom: "Créer une boutique", link: "/Vendeurs/boutique", icon: <FaShoppingCart /> },
    { nom: "Ajouter un produit", link: "/Vendeurs/produits/ajouterproduit", icon: <FaShoppingCart /> },
    { nom: "Commandes reçues", link: "/Vendeurs/commandes", icon: <MdCollections /> },
    { nom: "Collection", link: "/Vendeurs/collection", icon: <MdDashboard /> },
    { nom: "Gestion de stock", link: "/Vendeurs/stock", icon: <FaShoppingCart /> },
  ];

  return (
    <aside className="flex flex-col items-center bg-yellow-700 px-4 mt-4 w-[250px] h-screen">
      {/* Photo + nom utilisateur */}
      <div className="text-center mb-4 mt-2">
        {utilisateur?.image ? (
          <img
            src={`${API_URL}/${utilisateur.image}`}
            alt="Photo de profil"
            className="w-24 h-24 rounded-full object-cover border-2 border-white mx-auto"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mx-auto">
            Aucun visuel
          </div>
        )}
        <h2 className="text-white mt-3 font-semibold text-lg">
          {utilisateur?.prenom} {utilisateur?.nom}
        </h2>
      </div>

      {/* Menu navigation */}
      <ul className="w-full space-y-2">
        {menuList.map((menu, index) => (
          <SidebarItem key={index} menu={menu} currentPath={pathname} />
        ))}
      </ul>

      {/* Bouton de déconnexion (optionnel) */}
      {/*
      <button
        onClick={logout}
        className="mt-auto w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded font-semibold"
      >
        Déconnexion
      </button>
      */}
    </aside>
  );
};

const SidebarItem = ({ menu, currentPath }) => {
  const isActive = currentPath === menu.link;

  return (
    <li>
      <Link
        href={menu.link}
        className={`flex items-center gap-3 px-4 py-2 rounded-xl font-medium transition
          ${isActive ? "bg-[#15878f] text-white" : "bg-white text-gray-800 hover:bg-gray-100"}
        `}
      >
        {menu.icon}
        {menu.nom}
      </Link>
    </li>
  );
};

export default Sidebar;
