'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

const PanierBadge = () => {
  const { panier } = useAuth();

  const totalQuantite = panier.length;
  const totalPrix = panier.reduce((acc, item) => acc + item.prix, 0);

  return (
    <Link href="/panier" className="flex items-center gap-2 bg-yellow-100 border border-yellow-400 px-3 py-1 rounded-full hover:shadow-md transition text-sm text-yellow-900">
      <FaShoppingCart />
      {totalQuantite} | {totalPrix} FCFA
    </Link>
  );
};

export default PanierBadge;
