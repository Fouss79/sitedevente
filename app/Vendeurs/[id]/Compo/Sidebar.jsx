"use client";

import Link from 'next/link';
import React from 'react';
import { FaToolbox, FaUser,FaShoppingCart } from "react-icons/fa";
import { MdDashboard, MdCollections } from "react-icons/md";
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathname = usePathname();

  // Extraire l'id du vendeur depuis le pathname
  const segments = pathname.split('/');

  const vendeurId = segments.includes('Vendeurs') ? segments[segments.indexOf('Vendeurs') + 1] : 'id';

  const menuList = [
    {
      nom: 'Dashboard',
      link: `/Vendeurs/${vendeurId}`,
      icon: <MdDashboard />
    },
    {
          nom: 'Modifier mon profil',
          link: `/Vendeurs/${vendeurId}/profil`,
          icon: <FaUser />
        },
    {
      nom: 'Mes produits',
      link: `/Vendeurs/${vendeurId}/mesboutiques`,
      icon: <MdDashboard />
    },
    {
      nom: 'Creer une boutique',
      link: `/Vendeurs/${vendeurId}/boutique`,
      icon: <FaShoppingCart />
    },
    {
      nom: 'Ajouter un produit',
      link: `/Vendeurs/${vendeurId}/produits/ajouterproduit`,
      icon: <FaShoppingCart />
    },
    {
      nom: 'Commandes reçues',
      link: `/Vendeurs/${vendeurId}/commandes`,
      icon: <MdCollections />
    },
    {
      nom: 'Gestion de stock',
      link: `/Vendeurs/${vendeurId}/stock`,
      icon: <FaShoppingCart />
    }
  ];

  return (
    <section className="flex flex-col gap-10 items-center bg-yellow-700 border-r px-5 py-3 h-screen overflow-hidden w-[250px]">
      <ul className="flex-1 h-full overflow-y-auto flex flex-col gap-3">
        {menuList.map((menu, index) => (
          <Tab key={index} menu={menu} />
        ))}
      </ul>
    </section>
  );
};

const Tab = ({ menu }) => {
  const pathname = usePathname(); 
  const isSelected = pathname === menu.link; 

  return (
    <li className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold 
      ${isSelected ? "bg-[#15878f] text-white" : "bg-white text-black"}`}>
      <Link href={menu.link} className="flex items-center gap-2">
        {menu.icon}
        {menu.nom}
      </Link>
    </li>
  );
};

export default Sidebar;
