'use client'
import { useState } from 'react';
import axios from 'axios';

export default function UploadImages({ produitId }) {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    const formData = new FormData();
    for (let file of files) {
      formData.append('files', file); // même clé pour MultipartFile[]
    }
    formData.append('description', 'Image secondaire');

    try {
      await axios.post(`http://localhost:8080/api/produits/${produitId}/images`, formData);
      alert('Images uploadées avec succès !');
    } catch (err) {
      console.error(err);
      alert('Erreur lors de l\'upload');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Upload
      </button>
    </form>
  );
}
