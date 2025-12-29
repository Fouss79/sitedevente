'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

export default function ProduitDetail() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [images, setImages] = useState([]);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupère les infos produit
  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/produits/${id}`);
        setProduit(res.data);
      } catch (err) {
        setError("Erreur lors de la récupération du produit.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduit();
  }, [id]);

  useEffect(() => {
  console.log("Images secondaires chargées :", images);
}, [images]);


  // Récupère les images secondaires
  useEffect(() => {
    if (produit?.id) {
      axios.get(`http://localhost:8080/api/produits/${produit.id}/images`)
        .then(res => setImages(res.data))
        .catch(() => setImages([]));
        
    }
    
  }, [produit]);

  if (loading) return <div className="text-center mt-10">Chargement...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!produit) return <div className="text-center mt-10">Produit introuvable.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
  <div className="flex flex-col md:flex-row gap-4">
    
    {/* Miniatures verticales */}
    <div className="w-full md:w-[90px]">
      <Swiper
        onSwiper={setThumbsSwiper}
        direction="vertical"
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress
        className="h-[420px]"
      >
        <SwiperSlide key="thumb-main">
          <Image
            src={`http://localhost:8080/${produit.image}`}
            alt="Mini principale"
            width={80}
            height={80}
            className="object-cover border rounded hover:ring-2 ring-yellow-600"
            unoptimized
          />
        </SwiperSlide>

        {images.map(img => (
          <SwiperSlide key={img.id}>
            <Image
              src={`http://localhost:8080/${img.filename}`}
              alt={img.description || 'Mini'}
              width={80}
              height={80}
              className="object-cover border rounded hover:ring-2 ring-yellow-600"
              unoptimized
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* Image principale */}
    <div className="w-full md:w-[420px]">
      <Swiper
        modules={[Navigation, Pagination, Thumbs]}
        navigation
        pagination={{ clickable: true }}
        thumbs={{ swiper: thumbsSwiper }}
        className="rounded overflow-hidden"
      >
        <SwiperSlide key="principale">
          <Image
            src={`http://localhost:8080/${produit.image}`}
            alt={produit.nom}
            width={420}
            height={400}
            className="object-cover rounded"
            unoptimized
            priority
          />
        </SwiperSlide>

        {images.map(img => (
          <SwiperSlide key={img.id}>
            <Image
              src={`http://localhost:8080/${img.filename}`}
              alt={img.description || produit.nom}
              width={420}
              height={400}
              className="object-cover rounded"
              unoptimized
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    {/* Détails produit */}
    <div className="flex-1">
      {/* ... tes infos texte et bouton (identiques à ton code existant) ... */}
    </div>

  </div>
</div>
  );
}
