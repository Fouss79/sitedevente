"use client"
import React from 'react'
import ProductItem from '../../components/ProductItems';



const ProduitCart = () => {
  return (
    <div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  gap-4 px-2">
        {collection.produits?.slice(0, 4).map((produit) => (
          <ProductItem key={produit.id} product={produit} />
        ))}
      </div>

    </div>
  )
}

export default ProduitCart