import React from 'react'
import ListProduits from '../../components/ListProduits'
import Carousel from '../../components/Carousel'

import BoutiqueSlider from '../../components/boutiqueSlider'
import Link from "next/link";

const page = () => {
  return (
     <div className="flex flex-col min-h-screen bg-[#15878f]">
      <Carousel/>
       
     
     <ListProduits/>
         
     
    </div>
  )
}

export default page