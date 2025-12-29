
import React from 'react'
import CreerCollection from './Component/nouvelleCollection'
import AssignationProduits from './Component/creercollectionproduit'
import ListeCollections from '../../../collection/Component/ListeCollection'

const Page = ({ params }) => {
  const id = params.id;



  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      
      <CreerCollection/>
      <AssignationProduits/>
      <ListeCollections/>
    </div>
  );
};

export default Page;
