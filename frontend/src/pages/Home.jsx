import Hero from '../components/Hero';
import Features from '../components/Features';
import CarouselHero from '../components/CarouselHero';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950">
      {/* HERO SECTION */}
      <Hero />

      {/* FEATURES SECTION */}
      <Features />

      {/* CAROUSEL SECTION */}
      <section className="relative py-20 md:py-28 px-5 bg-white dark:bg-neutral-950 overflow-hidden">
        {/* Light mode: Cyan + Green theme (different from Features) */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-950 pointer-events-none" />
        <div className="absolute top-10 left-20 w-72 h-72 bg-info-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-secondary-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12 space-y-4">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-full border border-primary-200 dark:border-primary-800/50">
              Our Services
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-50">
              See Our Expertise
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Professional moving services with real-time tracking and secure transport
            </p>
          </div>
          <CarouselHero />
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}