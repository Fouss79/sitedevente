import React from 'react'
import ListProduits from '../components/ListProduits'
import Carousel from '../components/Carousel'
import CollectionAccueil from '../components/CollectionAcceuil'
import Dropdown from '../components/dropdown'
import AccueilCollections from '../components/CollectionAccueil'
import BoutiqueSlider from '../components/boutiqueSlider'
import Link from "next/link";

const page = () => {
  return (
     <div className="flex flex-col min-h-screen ">
      <Carousel/>
     <div className='flex justify-between'>
        <div className='mt-20'>     {/* 🔹 Bouton NOS ARTICLES */}
    
      <Link href={`/home/produit`}>
        <button className="
          px-5 py-2 mt-6 rounded-xl
          bg-black/30 text-white font-semibold
          border border-white/30
          backdrop-blur
          transition-all duration-300
          hover:bg-black/50 hover:scale-105
        ">
          LES ARTICLES
        </button>
      </Link>
      
    </div>
    <h1 className='mt-8 px-16 font-bold'>MABOUTIQUE UN LIEU D'ACHAT ET DE VENTE RAPIDE ET EFFICACE</h1>
     </div>
        
     <CollectionAccueil/>
    <AccueilCollections/>
    
    </div>
  )
}

export default page