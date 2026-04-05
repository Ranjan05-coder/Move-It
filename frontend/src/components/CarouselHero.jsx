import React, { useState, useEffect } from 'react';
import slide1 from '../assets/carousel1.jpg';
import slide2 from '../assets/carousel2.jpg';
import slide3 from '../assets/carousel3.jpg';

export default function CarouselHero() {
  const slides = [
    { id: 1, src: slide1, alt: 'Moving service' },
    { id: 2, src: slide2, alt: 'Packing service' },
    { id: 3, src: slide3, alt: 'Transport service' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  return (
    <div className="relative w-full h-80 sm:h-96 md:h-[500px] lg:h-[600px] overflow-hidden bg-neutral-200 dark:bg-neutral-900 rounded-2xl mx-auto max-w-5xl shadow-2xl">
      {/* SLIDES CONTAINER */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* IMAGE */}
            <img
              src={slide.src}
              alt={slide.alt}
              className="w-full h-full object-cover rounded-2xl"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* CONTENT */}
            <div className="absolute inset-0 flex items-center justify-start px-6 sm:px-12 md:px-16 py-12">
              <div className="max-w-lg text-white space-y-4 md:space-y-6 animate-fade-in-up">
                <div>
                  <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold bg-primary-500/20 text-primary-300 rounded-full border border-primary-400/30">
                    ✨ Premium Service
                  </span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-white leading-tight">
                    {index === 0 && 'Seamless Moving Solutions'}
                    {index === 1 && 'Professional Packing Services'}
                    {index === 2 && 'Secure Transportation'}
                  </h2>
                </div>

                <p className="text-base md:text-lg text-neutral-100 leading-relaxed max-w-md">
                  {index === 0 && 'Experience hassle-free relocation with our expert team and real-time tracking.'}
                  {index === 1 && 'Protect your belongings with our secure, professional packing methods.'}
                  {index === 2 && 'Your items are safe with our certified drivers and modern fleet.'}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button className="btn btn-primary btn-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    Book Now
                  </button>
                  <button className="btn bg-white/20 border border-white/30 text-white hover:bg-white/30 backdrop-blur-sm btn-lg transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PREV BUTTON */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group shadow-lg"
        title="Previous slide"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 transform group-hover:-translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* NEXT BUTTON */}
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/30 hover:bg-white/50 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group shadow-lg"
        title="Next slide"
      >
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 transform group-hover:translate-x-0.5 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* DOTS INDICATOR */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/30 px-3 py-2 rounded-full backdrop-blur-md">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-primary-500 w-6 h-2'
                : 'bg-white/40 w-2 h-2 hover:bg-white/70'
            }`}
            title={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

