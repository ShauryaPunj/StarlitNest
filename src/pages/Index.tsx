import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedListings from '@/components/FeaturedListings';
import PredictSection from '@/components/PredictSection';
import ChatSection from '@/components/ChatSection';
import TrustSection from '@/components/TrustSection';
import ShowcaseReel from '@/components/ShowcaseReel';
import Footer from '@/components/Footer';
import ConfettiEffect from '@/components/ConfettiEffect';
import { useState } from 'react';

// Real Estate AI Platform - Main Page Component
const Index = () => {
  const [showConfetti, setShowConfetti] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <FeaturedListings />
        <PredictSection />
        <ChatSection />
        <TrustSection />
        <ShowcaseReel />
      </main>
      <Footer />
      <ConfettiEffect active={showConfetti} />
    </div>
  );
};

export default Index;