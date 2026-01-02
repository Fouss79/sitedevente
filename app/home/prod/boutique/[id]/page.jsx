import React from 'react'
import ListProduits from './component/ListProduits'
import Carousel from '../../../../components/Carousel'
import BoutiqueSlider from '../../../../components/boutiqueSlider'

const page = () => {
  return (
     <div className="flex flex-col min-h-screen bg-[#3498db]">
      <Carousel/>
    
      
     
     <ListProduits/>
    

    
    </div>
  )
}

export default page