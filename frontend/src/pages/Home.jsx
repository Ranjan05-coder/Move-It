import Hero from '../components/Hero';
import Features from '../components/Features';
import CarouselHero from '../components/CarouselHero';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <div className="bg-premium">
      <Hero />
      <Features />
      <CarouselHero />
      <Footer />
    </div>
  );
}
