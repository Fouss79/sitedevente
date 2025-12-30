'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Dropdown = () => {
  const [categories, setCategories] = useState([]);
  const [boutiques, setBoutiques] = useState([]);

  const router = useRouter();

  useEffect(() => {
    axios.get("http://localhost:8080/api/categorie")
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));

    axios.get("http://localhost:8080/api/boutique")
      .then(res => setBoutiques(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBoutiqueChange = (e) => {
    const id = e.target.value;
    if (id) {
      router.push(`/Clients/boutique/${id}`);
    }
  };

  const handleCategorieChange = (e) => {
    const id = e.target.value;
    if (id) {
      router.push(`/Clients/categorie/${id}`);
    }
  };

  return (
    <div className="flex gap-4 mb-10">
      {/* Menu déroulant Catégories */}
      <div>
        <label className="block mb-1 font-semibold">Catégories</label>
        <select
          className="border p-2 rounded"
          onChange={handleCategorieChange}
          defaultValue=""
        >
          <option value="" disabled>CATEGORIE</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nom}
            </option>
          ))}
        </select>
      </div>

      {/* Menu déroulant Boutiques */}
      <div>
        <label className="block mb-1 font-semibold">Boutiques</label>
        <select
          className="border p-2 rounded"
          onChange={handleBoutiqueChange}
          defaultValue=""
        >
          <option value="" disabled>BOUTIQUES</option>
          {boutiques.map((btq) => (
            <option key={btq.id} value={btq.id}>
              {btq.nom}
            </option>
          ))}
        </select>
      </div>
      
    </div>
  );
};

export default Dropdown;
