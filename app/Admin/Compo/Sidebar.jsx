"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { FaToolbox, FaUser, FaShoppingCart } from "react-icons/fa";
import { MdDashboard, MdCollections } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import {
    Home,
    User,
    Box,
    Tag,
    ShoppingCart,
    MessageSquare,
    LogOut
  } from 'lucide-react';
const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();
  const [admin, setAdmin] = useState(null);
  const {logout} = useAuth();

  useEffect(() => {
    if (!user?.id) return;

    const fetchAdmin = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/utilisateur/${user.id}`);
        const data = await res.json();
        setAdmin(data);
      } catch (err) {
        console.error("Erreur lors du chargement de l'admin :", err);
      }
    };

    fetchAdmin();
  }, [user?.id]);

  const menuList = [
    { nom: "Dashboard", link: "/Admin", icon: <MdDashboard /> },
    { nom: "Produit", link: "/Admin/produit", icon: <FaToolbox /> },
    { nom: "Categorie", link: "/Admin/categorie", icon: <BiCategory className="h-5 w-5" /> },
    { nom: "Marque", link: "/Admin/Marque", icon: <BiCategory className="h-5 w-5" /> },
    { nom: "Collection", link: "/Admin/collections", icon: <FaShoppingCart /> },
    { nom: "Commande", link: "/Admin/commandes", icon: <FaShoppingCart /> },
    { nom: "Utilisateurs", link: "/Admin/utilisateurs", icon: <FaUser /> },
    { nom: "Carousel", link: "/Admin/carousel", icon: <FaToolbox /> },



     
  ];

  return (
    <aside className="flex flex-col items-center bg-white border-r px-4  w-[250px] h-screen">
      {/* Profil admin */}
      <div className="text-center ">
        {admin?.image ? (
          <img
            src={`http://localhost:8080/${admin.image}`}
            alt="Photo admin"
            className="w-24 h-24 rounded-full object-cover border-2 border-[#15878f] mx-auto"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mx-auto">
            Aucun visuel
          </div>
        )}
        <h2 className="text-gray-800 mt-3 font-semibold text-lg">
          {admin?.prenom} {admin?.nom}
        </h2>
      </div>

      {/* Menu admin */}
      <ul className="w-full space-y-2">
        {menuList.map((menu, index) => (
          <SidebarItem key={index} menu={menu} currentPath={pathname} />
        ))}
          
            
  
      </ul>
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
          ${isActive ? "bg-[#15878f] text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}
        `}
      >
        {menu.icon}
        {menu.nom}
      </Link>
    </li>
  );
};

export default Sidebar;
