// components/HeaderClient.jsx
import Link from 'next/link';

export default function HeaderClient() {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-blue-600">MonShop</Link>
        <nav className="space-x-4">
          <Link href="/Clients" className="hover:text-blue-600">Accueil</Link>
          <Link href="/clients/panier" className="hover:text-blue-600">Panier</Link>
          <Link href="/clients/commandes" className="hover:text-blue-600">Commandes</Link>
          <Link href="/clients/profil" className="hover:text-blue-600">Profil</Link>
        </nav>
      </div>
    </header>
  );
}
