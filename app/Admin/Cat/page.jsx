'use client'

import { useState } from "react";
import useSWR from "swr";

const fetcher = url => fetch(url).then(res => res.json());

export default function MenuCategories() {
  const { data: categories, error } = useSWR("http://localhost:8080/api/categorie", fetcher);
  const [sousCategories, setSousCategories] = useState([]);

  const handleClick = async (catId) => {
    const res = await fetch(`http://localhost:8080/api/categories/${catId}/sous-categories`);
    const data = await res.json();
    setSousCategories(data);
  };

  if (error) return <p>Erreur de chargement</p>;
  if (!categories) return <p>Chargement...</p>;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold">Catégories</h2>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            <button onClick={() => handleClick(cat.id)} className="text-blue-600 underline">
              {cat.nom}
            </button>
          </li>
        ))}
      </ul>

      {sousCategories.length > 0 && (
        <>
          <h3 className="text-lg font-semibold">Sous-catégories</h3>
          <ul className="ml-4 list-disc">
            {sousCategories.map(sous => (
              <li key={sous.id}>{sous.nom}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
