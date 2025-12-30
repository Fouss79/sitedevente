"use client";
import React from "react";
import Slider from "react-slick";

const images = [
  { id: 1, url: "/bann.jpeg", description: "Promotion 1" },
  { id: 2, url: "/banne.jpeg", description: "Promotion 2" },
  { id: 3, url: "/banner.jpeg", description: "Promotion 3" },
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    arrows: false,
  };

  return (
    <div className="w-full h-[220px] md:h-[300px] overflow-hidden">
      <Slider {...settings}>
        {images.map((img) => (
          <div key={img.id} className="h-[220px] md:h-[300px]">
            <img
              src={img.url}
              alt={img.description}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
