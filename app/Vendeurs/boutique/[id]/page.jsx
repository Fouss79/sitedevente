"use client";

import { useParams } from "next/navigation";
import ProduitsByCat from "./component/produitbyboutiq";
import CollectionsParBoutique from "./component/collectionParProduit";

export default function PageClient() {
  const params = useParams();
  const id = params.id;

  return (
    <div className=" w-full overflow-y-auto">
      <ProduitsByCat id={id} />
      <CollectionsParBoutique/>
    </div>
  );
}
