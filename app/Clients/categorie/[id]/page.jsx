"use client"
import React from 'react'

import { useParams } from 'next/navigation'
import ProduitsByCat from './component/produitbycat';



const page = () => {
const {id}=useParams();


  return (
    <div>page
 <ProduitsByCat id={id}/>

    </div>
  )
}

export default page