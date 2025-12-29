"use client";

import React, { useState } from 'react';
import axios from 'axios';

const Form = ({ onSubmitSuccess }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const saveCategorie = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('nom', nom);
    formData.append('description', description);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    setLoading(true);
    axios.post('http://localhost:8080/api/categorie', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(() => {
        onSubmitSuccess();
        setNom('');
        setDescription('');
        setSelectedImage(null);
      })
      .catch(error => {
        console.error(error);
        alert("Une erreur s'est produite.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div className='flex flex-col gap-3 bg-white rounded-xl p-5 w-full md:w-[400px]'>
      <h1 className='font-semibold'>Créer une catégorie</h1>
      <form className='flex flex-col gap-3' onSubmit={saveCategorie}>
        <label htmlFor='category-image' className='text-gray-500 text-sm'>Image</label>
        {selectedImage && (
          <div className='flex justify-center items-center'>
            <img src={URL.createObjectURL(selectedImage)} alt="Aperçu" className='h-32' />
          </div>
        )}
        <input
          id='category-image'
          type='file'
          className='px-4 py-2 rounded-lg focus:outline-none'
          onChange={handleImageChange}
        />

        <div className='flex flex-col gap-1'>
          <label htmlFor='category-name' className='text-gray-500 text-sm'>Nom<span className='text-red-500'>*</span></label>
          <input
            id='category-name'
            type='text'
            placeholder='Entrer le nom'
            className='px-4 py-2 rounded-lg focus:outline-none'
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label htmlFor='description' className='text-gray-500 text-sm'>Description<span className='text-red-500'>*</span></label>
          <input
            id='description'
            type='text'
            placeholder='Entrer la description'
            className='px-4 py-2 rounded-lg focus:outline-none'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-lg mt-3'
          disabled={loading}
        >
          {loading ? "Envoi..." : "Ajouter"}
        </button>
      </form>
    </div>
  );
};

export default Form;
