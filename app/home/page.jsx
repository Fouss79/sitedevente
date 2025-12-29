import React from 'react'
import ListProduits from '../components/ListProduits'
import Carousel from '../components/Carousel'
import CollectionAccueil from '../components/CollectionAcceuil'

const page = () => {
  return (
     <div className="flex flex-col min-h-screen bg-[#3498db]">
      <Carousel/>
     <ListProduits/>
     <CollectionAccueil/>
    
    </div>
  )
}

export default page