"use client"
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

const Carousel = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/carousel/list")
      .then(response => setImages(response.data))
      .catch(error => console.error("Erreur lors du chargement des images", error));
     
  }, []);

  useEffect(()=>{
    console.log(images)
  })
    
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false
  };

  return (
    <div className="w-full h-[400px] overflow-hidden">
      <Slider {...settings}>
        {images.map((img) => (
          <div key={img.id} className="relative w-full h-[400px] md:h-[500px]">
            <img
              src={img.url}
              alt={img.description}
              className="w-full h-full object-cover rounded-none"
            />
            {/* Optionnel : overlay texte */}
            {/* <div className="absolute bottom-4 left-4 text-white text-xl font-bold bg-black bg-opacity-50 px-4 py-2 rounded">
              {img.description}
            </div> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
