import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Globe, Volume2, Zap } from 'lucide-react';
import heroPhoneMockup from '@/assets/hero-phone-mockup.png';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10"></div>
      <div className="absolute top-20 right-10 w-32 h-32 rounded-full bg-primary/10 blur-3xl float-animation"></div>
      <div className="absolute bottom-20 left-10 w-24 h-24 rounded-full bg-secondary/20 blur-2xl float-animation" style={{animationDelay: '1s'}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Deploy in 30 Minutes
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              <span className="gradient-hero bg-clip-text text-transparent">
                WhatsApp AI
              </span>
              <br />
              Customer Service
              <br />
              <span className="text-primary">for Nigerian SMEs</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
              Deploy 24/7 AI customer support that speaks <strong>English, Pidgin, Yorùbá, and Igbo</strong> with authentic Nigerian voice messages. Start with a free 7-day trial.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => window.location.href = '/register'}
              >
                <MessageCircle className="w-5 h-5" />
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => {
                  const demoSection = document.querySelector('#demo');
                  demoSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Volume2 className="w-5 h-5" />
                Try Voice Demo
              </Button>
            </div>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-accent px-3 py-2 rounded-full text-sm">
                <Globe className="w-4 h-4 text-primary" />
                4 Nigerian Languages
              </div>
              <div className="flex items-center gap-2 bg-accent px-3 py-2 rounded-full text-sm">
                <Volume2 className="w-4 h-4 text-primary" />
                Nigerian Voice AI
              </div>
              <div className="flex items-center gap-2 bg-accent px-3 py-2 rounded-full text-sm">
                <Zap className="w-4 h-4 text-primary" />
                NDPA Compliant
              </div>
            </div>
          </div>
          
          {/* Right Content - Phone Mockup */}
          <div className="relative">
            <div className="relative z-10 float-animation">
              <img 
                src={heroPhoneMockup} 
                alt="WhatsApp AI Assistant Demo" 
                className="max-w-full h-auto shadow-glow rounded-3xl"
              />
            </div>
            
            {/* Floating Chat Bubbles */}
            <div className="absolute top-10 -left-5 bg-white shadow-card rounded-2xl p-4 max-w-xs opacity-90 float-animation" style={{animationDelay: '0.5s'}}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-sm text-foreground">"Good morning! Wetin you need help with today?"</p>
                  <span className="text-xs text-muted-foreground">AI Assistant • Pidgin</span>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-10 -right-5 bg-white shadow-card rounded-2xl p-4 max-w-xs opacity-90 float-animation" style={{animationDelay: '1.5s'}}>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Volume2 className="w-4 h-4 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-foreground">"Ẹ ku aaro! Bawo ni mo ṣe le ran yin lowo?"</p>
                  <span className="text-xs text-muted-foreground">Voice Message • Yorùbá</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;