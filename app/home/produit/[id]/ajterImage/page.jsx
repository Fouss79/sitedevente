
"use client"
import React from 'react'
import AjouterImagesProduit from './component/ajouterImgProduit'
import { useParams } from 'next/navigation';
const page = () => {
    const {id}=useParams();
  return (
    <div>
<AjouterImagesProduit produitId={id}/>

    </div>
  )
}

export default page