'use client';

import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function CreerCollection() {
  const { user } = useAuth();
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) return <p>Chargement...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    formData.append('vendeurId', user.id);
    if (image) {
      formData.append('image', image);
    }

    const res = await fetch('http://localhost:8080/api/collections', {
      method: 'POST',
      body: formData,
    });

    setLoading(false);

    if (res.ok) {
      alert('Collection créée avec succès !');
      setNom('');
      setDescription('');
      setImage(null);
    } else {
      alert("Erreur lors de la création");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-lg mx-auto bg-white rounded shadow">
      <h1 className="text-xl font-bold">Créer une Collection</h1>

      <input
        type="text"
        placeholder="Nom"
        className="w-full p-2 border rounded"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="w-full p-2 border rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <input
        type="file"
        accept="image/*"
        className="w-full border p-2"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Création...' : 'Créer'}
      </button>
    </form>
  );
}
