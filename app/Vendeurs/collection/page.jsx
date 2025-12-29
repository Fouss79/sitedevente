import React from 'react'
import CreerCollection from './Component/nouvelleCollection'
import AssignationProduits from '../creerCollectionprouit/page'
import ListeCollections from './Component/ListeCollection'

const page = () => {
  return (
    <div>
   <CreerCollection/>
    <AssignationProduits/>
    <ListeCollections/>
    </div>
  )
}

export default page