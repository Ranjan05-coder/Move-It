import React, { useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
import heroTruck from '../assets/hero-truck.jpg';

export default function Hero() {
  const canvasRef = useRef(null);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const drawAnimatedBackground = () => {
      const width = canvas.width;
      const height = canvas.height;

      // Determine colors based on theme
      const isDark = theme === 'dark';
      const bgColor = isDark ? '#030712' : '#f9fafb'; // neutral-950 or neutral-50
      
      // Clear canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      // Create animated gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);

      const offset = Math.sin(time * 0.0005) * 0.5;
      const offset2 = Math.cos(time * 0.0003) * 0.5;

      // Animated colors - different for light and dark mode
      if (isDark) {
        // Dark mode: darker, subtle blues
        gradient.addColorStop(0, `hsl(220, 40%, ${16 + offset * 5}%)`);
        gradient.addColorStop(0.5, `hsl(175, 35%, ${18 + offset2 * 5}%)`);
        gradient.addColorStop(1, `hsl(220, 45%, ${14 + offset * 5}%)`);
      } else {
        // Light mode: bright, vibrant colors
        gradient.addColorStop(0, `hsl(220, 70%, ${90 + offset * 5}%)`);
        gradient.addColorStop(0.5, `hsl(175, 65%, ${92 + offset2 * 5}%)`);
        gradient.addColorStop(1, `hsl(220, 75%, ${88 + offset * 5}%)`);
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Add moving circles
      for (let i = 0; i < 3; i++) {
        const x = (width / 3) * (i + 1) + Math.sin(time * 0.0002 + i) * 100;
        const y = height * 0.5 + Math.cos(time * 0.0002 + i) * 80;

        // Circle colors - darker for dark mode
        const opacity = isDark ? 0.03 : 0.05;
        ctx.fillStyle = `rgba(51, 102, 255, ${opacity + Math.sin(time * 0.0005 + i) * opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, 150 + Math.sin(time * 0.0003 + i) * 50, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 1;
      animationFrameId = requestAnimationFrame(drawAnimatedBackground);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    drawAnimatedBackground();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative py-24 md:py-32 px-5 overflow-hidden bg-white dark:bg-neutral-900">
        {/* ANIMATED CANVAS BACKGROUND */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* CONTENT OVERLAY */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT SIDE */}
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full border border-primary-200 dark:border-primary-700">
                  <span className="text-xl">⚡</span>
                  <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                    Trusted by 50K+ Customers
                  </span>
                </div>

                <div>
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                    Why{' '}
                    <span className="bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent animate-pulse">
                      MoveIt
                    </span>
                  </h1>
                  <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-2xl">
                    Seamless relocation services with professional teams, real-time tracking, and
                    secure online payments. Book your move in minutes.
                  </p>
                </div>
              </div>

              {/* CTA BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link
                  to="/services"
                  className="btn btn-primary btn-lg text-center group shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <span className="group-hover:scale-110 transition-transform duration-300">📦</span>
                  {' '}
                  Book Service
                </Link>

                <Link
                  to="/contact"
                  className="btn bg-white/70 dark:bg-neutral-800/80 backdrop-blur-md dark:backdrop-blur-sm border-2 border-white/40 dark:border-neutral-600/40 text-neutral-900 dark:text-neutral-100 btn-lg text-center hover:bg-white/90 dark:hover:bg-neutral-700/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <span className="">💬</span>
                  {' '}
                  Contact Us
                </Link>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-300 dark:border-neutral-600">
                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    50K+
                  </div>
                  <div className="text-xs md:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Moves Completed
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-secondary-600 to-secondary-700 bg-clip-text text-transparent">
                    4.9★
                  </div>
                  <div className="text-xs md:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Rating
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    24/7
                  </div>
                  <div className="text-xs md:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                    Support
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE — IMAGE */}
            <div className="relative hidden md:block">
              {/* ANIMATED GRADIENT BLOB */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary-400/30 via-secondary-300/20 to-primary-400/20 rounded-3xl blur-3xl animate-pulse" />

              {/* GLOW EFFECTS */}
              <div className="absolute top-10 right-10 w-40 h-40 bg-primary-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-secondary-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />

              {/* IMAGE CONTAINER */}
              <div className="relative z-10">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-lg opacity-50" />
                <img
                  src={heroTruck}
                  alt="Moving truck"
                  className="relative w-full h-auto rounded-2xl shadow-2xl object-cover border-2 border-white/50 backdrop-blur-sm transform hover:scale-105 transition-transform duration-500"
                />


              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}