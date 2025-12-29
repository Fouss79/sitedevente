"use client";

import Link from 'next/link';
import React from 'react';
import { FaToolbox, FaUser, FaShoppingCart } from "react-icons/fa";
import { MdDashboard, MdCollections } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

 // ajuste le chemin selon ton projet

const Sidebar = () => {
  const router = useRouter();
    const pathname = usePathname();
    const { logout } = useAuth();
    // Extraire l'id du vendeur depuis le pathname
    const segments = pathname.split('/');
  
  const clientId = segments.includes('Clients') ? segments[segments.indexOf('Clients') + 1] : 'id';



  const handleLogout = () => {
    logout();                          // ✅ suppression token/user
    router.push('/login');             // ✅ redirection vers la page de login
  };

  const menuList = [
    { nom: 'Profil', link: `/Clients/${clientId}/profil`, icon: <MdDashboard /> },
    { nom: 'Panier', link: `/Clients/${clientId}/panier`, icon: <FaShoppingCart /> },
    { nom: 'Commande', link: '/Clients/id/commande', icon: <MdCollections /> }
  ];

  return (
    <section className="flex flex-col gap-10 items-center bg-yellow-700 border-r px-5 py-3 h-screen overflow-hidden w-[250px]">
      <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-3 w-full">
        {menuList.map((menu, index) => (
          <Tab key={index} menu={menu} pathname={pathname} />
        ))}
        <li>
          <button 
            onClick={handleLogout}
            className="w-full px-4 py-2 mt-4 text-left text-red-600 hover:bg-red-100 rounded-xl"
          >
            Déconnexion
          </button>
        </li>
      </ul>
    </section>
  );
};

const Tab = ({ menu, pathname }) => {
  const isSelected = pathname === menu.link;

  return (
    <li className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold
      ${isSelected ? "bg-[#15878f] text-white" : "bg-white text-black"}`}>
      <Link href={menu.link} className="flex items-center gap-2 w-full">
        {menu.icon}
        {menu.nom}
      </Link>
    </li>
  );
};

export default Sidebar;
