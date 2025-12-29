"use client"
import React from 'react'
import ProduitsByCat from './component/produitbyboutiq'
import { useParams } from 'next/navigation'



const page = () => {
const {id}=useParams();


  return (
    <div>
 <ProduitsByCat id={id}/>

    </div>
  )
}

export default page