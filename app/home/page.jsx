import React from 'react'
import ListProduits from '../components/ListProduits'
import Carousel from '../components/Carousel'
import CollectionAccueil from '../components/CollectionAcceuil'
import Dropdown from '../components/dropdown'
import AccueilCollections from '../components/CollectionAccueil'

const page = () => {
  return (
     <div className="flex flex-col min-h-screen bg-[#3498db]">
      <Carousel/>
      <Dropdown/>
     <ListProduits/>
     <CollectionAccueil/>
    <AccueilCollections/>
    
    </div>
  )
}

export default page