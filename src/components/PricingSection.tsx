import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check, Star, Zap, Crown } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
  variant: 'outline' | 'default' | 'hero';
}

const pricingPlans: PricingPlan[] = [
  {
    name: 'Free Trial',
    price: '₦0',
    period: '7 days',
    description: 'Perfect for testing our AI with your customers',
    features: [
      '60 AI messages',
      'All 4 languages support',
      'Voice message generation',
      'Basic WhatsApp integration',
      'Email support'
    ],
    icon: <Star className="w-6 h-6" />,
    variant: 'outline'
  },
  {
    name: 'Starter',
    price: '₦5,000',
    period: 'per month',
    description: 'Ideal for small businesses and startups',
    features: [
      '1,000 AI messages/month',
      'All languages + voice',
      'WhatsApp Business API',
      'Custom AI training',
      'Analytics dashboard',
      'Priority support'
    ],
    icon: <Zap className="w-6 h-6" />,
    popular: true,
    variant: 'default'
  },
  {
    name: 'Professional',
    price: '₦15,000',
    period: 'per month',
    description: 'For growing businesses with high volume',
    features: [
      '5,000 AI messages/month',
      'Advanced AI customization',
      'Multi-agent support',
      'Flutterwave integration',
      'Custom voice training',
      'API access',
      '24/7 phone support'
    ],
    icon: <Crown className="w-6 h-6" />,
    variant: 'outline'
  },
  {
    name: 'Enterprise',
    price: '₦75,000',
    period: 'per month',
    description: 'For large businesses and corporations',
    features: [
      'Unlimited AI messages',
      'Dedicated account manager',
      'Custom integrations',
      'On-premise deployment',
      'Advanced analytics',
      'SLA guarantee',
      'White-label solution'
    ],
    icon: <Crown className="w-6 h-6" />,
    variant: 'hero'
  }
];

const PricingSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, <span className="text-primary">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your Nigerian business. All plans include NDPA compliance and Nigerian voice AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={plan.name}
              className={`relative p-6 transition-smooth hover:shadow-elegant ${
                plan.popular ? 'ring-2 ring-primary shadow-glow scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-full ${
                  plan.popular ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                } flex items-center justify-center`}>
                  {plan.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-3xl font-bold text-primary">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                variant={plan.variant}
                className="w-full"
                size="lg"
              >
                {plan.name === 'Free Trial' ? 'Start Free Trial' : 'Get Started'}
              </Button>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            All plans include free setup, migration support, and NDPA compliance
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              No setup fees
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-primary" />
              24/7 Nigerian support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;