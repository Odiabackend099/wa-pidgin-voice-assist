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
        <section id="features">
          <LaunchReadiness />
        </section>
        <section id="demo">
          <TTSDemo />
        </section>
        <WhatsAppQR />
        <section id="pricing">
          <PricingSection />
        </section>
      </main>
      <section id="support">
        <Footer />
      </section>
    </div>
  );
};

export default Index;
