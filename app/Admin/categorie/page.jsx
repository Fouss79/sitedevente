"use client";

import ListeCat from "./ListeCatAvecIcone";
import Form from "./Component/Form";

const page = () => {
  return (
    <main className="p-5 flex justify-center">
      <Form onSubmitSuccess={() => {
        alert("Catégorie ajoutée avec succès !");
      }} />
      <ListeCat/>
      
    </main>
  );
};

export default page;
