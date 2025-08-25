import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import LaunchReadiness from '@/components/LaunchReadiness';
import TTSDemo from '@/components/TTSDemo';
import WhatsAppQR from '@/components/WhatsAppQR';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LaunchReadiness />
        <TTSDemo />
        <WhatsAppQR />
        <PricingSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
