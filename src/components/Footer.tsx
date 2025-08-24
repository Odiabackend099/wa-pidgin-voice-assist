import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Shield, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-secondary-foreground" />
              </div>
              <span className="text-xl font-bold">OdiaBiz AI</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              Empowering Nigerian SMEs with AI-powered WhatsApp customer service in English, Pidgin, Yorùbá, and Igbo.
            </p>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span className="text-sm">NDPA Compliant</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">Features</a></li>
              <li><a href="#pricing" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">Pricing</a></li>
              <li><a href="#demo" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">Voice Demo</a></li>
              <li><a href="#integrations" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">Integrations</a></li>
              <li><a href="#api" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">API Docs</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#help" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">Help Center</a></li>
              <li><a href="#contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">Contact Us</a></li>
              <li><a href="#status" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">System Status</a></li>
              <li><a href="#training" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">Training</a></li>
              <li><a href="#community" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">Community</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>support@odiabiz.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+234 (0) 700 ODIA-BIZ</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Lagos, Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>24/7 Nigerian Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-primary-foreground/80">
              © 2024 OdiaBiz AI. All rights reserved. Built with 🇳🇬 in Nigeria.
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Privacy Policy
              </a>
              <a href="#terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Terms of Service
              </a>
              <a href="#cookies" className="text-primary-foreground/80 hover:text-primary-foreground transition-smooth">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;