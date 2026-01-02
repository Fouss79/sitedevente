import React from 'react'

import Carousel from '../../../../components/Carousel'

import AccueilCollections from './component/CollectionAccueil'


const page = () => {
  return (
     <div className="flex flex-col min-h-screen bg-[#3498db]">
      <Carousel/>
      
     
    <AccueilCollections/>
    
    </div>
  )
}

export default page