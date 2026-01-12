import React from 'react';
import slide1 from '../assets/carousel1.jpg';
import slide2 from '../assets/carousel2.jpg';
import slide3 from '../assets/carousel3.jpg';

export default function CarouselHero() {
  return (
    <div className="carousel-card">
      <div
        id="moveCarousel"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={slide1} className="d-block w-100" alt="Moving service" />
          </div>
          <div className="carousel-item">
            <img src={slide2} className="d-block w-100" alt="Packing service" />
          </div>
          <div className="carousel-item">
            <img src={slide3} className="d-block w-100" alt="Transport service" />
          </div>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#moveCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#moveCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}

